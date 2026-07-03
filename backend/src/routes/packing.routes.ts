import { Router } from 'express';
import * as packingController from '../controllers/packing.controller';
import { authenticate } from '../middleware/authenticate';
import { createPackingItemValidator, updatePackingItemValidator } from '../validators/packing.validators';

const router = Router();

router.use(authenticate);

router.post('/', createPackingItemValidator, packingController.create);
router.get('/trip/:tripId', packingController.findByTrip);
router.get('/:id', packingController.findOne);
router.patch('/:id', updatePackingItemValidator, packingController.update);
router.delete('/:id', packingController.remove);

export default router;
