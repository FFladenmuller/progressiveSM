from flask import redirect, session, Blueprint, request, jsonify
from flask_session import Session
from functools import wraps
from progressiveSM import app, db, User
from werkzeug.security import check_password_hash
from flask_sqlalchemy import SQLAlchemy

helpers = Blueprint('helpers', __name__)

def login_required(f):
    """
    Decorate routes to require login.

    http://flask.pocoo.org/docs/0.12/patterns/viewdecorators/
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated_function

# Query database for row with username
def check_for_username(username):
    return User.query.filter_by(username=username).first()

@helpers.route('/users')
def users():
    '''check to see if user exists'''
    if not request.args.get("username"):
        raise RuntimeError("missing username")
    if User.query.filter_by(username=request.args.get("username")).first():
        return jsonify(result = True)
    else:
        return jsonify(result = False)

@helpers.route('/passwordCheck')
def passwordCheck():
    ''' See if given password in url matches given username in url'''
    if not request.args.get("username"):
        raise RuntimeError("missing username")
    user = check_for_username(request.args.get("username"))
    if not check_password_hash(user.hash, request.args.get("password")):
        return jsonify(result = False)
    else:
        return jsonify(result = True)

def datetimeformat(value):
    return value.strftime("%m-%d-%Y") 
