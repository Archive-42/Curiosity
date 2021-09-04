from .db import db
from sqlalchemy import CheckConstraint


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        'products.id'), nullable=False)
    rating = db.Column(db.Integer)
    review_body = db.Column(db.Text)

    __table_args__ = (
        CheckConstraint('NOT(rating IS NULL AND review_body IS NULL)'),
        db.Index('one_item_review_per_customer',
                 'user_id', 'product_id', unique=True)
    )

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "productId": self.product_id,
            "rating": self.rating,
            "reviewBody": self.review_body,
        }
