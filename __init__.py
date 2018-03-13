from flask import Flask
from flask import send_from_directory, request, render_template
import sqlalchemy as sa
from sqlalchemy import exists, Column, ForeignKey, Integer, String, Date
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import json
import os

app = Flask(__name__)
driver = 'postgresql+psycopg2://'

app.config['SQLALCHEMY_DATABASE_URI'] = driver \
                                        + os.environ['RDS_USERNAME'] + ':' + os.environ['RDS_PASSWORD'] \
                                        +'@' + os.environ['RDS_HOSTNAME']  +  ':' + os.environ['RDS_PORT'] \
                                        + '/' + os.environ['RDS_DB_NAME']
eng = sa.create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
Session = sessionmaker(bind=eng)
session = Session()

Base = declarative_base()


# posts = []
# dict1 = {
#     "id": 1,
#     "game": "Skyrim",
#     "username": "jnewlin",
#     "rating": 5,
#     "review": "Skyrim is one of my favorite games in my inventory. I'm writing a long description to see if it will look good in the card on the landing page."
# }
# dict2 = {
#     "id": 2,
#     "game": "Minecraft",
#     "username": "jnewlin",
#     "rating": 3,
#     "review": "Minecraft is a buggy game, sadly. It's still very fun and customizable. I'm writing a long description to see if it will look good in the card on the landing page."
# }
# dict3 = {
#     "id": 3,
#     "game": "Cube World",
#     "username": "jnewlin",
#     "rating": 1,
#     "review": "Minecraft is a buggy game, sadly. It's still very fun and customizable. I'm writing a long description to see if it will look good in the card on the landing page."
# }
# dict4 = {
#     "id": 4,
#     "game": "Stardew Valley",
#     "username": "jnewlin",
#     "rating": 5,
#     "review": "Minecraft is a buggy game, sadly. It's still very fun and customizable. I'm writing a long description to see if it will look good in the card on the landing page."
# }
# dict5 = {
#     "id": 5,
#     "game": "Banished",
#     "username": "jnewlin",
#     "rating": 5,
#     "review": "Minecraft is a buggy game, sadly. It's still very fun and customizable. I'm writing a long description to see if it will look good in the card on the landing page."
# }
# posts.append(dict1)
# posts.append(dict2)
# posts.append(dict3)
# posts.append(dict4)
# posts.append(dict5)

class User(Base):
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}
    user_id = Column(Integer, primary_key=True)
    username = Column(String(80), nullable=False)
    password = Column(String(80), nullable=False)
    email = Column(String(80), nullable=False)

    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Post(Base):
    __tablename__ = 'posts'
    __table_args__ = {'extend_existing': True}
    post_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'))
    date_posted = Column(Date, nullable=False)
    rating = Column(Integer, nullable=False)
    review = Column(String(1000), nullable=False)
    game = Column(String(80), nullable=False)

    def __init__(self, user_id, date_posted, rating, review, game):
        self.user_id = user_id
        self.date_posted = date_posted
        self.rating = rating
        self.review = review
        self.game = game

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


@app.route("/")
def welcome():
    return render_template('main.html')

@app.route("/register", methods=['POST'])
def register():
    post = request.get_json()
    username = post.get('username')
    password = post.get('password')

    (ret, ), = session.query(exists().where(User.email==username))
    if ret != True:
        new_user = User(username.split('@', 1)[0], password, username)
        session.add(new_user)
        session.commit()
    else:
        return json.dumps("User already exists")
    return json.dumps("Success")

@app.route("/login", methods=['POST'])
def login():
    post = request.get_json()
    user = session.query(User).filter(User.email==post.username).first()
    if user is not None:
        if user.password == post.password:
            return json.dumps("Logged in")
        return json.dumps("Wrong password")
    return json.dumps("No user found")

@app.route("/posts", methods=['GET'])
def getPosts():
    posts = session.query(Post).all()
    post_list = []
    for p in posts:
        d = p.as_dict()
        d['review'] = d['review'][:50]
        user = session.query(User).filter(User.user_id==d['user_id']).first()
        d['username'] = user.username
        post_list.append(d)
    return json.dumps(post_list, indent=4, sort_keys=True, default=str)

@app.route("/view-post/<int:id>", methods=['GET'])
def viewPost(id):
    post = session.query(Post).filter(Post.post_id==id).first()
    d = post.as_dict()
    user = session.query(User).filter(User.user_id==d['user_id']).first()
    d['username'] = user.username
    return json.dumps(d, indent=4, sort_keys=True, default=str)

@app.route("/post", methods=['POST'])
def post():
    review = request.get_json()
    print review["time"] / 1000
    user = session.query(User).filter(User.email==review["username"]).first()
    if user is not None:
        new_post = Post(user.user_id, datetime.fromtimestamp(review["time"] / 1000), review["rating"], review["review"], review["game"])
        session.add(new_post)
        session.commit()
    return json.dumps(new_post.post_id)

if __name__ == "__main__":
    app.run()
