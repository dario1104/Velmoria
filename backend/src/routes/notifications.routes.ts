import { Router } from 'express';
import * as notificationsController from '../controllers/notifications.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.use(authenticate);

router.get('/', notificationsController.list);
router.get('/unread-count', notificationsController.getUnreadCount);
router.patch('/:id/read', notificationsController.markRead);
router.patch('/read-all', notificationsController.markAllRead);

export default router;
