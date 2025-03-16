/**
 * IC Visitor Management Platform
 * Main application entry point
 */

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config/config.js';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { requestLogger } from './middleware/loggingMiddleware.js';

// Initialize Express app
const app = express();

// Middleware
// Configure CORS with specific origins
const corsOptions = {
  origin: function(origin, callback) {
    // Allow specific origins
    const allowedOrigins = config.allowedOrigins ?? ["https://twin.nyc", "https://icustomer.ai"];
    // Allow requests with no origin (like mobile apps, curl requests, etc)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Allow all origins in Express
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to IC Visitor Management API',
    version: '1.0.0',
    documentation: '/api/docs',
  });
});

// API Routes
app.use('/api', routes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/api/health`);
  console.log(`Ping endpoint available at: http://localhost:${PORT}/api/health/ping`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // In production, we might want to exit the process and let a process manager restart it
  // process.exit(1);
});

export default app;
