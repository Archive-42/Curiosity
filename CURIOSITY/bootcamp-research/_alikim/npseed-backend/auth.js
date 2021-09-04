const jwt = require('jsonwebtoken')
const bearerToken = require('express-bearer-token')
const { User, Character } = require('./db/models')
const { jwtConfig: { secret, expiresIn } } = require('./config')


function makeToken(user) {
  const data = {
    id: user.id,
    username: user.username,
    email: user.email,
  }
  return jwt.sign({ data }, secret, { expiresIn })
}


async function checkToken(req, res, next) {
  const { token } = req
  if (!token) return next({ status: 401, message: 'i need token :C ' })

  return jwt.verify(token, secret, null, async (err, payload) => {
    console.log("what even is the payload?", payload)
    if (err) {
      err.status = 401
      err.title = "401 Bad Token"
      return next(err)
    }
    req.user = await User.findByPk(payload.data.id, {
      include: [Character],
      attributes: { exclude: ["hashword"] }
    })
    if (!req.user) return res.set("WWW-Authenticate", "Bearer").status(401).end()
  else return next()
})
}

const checkAuth = [bearerToken(), checkToken]

module.exports = {
  makeToken,
  checkAuth
}