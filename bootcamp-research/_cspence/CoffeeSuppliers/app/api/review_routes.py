from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Review, Product, db
import json

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/', strict_slashes=False)
def get_all_reviews():
    reviews = Review.query.all()
    return {
        "dict": {review.id: review.to_dict() for review in reviews},
        "ids": [review.id for review in reviews]
    }


@review_routes.route('/', methods=['POST'], strict_slashes=False)
def create_review():
    req_data = json.loads(request.data)
    review = Review(user_id=req_data['userId'], product_id=req_data['productId'],
                    rating=req_data['rating'], review_body=req_data['reviewBody'])
    db.session.add(review)
    db.session.commit()
    return review.to_dict()


@review_routes.route('/<int:id>', methods=['PUT'], strict_slashes=False)
def edit_review(id):
    req_data = json.loads(request.data)
    review = Review.query.filter(Review.id == id).first()
    review.rating = req_data['rating']
    review.review_body = req_data['reviewBody']
    db.session.commit()
    return review.to_dict()


@review_routes.route('/<int:id>', methods=['DELETE'], strict_slashes=False)
def delete_review(id):
    review = Review.query.filter(Review.id == id).first()
    this_review = review.to_dict()
    db.session.delete()
    db.session.commit()
    return this_review
