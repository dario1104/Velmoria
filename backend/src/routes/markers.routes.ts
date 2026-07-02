import { Router } from 'express';
import * as markersController from '../controllers/markers.controller';
import { authenticate } from '../middleware/authenticate';
import { createMarkerValidator, updateMarkerValidator } from '../validators/markers.validators';

const router = Router();

router.use(authenticate);

router.get('/trips/:tripId/markers', markersController.findByTrip);
router.post('/trips/:tripId/markers', createMarkerValidator, markersController.create);
router.get('/markers/:id', markersController.findOne);
router.patch('/markers/:id', updateMarkerValidator, markersController.update);
router.delete('/markers/:id', markersController.remove);

export default router;
