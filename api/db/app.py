# -*- coding: utf-8 -*-
from flask import Flask
from api import app


@app.route("/")
def index():
    return "It works!"


if __name__ == "__main__":
    app.run()


@app.route("/test")
def index():
    return "It test!"
