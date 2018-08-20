from flask import redirect, session
from flask_session import Session
from functools import wraps
from progressiveSM import db 

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
    return User.query.filter_by(username=username)