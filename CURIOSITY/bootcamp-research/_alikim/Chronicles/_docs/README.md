
# Iris Isle

## Description
Original Inspiration Reference: 
Fallen London https://www.fallenlondon.com/
Twine: https://twinery.org/

A text-adventure game creator that allows users to build text-based games via
sequentially connected and branching written 'story threads', creating and
manipulating 'entities' like characters and places, and manipulating their
'state' via effects and 'choices' via 'locks'. 

## Technologies
* JavaScript
* Python 3
* PostgreSQL
* Flask
* SqlAlchemy
* Alembic
* WTForms/Flask-WTF
* React
* HTML/CSS/Sass
* Visual Studio Code

### React Components
* beautiful-react-diagrams
* react-quill


## Feature List
### MVP Features
* User accounts - signup, signin, signout
* CRUD: Chronicles, Tales, Threads
* Threads can have branching 'choice threads' to choose from.
* Content can be viewed in short-summary-card galleries.
* Game gallery page displaying user Chronicles that players can join
* A Tale's Threads can be viewed in chronological galleries showing Choices.
* User can press 'play' to be start a Tale in play-mode.
* User can click the connected Choices to continue the Tale.
* User can click a 'back' button during gameplay.
* Use can format their content with react-quill markdown/GUI options.

### Stretch Goal Feature: Effects and Locks
* Choices can be 'locked' with various requirements (mvp: assets).
* Threads can cause 'effects' that change the state of various things (mvp: assets)
* Characters are 'auto-generated' with an inventory/state upon starting a Chronicle.
* Character state is effected by Threads and effects the state of Locks.
* Locks can deplete Assets and Effects can bestow Assets.
* MAJOR: Character, Asset, Place CRUD
* MAJOR: Condition, Meter CRUD

### Stretch Goals: Miscellaneous
* Theme modes (dark, light)
* Color/icon select menus - grid-like box selector component
* User-image upload for Chronicles, Tales, etc.
* Tag system for genres, warnings, etc.
* Hover effect for nodes/links - show details hoverbox
* Toggle-option to 'allow go-back', default yes
* Toggle-option for 'show when locked', default yes
* Ending-thread setting option
* Note-scratchpad
* Select/transfer multiple
* Expand/collapse option for GUI
* Public/private mode for user pages, chronicles, tales, etc.
* Macros to allow choices, links to character/place/etc. or hover info, within Threads.
* Randomization options
* Tales can be put in chronological order 

### Stretch Goals: Major Features
* Player can create a playable character upon starting a Chronicle, see its state in library, etc.
* Chronicle page component for player-facing mode: displays summary, player's character/state, available tales, bulletin, (maybe comment/message system), started tales, map, etc.
* Input options for game-creators (example: pets/companions)
* Library of joined Chronicles, Bookmarked Tales, character and state saved for the user upon every choice.
* Navigatable visual map and location system. Players can change location state, based on accessibility, or be moved by story effects.
* Time-based and IRL-time-based system
* Gallery discovery page options: latest, random, followed, by tag/genre, popular, trending



## Models & Schema
* users
* chronicles
* entities (characters, assets, places, conditions, ranks)
* bearer_assets
* meters (knowledge, skills, abilities, levels, size, etc.)
* entity_meters
* modifiers 
* tales
* threads
* thread_choices 
* effects 
* locks 
* player_characters (join)
<!-- * tags -->

> **NOTE** Join tables!

### users
| COLUMN     | CONSTRAINTS                                 |
|------------|---------------------------------------------|
| id         | SERIAL, PK                                  |
| username   | varchar(50), not null, unique               |
| email      | varchar(250), not null, unique              |
| hashword   | varchar(250), not null                      |
| created_at | datetime, not null, default(datetime.now()) |

### chronicles
| COLUMN      | CONSTRAINTS                                          |
|-------------|------------------------------------------------------|
| id          | SERIAL, PK                                           |
| user_id     | integer, FK(users.id)                                |
| title       | varchar(250), not null, default("Untitled")          |
| description | varchar                                              |
| color       | varchar(50), not null, default("gray")               |
| image       | varchar(250), not null, default("default_chronicle") |
| created_at  | datetime, not null, default(datetime.now())          |

