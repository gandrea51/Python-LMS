from flask import Blueprint, render_template, url_for, flash, redirect, abort, request, session, jsonify
from flask_login import login_user, current_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import func, or_
from app import db
from app.models import Users, Books, Questions, Answers
from app.utils import fname, femail, fpassword, error_page, formatting_date, check_bad_words
import math, random
from datetime import datetime, date, timezone

function = Blueprint('routes', __name__)

@function.context_processor
def inject():
    if current_user.is_authenticated:
        return {'current': current_user}
    return {'current': None}

bad_words = {"drop", "alter", "create", "update", "delete", "insert", "shutdown", "truncate", "exec", "execute", "script",   
                 "cmd", "bash", "rm", "shutdown", "sudo", "reboot", "chown", "chmod"}

# Auth Function
@function.route('/sign', methods=['GET', 'POST'])
def sign():
    if request.method not in ["GET", "POST"]: 
        abort(405)
    
    if request.method == 'GET':
        first = random.randint(20, 40)
        second = random.randint(30, 50)
        question = f"How much is {first} + {second}?"
        session['answer'] = str(first + second)
        return render_template('sign.html', question=question)

    # The data
    name = request.form.get('name')
    genre = request.form.get('genre')
    email = request.form.get('email')
    password = request.form.get('password')    
    confirm = request.form.get('confirm')
    answer = request.form.get('answer')

    # The Check
    if answer != session.get('answer'):
        flash("Incorrect CAPTCHA answer. Try again!", 'danger')
        return redirect(url_for('routes.sign'))

    is_valid, error_message = fname(name)
    if not is_valid:
        flash(error_message, 'danger')
        return redirect(url_for('routes.sign'))
    
    is_valid, error_message = femail(email)
    if not is_valid:
        flash(error_message, 'danger')
        return redirect(url_for('routes.sign'))
    
    is_valid, error_message = fpassword(password)
    if not is_valid:
        flash(error_message, 'danger')
        return redirect(url_for('routes.sign'))
    
    try:
        if password == confirm:
            encrypt = generate_password_hash(password)
            user = Users(name=name, genre=genre, email=email, password=encrypt, role='moderator', created_at=date.today())
            db.session.add(user)
            db.session.commit()
            return redirect(url_for('routes.introduction'))
        else:
            flash("The password not correspond", 'danger')
            return redirect(url_for('routes.sign'))
    except Exception as e:
        flash("An error occurred while creating your account. Please try again.", 'danger')
        return redirect(url_for('routes.sign'))

@function.route('/signin', methods=["GET", "POST"])
def signin():
    if request.method not in ["GET", "POST"]: 
        abort(405)

    if request.method == 'GET':
        first = random.randint(20, 40)
        second = random.randint(30, 50)
        question = f"How much is {first} + {second}?"
        session['answer'] = str(first + second)
        return render_template('signin.html', question=question)
    
    email = request.form.get('email')
    password = request.form.get('password')   
    confirm = request.form.get('confirm')
    user = Users.query.filter_by(email=email).first()
    
    try:
        if user and check_password_hash(user.password, password):
            if password == confirm:
                login_user(user)
                return redirect(url_for('routes.introduction'))
            else: 
                flash("The password not correspond", 'danger')
                return redirect(url_for('routes.signin'))        
    except Exception as e:
        flash("An error occurred while acceding your account. Please try again.", 'danger')
        return redirect(url_for('routes.signin'))

@function.route('/signout')
@login_required
def signout():
    logout_user()
    return redirect(url_for('routes.introduction'))

@function.route('/user/<int:id>', methods=["GET"])
@login_required
def profile(id):
    if request.method not in ["GET"]: 
        abort(405)
    user = Users.query.get(id)
    if not user:
        return render_template('error.html', error_message="The request user can not be find! Try again.")    
    return render_template('profile.html', user=user)

# General Function
@function.route("/", methods=["GET"])
def introduction():
    if request.method not in ["GET"]: 
        abort(405)
    return render_template("introduction.html")

@function.route("/about", methods=["GET"])
@login_required
def about():
    if request.method not in ["GET"]: 
        abort(405)
    return render_template("about.html")

@function.route('/explore', methods=["GET"])
@login_required
def explore():
    if request.method not in ["GET"]: 
        abort(405)
    return render_template('explore.html')

