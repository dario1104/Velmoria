import { Router } from 'express';
import * as gpsController from '../controllers/gps.controller';
import { authenticate } from '../middleware/authenticate';
import { createGpsPointValidator, batchGpsPointsValidator } from '../validators/gps.validators';

const router = Router();

router.use(authenticate);

router.get('/trips/:tripId/gps', gpsController.getPoints);
router.post('/trips/:tripId/gps', createGpsPointValidator, gpsController.createPoint);
router.post('/gps/batch', batchGpsPointsValidator, gpsController.createBatch);

export default router;
