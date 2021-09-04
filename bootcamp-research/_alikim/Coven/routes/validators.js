const { check } = require("express-validator")
const { User } = require("../db/models")

const nameValidators = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please give us a first name.")
    .isLength({ min: 1, max: 40 })
    .withMessage("A first name must be between 1 to 40 characters in length."),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please give us a last name.")
    .isLength({ max: 40 })
    .withMessage("A last name can't be longer than 40 characters in length."),
]

const emailValidator = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please give us an email.")
    .isEmail()
    .withMessage("Please give us a valid email address.")
    .isLength({ max: 80 })
    .withMessage("An email can't be longer than 80 characters in length.")
    .custom(async (val, { req }) => {
      let emailExists = await User.findOne({ where: { email: val } })
      if (emailExists) {
        throw new Error("Email is in use")
      }
    })
]
const passwordValidator = [
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please give us a password.")
    .isLength({ min: 10, max: 20 })
    .withMessage("A password must be between 10 to 20 characters in length.")
    .custom((val, { req }) => {
      if (val !== req.body.confirmPassword) {
        throw new Error('Passwords do not match')
      } else {
        return val;
      }
    }
    )
]

module.exports = {
  nameValidators,
  emailValidator,
  passwordValidator,
}