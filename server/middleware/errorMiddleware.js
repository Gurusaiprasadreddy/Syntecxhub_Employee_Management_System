const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode ? res.statusCode : 500;
  let message = err.message || 'Something went wrong. Please try again.';

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    message = 'Invalid employee ID';
    statusCode = 400;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map((val) => val.message).join(', ') || 'Please correct the highlighted fields';
    statusCode = 400;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    message = 'Employee ID or Email already exists';
    statusCode = 409;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
