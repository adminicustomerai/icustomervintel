/**
 * Health controller for handling health check endpoints
 */

/**
 * Ping endpoint to check if the server is running
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const ping = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
};

/**
 * Health check endpoint with more detailed information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const healthCheck = (req, res) => {
  const healthInfo = {
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    memoryUsage: process.memoryUsage(),
  };

  res.status(200).json(healthInfo);
};
