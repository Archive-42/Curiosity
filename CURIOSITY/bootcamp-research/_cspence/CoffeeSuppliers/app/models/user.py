from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    verified = db.Column(db.Boolean, nullable=False, default=False)
    address = db.Column(db.Text, nullable=False)
    phone_number = db.Column(db.String(10), nullable=False)
    admin = db.Column(db.Boolean, nullable=False, default=False)
    reviews = db.relationship('Review', backref='users', lazy=True)
    purchases = db.relationship('Purchase', backref='users', lazy=True)
    favorites = db.relationship('Favorite', backref='users', lazy=True)
    order_items = db.relationship('OrderItem', backref='users', lazy=True)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "verified": self.verified,
            "address": self.verified,
            "phone": self.phone_number,
            "admin": self.admin
        }
