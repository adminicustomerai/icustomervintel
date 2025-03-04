/**
 * Logging middleware
 */

/**
 * Request logger middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  // Log request details
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  
  // Log request body if it exists and isn't a file upload
  if (req.body && Object.keys(req.body).length > 0 && !req.is('multipart/form-data')) {
    console.log('Request Body:', JSON.stringify(req.body, null, 2));
  }
  
  // Capture the response
  const originalSend = res.send;
  res.send = function(body) {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    
    return originalSend.call(this, body);
  };
  
  next();
};
