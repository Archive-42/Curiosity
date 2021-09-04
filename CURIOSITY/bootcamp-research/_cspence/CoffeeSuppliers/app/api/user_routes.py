from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import User, db
from werkzeug.security import generate_password_hash, check_password_hash
import json

user_routes = Blueprint('users', __name__)


@user_routes.route('/', strict_slashes=False)
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>', strict_slashes=False)
@login_required
def user(id):
    user = User.query.filter(User.id == id).first()
    return user.to_dict()


@user_routes.route('/<int:id>', methods=['DELETE'], strict_slashes=False)
@login_required
def delete_user(id):
    user = User.query.filter(User.id == id).first()
    db.session.delete(user)
    db.session.commit()
    return {'id': id}


@user_routes.route('/<int:id>', methods=['PUT'], strict_slashes=False)
@login_required
def edit_user(id):
    req_data = json.loads(request.data)
    username = req_data['username']
    email = req_data['email']
    old_password = req_data['oldPassword']
    new_password = req_data['newPassword']
    address = req_data['address']
    phone_number = req_data['phoneNumber']
    user = User.query.filter(User.id == id).first()
    user.username = username
    user.email = email
    if user.check_password(old_password) and new_password is not None:
        user.password = new_password
    user.address = address
    user.phone_number = phone_number
    db.session.commit()
    return {'user': user.to_dict()}


@user_routes.route('/<int:id>', methods=['PATCH'], strict_slashes=False)
@login_required
def verify_user(id):
    user = User.query.filter(User.id == id).first()
    user.verified = True
    return {'user': user.to_dict()}
