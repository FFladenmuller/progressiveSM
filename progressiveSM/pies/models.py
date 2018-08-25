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
	date_updated = db.Column(db.DateTime, server_default=func.now())

class inventoryHistory(db.Model):
	id = db.Column(db.Integer, primary_key =True)
	quantity = db.Column(db.String)
	notes = db.Column(db.String)
	shape = db.Column(db.String)
	type = db.Column(db.String)
	dimension_one = db.Column(db.String)
	dimension_two = db.Column(db.String)
	date_updated = db.Column(db.DateTime, onupdate=func.now())

class inventoryTxt(db.Model):
    info = db.Column(db.String, primary_key=True)
    tsv = db.Column(TSVECTOR)
