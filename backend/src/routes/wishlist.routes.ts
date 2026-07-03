import { Router } from 'express';
import * as wishlistController from '../controllers/wishlist.controller';
import { authenticate } from '../middleware/authenticate';
import { createWishlistValidator, updateWishlistValidator } from '../validators/wishlist.validators';

const router = Router();

router.use(authenticate);

router.get('/', wishlistController.findAll);
router.post('/', createWishlistValidator, wishlistController.create);
router.get('/:id', wishlistController.findOne);
router.patch('/:id', updateWishlistValidator, wishlistController.update);
router.delete('/:id', wishlistController.remove);

export default router;
