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

if __name__ == "__main__":
    app.run()
