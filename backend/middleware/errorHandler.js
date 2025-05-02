// Error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  let error = { ...err };
  error.message = err.message;

  // General validation error
  if (error.name === 'ValidationError') {
    const message = 'Validation Error';
    error = { message, details: error.errors };
    return res.status(400).json({
      success: false,
      error: message,
      details: error.details
    });
  }

  // Default response for any other error
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler; 