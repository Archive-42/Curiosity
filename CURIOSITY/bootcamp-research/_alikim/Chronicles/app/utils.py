import os
import json
from flask import request, redirect
from werkzeug.utils import secure_filename
from wtforms.validators import ValidationError
from pprint import pprint
from app.models import db, User, Chronicle, Tale, Thread, Choice, Entity
import boto3
import botocore
from .config import Config
from pprint import pprint


s3 = boto3.client(
    "s3",
    aws_access_key_id=Config.S3_KEY,
    aws_secret_access_key=Config.S3_SECRET
)

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_file(files):
    """Uploads user file to AWS."""
    # Check for a user_file. If absent, return error message.
    # user_file is the name of the file input on the form.
    if "user_file" not in request.files:
        print("\n\nREQUEST FILES\n", request.files)
        print("No user_file key in request.files")
        return "No user_file key in request.files"

    # If the key is in the request.files object, save in 'file' variable.
    file = request.files["user_file"]
    if file.filename == "":
        print("Please select a file")
        return "Please select a file"

    print("\n\nUPLOADING IMAGE? req", file.filename)
    # Check that there is a file and that it has an allowed filetype
    # (allowed_file function does this, see more in Flask docs).
    if file and allowed_file(file.filename):
        file.filename = secure_filename(file.filename)
        output = upload_file_to_s3(file, Config.S3_BUCKET)
        print("\n\nOUTPUT", output)
        return str(output)

    else:
        return redirect("/")


