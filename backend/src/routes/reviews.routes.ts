import { Router } from 'express';
import * as reviewsController from '../controllers/reviews.controller';
import { authenticate } from '../middleware/authenticate';
import { createReviewValidator, updateReviewValidator } from '../validators/reviews.validators';

const router = Router();

router.use(authenticate);

router.get('/', reviewsController.findAll);
router.post('/', createReviewValidator, reviewsController.create);
router.get('/place/:poiId', reviewsController.getByPlace);
router.get('/:id', reviewsController.findOne);
router.patch('/:id', updateReviewValidator, reviewsController.update);
router.delete('/:id', reviewsController.remove);

export default router;
