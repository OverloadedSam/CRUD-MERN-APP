const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose error for duplicate field value.
  if (error.code === 11000) {
    const message = `Duplicate value for a field entered. Field: "${Object.keys(
      err.keyValue
    )}", Value: "${err.keyValue[Object.keys(err.keyPattern)]}"`;
    error = new ErrorResponse(400, message);
  }

  // Mongoose error for validation of data.
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(400, message);
  }

  // Mongoose error for failed to cast invalid ObjectIds.
  if (err.name === 'CastError') {
    const message = `${error.message}. ${err.reason}`;
    error = new ErrorResponse(400, message);
  }

  const status = error.statusCode || 500;
  const message =
    error.message || 'Unexpected error occurred! Internal server error!';

  return res.status(status).json({
    success: false,
    status,
    message,
  });
};

module.exports = errorHandler;
