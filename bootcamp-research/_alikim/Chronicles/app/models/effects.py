from .db import db
from datetime import datetime


# effects = db.Table(
#     "effects",
#     db.Model.metadata,
#     db.Column("id", db.Integer, primary_key=True, nullable=False),
#     db.Column("type", db.String(50), nullable=False),
#     db.Column("category", db.String(50)),
#     db.Column("thread_id", db.Integer, db.ForeignKey("threads.id"), nullable=False),
#     db.Column("created_at", db.DateTime, nullable=False, default=datetime.now()),
# )
        

class AssetEffect(db.Model):
    """A type of effect that  bestows an asset."""
    __tablename__ = "asset_effects"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    type = db.Column(db.String(50))
    category = db.Column(db.String(50))
    thread_id = db.Column(db.Integer, db.ForeignKey("threads.id", ondelete="cascade"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    asset_id = db.Column(db.Integer, db.ForeignKey("assets.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    
    thread = db.relationship("Thread", back_populates="asset_effects")
    asset = db.relationship("Asset", backref="asset_effects")
    
    def to_dict(self):
        """Convert into dictionary."""
        return {
            "id": self.id,
            "type": self.type,
            "category": self.category,
            "thread_id": self.thread_id,
            "created_at": self.created_at,
            
            "asset_id": self.asset_id,
            "quantity": self.quantity,

        }