### entities (characters, places, assets, conditions)
| COLUMN       | CONSTRAINTS                                       |
|--------------|---------------------------------------------------|
| id           | SERIAL, PK                                        |
| chronicle_id | integer, FK(chronicles.id)                        |
| title        | varchar(250), not null, default("Untitled")       |
| description  | varchar                                           |
| color        | varchar(50), not null, default("gray")            |
| image        | varchar(250), not null, default("default_entity") |
| type         | enum("character", "asset", "place", "condition")  |
| subtype      | enum("item", "bond", "deed", "title", "idea", "shop", "skill", "knowledge", "..."), not null | 
| is_unique    | boolean, not null, default(true)                  |
| created_at   | datetime, not null, default(datetime.now())       |
> **NOTE** Consider that subtype can have custom types for user-creator, like "royalty", "officer", "hostile", "dragon-related"

### tales
| COLUMN          | CONSTRAINTS                                     |
|-----------------|-------------------------------------------------|
| id              | SERIAL, PK                                      |
| chronicle_id    | integer, FK(chronicles.id)                      |
| title           | varchar(250), not null, default("Untitled")     |
| description     | varchar                                         |
| color           | varchar(50), not null, default("gray")          |
| image           | varchar(250), not null, default("default_tale") |
| first_thread_id | integer                                         |
| created_at      | datetime, not null, default(datetime.now())     |

### threads
| COLUMN      | CONSTRAINTS                                       |
|-------------|---------------------------------------------------|
| id          | SERIAL, PK                                        |
| tale_id     | integer, FK(tales.id)                             |
| title       | varchar(250), not null, default("Untitled")       |
| description | varchar                                           |
| color       | varchar(50), not null, default("gray")            |
| image       | varchar(250), not null, default("default_thread") |
| x           | integer, not null, default(0)                     |
| y           | integer, not null, default(0)                     |
| created_at  | datetime, not null, default(datetime.now())       |

