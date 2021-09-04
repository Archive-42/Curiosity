from flask.cli import AppGroup
from .users import seed_users, undo_users
from .chronicles import seed_chronicles, undo_chronicles
from .tales import seed_tales, undo_tales
from .threads import seed_threads, undo_threads
from .entities import seed_entities, undo_entities
from .effects import seed_effects, undo_effects
from .locks import seed_locks, undo_locks

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    """Add seed functions here"""
    seed_users()
    seed_chronicles()
    seed_tales()
    seed_threads()
    seed_entities()
    seed_effects()
    seed_locks()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    """Add undo functions here"""
    undo_locks()
    undo_effects()
    undo_entities()
    undo_threads()
    undo_tales()
    undo_chronicles()
    undo_users()
