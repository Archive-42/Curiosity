from .db import db
from datetime import datetime

# location, trial, status, time, attire
# locks = db.Table(
#     "locks",
#     db.Model.metadata,
#     db.Column("id", db.Integer, primary_key=True, nullable=False),
#     db.Column("type", db.String(50), nullable=False),
#     db.Column("category", db.String(50)), # proof, prohibited, price
#     db.Column("choice_id", db.Integer, db.ForeignKey("choices.id"), nullable=False),
#     db.Column("created_at", db.DateTime, nullable=False, default=datetime.now()),
# )

class AssetLock(db.Model):
    """A type of lock that requires some asset to unlock a Thread Choice."""
    __tablename__ = "asset_locks"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    type = db.Column(db.String(50)) # proof, prohibited, price
    category = db.Column(db.String(50))
    choice_id = db.Column(db.Integer, db.ForeignKey("choices.id", ondelete="cascade"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    asset_id = db.Column(db.Integer, db.ForeignKey("assets.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    
    choice = db.relationship("Choice", back_populates="asset_locks")
    asset = db.relationship("Asset", backref="asset_locks")
    
    def to_dict(self):
        """Convert into dictionary."""
        return {
            "id": self.id,
            "type": self.type,
            "category": self.category,
            "choice_id": self.choice_id,
            "created_at": self.created_at,
            
            "asset_id": self.asset_id,
            "quantity": self.quantity,
        }
