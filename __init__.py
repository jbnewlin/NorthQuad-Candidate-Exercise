from flask import Flask
from flask import send_from_directory, request
import json
import os


app = Flask(__name__)

@app.route("/")
def welcome():
    return send_from_directory('static/src', 'index.html')

@app.route("/register", methods=['POST'])
def register():
    post = request.get_json()
    username = post.get('username')
    password = post.get('password')

    print username
    print password
    return json.dumps("Registered")

@app.route("/login", methods=['POST'])
def login():
    post = request.get_json()
    username = post.get('username')
    password = post.get('password')

    print username
    print password
    return json.dumps("Logged in")

@app.route("/posts", methods=['GET'])
def getPosts():
    posts = []
    dict1 = {
        "id": 1,
        "game": "Skyrim",
        "username": "jnewlin",
        "rating": 5,
        "review": "It was great"
    }
    dict2 = {
        "id": 2,
        "game": "Minecraft",
        "username": "jnewlin",
        "rating": 3,
        "review": "It was okay"
    }
    dict3 = {
        "id": 3,
        "game": "Cube World",
        "username": "jnewlin",
        "rating": 1,
        "review": "It was bad"
    }
    dict4 = {
        "id": 4,
        "game": "Stardew Valley",
        "username": "jnewlin",
        "rating": 5,
        "review": "Great game"
    }
    dict5 = {
        "id": 5,
        "game": "Banished",
        "username": "jnewlin",
        "rating": 5,
        "review": "It's a very fun game"
    }
    posts.append(dict1)
    posts.append(dict2)
    posts.append(dict3)
    posts.append(dict4)
    posts.append(dict5)
    return json.dumps(posts)

if __name__ == "__main__":
    app.run()
