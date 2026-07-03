import { Router } from 'express';
import * as tripsController from '../controllers/trips.controller';
import { authenticate } from '../middleware/authenticate';
import {
  createTripValidator,
  updateTripValidator,
  addMemberValidator,
  updateMemberRoleValidator,
} from '../validators/trips.validators';

const router = Router();

router.get('/public', tripsController.getPublicTrips);
router.get('/user/:userId', tripsController.getTripsByUser);

router.use(authenticate);

router.get('/', tripsController.findAll);
router.post('/', createTripValidator, tripsController.create);
router.get('/:id', tripsController.findOne);
router.patch('/:id', updateTripValidator, tripsController.update);
router.delete('/:id', tripsController.remove);
router.post('/:id/finish', tripsController.finish);
router.get('/:id/stats', tripsController.stats);
router.post('/:id/duplicate', tripsController.duplicate);

router.post('/:id/members', addMemberValidator, tripsController.addMember);
router.get('/:id/members', tripsController.getMembers);
router.delete('/:id/members/:memberId', tripsController.removeMember);
router.patch('/:id/members/:memberId', updateMemberRoleValidator, tripsController.updateMemberRole);

router.post('/:id/invite', tripsController.inviteCollaborator);
router.get('/:id/invites', tripsController.getInvites);
router.patch('/:id/visibility', tripsController.setVisibility);

export default router;
