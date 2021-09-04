# Deploying Flask Backend directly (no Docker)

## Create a heroku app
```
heroku create -a fruitnodocker
```

## Provision database on heroku
provision database (on heroku website: resources -> search postgres -> heroku postgres -> provision)

## Create a Procfile with the command to run when the app starts (I'm upgrading my db and then running flask on the port that heroku creates) 
```
echo "web: flask db upgrade && flask run --host=0.0.0.0 -p $PORT" > Procfile
```

## Push to heroku
```
git add .
git commit -m"Prep heroku deployment"
git push heroku master
```

## Seed my database by piping a sql file into postgres (you may not need this if you have your seeds in your revisions, seeding from the deployed app, doing some other method, etc.)
```
cat ../flask_prod/heroku_seeds.sql | heroku pg:psql -a fruitnodocker
```
