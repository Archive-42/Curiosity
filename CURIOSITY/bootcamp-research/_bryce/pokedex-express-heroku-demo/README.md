## On the Heroku website:
- Create Heroku app
- Provision Postgres database
	- On the `Resources` tab, search for Heroku Postgres and select the Hobby Dev (free) plan
- Add nodejs buildpack
	- In the `Settings` tab, click 'Add buildback' and click nodejs
- Add environment variables
	- If you are using any environment variables in your app, click 'Reveal Config Vars' and add them in

## In your code:
- Only one repo is necessary since we are creating a production build of our React app
   - This compiled code can be served up directly when a request is made to our backend server
- Nest your 'client' ('frontend', etc.) directory in main directory (where our server is located)
- Add a `heroku-postbuild` script to our outer package.json
	- This script will automatically be run by heroku when we deploy our app
	- We want heroku to install the packages listed in the nested package.json (inside our client directory)
		- Heroku by default installs the packages in our top-level package.json automatically
	- We also want heroku to run our `build` script in in the nested `client` directory to make our production build
	- We are taking advantage of this script being run at each deployment by remigrating and seeding our database.
		- This is optional. If we don't specify it here, we would just have to run our migrations/seeds manually (`heroku run npx dotenv sequelize-cli db:migrate` and `heroku run npx dotenv sequelize-cli db:seed:all`) whenever we wanted to make those changes.
```js
// backend package.json
// We are telling heroku to install the packages in the `client` directory, then run the `build` command in that directory
// We are additionally running our migrations and seeds for our database so that we don't have to do that extra step with each deployment
"scripts": {
		"db:create": "dotenv sequelize-cli db:create",
		"db:drop": "dotenv sequelize-cli db:drop",
		"db:migrate": "dotenv sequelize-cli db:migrate",
		"db:migrate:undo:all": "dotenv sequelize-cli db:migrate:undo:all",
		"db:redo": "npm run db:seed:undo:all && npm run db:migrate:undo:all && npm run db:migrate && npm run db:seed:all",
		"db:seed:all": "dotenv sequelize-cli db:seed:all",
		"db:seed:undo:all": "dotenv sequelize-cli db:seed:undo:all",
		"dev": "dotenv nodemon ./bin/www",


		"heroku-postbuild": "npm install --prefix client && npm run build --prefix client && npm run db:redo",


		"migration:generate": "sequelize-cli migration:generate",
		"model:generate": "sequelize-cli model:generate",
		"seed:generate": "sequelize-cli seed:generate",
		"start": "dotenv ./bin/www"
	},
```

- In our server's main/app file, add a condition to serve our newly created `build` directory when we're in production
	- Adding this condition after our routes makes sure that we are going to serve up the production frontend on Heroku if our backend server does not have any matching routes
```js
// server's app.js
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}
```

## In the terminal:
- Connect our app to heroku (Can be seen in the 'Deploy' tab on Heroku)
	- Add and commit all of your changes
	- `heroku git:remote -a name-of-heroku-app`
- Push to the heroku repo (your postbuild script will run, which should set up your database for you as well if necessary)
	- `git push heroku master`



## React apps with no backend:
- If we are trying to deploy a React app directly as a standalone app on Heroku, we can follow the simple steps outlined on Heroku:
- https://blog.heroku.com/deploying-react-with-zero-configuration
