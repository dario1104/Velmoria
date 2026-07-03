import { Router } from 'express';
import * as timelineController from '../controllers/timeline.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.use(authenticate);

router.get('/trips/:tripId/timeline', timelineController.getTimeline);
router.post('/trips/:tripId/timeline', timelineController.createEvent);

export default router;