def upload_file_to_s3(file, bucket_name, acl="public-read"):
    """
    Docs: http://boto3.readthedocs.io/en/latest/guide/s3.html
    """

    print("\n\nbucket!", bucket_name, file, Config.S3_BUCKET, Config.S3_KEY)
    objs = s3.list_objects(Bucket=bucket_name)
    pprint(objs)
    all_files = objs["Contents"]
    print("\n\nall files!")
    pprint(all_files)

    file_names = [file["Key"] for file in objs["Contents"]]
    print("filenames")
    pprint(file_names)

    try:
        s3.upload_fileobj(
            file, bucket_name, file.filename, ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # This is a catch-all exception. Edit as needed.
        print("Something happened uh oh:", e)
        if hasattr(e, 'message'):
            print(e.message)
        return e

    return "{}{}".format(Config.S3_LOCATION, file.filename)


def validation_errors_to_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


def within_length_limit(form, field):
    """Check if the input is below the max length limit allowed."""
    value = field.data
    if len(value) > 250:
        raise ValidationError("Max length of titles is 250 characters.")


def get_and_normalize_all_data_for_user(current_user):
    """
    Get all a user's data to set-up their frontend store, including chronicles,
    tales, threads, choices, characters, etc., then normalize into dictionaries.
    """
    # Query all a user's chronicles
    user = User.query.options(
        db.joinedload(User.pcs),
        db.joinedload(User.assets),
        db.joinedload(User.meters),
        db.joinedload(User.statuses),

        db.joinedload(User.entities), \
        #   .joinedload(Entity.assets), \
        # db.joinedload(User.entities) \
        #   .joinedload(Entity.meters), \
        # db.joinedload(User.entities) \
        #   .joinedload(Entity.statuses), \
        # db.joinedload(User.entities) \
        #   .joinedload(Entity.slots), \

        db.joinedload(User.chronicles) \
          .joinedload(Chronicle.tales) \
          .joinedload(Tale.threads) \
          .joinedload(Thread.asset_effects), \
        db.joinedload(User.chronicles) \
          .joinedload(Chronicle.tales) \
          .joinedload(Tale.threads) \
          .joinedload(Thread.choices) \
          .joinedload(Choice.asset_locks) \
    ).get(current_user.id)

    # Normalize data before returning
    pcs = {pc.id: pc.to_dict() for pc in user.pcs}
    assets = {a.id: a.to_dict() for a in user.assets}
    statuses = {s.id: s.to_dict() for s in user.statuses}
    meters = {m.id: m.to_dict() for m in user.meters}
    entities = {e.id: e.to_dict() for e in user.entities}
    chronicles = {c.id: c.to_dict() for c in user.chronicles}

    tales = {}
    threads = {}
    choices = {}
    for chronicle in user.chronicles:
        for tale in chronicle.tales:
            tales[tale.id] = tale.to_dict()
            for thread in tale.threads:
                threads[thread.id] = thread.to_dict()
                for choice in thread.choices:
                    choices[choice.id] = choice.to_dict()

    user = normalize_user_data(
        user=current_user,
        pcs=pcs,
        chronicles=chronicles,
        tales=tales,
        threads=threads,
        choices=choices,
        entities=entities,
        assets=assets,
        statuses=statuses,
        meters=meters,)

    print("\n\nUSER, CHRONICLES, TALES, THREADS, CHOICES")
    # pprint(user)
    # pprint(chronicles)
    # pprint(tales)
    # pprint(threads)
    # pprint(choices)
    return user, pcs, chronicles, tales, threads, choices, entities, assets, statuses, meters


def normalize_user_data(
    user,
    pcs={},
    chronicles={},
    tales={},
    threads={},
    choices={},
    entities={},
    assets={},
    statuses={},
    meters={}
):
    """Return dict suitable for dispatching as user reducer initial state."""
    norm_user = user.to_dict()
    norm_user["pc_ids"] = tuple(pcs.keys())
    norm_user["chronicle_ids"] = tuple(chronicles.keys())
    norm_user["tale_ids"] = tuple(tales.keys())
    norm_user["thread_ids"] = tuple(threads.keys())
    norm_user["choice_ids"] = tuple(choices.keys())
    norm_user["entity_ids"] = tuple(entities.keys())
    norm_user["asset_ids"] = tuple(assets.keys())
    norm_user["status_ids"] = tuple(statuses.keys())
    norm_user["meter_ids"] = tuple(meters.keys())
    # norm_user["lock_ids"] = tuple(locks.keys())
    # norm_user["effect_ids"] = tuple(effects.keys())
    print("\n\n NORM USER")
    # pprint(norm_user)
    return norm_user


def createChoicesFromString(choices_string, thread):
    """
    Convert json data into new thread_choice records in the database,
    then return a dictionary compilation of the choices.
    """
    # Create choices that new thread connects to
    choices_dict = {}
    choices = json.loads(choices_string)
    print(choices, choices_string)
    for choice in choices:
        # TODO Check if 'choices' is object so as to grab alt title.
        thread_choice = Choice(
            title=" ".join(choice.split(" ")[1:]),
            prev_thread=thread,
            next_thread_id=int(choice.split(" ")[0]),
        )
        db.session.add(thread_choice)
        db.session.commit()
        choices_dict[thread_choice.id] = thread_choice.to_dict()
    return choices_dict

def createChoices(choices_data, thread):
    """
    Convert json data into new thread_choice records in the database,
    then return a dictionary compilation of the choices.
    """
    # Create choices that new thread connects to
    choices = {}
    for choice in choices_data:
        # TODO Check if 'choices' is object so as to grab alt title.
        thread_choice = Choice(
            title=choice["title"],
            description=choice["description"],
            prev_thread=thread,
            next_thread_id=choice["next_thread_id"],
            color=choice["color"],
            icon=choice["icon"],
            image=choice["image"],
        )
        db.session.add(thread_choice)
        db.session.commit()
        choices[thread_choice.id] = thread_choice.to_dict()
    return choices


def createEffects(effects_data, thread):
    """
    Convert json data into new effect records in the database,
    then return a dictionary compilation of the effects.
    """
    # Create effects that new thread connects to
    effects = {}
    for effect_data in effects_data:
        # TODO Check if 'effects' is object so as to grab alt title.
        effect = AssetEffect(
            title=effect_data["title"],
            thread=thread,
            type=effect_data["type"],
            color=effect_data["color"],
            icon=effect_data["icon"],
            image=effect_data["image"],
            asset_id=effect_data["asset"],
            quantity=effect_data["quantity"],
        )
        db.session.add(effect)
        db.session.commit()
        effects[effect.id] = effect.to_dict()
    return effect


def createLocks(locks_data, thread):
    """
    Convert json data into new lock records in the database,
    then return a dictionary compilation of the locks.
    """
    # Create locks that new thread connects to
    locks = {}
    for lock_data in locks_data:
        # TODO Check if 'choices' is object so as to grab alt title.
        lock = Lock(
            title=lock_data["title"],
            type=lock_data["type"],
            choice_id=lock_data["choice_id"],
            color=lock_data["color"],
            icon=lock_data["icon"],
            image=lock_data["image"],
            asset_id=lock_data["asset_id"],
            quantity=lock_data["quantity"],
        )
        db.session.add(fin_lock)
        db.session.commit()
        locks[lock.id] = lock.to_dict()
    return locks


color_choices = [
    "rgb(70,60,70)",
    "#f9fbefff",
    "#e05265ff",
    "#f78464ff",
    "#f0bc62ff",
    "#ffdf7eff",
    "#8cb15eff",
    "#1b9d8eff",
    "#5a70ccff",
    "#2e5a9cff",
    "#4f4686ff",
    "#964a70ff",
    "#885c58ff",
    "#5c2f2fff",
    "#2f2032ff",
    "#57768aff",
]

icon_choices = [
    "book",
    "scroll",
    "feather-alt",
    "map-signs",
      "unlock-alt",
      "theater-masks",
      "user-circle",
      "sign",
      "apple-alt",
      "heartbeat",
      "sliders-h",
      "american-sign-language-interpreting",
      "assistive-listening-systems",
      "baby",
      "chalkboard-teacher",
      "child",
      "deaf",
      "female",
      "wheelchair",
      "fist-raised",
      "user",
      "user-astronaut",
      "user-clock",
      "user-cog",
      "user-edit",
      "user-friends",
      "user-graduate",
      "user-injured",
      "user-lock",
      "user-md",
      "user-ninja",
      "user-nurse",
      "users",
      "user-secret",
      "user-shield",
      "user-tie",
      "male",
      "meteor",
      "icicles",
      "fire",
      "leaf",
      "cannabis",
      "tree",
      "seedling",
      "bacteria",
      "bacterium",
      "bug",
      "cat",
      "crow",
      "disease",
      "dog",
      "dove",
      "dragon",
      "fish",
      "frog",
      "ghost",
      "hippo",
      "spider",
      "robot",
      "paw",
      "otter",
      "kiwi-bird",
      "holly-berry",
      "horse",
      "bacon",
      "beer",
      "birthday-cake",
      "bread-slice",
      "candy-cane",
      "carrot",
      "cheese",
      "cocktail",
      "coffee",
      "cookie",
      "cookie-bite",
      "drumstick-bite",
      "egg ",
      "glass-cheers",
      "glass-martini-alt",
      "glass-whiskey",
      "lemon",
      "pizza-slice",
      "utensils",
      "wine-bottle",
      "pepper-hot",
      "mug-hot",
      "hotdog",
      "hamburger",
      "ice-cream",
      "home",
      "archway",
      "building",
      "broadcast-tower",
      "campground",
      "church",
      "city",
      "clinic-medical",
      "door-closed",
      "door-open",
      "dungeon",
      "gopuram",
      "torii-gate",
      "umbrella-beach",
      "university",
      "school",
      "road",
      "restroom",
      "store",
      "store-alt",
      "person-booth",
      "hospital",
      "hospital-alt",
      "hotel",
      "house-damage",
      "igloo",
      "industry",
      "place-of-worship",
      "landmark",
      "swimming-pool",
      "synagogue",
      "vihara",
      "warehouse",
      "mosque",
      "monument",
      "mountain",
      "ambulance",
      "bicycle",
      "bus",
      "bus-alt",
      "car",
      "car-alt",
      "caravan",
      "car-crash",
      "car-side",
      "fighter-jet",
      "taxi",
      "traffic-light",
      "train",
      "tram",
      "truck",
      "truck-loading",
      "truck-monster",
      "truck-pickup",
      "plane",
      "sleigh",
      "space-shuttle",
      "ship",
      "shuttle-van",
      "rocket",
      "motorcycle",
      "helicopter",
      "band-aid",
      "brain",
      "capsules",
      "diagnoses",
      "eye",
      "book-medical",
      "book-dead",
      "file-medical",
      "file-medical-alt",
      "first-aid",
      "thermometer",
      "hand-sparkles",
      "hands-wash",
      "tooth",
      "virus",
      "viruses",
      "virus-slash",
      "x-ray",
      "stethoscope",
      "syringe",
      "skull",
      "tablets",
      "skull-crossbones",
      "smoking",
      "smoking-ban",
      "soap",
      "pills",
      "prescription-bottle",
      "prescription-bottle-alt",
      "medkit",
      "lungs",
      "lungs-virus",
      "head-side-cough",
      "head-side-virus",
      "briefcase-medical",
      "satellite",
      "satellite-dish",
      "sim-card",
      "microscope",
      "solar-panel",
      "microphone-alt",
      "mobile-alt",
      "mouse-pointer",
      "laptop",
      "lightbulb",
      "tv",
      "atom",
      "blender",
      "compact-disc",
      "database",
      "desktop",
      "mouse",
      "keyboard",
      "camera",
      "gamepad",
      "save",
      "tv",
      "film",
      "calculator",
      "eraser",
      "id-card",
      "icicles",
      "meteor",
      "link",
      "life-ring",
      "magnet",
      "map-pin",
      "medal",
      "map",
      "oil-can",
      "newspaper",
      "music",
      "quran",
      "stamp",
      "tint",
      "ticketalt",
      "thumbtack",
      "toolbox",
      "trophy",
      "unlock",
      "address-book",
      "address-card",
      "anchor",
      "air-freshener",
      "archive",
      "atlas",
      "award",
      "balance-scale",
      "balance-scale-left",
      "balance-scale-right",
      "bell",
      "bible",
      "bomb",
      "bone",
      "bong",
      "book-open",
      "box",
      "boxes",
      "box-open",
      "box-tissue",
      "briefcase",
      "bullseye",
      "burn",
      "clipboard-list",
      "cog",
      "cogs",
      "file-alt",
      "file-contract",
      "file-invoice",
      "file-invoice-dollar",
      "file-signature",
      "fire",
      "fire-alt",
      "flag",
      "flask",
      "folder",
      "folder-open",
      "gas-pump",
      "gem",
      "gift",
      "gifts",
      "wind",
      "poop",
      "image",
      "angle-double-down",
      "angle-double-left",
      "angle-double-right",
      "angle-double-up",
      "angle-down",
      "angle-left",
      "angle-right",
      "angle-up",
      "arrow-alt-circle-down",
      "arrow-alt-circle-left",
      "arrow-alt-circle-right",
      "arrow-alt-circle-up",
      "arrow-down",
      "arrow-left",
      "arrow-right",
      "arrow-up",
      "arrows-alt",
      "arrows-alt-h",
      "arrows-alt-v",
      "compress-alt",
      "compress-arrows-alt",
      "directions",
      "exchange-alt",
      "expand-alt",
      "expand-arrows-alt",
      "external-link-alt",
      "external-link-square-alt",
      "random",
      "retweet",
      "redo",
      "reply",
      "route",
      "shoe-prints",
      "road",
      "map",
      "crown",
      "glasses",
      "graduation-cap",
      "hard-hat",
      "hat-cowboy",
      "hat-wizard",
      "headphones",
      "headset",
      "head-side-mask",
      "tshirt",
      "socks",
      "mask",
      "mitten",
      "comment",
      "comment-alt",
      "comment-dollar",
      "comment-dots",
      "comment-medical",
      "comments",
      "comments-dollar",
      "comment-slash",
      "comment",
      "comment",
      "envelope",
      "envelope-open",
      "envelope-open-text",
      "envelope-square",
      "fax",
      "vial",
      "vials",
      "video",
      "sms",
      "braille",
      "sign-language",
      "phone",
      "mail-bulk",
      "hands-helping",
      "handshake",
      "hand-holding",
      "hand-holding-heart",
      "hand-holding-medical",
      "hand-holding-usd",
      "hand-holding-water",
      "hand-peace",
      "hand-paper",
      "hand-rock",
      "hand-scissors",
      "hand-middle-finger",
      "hand-pointer",
      "hand-point-down",
      "hand-point-left",
      "hand-point-right",
      "hand-point-up",
      "baby-carriage",
      "bath",
      "bed",
      "chair",
      "chalkboard",
      "couch",
      "faucet",
      "sink",
      "shower",
      "hot-tub",
      "toilet",
      "toilet-paper",
      "trash",
      "trash-alt",
      "cart-plus",
      "cash-register",
      "coins",
      "credit-card",
      "donate",
      "store",
      "store-alt",
      "store-slash",
      "store-alt-slash",
      "wallet",
      "shopping-basket",
      "shopping-cart",
      "piggy-bank",
      "money-check",
      "money-check-alt",
      "money-bill-wave",
      "dollar-sign",
      "euro-sign",
      "yen-sign",
      "won-sign",
      "ruble-sign",
      "rupee-sign",
      "concierge-bell",
      "compass",
      "dice",
      "dice-d20",
      "eraser",
      "fire-extinguisher",
      "fan",
      "feather",
      "bowling-ball",
      "key",
      "marker",
      "highlighter",
      "broom",
      "brush",
      "binoculars",
      "bullhorn",
      "crutch",
      "cut",
      "drafting-compass",
      "gavel",
      "guitar",
      "hammer",
      "umbrella",
      "wrench",
      "shield-alt",
      "search",
      "screwdriver",
      "pen",
      "pen-alt",
      "pen-fancy",
      "ruler",
      "brush",
      "paint-roller",
      "paint-brush",
      "palette",
      "mortar-pestle",
      "magic",
      "dumbbell",
      "football-ball",
      "futbol",
      "baseball-ball",
      "volleyball-ball",
      "basketball-ball",
      "biking",
      "blind",
      "book-reader",
      "chess",
      "golf-ball",
      "hockey-puck",
      "walking",
      "swimmer",
      "skating",
      "skiing",
      "snowboarding",
      "running",
      "table-tennis",
      "pray",
      "hiking",
      "praying-hands",
      "history",
      "calendar",
      "calendar-alt",
      "calendar-check",
      "calendar-times",
      "clock",
      "hourglass",
      "hourglass-end",
      "hourglass-half",
      "hourglass-start",
      "bolt",
      "cloud",
      "cloud-moon",
      "cloud-moon-rain",
      "cloud-rain ",
      "cloud-showers-heavy",
      "cloud-sun",
      "cloud-sun-rain",
      "stopwatch",
      "sun",
      "snowman",
      "smog",
      "moon",
      "star-and-crescent",
      "thermometer-empty",
      "thermometer-full",
      "thermometer-half",
      "snowflake",
      "signal",
      "spa",
      "adjust",
      "ankh",
      "asterisk",
      "at",
      "ban",
      "battery-empty",
      "battery-full",
      "battery-half",
      "biohazard",
      "bookmark",
      "border-all",
      "braille",
      "certificate",
      "check",
      "check-circle",
      "check-double",
      "chess-bishop",
      "chess-king",
      "chess-knight",
      "chess-pawn",
      "chess-queen",
      "chess-rook",
      "circle",
      "code",
      "code-branch",
      "cube",
      "cross",
      "crosshairs",
      "dharmachakra",
      "divide",
      "dna",
      "eye-slash",
      "filter",
      "fingerprint",
      "font",
      "globe",
      "globe-africa",
      "globe-americas",
      "globe-asia",
      "globe-europe",
      "star",
      "signature",
      "thumbs-up",
      "thumbs-down",
      "shapes",
      "recycle",
      "heart",
      "heart-broken",
      "infinity",
      "icons",
      "info",
      "info-circle",
      "exclamation",
      "exclamation-circle",
      "exclamation-triangle",
      "question",
      "question-circle",
      "angry",
      "dizzy",
      "flushed",
      "frown",
      "frown-open",
      "grimace",
      "grin",
      "grin-alt",
      "grin-beam",
      "grin-beam-sweat",
      "grin-hearts",
      "grin-squint",
      "grin-squint-tears",
      "grin-stars",
      "grin-tongue",
      "grin-wink",
      "sad-cry",
      "sad-tear",
]