### thread_choices
| COLUMN            | CONSTRAINTS                                       |
|-------------------|---------------------------------------------------|
| id                | SERIAL, PK                                        |
| current_thread_id | integer, FK(threads.id)                           |
| choice_thread_id  | integer, FK(threads.id)                           |
| title             | varchar(250), not null                            |
| color             | varchar(50), not null, default("gray")            |
| image             | varchar(250), not null, default("default_choice") |
| created_at        | datetime, not null, default(datetime.now())       |
> **NOTE** Thread Choice defaults to \`Go to: ${self.choice_thread.title}\`

### effects (parent to asset_effects... place_effects, condition_effects, meter_effects)
| COLUMN     | CONSTRAINTS                                       |
|------------|---------------------------------------------------|
| id         | SERIAL, PK                                        |
| thread_id  | integer, FK(threads.id)                           |
| color      | varchar(50), not null, default("gray")            |
| image      | varchar(250), not null, default("default_thread") |
| type       | enum("asset", "location", "time", "condition", "meter"), not null, default("asset") |
| created_at | datetime, not null, default(datetime.now())       |

### asset_effects
| COLUMN    | CONSTRAINTS                                       |
|-----------|---------------------------------------------------|
| id        | SERIAL, PK                                        |
| effect_id | integer, FK(effects.id), not null                 |
| asset_id  | integer, FK(assets.id), not null                  |
| quantity  | integer, not null, default(1)                     |
| is_gained | boolean, not null, default(true)                  |

### locks (parent to asset_locks... place_locks, time_locks, attire_locks, condition_locks, meter_locks)
| COLUMN     | CONSTRAINTS                                       |
|------------|---------------------------------------------------|
| id         | SERIAL, PK                                        |
| choice_id  | integer, FK(thread_choices.id)                    |
| color      | varchar(50), not null, default("gray")            |
| image      | varchar(250), not null, default("default_thread") |
| type       | enum("asset", "location", "time", "attire", "condition", "trial") |
| created_at | datetime, not null, default(datetime.now())       |

### asset_locks
| COLUMN    | CONSTRAINTS                                            |
|-----------|--------------------------------------------------------|
| id        | SERIAL, PK                                             |
| lock_id   | integer, FK(locks.id), not null                        |
| entity_id | integer, FK(entities.id), not null                     |
| quantity  | integer, not null, default(1)                          |
| type      | enum("price", "proof", "prohibited"), not null, default("price") |

### meters
| COLUMN       | CONSTRAINTS                                       |
|--------------|---------------------------------------------------|
| id           | SERIAL, PK                                        |
| chronicle_id | integer, FK(chronicles.id)                        |
| title        | varchar(250), not null, default("Untitled")       |
| description  | varchar                                           |
| color        | varchar(50), not null, default("gray")            |
| image        | varchar(250), not null, default("default_entity") |
| type         | varchar(50), not null, default=("level")          |
| min          | integer, not null, default(0)                     |
| max          | integer, not null, default(20)                    |
| mod          | integer, not null, default(1)                     |
| base         | integer, not null, default(1)                     |
| algorithm    | enum("constant", "log", "linear", "loglinear", "polynomial", "exponential", "factorial", "random"), not null, default("constant") |
| created_at   | datetime, not null, default(datetime.now())       |

### bearer_assets
| COLUMN       | CONSTRAINTS                                 |
|--------------|---------------------------------------------|
| id           | SERIAL, PK                                  |
| bearer_id    | integer, FK(entities.id), not null          |
| asset_id     | integer, FK(entities.id), not null          |
| quantity     | integer, not null, default=1                |
| created_at   | datetime, not null, default(datetime.now()) |

### entity_meters
| COLUMN    | CONSTRAINTS                        |
|-----------|------------------------------------|
| id        | SERIAL, PK                         |
| entity_id | integer, FK(entities.id), not null |
| meter_id  | integer, FK(meters.id), not null   |
| progress  | integer, not null, default(0)      |
| total     | integer, not null, default(0)      |

### modifiers
| COLUMN    | CONSTRAINTS                        |
|-----------|------------------------------------|
| id        | SERIAL, PK                         |
| entity_id | integer, FK(entities.id), not null |
| meter_id  | integer, FK(meters.id), not null   |
| mod       | integer, not null, default(1)      |
> **NOTE** Modifier will be treated as percentage if float number.

### player_characters (pure join)
| COLUMN    | CONSTRAINTS              |
|-----------|--------------------------|
| id        | SERIAL, PK               |
| user_id   | integer, FK(users.id)    |
| entity_id | integer, FK(entities.id) |



## Routes
### Backend Routes
* `/auth`
* `/users`
* `/chronicles`
* `/entities`
* `/tales`
* `/threads`
* `/choices`
* `/effects`
* `/locks`

#### `/auth`
| METHOD | ROUTE           | EFFECT |
|--------|-----------------|--------|
| GET    | `/`             | Authenticates user, returns user dict |
| GET    | `/login`        | Logs user in, returns user dict and all user chronicles/tales/threads/choices... |
| GET    | `/logout`       | Logs user out |
| POST   | `/signup`       | Creates new user and their first chronicle->tale->thread, then logs them in |
| GET    | `/unauthorized` | Returns 'unauthorized' JSON error when flask-login auth fails |
> **NOTE** May want to create second option, or revert option, for /signup for users who just want to play, not make

#### `/users`
| METHOD | ROUTE                          | EFFECT                     |
|--------|--------------------------------|----------------------------|
| GET    | `/`                            | Returns list of user dicts |
| GET    | `/<int:uid>`                   | Returns a user's dict      |
| GET    | `/<int:uid>/library`           | Returns chronicles joined by a user |
| GET    | `/<int:uid>/library/<int:cid>` | Returns user's game data for a joined chronicle |
> **NOTE** This may be the place to effect game state for players

#### `/chronicles`
| METHOD | ROUTE                                      | EFFECT |
|--------|-------------------------------------------|--------|
| GET    | `/<order>/<int:limit>` | Return chronicles, ordered by 'order' type, limit count to 'limit' |
| GET    | `/creators/<int:uid>`                     | Return chronicles by creator |
| GET    | `/<int:cid>`                              | Return a chronicle and all its direct dependents |
| GET    | `/<int:cid>/players`                      | Return the users and their characters that have joined a chronicles |
| GET    | `/<int:cid>/players/<int:uid>`            | Return game state details of a player for a chronicle |
| GET    | `/<int:cid>/entities/<str:type>`          | Return entities of 'type' belonging to a chronicle |
<!-- | GET    | `/tags/<int:tag>/limit/<int:limit>`       | Return random articles of 'tag' type, limit amount to 'limit' | -->
| POST   | `/create`                                 | Create new chronicle |
| PATCH  | `/<int:cid>/edit`                         | Edit chronicle details |
| DELETE | `/<int:cid>/delete`                       | Delete chronicle and all dependents |
| POST   | `/<int:cid>/tales/create`                 | Create a new tale belonging to chronicle, return tale dict |
| POST   | `/<int:cid>/entities/create`              | Create a new entity belonging to a chronicle, return entity dict |
| POST   | `/<int:cid>/conditions/create`            | Create a new condition belonging to chronicle, return condition dict |
| POST   | `/<int:cid>/meters/create`                 | Create a new meter belonging to chronicle, return meter dict |
> **NOTE** On create, auto-generate first tale and thread too?
> **NOTE** Perhaps have conditions/meters categorized by entity type?
> **NOTE** Chronicles can be public/private, active/archived/complete, playable to all or just account-holders?
> **NOTE** order-by: newest, updated, discovered, complete, popular, trending, followed, alphabetical, wordcount
> **NOTE** Can fragments/queries/something be used for lists, like tags?

#### `/entities`
| METHOD | ROUTE                      | EFFECT |
|--------|----------------------------|--------|
| PATCH  | `/<int:eid>/edit`          | Edit entity and entity-owned details, return dicts |
| DELETE | `/<int:eid>/delete`        | Delete entity and its dependents |
| POST   | `/<int:eid>/assets/create` | Create a new bearer asset associated to the entity. |
| GET    | `/<int:eid>`               | Get all details for an entity |
> **NOTE** Not sure on details yet. Essentially, CRUD on entity-owned properties

#### `/tales`
| METHOD | ROUTE                       | EFFECT |
|--------|-----------------------------|--------|
| GET    | `/<int:tid>`                | Return tale and all its dependents |
| PATCH  | `/<int:tid>/edit`           | Edit tale details              |
| DELETE | `/<int:tid>/delete`         | Delete tale and its dependents |
| POST   | `/<int:tid>/threads/create` | Create a thread and thread choices/effects/locks, belonging to tale, return dicts of all three |

#### `/threads`
| METHOD | ROUTE                         | EFFECT |
|--------|------------------------------|--------|
| GET    | `/<int:thid>`                | Return thread and all its dependents |
| PATCH  | `/<int:thid>/edit`           | Edit thread details and thread choices/effects/locks, return dicts of all |
| DELETE | `/<int:thid>/delete`         | Delete thread and its dependents |
| POST   | `/<int:thid>/choices/create` | Create choice and choice locks belonging to thread, return choice/lock dicts |
| POST   | `/<int:thid>/effects/create` | Creat effect belonging to thread, return effect dict |

#### `/choices`
| METHOD | ROUTE                     | EFFECT |
|--------|--------------------------|--------|
| GET    | `/<int:chid>`            | Return choice and all its locks |
| PATCH  | `/<int:chid>/edit`       | Edit choice and choice lock details, return choice/lock dicts |
| DELETE | `/<int:chid>/delete`     | Delete choice and dependents |
| POST   | `/<int:id>/locks/create` | Create lock belonging to choice, return lock dict |

#### `/effects`
| METHOD | ROUTE | EFFECT |
|--------|------|--------|
| PATCH  | `/<int:efid>/edit`   | Edit effect details, return effect dict |
| DELETE | `/<int:efid>/delete` | Delete effect belonging to thread       |

#### `/locks`
| METHOD | ROUTE | EFFECT |
|--------|------|--------|
| PATCH  | `/<int:loid>/edit`   | Edit lock details, return lock dict |
| DELETE | `/<int:loid>/delete` | Delete lock belonging to choice     |


### Frontend Routes
* `/`
* `/gallery`
* `/chronicles`
* `/worldweaver`

#### `/`
| METHOD | ROUTE | COMPONENT   |
|--------|-------|-------------|
| GET    | `/`           | Splash login/signup + gallery / Home |
| GET    | `/login`      | login page    |
| GET    | `/sign-up`    | signup page   |
| GET    | `/users`      | List of users |
| GET    | `/users/:uid` | User profile page, includes their creations / chronicles joined |
| GET    | `/library`    | Gallery of joined Chronicles for a user |
| GET    | `/contact`    | My contact info/about |
| GET    | `/faq`        | How to make, how to play, etc. |

#### `/gallery
| METHOD | ROUTE | COMPONENT   |
|--------|-------|-------------|
| GET    | `/`   | Home gallery of published Chronicles users can play |

