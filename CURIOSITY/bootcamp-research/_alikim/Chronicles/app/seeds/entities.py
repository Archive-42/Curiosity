from app.models import db, Entity, Asset, Meter, Status
from pprint import pprint

def seed_entities():
    """Seed assets needed for Demo Tale."""
    
    # assets
    asset1 = Asset(
        user_id=1,
        category="item",
        title="Red Key",
        description="A tiny red key found in the blue room. It probably unlocks red doors, because why not?",
        color="#e05265ff",
        icon="key",
        value=100,
        )
    asset2 = Asset(
        user_id=1,
        category="item",
        title="Candy",
        description="Colorful pieces of candy wrapped in crinkly celophane. They look delicious.",
        color="#964a70ff",
        icon="candy-cane",
        value=0.25,
        )
    asset3 = Asset(
        user_id=1,
        category="deed",
        title="Took Candy",
        color="#964a70ff",
        description="A candy has been taken.",
        icon="hand-sparkles",
        )
    asset4 = Asset(
        user_id=1,
        category="item",
        title="Ball",
        description="A ball from the Sweet Fairy.",
        color="#8cb15eff",
        icon="baseball-ball",
        value=10,
        )
    asset5 = Asset(
        user_id=1,
        category="currency",
        title="Gold",
        description="The currency of the world of Demolandia.",
        color="#f0bc62ff",
        icon="coins",
        image="close-up-coin-textures.jpg",
        value=1,
        )

    # places
    place1 = Entity(
        user_id=1,
        type="place",
        title="The Beginning",
        description="There is a red door on the left and a blue door on the right",
        icon="dungeon",
        image="vintage-binocular-lens.jpg"
        )

    place2 = Entity(
        user_id=1,
        type="place",
        title="The Red Room",
        description="The room is very red, and there is another red door on the far wall. There is a table with a vase of flowers and a pile of candy.",
        color="#e05265ff",
        icon="door-closed",
        )
    
    place3 = Entity(
        user_id=1,
        type="place",
        title="The Blue Room",
        description="The room is very blue, and there is another blue door on the far wall. There is a table with a red key on it.",
        color="#5a70ccff",
        icon="door-open",
        )
    
    place4 = Entity(
        user_id=1,
        type="place",
        title="The Joined Room",
        description="Looking back, there is a red and blue door. An angry fairy is in the corner of the room.",
        color="#4f4686ff",
        icon="door-open",
        image="vintage-binocular-lens.jpg",
        )

    # characters
    character1 = Entity(
        user_id=1,
        type="character",
        category="fairy",
        title="Sweet Fairy",
        description="A young fairy with a sweet tooth",
        color="#885c58ff",
        icon="user-circle",
        image="https://i.vippng.com/png/small/320-3207217_vintage-fairy-pngs-daisy-fairy-cicely-mary-barker.png",
        )
    
    # statuses
    status1 = Status(
        user_id=1,
        category="mood",
        title="Angry",
        description="An angry mood",
        color="#e05265ff",
        icon="angry",
        )
    status2 = Status(
        user_id=1,
        category="mood",
        title="Happy",
        description="A happy mood",
        color="#f0bc62ff",
        icon="grin",
        )
    # TODO Figure out how to add assets/etc. to entities via join table 

    # ba1 = BearerAsset(
    #     bearer=character1,
    #     asset=asset4,
    #     )
    # ba2 = BearerAsset(
    #     bearer=character1,
    #     asset=condition1,
    #     )
    
    meter1 = Meter(
        user_id=1,
        title="Popularity",
        description="This indicates how well people like you.",
        color="#f0bc62ff",
        icon="users",
        image="https://previews.123rf.com/images/torky/torky1112/torky111200013/11377065-vintage-heart-of-roses.jpg",
        min=0,
        max=10,
        base=100,
        mod=10,
    )
    meter2 = Meter(
        user_id=1,
        title="Perception",
        description="How sharp is your senses? Can you notice when something seems off around you?",
        color="#1b9d8eff",
        icon="eye",
        min=0,
        max=20,
        base=10,
        mod=1,
    )
    meter3 = Meter(
        user_id=1,
        title="Killing Arts",
        description="Do you have what it takes to become America's most deadly assassin?",
        color="#1b9d8eff",
        icon="wrench",
        min=0,
        max=50,
        base=10,
        mod=2,
    )
    meter4 = Meter(
        user_id=1,
        title="Gardening",
        description="How green is your thumb?",
        color="#1b9d8eff",
        icon="seedling",
        min=0,
        max=10,
        base=1000,
        mod=5,
    )
    # em1 = EntityMeter(
    #   entity=character1,
    #   meter=meter1,
    #   progress=50,
    # )

    db.session.add(asset1)
    db.session.add(asset2)
    db.session.add(asset3)
    db.session.add(asset4)
    db.session.add(place1)
    db.session.add(place2)
    db.session.add(place3)
    db.session.add(place4)
    db.session.add(character1)
    db.session.add(status1)
    db.session.add(status2)
    db.session.add(meter1)
    db.session.add(meter2)
    db.session.add(meter3)
    db.session.add(meter4)
    db.session.commit()
    
    
def undo_entities():
    db.session.execute('TRUNCATE assets RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE statuses RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE meters RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE entities RESTART IDENTITY CASCADE;')
    db.session.commit()