# Book Function
@function.route('/book', methods=["GET"])
@login_required
def book():
    if request.method not in ["GET"]: 
        abort(405)
    genres = Books.query.with_entities(Books.genre, func.count(Books.genre)).group_by(Books.genre).order_by(Books.genre).all()
    realise = Books.query.filter_by(author="Umberto Eco").order_by(Books.title).first()
    classic = Books.query.filter_by(author="Antoine de Saint-Exupéry").order_by(Books.title).first()
    new = Books.query.filter_by(author="Thomas Eliot").order_by(Books.title).first()
    return render_template('book.html', genres=genres, realise=realise, classic=classic, new=new)

@function.route('/book/keyword', methods=["POST"])
@login_required
def keywords():
    if request.method not in ["POST"]: 
        abort(405)

    keywords = request.form.get('keywords')    
    validation_result = check_bad_words(keywords, bad_words)
    if validation_result != "Valid input":
        flash('You have entered words that should not appear. Try again! And remember to enter only valid key words.', 'danger')
        return redirect(url_for('routes.book'))

    search_keywords = [word.strip() for word in keywords.split(',')]
    books = Books.query.filter(or_(*[Books.keywords.ilike(f'%{keyword}%') for keyword in search_keywords])).all()
    return render_template('bkey.html', books=books)

@function.route('/book/genre', methods=["POST"])
def genre():
    if request.method not in ["POST"]: 
        abort(405)

    selected_genre = request.form.get('genre')
    books = Books.query.filter_by(genre=selected_genre).order_by(Books.title).all()
    return render_template('bgenre.html', books=books, genre=selected_genre)

@function.route('/book/<int:id>', methods=["GET"])
@login_required
def shows(id):
    if request.method not in ["GET"]:
        abort(405)
    book = Books.query.get(id)
    if not book:
        return render_template('error.html', error_message="The request book can not be find! Try again.")
    book.added_date = formatting_date(book.added_date)
    return render_template('bshow.html', book=book)

@function.route('/book/manager', methods=["GET"])
@login_required
def manage_book():
    if request.method not in ["GET"]: 
        abort(405)
    books = Books.query.all()
    if current_user.role != "user":
        return render_template('bmanager.html', books=books)
    else:
        return render_template('routes.book')

@function.route('/book/create', methods=["GET", "POST"])
@login_required
def create_book():
    if request.method not in ["GET", "POST"]:
        abort(405)
    if request.method == 'GET':
        return render_template('bpost.html')
    
    book = Books(
        title = request.form['title'],
        author = request.form['author'],
        genre = request.form['genre'],
        publisher = request.form['publisher'],
        added_date = date.today(),
        language = request.form['language'],
        format = request.form['format'],
        status = request.form['status'],
        keywords = request.form['keywords'],
        cover = request.form['cover']
    )
    try:
        db.session.add(book)
        db.session.commit()
        return redirect(url_for('routes.manage_book')) 
    except Exception as e:
        flash("An error occurred while this processing. Please try again.", 'danger')
        return redirect(url_for('routes.create_book'))
    
@function.route('/book/<int:id>/edit', methods=["GET", "POST"])
@login_required
def edit_book(id):
    if request.method not in ["GET", "POST"]:
        abort(405)
    book = Books.query.get(id)
    if not book:
        return render_template('error.html', error_message="The request book can not be find! Try again.")    
    
    if request.method == 'GET':
        return render_template('bput.html', book=book)
    
    book.title = request.form['title']
    book.author = request.form['author']
    book.genre = request.form['genre']
    book.publisher = request.form['publisher']
    book.added_date = date.today()
    book.language = request.form['language']
    book.format = request.form['format']
    book.status = request.form['status']
    book.keywords = request.form['keywords']
    book.cover = request.form['cover']
    try:
        db.session.commit()
        return redirect(url_for('routes.manage_book')) 
    except Exception as e:
        flash("An error occurred while this processing. Please try again.", 'danger')
        return redirect(url_for('routes.edit_book'))
    
@function.route('/book/<int:id>/drop', methods=["POST"])
@login_required
def delete_book(id):
    if request.method not in ["POST"]:
        abort(405)
    book = Books.query.get(id)
    if not book:
        return render_template('error.html', error_message="The request book can not be find! Try again.")    
    try:
        if current_user.role != "user":
            db.session.delete(book)
            db.session.commit()
        return redirect(url_for('routes.manage_book'))
    except Exception as e:
        flash("An error occurred while this processing. Please try again.", 'danger')
        return redirect(url_for('routes.manage_book'))

