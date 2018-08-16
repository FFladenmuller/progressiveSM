from flask import Flask, render_template, flash, redirect, request, session, jsonify
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
import os
import pdb
from flask_sqlalchemy import SQLAlchemy
import sys

# Configure application
app = Flask(__name__)
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']

# Configure database
db = SQLAlchemy(app)

@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response
    
sys.path.insert(0, './progressiveSM/pies/')
from progressiveSM.pies.inventory import inventory
from progressiveSM.pies.notLogged import notLogged
from progressiveSM.pies.order import orderStuff
from progressiveSM.pies.models import *
from progressiveSM.pies.helpers import *

app.register_blueprint(inventory)
app.register_blueprint(orderStuff)
app.register_blueprint(notLogged)

@app.route("/logout")
def logout():
    """Log user out"""
    # Forget any user_id
    session.clear()
    return redirect("/")

@app.route('/users')
def users():
    '''check to see if user exists'''
    if not request.args.get("username"):
        raise RuntimeError("missing username")
    if db.execute("SELECT * FROM users WHERE username = :username", username = request.args.get("username")):
        return jsonify(result = True)
    else:
        return jsonify(result = False)

@app.route('/passwordCheck')
def passwordCheck():
    ''' See if given password in url matches given username in url'''
    if not request.args.get("username"):
        raise RuntimeError("missing username")
    rows = check_for_username(request.args.get("username"))
    if not check_password_hash(rows[0]["hash"], request.args.get("password")):
        return jsonify(result = False)
    else:
        return jsonify(result = True)

