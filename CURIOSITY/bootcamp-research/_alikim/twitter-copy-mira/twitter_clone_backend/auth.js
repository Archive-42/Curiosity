const jwt = require('jsonwebtoken')
const { jwtConfig } = require('./config')
const { secret, expiresIn } = jwtConfig
const bearerToken = require("express-bearer-token");
const { User } = require("./db/models");

function getUserToken(user) {
  const userDataForToken = {
    id: user.id,
    email: user.email,
  }
  console.log("userDataForToken", userDataForToken)
  const token = jwt.sign( // makes new token
    { data: userDataForToken },
    secret,
    { expiresIn: parseInt(expiresIn, 10) }
  )
  console.log("token", token)
  return token
}

const restoreUser = (req, res, next) => {
  const { token } = req;

  if (!token) {
    return res.set("WWW-Authenticate", "Bearer").status(401).end();
  }
  console.log("wtf is secret", secret)
  return jwt.verify(token, secret, null, async (err, jwtPayload) => { // TODO QUESTION ?? How does this work? WHERE DOES SECRET COME FROM????
    console.log("wtf is jwtPaylod", jwtPayload)
    if (err) {
      err.status = 401;
      return next(err);
    }

    const { id } = jwtPayload.data;

    try {
      req.user = await User.findByPk(id);
    } catch (e) {
      return next(e);
    }

    if (!req.user) {
      return res.set("WWW-Authenticate", "Bearer").status(401).end();
    }

    return next();
  });
}

const requireAuth = [bearerToken(), restoreUser]
module.exports = { getUserToken, requireAuth }
