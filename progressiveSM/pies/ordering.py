from flask import Blueprint, request,render_template
from progressiveSM import db, order

ordering = Blueprint('ordering', __name__)

@ordering.route('/orders', methods=["GET", "POST"])
def orders():
        orders = order.query.all()
        companies = db.session.query(order.company).all()
        return render_template('order.html', orders = orders,
        companies = companies)

@ordering.route('/newOrder')
def newOrder():
        roundTypes = ["90 Elbow", "45 Elbow", "Reducer", "Coupling", "End Cap", "Conical Tap", "HETO", "Pipe",
                  "Starting Collar"]
        return render_template('newOrder.html', roundTypes = roundTypes)

@ordering.route('/addOrder', methods=["GET","POST"])
def addOrder():
         

