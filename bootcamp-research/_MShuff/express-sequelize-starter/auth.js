const jwt = require('jsonwebtoken');
const bearerToken = require('express-bearer-token');
const db = require('./db/models');
const { jwtConfig } = require('./config');
const { secret, expiresIn } = jwtConfig;
const { User } = db;

const restoreUser = (req, res, next) => {
  const { token } = req;
  if (!token) {
    return res.set("WWW-Authenticate", "Bearer").status(401).end();
  }

  return jwt.verify(token, secret, null, async(err, jwtPayload) => {
    if (err) {
      err.status = 401;
      return next(err);
    } else {
      const { id } = jwtPayload.data;

      try {
        req.user = await User.findByPk(id);
      } catch(err) {
        return next(err);
      }


      if (!req.user) {
        return res.set("WWW-Authenticate", "Bearer").status(401).end();
      }

      return next();
    }
  });
};

const getUserToken = (user) => {
  // Don't store user's hashed password in the token data
  const userDataForToken = {
    id: user.id,
    email: user.email,
  };

  // Create the token
  const token = jwt.sign(
    { data: userDataForToken },
    secret,
    { expiresIn: parseInt(expiresIn) }
  );

  return token;
};

const requireAuth = [bearerToken(), restoreUser];

module.exports = {
  getUserToken,
  requireAuth
};
