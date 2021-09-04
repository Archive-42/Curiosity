from .db import db
from datetime import datetime


class Slot(db.Model):
    """
    Represents a fillable 'slot' type that an entity can have.
    """
    __tablename__ = "slots"
    id = db.Column(db.Integer, primary_key=True)
    chronicle_id = db.Column(db.Integer, db.ForeignKey("chronicles.id", ondelete="cascade"), nullable=False)
    category = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    chronicle = db.relationship("Chronicle", back_populates="slots")
    
    def to_dict(self):
        """Convert to jsonifyable dictionary."""
        return {
            "id": self.id,
            "chronicle_id": self.chronicle_id,
            "category": self.category,
            "created_at": self.created_at,
        }