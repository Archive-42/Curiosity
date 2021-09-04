from app import app
from app.models import db
from app.models.users import User
from app.models.companies import Company
from app.models.items import Item

with app.app_context():
  db.drop_all()
  db.create_all()
  user1 = User(email='alissa@gmail.com', password='password')

  company1 = Company(name='Trader Joes')
  company2 = Company(name='Safeway')

  item1 = Item(type='fruit', name='apple', company=company1, imgSrc='https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260')
  item2 = Item(type='fruit', name='banana', company=company1, imgSrc='https://image.shutterstock.com/z/stock-photo-banana-cluster-isolated-575528746.jpg')
  item3 = Item(type='fruit', name='strawberry', company=company1, imgSrc='https://images.pexels.com/photos/934066/pexels-photo-934066.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260')
  item4 = Item(type='fruit', name='apple', company=company2, imgSrc='https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260')
  item5 = Item(type='vegetable', name='carrot', company=company1, imgSrc='https://c.ndtvimg.com/2019-04/2g18s9fg_carrots_625x300_01_April_19.jpg')

  db.session.add(user1)
  db.session.add(company1)
  db.session.add(company2)
  db.session.add(item1)
  db.session.add(item2)
  db.session.add(item3)
  db.session.add(item4)
  db.session.add(item5)

  db.session.commit()
