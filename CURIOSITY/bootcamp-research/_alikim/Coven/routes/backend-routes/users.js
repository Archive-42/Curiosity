const bcrypt = require("bcryptjs")
const express = require("express")
const {
  asyncHandler,
  handleValidationErrors,
  checkForUser
} = require("../../utils")
const { makeUserToken, requireAuth } = require("../../auth")
const { User } = require("../../db/models")
const {
  nameValidators,
  emailValidator,
  passwordValidator,
} = require("../validators")

const usersRouter = express.Router()



// Create a new JWT token for a user on login(?)
usersRouter.post("/token",
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user || !user.validatePassword(password)) {
      console.log("FAIL")
      const err = new Error("The login failed.")
      err.title = "401 Login Failed"
      err.status = 401
      err.errors = ["The provided credentials are INVALID."]
      return next(err)
    }
    const token = makeUserToken(user)
    const maxAge = 720 * 60 * 60
    res.cookie("COVEN_TOKEN", token, { maxAge })
    res.cookie("COVEN_ID", user.id, { maxAge })
    await res.json({ token, id: user.id })
  })
)

usersRouter.get("/user",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { id } = req.user
    await res.json({ id })
  })
)

// Get User by id
usersRouter.get("/:id(\\d+)",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    res.json(req.user)
  })
)


// Create a new User.
usersRouter.post("/",
  nameValidators,
  emailValidator,
  passwordValidator,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      firstName, lastName, email, hashedPassword, bio: ""
    })
    const token = makeUserToken(user)
    delete user.hashedPassword;
    const maxAge = 720 * 60 * 60
    res.cookie("COVEN_TOKEN", token, { maxAge })
    res.cookie("COVEN_ID", user.id, { maxAge })
    console.log("\nruh roh")
    res.status(201).json({ token, user })
  })
)

// Edit User data by id.
usersRouter.patch("/:id(\\d+)",
  asyncHandler(checkForUser),
  nameValidators,
  emailValidator,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { firstName, lastName, bio, email } = req.body
    await req.user.update({ firstName, lastName, bio, email })
    res.json(req.user)
  })
)

// TODO MIRA How to handle changing passwords.

// Delete User by id
// TODO Test this soft delete idea, or cascade-delete
// Existing user, dependencies: 500 Server Error, 'update or delete violates constraint'
usersRouter.delete("/:id(\\d+)",
  asyncHandler(checkForUser),
  asyncHandler(async (req, res) => {
    try {
      await req.user.destroy()
      res.status(204).end()
    } catch (err) {
      req.user.firstName = "(Deleted)"
      req.user.lastName = ""
      req.user.bio = ""
      req.user.email = "deleted@deleted.com"
      // req.password = 
      await req.user.save()
      res.status(204).end()
    }
  })
)



module.exports = usersRouter
