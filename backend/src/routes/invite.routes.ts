import { Router } from 'express';
import * as tripsController from '../controllers/trips.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.use(authenticate);

router.get('/invites', tripsController.getMyInvites);
router.patch('/invites/:id/accept', tripsController.acceptInvite);
router.patch('/invites/:id/reject', tripsController.rejectInvite);

export default router;
