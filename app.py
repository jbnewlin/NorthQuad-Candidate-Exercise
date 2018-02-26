from flask import Flask
app = Flask(__name__)

@app.route("/")
def welcome():
    return "Welcome to my NorthQuad LLC Entry!"

@app.route("/hello")
def hello():
    return "Hello, Josh!"

if __name__ == "__main__":
    app.run()