#### `/chronicles`
| GET    | `/:cid/welcome`         | Chronicle's splash page for new players |
| GET    | `/:cid/play`            | Player's dashboard showing game/character status, available tales, etc. |
| GET    | `/:cid/profile`         | Character details, location, tales finished/started/available |
| GET    | `/:cid/inventory`       |  |
| GET    | `/:cid/map`             |  |
| GET    | `/:cid/tales`           | List of available tales to continue or start |
| GET    | `/:cid/tales/:tid`      | Tale 'start' page |
| GET    | `/:cid/tales/:tid/play` | Tale play mode, dynamically changes according to player actions |
| GET    | `/:cid/settings`        |  |

#### `/worldweaver`
| METHOD | ROUTE                          | COMPONENT   |
|--------|--------------------------------|-------------|
| GET    | `/`                            | Chronicle creation, explanations |
| GET    | `/:cid`                        | Chronicle summary, content lists (collapsible, tabs...), CRUD options |
| GET    | `/:cid/tales`                  | List of created tales sorted by status (wip, complete, private/public) |
| GET    | `/:cid/tales/:tid/talespinner` | TaleSpinner |
| GET    | `/:cid/characters`             |  |
| GET    | `/:cid/characters/:id`         |  |
| GET    | `/:cid/places`                 |  |
| GET    | `/:cid/assets`                 |  |
| GET    | `/:cid/conditions`             |  |
| GET    | `/:cid/meters`                  |  |
| GET    | `/:cid/info`                   |  |
| GET    | `/:cid/players`                |  |



