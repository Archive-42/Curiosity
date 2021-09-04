
<!-- 
  TOD Add photos, resume, cover letter, any other files.
-->


<!-- HEADER -->
<div align="center">

  <!-- SHIELDS -->
  <!-- For how-to notes on shield badges, see docs: https://shields.io/ -->
  ![GitHub Icon](https://img.shields.io/badge/-Shield_Badge_Example-black?style=flat-square&logo=github&logoColor=ff00ff)
  ![Adobe Acrobat Reader Icon](https://img.shields.io/badge/-Shield_Badge_Example-ff00ff?style=flat-square&logo=adobe-acrobat-reader&logoColor=black) 
  ![GitHub Icon](https://img.shields.io/badge/-Shield_Badge_Example-black?style=flat-square&logo=github&logoColor=ff00ff)

  <img 
    src="docs/images/logo.svg" 
    alt="Logo" 
    title="" 
    width="100%">

  # STELLARATOR
  ## A text based incremental game

  <!-- TOC -->
  **TOC**  
  [About](#about) ● [Features](#features) ● [How It Works](#how-it-works) ● [Installation](#installation) ● [Development](#development) ● [Contact](#contact)

  <!-- SUMMARY -->
 Stellarator is a text based incremental game inpired from the game Space Plan and Factorio. You crash land on an unknown planet in an unknown galaxy, stranded until you find a way off. You realize you are not alone.
  
  <!-- SPLASHY IMAGE -->
  <img 
    src="docs/images/splash.png" 
    alt="Splashy 100%-width image" 
    title="" 
    width="100%">

  <!-- WEBSITE LINK -->
  ### Try the Demo!
  <a href="">[Live Website]</a>
  <!-- OPTIONAL Use an image button for extra fancy points. -->
  <!-- <a href=""><img src="" alt="Button image to go to app site" title="Click to see the live site!"></a> -->

</div>

---

<!-- ABOUT -->
<div align="center">

  ## About

  [● See Website ●]()  
  *(Inspired by [app name]())*

</div>

<img src="" 
  alt="Animated gif example of app in action, or interesting detail, etc." 
  title=""
  width="50%"
  align="left">

Describe overview of app, themes and philosophy, inspiration, audience, or whatever... 1-2 paragraphs

<br clear="both">

<!-- OPTIONAL EXTRA IMAGE(S) -->
<!-- Option 1: A single, centered 100%-width image. Can narrow, like to 80%, too if desired. A screenshot with many details or a narrow row image may be good. -->
<div align="center">
  <img 
    src="" 
    alt="Full-width image" 
    title="" 
    width="100%">
</div>

<!-- Option 2: Multiple images in a row, 'width' attribute set to evenly split the x-axis space. Ensure matching canvas ratios for the best appearance. Two rows combined can make a nice 'square' collage. May be food for a 'full-screen screenshots' gallery. -->
<div align="center">
  <img 
    src="" 
    alt="Image 1" 
    title="" 
    width="48%">
  <img 
    src="" 
    alt="Image 2" 
    title="" 
    width="48%">
</div>

<!-- Option 3: Multiple images in a row, 'height' attribute set to hard values to ensure matching heights. Good for images with different aspect ratios. -->
<div align="center">
  <img 
    src="" 
    alt="Image 1" 
    title="" 
    height="500px">
  <img 
    src="" 
    alt="Image 2" 
    title="" 
    height="500px">
</div>


<!-- FEATURES -->
<div align="center">

  ## Features

</div>

* **Key action word** a feature here.
* **Emphasize action** for this feature.
* Feature 3 **highlights this benefit**.

### For the Future

* **Major** *(high priority)* More Events and resources
* **Major** Graphics and UI
* **Minor** *(low priority)* Offline time
* **Maybe** Music


<!-- INSTRUCTIONS -->
<div align="center">

  ## How It Works

  [1. Step One](#1-step-one)  
  [How to Use Cool Feature ABC!](#how-to-use-feature-abc)  
  [Troubleshooting Z](#troubleshooting-z)  

</div>

### 1. Step One

<img 
  src="" 
  alt="Screenshot, animated gif, diagram, etc illustrating this step" 
  title="" 
  width="50%"
  align="right">

* To **do a thing**, follow this step.
* ***TIP** This is a helpful tip.*
* ***NOTE** This is note about something.*
* ***WARNING!** This is a warning!*

<br clear="both">

> **Optional Special Section!**  
> For any additional asides. Maybe illustrating a specific example, a table of information, a code snippet, or 'fun facts' or quotes!  
>
> 1. A list
> 1. could be
> 1. nice too
>
> | Header A | Header B |
> |----------|----------|
> | A        | B        |
>

<div align="center">
  <img 
    src="" 
    alt="Optional extra image(s)" 
    title="" 
    width="100%">
</div>

### How to Use Feature ABC
Repeat the pattern.

### Troubleshooting Z
Repeat the pattern.


<div align="center">

  ## Installation

</div>

1. Create a new postgres database and owner.
2. Create a `.env` file matching the `.env.example` file and your new postgres information.
3. Migrate the database with `npx sequelize-cli db:migrate`.
4. Seed the migration with `npx sequelize-cli db:seed:all`.
5. Run locally with `npm start`.

### Get started on Heroku - Account, Database, Config Vars 
1. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli), if you haven't done so already.
2. Create a [free Heroku account](https://signup.heroku.com/dc).
3. Login and [create a new Heroku app](https://dashboard.heroku.com/new-app).
4. Navigate to the *Resources* tab an set up a 'Heroku Postgres' database for the app.
5. Select the 'Hobby Dev - Free' plan.
6. Navigate to the *Settings* tab. Click 'Reveal Config Vars'. Set the environment variables needed to run the app. 
- **NOTE** NEVER check in `.env` files or any private keys. Environment variables set in an `.env` file won't work in Heroku anyway.
- **NOTE** See the `DATABASE_URL` is already set. This is done when the Heroku Postgres database was set up. Therefore, `DB_USERNAME`, `DB_PASSWORD`, and `DB_DATABASE` arent' required.

### Configure the app to use the Heroku Postgres database
There are two ways to configure the `production` environment: 
  1. With *dotenv* and a `.sequelizerc` file that points to a `config/database.js` file.
  2. The Sequelize CLI's auto-generated `config.json` file.

**With .sequelizerc and dotenv**
Update the `config/database.js` file with a `production` key like so.

``` js
// config/database.js
// ...
module.exports = {
  development: {
    // ...
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {ssl: true},
    seederStorage: 'sequelize',
  }
}
```

**With Sequelize CLI's config.json**
Change the `production` entry to look like this:
``` json
"production": {
  "dialect": "postgres",
  "seederStorage": "sequelize",
  "use_env_variable": "DATABASE_URL"
}
```

### Push to Heroku
1. In the root of the app's repo directory, log into Heroku with `heroku login`.
2. Add a new remote to GitHub configuration with `heroku git:remote -a <<app-name-here>>`.
3. Add all changes with `git add .`.
4. Commit changes with `git commit -m "<<Add message here>>"`. (Optionally, `git commit -am` Adds and commits in one command.)
5. Push changes to Heroku with `git push Heroku`.
6. You should see a successful build image.
``` bash
# ...
remote: -----> Launching...
remote:        Released v5
remote:        https://«your-app-name».herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/«app-name-here».git
```

### Run migrations on Heroku
1. To migrate your Heroku Postgres database, run the migration command prefaced with `heroku run` inside the repo. 

``` bash
heroku run npx sequelize-cli db:migrate
```

2. To seed, preface the seed command with `heroku run` as well.

``` bash
heroku run npx sequelize-cli db:seed:all
```

3. To roll back, instead of dropping the database, first try to migrate down and up (shown below). If this doesn't work, reset the entire database by removing and adding the 'Heroku Postgres' add-on again, then migrating and seeding as the first time.

``` bash
heroku run npx sequelize-cli db:seed:undo:all
heroku run npx sequelize-cli db:migrate:undo:all
heroku run npx sequelize-cli db:migrate
heroku run npx sequelize-cli db:seed:all
```


<div align="center">

  ## Development

  **DEV TOC**  
  [Technologies](docs/development.md#technologies) ● [Concept](docs/development.md#concept) ● [Models](docs/development.md#models) ● [Routes](docs/development.md#routes) ● [Wireframes](docs/development.md#wireframes) ● [Code Highlights](#code-highlights) ● [Dev Snapshots](docs/development.md#development-snapshots)

  [[ See full dev notes HERE ]](readme/development.md)  
  The full notes on this project's development are kept in a separate document linked above.  
  It details the technical aspects of this project's development.  
  A few sample snapshots are below from the development process.  

  <img 
    src="" 
    alt="Snapshot 1"
    title=""
    height="250px">
  <img 
    src="" 
    alt="Snapshot 2"
    title=""
    height="250px">
  <img 
    src="" 
    alt="Snapshot 3"
    title=""
    height="250px">

</div>

---


<!-- CONTACT -->
<div align="center">

## Contact

Thank you very much for your interest in this project.  
Feel free to reach out to provide feedback, bug reports, or anything else :) .  

<!-- CONTRIBUTOR PROFILE -->
<!-- Include: Name, title, job/search status, (opt) photo, (opt) summary of contributions, (opt) a few words or a quote, socials badges (github follow, linkedin, angellist, email, resume, portfolio, twitter, etc.), (opt) team/contact page from app's site -->

  <img 
    src="docs/images/portrait.png" 
    alt="Alicia Mira Kim" 
    height="100px"
    align="left">
</div>

### Aaron Hanson
*(Full-stack software developer, open to work)*  

[![Portfolio](https://img.shields.io/badge/-❤_Portfolio-f58?style=flat-square&logo=a&logoColor=white&link=https://alimirakim.github.io/)](https://alimirakim.github.io) 
<a href="docs/Kim-Mira-Alicia_Resume.pdf" download>![Resume PDF](https://img.shields.io/badge/-Resume-f00?style=flat-square&logo=adobe-acrobat-reader&logoColor=white)</a> 
[![Aaron's email](https://img.shields.io/badge/aaron.hanson.brb@gmail.com-f4b400?style=flat-square&logo=gmail&logoColor=black&link=mailto:aaron.hanson.brb@gmail.com)](mailto:aaron.hanson.brb@gmail.com) 
[![Linkedin](https://img.shields.io/badge/-LinkedIn-0077b5?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/aaron-hanson-brb/)](https://www.linkedin.com/in/aaron-hanson-brb/) 
[![Twitter](https://img.shields.io/badge/-Twitter-1da1f2?style=flat-square&logo=Twitter&logoColor=white&link=https://twitter.com/AaronHa59630581)](https://twitter.com/AaronHa59630581) 
[![GitHub Aaron Hanson](https://img.shields.io/github/followers/alimirakim?label=follow&style=social)](https://github.com/ahan8927) 

</div>

<br clear="both">

---

<div align="center">

<!-- **💖 THANK YOU (ATTRIBUTIONS) 💖**  
[Attribution 1 by Person A]() | [Attribution 2 by Person B]() | [Attribution 3 by Person C]() -->

</div>
