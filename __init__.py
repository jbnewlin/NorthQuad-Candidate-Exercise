from flask import Flask
from flask import render_template
app = Flask(__name__)

@app.route("/")
def welcome():
    return render_template('main.html')

@app.route("/hello")
def hello():
    return "Hello, Josh!"

if __name__ == "__main__":
    app.run()
