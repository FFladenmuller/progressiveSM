from flask import Blueprint, render_template, request, session, jsonify, redirect
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import between, func
from progressiveSM import db, Inventory, inventoryTxt, inventoryHistory
import datetime

inventory = Blueprint('inventory', __name__)

@inventory.route('/inventoryDisplay', methods=["GET", "POST"])
def inventoryDisplay():
    ''' Return inventory table and fitting types from inventory for filters on sidebar'''
    inv = Inventory.query.filter(Inventory.quantity >= 1)
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
 
    dict_result = {}
    for r in result: 
        dict_result.update(r._asdict())

    return jsonify(dict_result)

@inventory.route('/editItem', methods =["POST"])
def editInventory():
    quantity = request.form.get("quantityTB")
    quantitySelect = request.form.get("quantitySelect")
    price = request.form.get("priceTB")
    notes = request.form.get("notesTB")
    notesSelect = request.form.get("notesSelect")
    location = request.form.get("locationTB")
    id = request.form.get("id")
    operation = ""
    item = Inventory.query.filter_by(id = id).first()

    if quantitySelect == "Add":
        item.quantity += int(quantity)
        item.available_quantity += int(quantity)
        operation = "Add"
    else:
        item.quantity -= int(quantity)
        item.available_quantity -= int(quantity)
        operation = "Subtract"
    if notesSelect == "Add to notes:":
        item.notes += notes
    else:
        item.notes = notes

    item.price = price
    item.location = location
    history_item =  inventoryHistory(quantity = quantity, date_updated =    \
    datetime.datetime.now(), operation = operation, inventory_id = item.id, \
    order_id = 1) 
    db.session.add(history_item)
    db.session.commit()

    return redirect('/inventoryDisplay')
        
@inventory.route('/addItem', methods =["POST"])
def addItem():
    # Adds item to inventory and inventory history tables
    shape = request.values.get("shapeSelect")

    # If type is custom type entered by user, get that value instead of select option
    # in drop down.
    if request.form.get("typeSelect") == "New/Custom Type":
        type = request.form.get("customTypeTb")
    else:
        type = request.form.get("typeSelect")

    connector = request.form.get("connectorSelect")
    dimension_one = getDimension(request.form.get("addDimensionOne"))
    dimension_two = getDimension(request.form.get("addDimensionTwo"))
    quantity = onlyNumberString(request.form.get("addQuantity"))
    available_quantity = quantity
    price = onlyFloatString(request.form.get("addPrice"))
    notes = request.form.get("addNotes")
    location = request.form.get("addLocation")

   # Check to see if item exists first. If not, add item to db
    item = Inventory.query.filter_by(shape = shape)                \
                          .filter_by(type = type)                  \
                          .filter_by(dimension_one = dimension_one)\
                          .filter_by(dimension_two = dimension_two)\
                          .filter_by(connector = connector)        \
                          .filter_by(notes = notes).first()
    if not item:
        item = Inventory(connector = connector, quantity = quantity, available_quantity = available_quantity, dimension_one = dimension_one, \
                        dimension_two = dimension_two, price = price, shape = shape,                                                         \
                        type = type, location = location, notes = notes, date_updated = datetime.datetime.now())    
        db.session.add(item)  
        db.session.commit()

        infoString = createInfoString(shape, type, dimension_one, dimension_two, connector, notes)
        item_txt = inventoryTxt(info = infoString, tsv = func.to_tsvector(infoString))

        history_item =  inventoryHistory(quantity = quantity, date_updated = datetime.datetime.now(), operation = "Add", inventory_id = item.id,\
                        order_id = 1)
        db.session.add(history_item)
        db.session.add(item_txt)
    # Otherwise just add to quantity
    else:
        item.quantity += int(quantity)
        history_item =  inventoryHistory(quantity = quantity, date_updated = datetime.datetime.now(), 
                                     operation = "Add", inventory_id = item.id, order_id = 1)
        db.session.add(history_item)
    db.session.commit()
    return redirect('/inventoryDisplay')

@inventory.route('/deleteItem', methods =["POST"])
def deleteItem():
    # Query for item and text version of item, delete them
    id = request.form.get("id")

    item = Inventory.query.filter_by(id = id).first()
    oldQuantity = item.quantity
    item.quantity = 0
    item.available_quantity = 0 

    history_item = inventoryHistory(quantity = oldQuantity, date_updated = datetime.datetime.now(),
                                    operation = "Delete", inventory_id = item.id, order_id = 1)

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

    result = Inventory.query.filter(between(Inventory.price, minPrice, maxPrice)).all()

    resultAsDicts = {"id" : []}
    for r in result:
        resultAsDicts["id"].append(r.id)
    return jsonify(resultAsDicts)

@inventory.route('/diameterFilter')
def diameterFilter():
    '''Returns rows where they meet diameter criteria on inventory page'''
    if not request.args.get("maxDiameter"):
        raise RuntimeError("missing maxDiameter")
    maxDiameter = request.args.get("maxDiameter")

    result = Inventory.query.filter(between(Inventory.dimension_one, 0, int(maxDiameter))).all()

    resultAsDicts = {"id" : []}
    for r in result:
        resultAsDicts["id"].append(r.id)
    return jsonify(resultAsDicts)

def getDimension(dimensionString):
    ''' Makes sure that dimension string is only numeric string followed by " '''
    if not dimensionString.isnumeric():
        for i in range(len(dimensionString)):
            if not dimensionString[i].isdigit():
                dimensionString = dimensionString[0 : i]
                break
    return dimensionString

def onlyNumberString(quantityString):
    ''' Makes sure a string contains only numbers, cuts off everything after last number'''
    for i in range(len(quantityString)):
        if not quantityString[i].isdigit():
            quantityString = quantityString[0 : i]
        break
    return quantityString

def onlyFloatString(priceString):
    periodCounter = 0
    for i in range(len(priceString)):
        if not priceString[i].isdigit() and priceString != ".":
            priceString = priceString[0 : i]
            break
        elif priceString[i] == "." and periodCounter == 0:
            periodCounter += 1
        elif priceString[i] == "." and periodCounter > 0:
            priceString = priceString[0 : i]
            break
    return priceString

def createInfoString(shape, type, dimension_one, dimension_two, connector, notes):
    ''' Creates string for info column in inventory_txt'''
    dimensionString = ""
    if type == "Reducer" or type == "Conical Tap" or type == "HETO":
        dimensionString = dimension_one + " : " + dimension_two
    else:
        dimensionString = dimension_one
    info = "\'" + shape + " "  + connector + " "+ type + " " + dimensionString + " " + notes + "\'"
    return info
