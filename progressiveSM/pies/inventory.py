from flask import Blueprint, render_template, request, session, jsonify, redirect
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import between
from progressiveSM import db, Inventory, inventoryTxt, inventoryHistory
import datetime

inventory = Blueprint('inventory', __name__)

@inventory.route('/inventoryDisplay', methods=["GET", "POST"])
def inventoryDisplay():
    ''' Return inventory table and fitting types from inventory for filters on sidebar'''
    inv = Inventory.query.all()
    roundTypes = ["90 Elbow", "45 Elbow", "Reducer", "Coupling", "End Cap", "Conical Tap", "HETO", "Pipe",
                  "Starting Collar"]
    return render_template("inventory.html", inventory = inv, roundTypes = roundTypes)


@inventory.route('/searchInventory')
def searchInventory():
    ''' Searches FTS Postgres table for query typed into typeahead bar on inventory page'''
    if not request.args.get("q"):
        raise RuntimeError("missing q")

    ''' Split query into keywords by spaces, add :* to each keyword for prefix searching, 
        if the keyword is not the last keyword also add & to search for multiple keywords 
        in no particular order
    '''
    query = request.args.get("q")
    keywords = query.split()
    for i in range(len(keywords)):
        keywords[i] += ":*"
        if i is not len(keywords) - 1:
            keywords[i] += "&"
    sqlQuery = ''.join(keywords)

    result = db.session.query(inventoryTxt.info).filter(inventoryTxt.tsv.match(sqlQuery)).all()

    ''' Query returns keyed tuples. In order to work with this data as JSON objects, I change
        the keyed tuples into dictionaries and combine them together.
    '''
    
    # List of keyed tuples -> list of dicts
    results_as_dicts_list = []
    for r in result: 
        results_as_dicts_list.append(r._asdict())

    # List of dicts -> one dict
    dict_result = {}
    for d in results_as_dicts_list:
        dict_result.update(d)

    return jsonify(dict_result)

@inventory.route('/editInventory', methods =["POST"])
def editInventory():
    quantity = request.form.get("qt")
    price = request.form.get("pr")
    notes = request.form.get("ntInput")
    location = request.form.get("loc")

@inventory.route('/addItem', methods =["POST"])
def addItem():
    # Adds item to inventory and inventory history tables

    shape = request.values.get("shapeSelect")
    type = request.form.get("typeSelect")
    dimension_one = request.form.get("addDimensionOne")
    dimension_two = request.form.get("addDimensionTwo")
    quantity = request.form.get("addQuantity")
    price = request.form.get("addPrice")
    notes = request.form.get("addNotes")
    location = request.form.get("addLocation")

    item = Inventory(quantity = quantity, dimension_one = dimension_one, 
                     dimension_two = dimension_two, price = price, shape = shape, 
                     type = type, location = location, notes = notes)

    history_item =  inventoryHistory(quantity = quantity, dimension_one = dimension_one, 
                     dimension_two = dimension_two, shape = shape, 
                     type = type, date_updated = datetime.datetime.now())
    
    db.session.add(item)
    db.session.add(history_item)
    db.session.commit()
    return redirect('/inventoryDisplay')

@inventory.route('/priceFilter')
def priceFilter():
    ''' Returns rows where they meet price criteria for price Filter on inventory page'''
    if not request.args.get("minPrice"):
        raise RuntimeError("missing minPrice")
    elif not request.args.get("maxPrice"):
        raise RuntimeError("missing maxPrice")
    minPrice = request.args.get("minPrice")
    maxPrice = request.args.get("maxPrice")
    rows = Inventory.query.where(between(Inventory.price, minPrice, maxPrice))
    return jsonify(rows)