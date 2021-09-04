from app.models import db, Chronicle

            # "id": self.id,
            # "user_id": self.user_id,
            # "type": self.type,
            # "category": self.category,
            # "title": self.title,
            # "description": self.description,
            # "color": self.color,
            # "icon": self.icon,
            # "image": self.image,
            # "created_at": self.created_at,
            
def seed_chronicles():
    """Seed a chronicle for Demo user."""
    chronicle1 = Chronicle(
        user_id=1,
        title="Demo Chronicle",
        description="A demonstration of the Iris Isle tale-spinner.",
        color="rgb(70,60,70)",
        icon="book",
        image="https://www.stuckinthelibrary.org/uploads/2/7/4/1/27415253/published/693145-widescreen-fairy-tale-wallpaper-1920x1080-pictures.jpg",
        )
    chronicle2 = Chronicle(
        user_id=1,
        title="Two sphinx in love.",
        color="rgb(70,60,70)",
        icon="heart",
        image="https://qph.fs.quoracdn.net/main-qimg-b660e40c7053bcf988c91662b4b6bd6a",
        )
    chronicle3 = Chronicle(
        user_id=1,
        title="The Three Atlamillia",
        description="Travel to the past and future to find your mom and discover the true secret of the great Emperor Grippin.",
        color="rgb(70,60,70)",
        icon="gem",
        image="https://ak1.ostkcdn.com/images/products/is/images/direct/a0860c1dfc9a8bc72019294e1d99ebb54524b3d9/D%27Lusso-Designs-Paoletta-Collection-Four-Piece-Bowl-With-Three-Orbs-Set.jpg",
        )
    chronicle4 = Chronicle(
        user_id=1,
        title="A Modern Tale of Capitalist Glory",
        description="Win big. Crush your competition. Become the Boss. Or die trying.",
        color="rgb(70,60,70)",
        icon="coins",
        image="close-up-coin-textures.jpg"
        )
    chronicle5 = Chronicle(
        user_id=1,
        title="Sophie's Adventures",
        description="A family-friendly children's adventure game, meant to be played together with your parent! :) Please enjoy. Updated with a new Tale every Friday, 7 PST.",
        color="rgb(70,60,70)",
        icon="mountain",
        image="https://secure.img1-fg.wfcdn.com/im/8126950/resize-h800-w800%5Ecompr-r85/5896/58964092/Mansfield+Removable+Vintage+Berries+Flowers+10%2527+L+x+120%2522+W+Peel+and+Stick+Wallpaper+Roll.jpg",
        )
    chronicle6 = Chronicle(
        user_id=2,
        title="Untitled",
        description="WIP (don't look, go away, I can't find the privacy settings)",
        color="rgb(70,60,70)",
        icon="poop",
        )
    
    db.session.add(chronicle1)
    db.session.add(chronicle2)
    db.session.add(chronicle3)
    db.session.add(chronicle4)
    db.session.add(chronicle5)
    db.session.add(chronicle6)
    db.session.commit()
    
def undo_chronicles():
    db.session.execute('TRUNCATE chronicles RESTART IDENTITY CASCADE;')
    db.session.commit()