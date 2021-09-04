# Models

## Users

| Column      | Type      | Validations               |
| ----------- | --------- | ------------------------- |
| id          | int       | PK, auto, notNull, unique |
| username    | varchar   | notNull, unique           |
| email       | varchar   | notNull, unique           |
| password    | varchar   | notNull                   |
| profile_url | varchar   |                           |
| is_artist   | boolean   | notNull                   |
| created_at  | timestamp | notNull                   |

**Associations**

```js
const columnMapping = {
  through: "user_followers", // This is the model name referencing the join table.
  otherKey: "follower_id",
  foreignKey: "user_id",
};
```

- A `User` belongsToMany (models.Users, columnMapping)
- A `User` hasMany Albums
- A `User` hasMany Playlists
- A `User` hasMany Comments
- A `User` hasMany Tracks
- A `User` hasMany Comment_Votes
- A `User` hasMany Track_Votes

---

## User_Followers (JOIN)

| Column      | Type | Validations                        |
| ----------- | ---- | ---------------------------------- |
| id          | int  | PK, auto, notNull, unique          |
| user_id     | int  | notNull, FK References: (users.id) |
| follower_id | int  | notNull, FK References: (users.id) |

```js
const columnMapping = {
  through: "user_followers", // This is the model name referencing the join table.
  otherKey: "user_id",
  foreignKey: "follower_id",
};
```

- A `User` belongsToMany (models.Users, columnMapping)

---

## Albums

| Column      | Type      | Validations                        |
| ----------- | --------- | ---------------------------------- |
| id          | int       | PK, auto, notNull, unique          |
| title       | varchar   | notNull                            |
| description | varchar   |                                    |
| album_url   | varchar   |                                    |
| genre_id    | int       | notNull, FK References: (genre.id) |
| user_id     | int       | notNull, FK References: (users.id) |
| created_at  | timestamp | notNull                            |

**Associations**

- An `Album` hasMany Tracks
- An `Album` belongsTo a Genres
- An `Album` belongsTo a Users

---

## Genres

| Column | Type    | Validations               |
| ------ | ------- | ------------------------- |
| id     | int     | PK, auto, notNull, unique |
| title  | varchar | notNull, unique           |

**Associations**

- A `Genre` hasMany Albums

---

## Tracks

| Column     | Type      | Validations                        |
| ---------- | --------- | ---------------------------------- |
| id         | int       | PK, auto, notNull, unique          |
| title      | varchar   | notNull                            |
| duration   | int       | notNull                            |
| album_id   | int       | notNull, FK References: (album.id) |
| created_at | timestamp | notNull                            |

**Associations**

- A `Track` hasMany Comments
- A `Track` belongsTo a User
- A `Track` belongsTo an Albums

---

## Track_Votes

| Column   | Type    | Validations                         |
| -------- | ------- | ----------------------------------- |
| id       | int     | PK, auto, notNull, unique           |
| vote     | boolean |                                     |
| track_id | int     | notNull, FK References: (tracks.id) |
| user_id  | int     | notNull, FK References: (users.id)  |

**Associations**

- A `Track_Vote` belongsTo a User
- A `Track_Vote` belongsTo a Track

---

## Comments

| Column   | Type    | Validations                         |
| -------- | ------- | ----------------------------------- |
| id       | int     | PK, auto, notNull, unique           |
| comment  | varchar | notNull                             |
| track_id | int     | notNull, FK References: (tracks.id) |
| user_id  | int     | notNull, FK References: (users.id)  |

**Associations**

- A `Comment` hasMany Votes
- A `Comment` belongsTo a User
- A `Comment` belongsTo a Track

---

## Comment_Votes

| Column     | Type    | Validations                           |
| ---------- | ------- | ------------------------------------- |
| id         | int     | PK, auto, notNull, unique             |
| vote       | boolean |                                       |
| comment_id | int     | notNull, FK References: (comments.id) |
| user_id    | int     | notNull, FK References: (users.id)    |

**Associations**

- A Comment_Vote belongsTo a User
- A Comment_Vote belongsTo a Comment

---

## PlayLists

| Column      | Type      | Validations                         |
| ----------- | --------- | ----------------------------------- |
| id          | int       | PK, auto, notNull, unique           |
| title       | varchar   | notNull                             |
| description | varchar   |                                     |
| user_id     | int       | notNull, FK References: (users.id)  |
| track_id    | int       | notNull, FK References: (tracks.id) |
| created_at  | timestamp | notNull                             |

**Associations**

```js
const columnMapping = {
  through: "playlist_tracks", // This is the model name referencing the join table.
  otherKey: "track_id",
  foreignKey: "playlist_id",
};
```

- A `Playlist` belongsToMany (models.tracks, columnMapping)
- A `Playlist` belongsTo (models.user)

---

## Playlist_Tracks (JOIN)

| Column      | Type      | Validations                            |
| ----------- | --------- | -------------------------------------- |
| id          | int       | PK, auto, notNull, unique              |
| playlist_id | int       | notNull, FK References: (playlists.id) |
| track_id    | int       | notNull, FK References: (tracks.id)    |
| created_at  | timestamp | notNull                                |
