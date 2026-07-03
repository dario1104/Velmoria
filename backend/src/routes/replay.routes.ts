import { Router } from 'express';
import * as replayController from '../controllers/replay.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.use(authenticate);

router.get('/trips/:tripId/replay', replayController.getReplayData);

export default router;
