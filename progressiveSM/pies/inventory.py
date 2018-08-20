from flask import Blueprint, render_template, request, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import between
from progressiveSM import db

inventory = Blueprint('inventory', __name__)

@inventory.route('/inventoryDisplay', methods=["GET", "POST"])
def inventoryDisplay():
    ''' Return inventory table and types from inventory for filters'''
    inv = Inventory.query.all()
    roundTypes = Inventory.query.filter_by(shape="Round").all()
    squareTypes = Inventory.query.filter_by(shape="Square").all()
    ovalTypes = Inventory.query.filter_by(shape="Oval").all()
    return render_template("inventory.html", inventory = inv, roundTypes = roundTypes, squareTypes = squareTypes, ovalTypes = ovalTypes)


@inventory.route('/searchInventory')
def searchInventory():
    if not request.args.get("q"):
        raise RuntimeError("missing q")
    keywords = request.args.get("q")
    rows = db.execute("SELECT * FROM inventoryTxt WHERE inventoryTxt MATCH :q", q = "*" + request.args.get("q") + "*")
    return jsonify(rows);

@inventory.route('/editInventory', methods =["POST"])
def editInventory():
    quantity = request.form.get("qt")
    price = request.form.get("pr")
    notes = request.form.get("ntInput")
    location = request.form.get("loc")



@inventory.route('/priceFilter')
def priceFilter():
    ''' Returns rows where they meet price criteria'''
    if not request.args.get("minPrice"):
        raise RuntimeError("missing minPrice")
    elif not request.args.get("maxPrice"):
        raise RuntimeError("missing maxPrice")
    minPrice = request.args.get("minPrice")
    maxPrice = request.args.get("maxPrice")
    rows = Inventory.query.where(between(Inventory.price, minPrice, maxPrice))
    return jsonify(rows)