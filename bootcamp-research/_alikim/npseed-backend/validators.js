const { check, validationResult } = require('express-validator')
const { User } = require('./db/models')

function validationErrorsHandler(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMsgs = errors.array().map((err => err.msg))
    const err = Error("400 That request is bad to the bone.")
    err.status = 400
    err.title = "400 Bad Request"
    err.errors = errorMsgs
    return next(err)
  }
  next()
}

const usernameValidator = check('username')
  .exists()
  .withMessage("Need username, pal.")
  .isLength({ max: 40 })
  .withMessage("Username gotta be between 1-40 letters long.")
  // TODO How do I do this asyyyync
  // .custom(async (__, { req }) => {
  //   let isUnique = true
  //   const userExists = await User.findOne({ where: { username: req.body.username } })
  //   console.log("user", userExists)
  //   if (userExists) isUnique = false
  //   console.log("isUnique", isUnique)
  //   return false
  // })
  // .withMessage("Usernames should be special! Unique! OOAK!")

const emailValidator = check('email')
  .isEmail()
  .withMessage("I need a valid email!")
  .isLength({ min: 3, max: 255 })
  .withMessage("That email's too long (or short).")


const passwordValidator = check('password')
  .isLength({ min: 8, max: 60 })
  .withMessage("Passwords gotta be between 8-60 letters long.")

const passwordsValidator = check('confirmPassword')
  .custom((__, { req: { body: { password, confirmPassword } } }) => {
    return password === confirmPassword
  })
  .withMessage("Passwords need to be twinsies.")


const loginValidators = [
  usernameValidator,
  passwordValidator,
  validationErrorsHandler,
]

const signupValidators = [
  usernameValidator,
  // emailValidator,
  passwordValidator,
  passwordsValidator,
  validationErrorsHandler,
]

const genValidators = []

const charValidators = []


module.exports = {
  validationErrorsHandler,
  signupValidators,
  loginValidators,
  emailValidator,
  genValidators,
  charValidators,
}