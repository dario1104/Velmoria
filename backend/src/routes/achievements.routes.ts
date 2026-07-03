import { Router } from 'express';
import * as achievementsController from '../controllers/achievements.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.use(authenticate);

router.get('/', achievementsController.listUserAchievements);
router.get('/badges', achievementsController.getAllBadges);

export default router;
