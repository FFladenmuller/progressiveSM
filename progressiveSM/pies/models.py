from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy.dialects.postgresql import TSVECTOR
from sqlalchemy.sql import func
import os
from progressiveSM import db

'''
Classes allow sqlalchemy to map classes/objects to DB tables and allow you 
to use sqlalchemy ORM.
'''
class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String, unique = True, nullable=False)
	hash = db.Column(db.String, nullable=False)
	validated = db.Column(db.Integer, default = 0, nullable=False)
	email = db.Column(db.String)
	
class Inventory(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	quantity = db.Column(db.Integer, nullable=False)
	available_quantity = db.Column(db.Integer)
	connector = db.Column(db.String)
	dimension_one = db.Column(db.Integer, nullable=False)
	dimension_two = db.Column(db.Integer, nullable=False)
	price = db.Column(db.Integer, nullable=False)
	shape = db.Column(db.String, nullable=False)
	type = db.Column(db.String, nullable=False)
	location = db.Column(db.String, nullable=False)
	notes = db.Column(db.String, nullable=False)
	date_updated = db.Column(db.DateTime, server_default=func.now(), nullable=False)
	history = db.relationship('inventoryHistory', backref="inventory")

class inventoryHistory(db.Model):
	id = db.Column(db.Integer, primary_key =True)
	quantity = db.Column(db.String, nullable = False)
	operation = db.Column(db.String, nullable = False)
	date_updated = db.Column(db.DateTime, onupdate=func.now(), nullable = False)
	inventory_id = db.Column(db.Integer, db.ForeignKey('inventory.id'), nullable = False)
	order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable = False)

class order(db.Model):
	id = db.Column(db.Integer, primary_key =True)
	po = db.Column(db.String, unique = True, nullable = False)
	items = db.relationship('inventoryHistory', backref="order")
	date_updated = db.Column(db.DateTime, server_default=func.now(), nullable=False)
	status = db.Column(db.String, nullable = False)
	company = db.Column(db.String, nullable = False)
	price = db.Column(db.Integer)

class inventoryTxt(db.Model):
    info = db.Column(db.String, primary_key=True, unique = True)
    tsv = db.Column(TSVECTOR)