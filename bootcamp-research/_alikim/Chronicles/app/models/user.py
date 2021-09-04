from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(50), nullable=False, unique=True)
  email = db.Column(db.String(250), nullable=False, unique=True)
  hashword = db.Column(db.String(250), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

  pcs = db.relationship("Entity", secondary="player_characters", backref="player")
  chronicles = db.relationship("Chronicle", back_populates="user")
  entities = db.relationship("Entity", back_populates="user")
  assets = db.relationship("Asset", back_populates="user")
  meters = db.relationship("Meter", back_populates="user")
  statuses = db.relationship("Status", back_populates="user")
  

  @property
  def password(self):
    return self.hashword

  @password.setter
  def password(self, password):
    self.hashword = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.password, password)

  def to_dict(self):
      """Convert to jsonifyable dictionary."""
      return {
          "id": self.id,
          "username": self.username,
          "email": self.email,
          "created_at": self.created_at,
          "pc_ids": [pc.id for pc in self.pcs],
          "chronicle_ids": [c.id for c in self.chronicles],
          "entity_ids": [e.id for e in self.entities],
          "asset_ids": [a.id for a in self.assets],
          "meter_ids": [m.id for m in self.meters],
          "status_ids": [s.id for s in self.statuses],
      }


# Join table for a player's playable characters
player_characters = db.Table(
    "player_characters",
    db.Model.metadata,
    db.Column("player_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("character_id", db.Integer, db.ForeignKey("entities.id"), primary_key=True),
    )