const { validationResult } = require('express-validator');

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map(error => error.msg);
    const err = Error('Bad Request');
    err.errors = errors;
    err.title = '400 Bad Request';
    err.status = 400;
    return next(err);
  } else {
    next();
  }
};

module.exports = {
  asyncHandler,
  handleValidationErrors
};