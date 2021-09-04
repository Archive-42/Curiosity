const jwt = require("jsonwebtoken")
const bearerToken = require('express-bearer-token')
const fetch = require('node-fetch')
const { jwtConfig } = require('./config')
const { User } = require('./db/models')
const { getCookies } = require('./utils')
const { api } = require('./config')
const { secret, expiresIn } = jwtConfig

const makeUserToken = (user) => {
  const data = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign(data, secret,{ expiresIn: parseInt(expiresIn, 10) })
  return token;
};


const restoreUser = (req, res, next) => {
  const { token } = req
  if (!token) return res.set("WWW-Authenticate", "Bearer").status(401).end()

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      err.status = 401
      return next(err)
    }
    const { id } = jwtPayload
    try {
      req.user = await User.findByPk(id)
    } catch (err) {
      return next(err)
    }
    if (!req.user) {
      return res.set("WWW-Authenticate", "Bearer").status(401).end();
    }
    return next();
  });
};


async function checkUser(req, res, next) {
  const cookies = getCookies(req.headers.cookie)
  let authCheck = await fetch(`${api}/api/users/user`, {
    headers: { Authorization: `Bearer ${cookies.COVEN_TOKEN}` }
  })
  req.COVEN_ID = cookies.COVEN_ID
  if (authCheck.ok) req.isUser = true
  else req.isUser = false
  next()
}


const requireAuth = [bearerToken(), restoreUser];
module.exports = { makeUserToken, requireAuth, checkUser };
