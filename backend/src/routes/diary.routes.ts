import { Router } from 'express';
import * as diaryController from '../controllers/diary.controller';
import { authenticate } from '../middleware/authenticate';
import { createDiaryEntryValidator, updateDiaryEntryValidator } from '../validators/diary.validators';

const router = Router();

router.use(authenticate);

router.get('/', diaryController.findAll);
router.post('/', createDiaryEntryValidator, diaryController.create);
router.get('/trip/:tripId', diaryController.getByTrip);
router.get('/:id', diaryController.findOne);
router.patch('/:id', updateDiaryEntryValidator, diaryController.update);
router.delete('/:id', diaryController.remove);

export default router;
