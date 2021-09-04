from .db import db


class Modifier(db.Model):
    """
    Modifier for an entity, like an equippable item or condition, on another
    metered entity, like a skill or size rating.
    """
    __tablename__ = "modifiers"
    id = db.Column(db.Integer, primary_key=True)
    mod = db.Column(db.Integer, nullable=False, default=1)
    type = db.Column(db.String(50), default="sum") # sum, product
    is_slot_activated = db.Column(db.Boolean, default=True)
    
    def to_dict():
        """Returns dict representing Modifier instance."""
        return {
            "id": self.id,
            "meter_id": self.meter_id,
            "mod": self.mod,
            "type": self.type,
            "is_slot_activated": self.is_slot_activated,
        }


status_modifiers = db.Table(
    "status_modifiers",
    db.Model.metadata,
    db.Column("status_id", db.Integer, db.ForeignKey("statuses.id"), primary_key=True, nullable=False),
    db.Column("modifier_id", db.Integer, db.ForeignKey("modifiers.id"), primary_key=True, nullable=False),
)

asset_modifiers = db.Table(
    "asset_modifiers",
    db.Model.metadata,
    db.Column("asset_id", db.Integer, db.ForeignKey("assets.id"), primary_key=True, nullable=False),
    db.Column("modifier_id", db.Integer, db.ForeignKey("modifiers.id"), primary_key=True, nullable=False),
)