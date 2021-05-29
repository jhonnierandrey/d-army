from flask import Flask, redirect, url_for

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello! this is my home page."

if __name__ == "__main__":
    app.run()