from app.models import db, AssetLock


def seed_locks():
    """Seed the lock requirements for threads in Demo Tale."""
    # Requires Red Key to enter Red Room, does not consume
    assetlock1 = AssetLock(
        choice_id=1,
        asset_id=1,
        type="proof")

    # Requires at least one Candy to give to Sweet Fairy
    assetlock2 = AssetLock(
      choice_id=7,
      asset_id=2,
      quantity=1,
      type="price")

    # Disallows taking more than five Candies
    assetlock3 = AssetLock(
        choice_id=3,
        asset_id=3,
        quantity=5,
        type="prohibited",) # price, proof, prohibited


    db.session.add(assetlock1)
    db.session.add(assetlock2)
    db.session.add(assetlock3)
    db.session.commit()
    
    
def undo_locks():
    db.session.execute('TRUNCATE asset_locks RESTART IDENTITY CASCADE;')
    db.session.commit()
