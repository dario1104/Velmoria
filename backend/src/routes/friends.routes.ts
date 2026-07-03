import { Router } from 'express';
import * as friendsController from '../controllers/friends.controller';
import { authenticate } from '../middleware/authenticate';
import {
  sendRequestValidator,
  requestIdParamValidator,
  friendIdParamValidator,
  searchUsersValidator,
} from '../validators/friends.validators';

const router = Router();

router.use(authenticate);

router.get('/', friendsController.getFriends);
router.get('/followers', friendsController.getFollowers);
router.get('/following', friendsController.getFollowing);
router.post('/search', searchUsersValidator, friendsController.searchUsers);
router.post('/request', sendRequestValidator, friendsController.sendRequest);
router.patch('/request/:id/accept', requestIdParamValidator, friendsController.acceptRequest);
router.patch('/request/:id/reject', requestIdParamValidator, friendsController.rejectRequest);
router.delete('/request/:id', requestIdParamValidator, friendsController.cancelRequest);
router.delete('/:friendId', friendIdParamValidator, friendsController.removeFriend);

export default router;
