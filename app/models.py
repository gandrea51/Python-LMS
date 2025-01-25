from datetime import datetime
from flask_login import UserMixin
from . import db


class Users(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    genre = db.Column(db.Enum('M', 'F', 'O'), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    role = db.Column(db.Enum('admin', 'user', 'moderator'), nullable=False)
    created_at = db.Column(db.DateTime)

class Books(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(250), nullable=False)
    author = db.Column(db.String(250), nullable=False)
    genre = db.Column(db.String(250), nullable=False)
    publisher = db.Column(db.String(250), nullable=False)
    added_date = db.Column(db.Date, nullable=False)
    language = db.Column(db.Enum('Italian', 'English', 'French'), nullable=False)
    format = db.Column(db.Enum('Paper', 'Ebook', 'Audiobook'), nullable=False)
    status = db.Column(db.Enum('Available', 'Re-print', 'Out of stock'), nullable=False)    
    keywords = db.Column(db.Text, nullable=False)
    cover = db.Column(db.String(250))

class Questions(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    answered = db.Column(db.Boolean, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    user = db.relationship('Users', backref=db.backref('users', lazy=True))
   
class Answers(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.Date, nullable=False)   
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    
    question = db.relationship('Questions', backref=db.backref('questions', lazy=True))
