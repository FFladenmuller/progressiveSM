from flask import Blueprint, render_template, request, session, jsonify, redirect
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import between, func, desc
from progressiveSM import db, Inventory, inventoryTxt, inventoryHistory
from helpers import datetimeformat
import datetime

inventory_history = Blueprint('inventory_history', __name__)

@inventory_history.route('/inventoryHistory')
def inventoryHDisplay():
    roundTypes = ["90 Elbow", "45 Elbow", "Reducer", "Coupling", "End Cap", "Conical Tap", "HETO", "Pipe",
                  "Starting Collar"]
    return render_template("inventoryHistory.html",
           inventoryHistory = inventoryHistory.query.order_by(inventoryHistory.date_updated.desc()).all(), roundTypes = roundTypes)
    
