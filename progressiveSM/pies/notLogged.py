from flask import Blueprint, render_template, redirect, session, request
from flask_session import Session
from models import User
from helpers import check_for_username
from progressiveSM import db
from werkzeug.security import generate_password_hash

notLogged = Blueprint('notLogged', __name__)

@notLogged.route('/')
def index():
    return render_template("index.html")

@notLogged.route('/about')
def about():
    return render_template("about.html")

@notLogged.route('/contact')
def contact():
    return render_template('contact.html')

@notLogged.route('/register', methods=["GET", "POST"])
def register():
    ''' Register the homies'''
    if request.method == "POST":
        username = request.form.get("username")

        # Hash Password, Insert user into DB
        hashPw = generate_password_hash(password=request.form.get("password"), method='pbkdf2:sha256', salt_length=8)
        user = User(username = username, hash = hashPw, email = request.form.get("email"))
        db.session.add(user)
        db.session.commit()

        #Log user in, show success
        rows = check_for_username(request.form.get("username"))
        session["user_id"] = rows[0]["id"]
        username = rows[0]["username"]
        return render_template('/registrationSuccess.html', username = username)
    else:
        return render_template('register.html')

@notLogged.route('/login', methods=["GET", "POST"])
def login():
    '''Log some people in'''
    if request.method == "POST":
        session["user_id"] = check_for_username(request.form.get("username"))[0]["id"]
        return redirect('/')
    else:
        return render_template('login.html')