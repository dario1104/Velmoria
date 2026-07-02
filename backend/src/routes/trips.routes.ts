import { Router } from 'express';
import * as tripsController from '../controllers/trips.controller';
import { authenticate } from '../middleware/authenticate';
import { createTripValidator, updateTripValidator } from '../validators/trips.validators';

const router = Router();

router.use(authenticate);

router.get('/', tripsController.findAll);
router.post('/', createTripValidator, tripsController.create);
router.get('/:id', tripsController.findOne);
router.patch('/:id', updateTripValidator, tripsController.update);
router.delete('/:id', tripsController.remove);
router.post('/:id/finish', tripsController.finish);
router.get('/:id/stats', tripsController.stats);

export default router;
