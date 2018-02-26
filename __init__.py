from flask import Flask
from flask import send_from_directory
app = Flask(__name__)

@app.route("/")
def welcome():
    return send_from_directory('static/src', 'index.html')

@app.route("/hello")
def hello():
    return "Hello, Josh!"

if __name__ == "__main__":
    app.run()
