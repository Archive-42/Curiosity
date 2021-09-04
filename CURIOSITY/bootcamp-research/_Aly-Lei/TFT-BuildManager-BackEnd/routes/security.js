// const jwt = require("jsonwebtoken");
// const { jwtConfig } = require("../config");
// const { User } = require("../db/models");

// const { secret, expiresIn } = jwtConfig;

// const getUserToken = (user) => {
//   // Don't store the user's hashed password
//   // in the token data.
//   const userDataForToken = {
//     id: user.id,
//     email: user.email,
//   };

//   // Create the token.
//   const token = jwt.sign(
//     { data: userDataForToken },
//     secret,
//     { expiresIn: parseInt(expiresIn, 10) } // 604,800 seconds = 1 week
//   );

//   return token;
// };

// const restoreUser = (req, res, next) => {
//   // token being parsed from request's cookies by the cookie-parser middleware
//   // function in app.js:
//   const { token } = req.cookies;

//   if (!token) {
//     // Send a "401 Unauthorized" response status code
//     return res.status(401).end();
//   }

//   return jwt.verify(token, secret, null, async (err, jwtPayload) => {
//     if (err) {
//       err.status = 401;
//       return next(err);
//     }

//     const { id } = jwtPayload.data;

//     try {
//       req.user = await User.findByPk(id);
//     } catch (e) {
//       // remove the token cookie
//       res.clearCookie("token");
//       return next(e);
//     }

//     if (!req.user) {
//       // Send a "401 Unauthorized" response status code
//       // along with removing the token cookie
//       res.clearCookie("token");
//       return res.status(401).end();
//     }

//     return next();
//   });
// };

// const requireAuth = [restoreUser];

// module.exports = { getUserToken, requireAuth };

const bearerToken = require("express-bearer-token");
const jwt = require("jsonwebtoken");
const uuid = require("uuid").v4;

const { jwtConfig } = require("../config");
const { secret, expiresIn } = jwtConfig;
const { User } = require("../db/models");

// Generate Token for User
const getUserToken = (user) => {
  const data = {
    id: user.id,
    email: user.email,
    username: user.username,
  };

  const jwtid = uuid();

  return {
    jti: jwtid,
    token: jwt.sign({ data }, secret, {
      expiresIn: parseInt(expiresIn, 10),
      jwtid,
    }),
  };
};

// Restore User Session
const restoreUser = (req, res, next) => {
  const { token } = req;

  if (!token) {
    const err = new Error("unauthorized");
    err.status = 401;
    return next(err);
  }

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      err.status = 401;
      return next(err);
    }

    const { id } = jwtPayload.data;

    try {
      req.user = await User.findByPk(id);
    } catch (e) {
      console.error(e);
    }

    if (!req.user) {
      return res.set("WWW-Authenticate", "Bearer").status(401).end();
    }

    return next();
  });
};

const requireAuth = [bearerToken(), restoreUser];

module.exports = {
  getUserToken,
  requireAuth,
};
