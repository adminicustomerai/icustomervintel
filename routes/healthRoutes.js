import express from 'express';
import { ping, healthCheck } from '../controllers/healthController.js';

const router = express.Router();

/**
 * @route   GET /api/health/ping
 * @desc    Simple ping endpoint to check if the server is running
 * @access  Public
 */
router.get('/ping', ping);

/**
 * @route   GET /api/health
 * @desc    Detailed health check endpoint
 * @access  Public
 */
router.get('/', healthCheck);

export default router;
