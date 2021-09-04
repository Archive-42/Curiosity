module.exports = {
  validateUser,
};

// username/password requirements

function validateUser(user) {
  let errors = [];

  if (!user.username || user.username.length < 2) {
    errors.push("Username must contain at least 2 characters");
  }

  if (!user.password || user.password.length < 4) {
    errors.push("Password must contain at least 4 characters");
  }

  return {
    isSuccessful: errors.length > 0 ? false : true,
    errors,
  };
}
