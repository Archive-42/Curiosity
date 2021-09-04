from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want


def seed_users():

    demo = User(username='DemoAdmin',
                email='demoadmin@aa.io',
                password='password',
                verified=False,
                address='3390 W 5th St, Yuma, AZ 85364',
                phone_number='9283042225',
                admin=True)

    db.session.add(demo)

    demo = User(username='DemoCustomer1',
                email='demo1@aa.io',
                password='password',
                verified=True,
                address='2200 S Ave B, Yuma, AZ 85364',
                phone_number='9283042223',
                admin=False)

    db.session.add(demo)

    demo = User(username='DemoCustomer2',
                email='demo2@aa.io',
                password='password',
                verified=False,
                address='2350 S 8th Ave, Yuma, AZ 85364',
                phone_number='9283042222',
                admin=False)

    db.session.add(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
