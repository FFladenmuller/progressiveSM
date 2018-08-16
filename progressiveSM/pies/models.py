from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy.dialects.postgresql import TSVECTOR
import os
from progressiveSM import db

class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String, unique = True)
	hash = db.Column(db.String)
	validated = db.Column(db.Integer, default = 0)
	email = db.Column(db.String)
    
class Inventory(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	quantity = db.Column(db.Integer)
	dimension_one = db.Column(db.String)
	dimension_two = db.Column(db.String)
	price = db.Column(db.Integer)
	shape = db.Column(db.String)
	type = db.Column(db.String)
	location = db.Column(db.String)
	notes = db.Column(db.String)
	date_updated = db.Column(db.DateTime, default=datetime.now)

class inventoryTxt(db.Model):
    info = db.Column(db.String)
    tsv = db.Column(TSVECTOR)