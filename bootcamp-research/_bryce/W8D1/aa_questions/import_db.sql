PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS question_follows;
DROP TABLE IF EXISTS replies;
DROP TABLE IF EXISTS question_likes;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS users;

CREATE TABLE users (

    id INTEGER PRIMARY KEY,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL

);

CREATE TABLE questions (

    id INTEGER PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    user_id INTEGER NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id)

);

CREATE TABLE question_follows (

    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (question_id) REFERENCES questions(id)

);

CREATE TABLE replies (

    id INTEGER PRIMARY KEY,
    question_id INTEGER NOT NULL,
    parent_reply_id INTEGER,
    user_id INTEGER NOT NULL,
    body TEXT NOT NULL,

    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (parent_reply_id) REFERENCES replies(id),
    FOREIGN KEY (user_id) REFERENCES users(id)

);

CREATE TABLE question_likes (

    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (question_id) REFERENCES questions(id)

);

INSERT INTO
    users (fname, lname)
VALUES
    ("Bryce", "Morgan"),
    ("Ryon", "Stiller"),
    ("Deric", "Stiller");

INSERT INTO
    questions (title, body, user_id)
VALUES
    ("Homework Question", "How are we supposed to format the first question of tonight''s homework? I''m stumped", 1),
    ("Assessment 3", "When is assessment 3?", 2),
    ("SQLite3 on Linux", "Can anyone help with installing SQLite3 on Linux? I can''t seem to get it to work.", 3);

INSERT INTO
    question_follows (user_id, question_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 2),
    (3, 2),
    (3, 1),
    (3, 3);

INSERT INTO
    replies (question_id, parent_reply_id, user_id, body)
VALUES
    (2, NULL, 1, "A03 is scheduled for Monday. Anyone know when the last of the material will be covered for it?"),
    (2, 1, 3, "Tuesday should be the last day for new material for A03."),
    (3, NULL, 2, "Check the SQLite3 section under Materials. There''s a note for Linux there.");

INSERT INTO
    question_likes (user_id, question_id)
VALUES
    ((SELECT id FROM users WHERE fname = "Bryce" AND lname = "Morgan"), 2),
    ((SELECT id FROM users WHERE fname = "Bryce" AND lname = "Morgan"), 3),
    ((SELECT id FROM users WHERE fname = "Ryon" AND lname = "Stiller"), 1),
    ((SELECT id FROM users WHERE fname = "Deric" AND lname = "Stiller"), 2);
