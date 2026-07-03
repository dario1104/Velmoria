import { Router } from 'express';
import * as favoritesController from '../controllers/favorites.controller';
import { authenticate } from '../middleware/authenticate';
import { addFavoriteValidator } from '../validators/favorites.validators';

const router = Router();

router.use(authenticate);

router.get('/', favoritesController.list);
router.post('/', addFavoriteValidator, favoritesController.add);
router.delete('/:poiId', favoritesController.remove);

export default router;
