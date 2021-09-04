const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../endpoints/users/userModel");
const Token = require("./authHelpers.js");

router.post("/", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = Token.getJwt(user.username);

        res.status(200).json({
          id: user.id,
          username: user.username,
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;
