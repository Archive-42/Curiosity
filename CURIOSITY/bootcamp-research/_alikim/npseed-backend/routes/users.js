const bcrypt = require('bcryptjs')
const userRouter = require('express-promise-router')()
const { User, Character } = require('../db/models')
const { signupValidators, loginValidators } = require('../validators')
const { makeToken, checkAuth } = require("../auth")

// Make new user and token
userRouter.post("/",
  // emailValidator,
  signupValidators,
  async (req, res, next) => {
    let { username, email, password } = req.body
    if (!email) email = null
    // TODO WTF This bcrypt uppercase shit
    console.log("\npassword before hashing?", password)
    const hashword = await bcrypt.hashSync(password, 10)
    console.log("\npassword AFTER hashing", password)
    try {
      await User.create({ username, email, hashword })
      const user = await User.findOne({
        where: { username },
        include: Character,
        attributes: { exclude: "hashword" }
      })
      const token = makeToken(user)
      if (user && token) res.status(201).json({ token, user })
      else next(Error("I have no clue why, but the User wasn't made."))
    } catch (err) {
      console.log("error password", password)
      next(err)
    }
  }
)
// EXAMPLE Request Body
// {
//   "username": "Bentley",
//   "email": "bentley@gmail.com",
//   "password": "sulbingsoo"
// }
// EXAMPLE Response
// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo3LCJ1c2VybmFtZSI6IkJlbnRsZXkiLCJlbWFpbCI6ImJlbnRsZXlAZ21haWwuY29tIn0sImlhdCI6MTYwNDE4NzQ2MywiZXhwIjoxNjA0MjQ3OTQzfQ.T9W9GmVRJU4cnF9vkvz9lNE_o0qLNwCtyHzb-iQKhvs",
//   "user": {
//     "id": 7,
//     "username": "Bentley",
//     "email": "bentley@gmail.com",
//     "hashword": {
//       "type": "Buffer",
//       "data": [
//         36,
//         50,
//         97,
//         <<...>>
//       ]
//     },
//     "updatedAt": "2020-10-31T23:37:43.729Z",
//     "createdAt": "2020-10-31T23:37:43.729Z"
//   }
// }


// Make user authentication token
userRouter.put("/token",
  loginValidators,
  async (req, res, next) => {
    const { username, password } = req.body
    let user = await User.findOne({ where: { username } })
    // Reject request if user doesn't exist or password is invalid
    console.log("user what?", user.username)
    if (!user || await user.validatePassword(password)) {
      const err = Error("Login big fail")
      err.status = 401
      err.title = "401 Login Fail"
      err.errors = ["The provided credentials are invalid."]
      return next(err)
    }
    user = await User.findOne({
      where: { username },
      include: Character,
      attributes: { exclude: ["hashword"] }
    })
    const token = makeToken(user)
    // TODO Why does Postman show no return?
    res.json({ token, user })
  }
)

// Check if token is valid. Return error if not.
userRouter.get("/token",
  checkAuth,
  async (req, res) => {
    if (req.user) {
      res.json(req.user)
    } else {
      err.status = 401
      err.title = "401 Token Fail"
      err.errors = ["You need a token to get in!"]
      return next(err)
    }
  }
)

// Update user data
// usersRouter.patch("/:id", async (req, res) => {
//   const user = await User.findByPk(req.params.id)
//   if (user) {
//     const { username, email, password } = req.body
//     // TODO Can I do (user.username || username) ?
//     user.username = username
//     user.email = email
//     user.password = bcrypt.hashSync(password)
//   }
// })

// Get user by id
userRouter.get("/:id(\\d+)",
  // checkAuth,
  async (req, res) => {
    const user = await User.findByPk(req.params.id)
    delete user.hashword
    if (user) res.json(user)
    else next(Errors("Couldn't get the User, prolly didn't find it."))
  }
)
// EXAMPLE
// {
//   "id": 1,
//   "username": "admin",
//   "email": "almyki@gmail.com",
//   "createdAt": "2020-10-31T17:31:31.870Z",
//   "updatedAt": "2020-10-31T17:31:31.870Z"
// }

module.exports = { userRouter }