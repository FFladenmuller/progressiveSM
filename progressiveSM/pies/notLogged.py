from flask import Blueprint, render_template, redirect, session, request
from flask_session import Session
from helpers import check_for_username
from progressiveSM import db, User
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
    ''' Register user. Validation done in javascript, 
        checks for taken user name via /users'''
    if request.method == "POST":
        username = request.form.get("username")

        # Hash Password, Insert user into DB
        hashPw = generate_password_hash(password=request.form.get("password"), method='pbkdf2:sha256', salt_length=8)
        user = User(username = username, hash = hashPw, email = request.form.get("email"))
        db.session.add(user)
        db.session.commit()

        #Log user in, show success
        loggedUser = check_for_username(request.form.get("username"))
        session["user_id"] = loggedUser.id
        return render_template('/registrationSuccess.html', username = loggedUser.username)
    else:
        return render_template('register.html')

@notLogged.route('/login', methods=["GET", "POST"])
def login():
    '''Logs user in'''
    if request.method == "POST":
        loggedUser = check_for_username(request.form.get("username"))
        session["user_id"] = loggedUser.id
        return redirect('/')
    else:
        return render_template('login.html')

@notLogged.route("/logout")
def logout():
    """Log user out"""
    # Forget any user_id
    session.clear()
    return redirect("/")