## Wireframes, Templates, Components, Styling
### Theme & Style Ideas (scratchpad)
* Clean, minimal, expressionless - allow creators to impose their flavor to the content
* 1-2 color icons, svgs, outlines, etc.
* Generic pre-made assets to choose from for all options, convenience-focused
* Simple theme options - think love nikki frames
* Background can be customized to change based on LOCATION, TIME, CHRONICLE/TALE/THREAD - layer logic to prioritize?
* Big-stretch-idea-only: Dialogue, character portraits and speech bubble presentation

### Wireframe Thumbnails
* Splash - signup/login, elevator pitch, random/popular gallery ribbon/carousel, full explanation, tag-based gallery board
* Gallery - Public gallery of playable chronicles, various sorting algorithms/spotlights, explanation of play-rules and anon/account holder
* Chronicle Splash - Chronicle's public page for players - summary, join option, announcements, tales/etc./full content after join, comments
* Tale Splash - Tale's public page for players - summary, start option, locks if applicable
* Play Mode - Dynamic page content and effects based on player's game state
* Library - Gallery of player's joined chronicles
* WorldWeaver - CRUD for Chronicles, navigation to Chronicle 'creator' pages
* Chronicle Creator - link for public page, CRUD for Chronicle elements, gallery of contents, separated by tabs/accordians, ideally sortable
* TaleSpinner - Gallery and CRUD for a chronicle's tales navigation to individual tale charts
* TaleSpinner Web - Node chart plus text list and forms for a single tale
* Forms - Generic, AddToList, Edit list items, 
* Contact
* Help

## User Story
Splash explains concept for players and creators, geared toward creators.

Gallery explains concept again briefly with link to learn more, geared towards
potential players.

Click on interesting Chronicle, get taken to Chronicle intro page. Option to 
'start' with explanation that joining is optional is prominant. Save data only
to store for now, until user creates account. Ideally, perhaps to local storage
or something a pinch more long-term than a refresh.

User creates their first character via an 'entry tale', then can go back to the
chronicle 'hub page' to see further tale options to continue. Should be able to
work so that creators who only want one sequential tale can have this work fine
for them too.

Have a sign-up or login option always visibly available for players, make clear
that their status will be saved with it.

With account creation, show saved content and welcome message, the relevant page
for the saved content if after startingh a chronicle first.

For true fresh accounts, show message and gallery page perhaps.

Have clear distinction between creator portal with worldweaver and player portal
with access to library and current state.

Ideal: A manual tutorial system built into the first auto-generated chronicle for potential creators
Ideal: A pre-made sample for creators to learn from


## Required Seeder Data
### users
* creator demo
* player demo

### chronicles
* Fully built game
* Default starter for newbies crafting their first
* places: overworld, beginning room, red room, blue room, joined room
* characters: fairy, player
* assets: candy, red key
* conditions: angry, sad, happy
* meters: affection
* fairy: place joined room, asset ball, condition angry, meter affection 50
* red room: asset 5 candies
* blue room: asset 1 red key

### tales, threads, choices, locks, effects
* MVP one tale, starter, the doors and the fairy sample
* locks: red room locked, give fairy candy
* effect: get candy, get red key, fairy happy, fairy sad, fairy affection +-, get ball
