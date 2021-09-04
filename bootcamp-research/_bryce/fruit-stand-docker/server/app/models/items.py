from ..models import db
from ..models.companies import Company
from sqlalchemy.orm import validates

class Item(db.Model):
  __tablename__ = 'items'

  id = db.Column(db.Integer, primary_key=True)
  type = db.Column(db.String(255), nullable=False)
  name = db.Column(db.String(255), nullable=False)
  companyId = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
  imgSrc = db.Column(db.String, nullable=True)

  company = db.relationship('Company', back_populates='items')


  # 
  @validates('type')
  def validate_type(self, key, type):
    if not type:
      raise AssertionError('Must provide a type')
    
    if not type in ['fruit', 'vegetable']:
      raise AssertionError('Type must be "fruit" or "vegetable"')

    return type

  # MORE COMPLEX VALIDATION!!
  # The validation function will be invoked for each field listed as an argument
  # For each invocation, `key` is the name of the field being processed and `value` is the value we are checking
  @validates('name', 'companyId')
  def validate_name(self, key, value):
    # If we are currently looking at the `name` key, check that a value was provided
    # and that it is less than our character limit. Raise an AssertionError if not. 
    if key == 'name':
      if not value:
        raise AssertionError('Must provide a name')

      if len(value) > 255:
        raise AssertionError('Name must be less than 255 characters')
    
    # We cannot guarantee the order that the fields will be processed, so we check to see
    # which key we are currently processing and if the opposite has already been assigned
    # If it has been assigned, that means we can access its value, checking to see
    # if the combination of `name` and `companyId` is unique.
    if key == 'name' and isinstance(self.companyId, int):
      # .first() will return an entry if we found an entry with this combo
      if Item.query.filter(Item.name == value).filter(Item.companyId == self.companyId).first():
        raise AssertionError('Company already has an item by that name')
    elif key == 'companyId' and isinstance(self.name, str):
      if Item.query.filter(Item.name == self.name).filter(Item.companyId == value).first():
        raise AssertionError('Company already has an item by that name')
    
    # If all of our validations passed, we return the value that we were validating
    return value


  # This is a helper function in order to create a dictionary representation of our model instance
  # This is important for when we want to send a response back with instances of our model, ensuring
  # that they'll be able to be converted into JSON with the expected contents
  def to_dict(self):
    return { 
      "id": self.id,
      "name": self.name,
      "type": self.type,
      "companyId": self.companyId,
      "imgSrc": self.imgSrc
    }