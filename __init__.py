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
    posts = [{
        "id": 1,
        "game": "Skyrim",
        "username": "jnewlin",
        "rating": 5,
        "review": "It was great"
    },
    {
        "id": 2,
        "game": "Minecraft",
        "username": "jnewlin",
        "rating": 3,
        "review": "It was okay"
    },
    {
        "id": 3,
        "game": "Cube World",
        "username": "jnewlin",
        "rating": 1,
        "review": "It was bad"
    }]
    return posts

if __name__ == "__main__":
    app.run()
