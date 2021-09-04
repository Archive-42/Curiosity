from .db import db


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    products = db.relationship(
        'Product', secondary='category_join', back_populates='categories', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "productIds": [product.id for product in self.products]
        }
