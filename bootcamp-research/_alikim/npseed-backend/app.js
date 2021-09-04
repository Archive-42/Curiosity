const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { ValidationError } = require('sequelize')
const { environment, origin } = require('./config')

// Route imports
// const { router, usersRouter, charRouter } = require('./routes')
const { router } = require('./routes/routes')
const { userRouter } = require('./routes/users')
const { charRouter } = require('./routes/characters')
const { catRouter } = require('./routes/categories')
const { genRouter } = require('./routes/generators')
// TODO Why can't this work even if .config can
// const charRoutes = require('./routes')

const app = express()

// Setting up backend app
app.use(morgan('dev'))
// app.use(cors({ origin }))
// app.use(cors({ origin: 'http://localhost:3001' }))
// app.use(cors({ origin: 'http://localhost:4000' }))
app.use(cors({ origin: '*' }))
app.use(cookieParser())
app.use(express.json())
// TODO Check how these work out. Diff between Twitter/Pokemon, understand why
app.use(express.urlencoded({ extended: false }))
// app.use(static(path.join(__dirname, 'public')))


// Routes
app.use(router)
app.use("/characters", charRouter)
app.use("/users", userRouter)
app.use("/categories", catRouter)
app.use("/generators", genRouter)


// 404 Catch unhandled requests and pass to error handler
app.use((req, res, next) => {
  const err = Error(`404 Nuh-uh can't find it :(`)
  err.errors = ["Can't find that resource."]
  err.status = 404
  next(err)
})


// Handle 404 error
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404)
    res.render('page-not-found', { tite: '404 Not Found' })
  } else {
    next(err)
  }
})

// Handle sequelize errors
app.use((err, req, res, next) => {
  // console.log("we got sequel error", err)
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message)
    err.title = "Sequelize Error >:["
  }
  next(err)
})

// Handle all other errors
app.use((err, req, res, next) => {
  (console.log("we got other error", err.errors))
  err.status = (err.status || 500)
  const isProduction = environment === 'production'
  res.status(err.status).json({
    title: err.title || '500 Server Error',
    message: err.message,
    errors: err.errors || [err.message],
    stack: isProduction ? null : err.stack,
  })
})

module.exports = app