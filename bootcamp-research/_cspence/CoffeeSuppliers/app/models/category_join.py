from .db import db


class CategoryJoin(db.Model):
    __tablename__ = 'category_join'

    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey(
        'categories.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        'products.id'), nullable=False)

    __table_args__ = (db.Index('product_and_category_associated_only_once',
                               'category_id', 'product_id', unique=True),)

    def to_dict(self):
        return {
            "id": self.id,
            "categoryId": self.category_id,
            "productId": self. product_id
        }
