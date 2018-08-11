from flask import Blueprint

inventory = Blueprint('inventory', __name__)

@inventory.route('/inventoryDisplay', methods=["GET", "POST"])
def inventoryDisplay():
    ''' Return inventory table and types from inventory for filters'''
    inv = db.execute("SELECT * FROM Inventory")
    roundTypes = db.execute("SELECT type FROM Inventory WHERE shape == \"Round\"")
    squareTypes = db.execute("SELECT type FROM Inventory WHERE shape == \"Square\"")
    ovalTypes = db.execute("SELECT type FROM INVENTORY WHERE shape == \"Oval\"")
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
    rows = db.execute("SELECT * FROM inventory WHERE price BETWEEN :minPrice AND :maxPrice", minPrice = minPrice, maxPrice = maxPrice)
    return jsonify(rows)