import { Router } from 'express';
import * as poiController from '../controllers/poi.controller';
import { authenticate } from '../middleware/authenticate';
import {
  createPoiValidator,
  updatePoiValidator,
  searchPoiValidator,
  nearbyPoiValidator,
} from '../validators/poi.validators';

const router = Router();

router.use(authenticate);

router.get('/', poiController.findAll);
router.get('/search', searchPoiValidator, poiController.search);
router.get('/nearby', nearbyPoiValidator, poiController.getNearby);
router.post('/', createPoiValidator, poiController.create);
router.get('/:id', poiController.findOne);
router.patch('/:id', updatePoiValidator, poiController.update);
router.delete('/:id', poiController.remove);

export default router;
