import express from 'express';
import healthRoutes from './healthRoutes.js';
import eventTrackingRoutes from './event_tracking.js';

const router = express.Router();

// Health routes
router.use('/health', healthRoutes);

// Event tracking routes
router.use('/events', eventTrackingRoutes);

// Add other routes here as needed
// Example: router.use('/users', userRoutes);

export default router;
