from flask import Flask, render_template, flash, redirect, request, session, jsonify
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash
import os
import sys

# Configure application
app = Flask(__name__)
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']

# Configure database
db = SQLAlchemy(app)

# Set up flask-migrate with app, a library for changing database in versions


@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response
    
sys.path.insert(0, './progressiveSM/pies/')
from progressiveSM.pies.models import *
from progressiveSM.pies.helpers import *
from progressiveSM.pies.inventory import inventory
from progressiveSM.pies.inventoryHistory import inventory_history
from progressiveSM.pies.notLogged import notLogged
from progressiveSM.pies.ordering import ordering

app.jinja_env.filters['datetimeformat'] = datetimeformat

app.register_blueprint(inventory)
app.register_blueprint(inventory_history)
app.register_blueprint(ordering)
app.register_blueprint(notLogged) 
app.register_blueprint(helpers)  

