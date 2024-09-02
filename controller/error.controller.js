/** @format */

const AppError = require('./../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  console.log('handling validation error');
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};
const handleJWTError = (err) => {
  console.log({ err });
  return new AppError('you are unauthorized, please log in again', 401);
};
const handleTokenExpire = () =>
  new AppError('session expired log in again ', 401);

const sendErrorProd = (err, req, res) => {
  // Operational, trusted error: send message to client
  // check if it error for api or for our page

  // if (req.originalUrl.startsWith('/api')) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      error: err,
      message: err.message,
      status: err.status,
      stack: err.stack,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR 💥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      error: err,
      message: 'Something went very wrong!',
    });
  }
};

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = Object.assign({}, err); // This preserves the original error object, including nested properties like err.errors.
  error.message = err.message;

  console.log('hello from global error handler👋', error);

  if (err.name === 'CastError') error = handleCastErrorDB(err);
  if (err.code === 11000) error = handleDuplicateFieldsDB(err);
  if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
  if (err.name === 'JsonWebTokenError') error = handleJWTError(err);
  if (err.name === 'TokenExpiredError') error = handleTokenExpire();

  sendErrorProd(error, req, res);
};
