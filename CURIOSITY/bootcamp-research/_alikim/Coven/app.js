const log = console.log
const express = require("express")
const path = require("path");
const cookieParser = require("cookie-parser")
const environment = require("./config")

// Routers
const frontEndRouter = require("./routes/frontEndRoutes")
const usersRouter = require("./routes/backend-routes/users")
const followsRouter = require("./routes/backend-routes/follows")
const bookmarksRouter = require("./routes/backend-routes/bookmarks")
const likesRouter = require("./routes/backend-routes/likes")
const storiesRouter = require("./routes/backend-routes/stories")
const commentsRouter = require("./routes/backend-routes/comments")
const topicsRouter = require("./routes/backend-routes/topics")

const app = express()
app.use(express.json())
app.set("view engine", "pug")
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
const morgan = require("morgan")
app.use(morgan("dev"))


// Backend Routes
app.use(frontEndRouter)
app.use("/api/users", usersRouter)
app.use("/api/users", followsRouter)
app.use("/api", storiesRouter)
app.use("/api", commentsRouter)
app.use("/api", bookmarksRouter)
app.use("/api", likesRouter)
app.use("/api", topicsRouter)


// 404 Catch unhandled requests
app.use((req, res, next) => {
  const err = new Error("404 We couldn't find that page.")
  err.title = "404 Not Found"
  err.status = 404
  next(err)
})

// Custom error handlers


// Generic fallback error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  const isProductionEnv = environment === "production"

  const errorData = {
    title: err.title || "500 Server Error",
    message: err.message,
    stack: isProductionEnv ? null : err.stack,
    errors: err.errors || []
  }

  if (err.status === 404) res.render("notFound", errorData)

  else { res.json(errorData) }
});

module.exports = app
