from flask.cli import AppGroup
from .users import seed_users, undo_users
from .categories import seed_categories, undo_categories
from .favorites import seed_favorites, undo_favorites
from .products import seed_products, undo_products
from .purchases import seed_purchases, undo_purchases
from .reviews import seed_reviews, undo_reviews

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_categories()
    seed_products()
    seed_purchases()
    seed_reviews()
    seed_favorites()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_favorites()
    undo_reviews()
    undo_purchases()
    undo_products()
    undo_categories()
    undo_users()
    
