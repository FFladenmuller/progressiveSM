from flask import Blueprint, request,render_template

orderStuff = Blueprint('orderStuff', __name__)

@orderStuff.route('/order', methods=["GET", "POST"])
def order():
    if request.method == "POST":
        # user ordered something, TODO
        return render_template('order.html')
    else:
        return render_template('order.html')