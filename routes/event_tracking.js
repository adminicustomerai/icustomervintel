import express from 'express';
import eventTrackingController from '../controllers/event_tracking.js';

const router = express.Router();

// Forward all routes to the controller
router.use('/', eventTrackingController);

export default router;
