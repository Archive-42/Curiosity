from flask import Blueprint, jsonify, session, request
from app.models import User, Review, Purchase, Product, OrderItem, Favorite, Category, CategoryJoin, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def get_user_data(user):
    id = user['id']
    # reviews, purchases, favorites
    user_reviews = Review.query.filter(Review.user_id == id).all()
    reviews = {
        "dict": {review.id: review.to_dict() for review in user_reviews},
        "ids": [review.id for review in user_reviews]
    }
    user_purchases = Purchase.query.filter(Review.user_id == id).all()
    purchases = {
        "dict": {purchase.id: purchase.to_dict() for purchase in user_purchases},
        "ids": [purchase.id for purchase in user_purchases]
    }
    user_favorites = Favorite.query.filter(Favorite.user_id == id).all()
    favorites = {
        "dict": {favorite.id: favorite.to_dict() for favorite in user_favorites},
        "ids": [favorite.id for favorite in user_favorites]
    }
    return {
        "user": user,
        "reviews": reviews,
        "purchases": purchases,
        "favorites": favorites
    }


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        data = get_user_data(current_user.to_dict())
        return data

    return {'errors': ['Unauthorized']}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        data = get_user_data(user.to_dict())
        return data
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            address=form.data['address'],
            phone_number=form.data['phone_number']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        data = get_user_data(user.to_dict())
        return data
    return {'errors': validation_errors_to_error_messages(form.errors)}


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
