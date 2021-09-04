<div align="center">

# Development of Muse

This section details the technical aspects of this project's development.  
To learn what Muse is, its features, and how to use it, see the [README](../README.md).

**TOC**  
[Technologies](#technologies) ● [Concept](#concept) ● [Models](#models) ● [Routes](#routes) ● [Wireframes](#wireframes) ● [Dev Snapshots](#development-snapshots) ● [Contact](#contact)

</div>

<div align="center">

## Technologies

</div>

- **LANGUAGES** JavaScript, CSS
- **FRONTEND** React, React Router, Redux, MUI
- **BACKEND** Express, Morgan, Csurf, Cookie-Parser, dotenv, Sequelize
- **TOOLS** Docker, Heroku, Visual Studio Code, Redux-logger, nodemon
- **LIBRARIES** react-chart-js-2

<div align="center">

## Concept

</div>

**DESIGN** Minimalistic design catered towards an intuitive, non intrusive and seemless user experience to allow the transfer of skills without distraction.

**COLOR SCHEME** In Future versions, there will be a theme customizer to allow users to take tests in the best visually pleasing way possible. At times this can also boost preformance. For now the theme is catered towards the idea of destressing and a calm lavendar.

<div align="center">

## Models

**TABLES**  
 [Users](#users) | [Typing](#typing) | [Reaction](#reaction)

</div>

The database schema evolved and changed quite a bit continually throughout the process to accommodate new ideas, cleaner pipelines, and future features. A few examples exist of the schemas we drew up during the process, but likely by the time of this reading, the models written here are somehow out of date.

### `users`

| users      | Constraints                                   |
| ---------- | --------------------------------------------- |
| id         | SERIAL, PRIMARY KEY                           |
| username   | VARCHAR(25) NOT NULL, UNIQUE                  |
| email      | VARCHAR(320), NOT NULL, UNIQUE                |
| hashword   | VARCHAR(255) NOT NULL                         |
| created_at | TIMESTAMP, NOT NULL, DEFAULT VALUE=new Date() |

### `Typings`

| columns    | Constraints                                   |
| ---------- | --------------------------------------------- |
| id         | SERIAL, PRIMARY KEY                           |
| speed      | ARRAY(INTEGER), NOT NULL, DEFAULT VALUE=[0]   |
| score      | ARRAY(INTEGER), NOT NULL, DEFAULT VALUE=[0]   |
| time       | ARRAY(FLOAT), NOT NULL, DEFAULT VALUE=[0]     |
| letters    | ARRAY(INTEGER), NOT NULL, DEFAULT VALUE=[0]   |
| words      | ARRAY(INTEGER), NOT NULL, DEFAULT VALUE=[0]   |
| errors     | ARRAY(INTEGER), NOT NULL, DEFAULT VALUE=[0]   |
| user_id    | INTEGER, NOT NULL, references=Users.id        |
| created_at | TIMESTAMP, NOT NULL, DEFAULT VALUE=new Date() |

### `Reactions`

| columns       | Constraints                               |
| ------------- | ----------------------------------------- |
| id            | SERIAL, PRIMARY KEY                       |
| reaction_data | ARRAY(FLOAT), NOT NULL, DEFAULT VALUE=[0] |
| user_id       | INTEGER, NOT NULL, references=Users.id    |

---

<div align="center">

## Contact Me

Thank you for taking a look at Human Specs.
Please feel free to reach out and ask me anything.

</div>

### Aaron Hanson

_(Full-stack developer, Open to work)_

<!-- <a href="./Aaron_Hanson(v2.0).pdf" download>![Resume PDF](https://img.shields.io/badge/-Resume-f00?style=flat-square&logo=adobe-acrobat-reader&logoColor=white)</a> -->

[![Aaron Hanson's email](https://img.shields.io/badge/aaron.hanson.brb@gmail.com-f4b400?style=flat-square&logo=gmail&logoColor=black&link=mailto:aaron.hanson.brb)](mailto:aaron.hanson.brb@gmail.com)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077b5?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/aaron-hanson-brb/)](https://www.linkedin.com/in/aaron-hanson-brb/)
[![GitHub ahan8927](https://img.shields.io/github/followers/ahan8927?label=follow&style=social)](https://github.com/ahan8927)
