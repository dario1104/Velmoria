import { Router } from 'express';
import * as chatController from '../controllers/chat.controller';
import { authenticate } from '../middleware/authenticate';
import { sendMessageValidator, editMessageValidator } from '../validators/chat.validators';

const router = Router();

router.use(authenticate);

router.get('/conversation/:userId', chatController.getConversation);
router.post('/', sendMessageValidator, chatController.sendMessage);
router.patch('/:id', editMessageValidator, chatController.editMessage);
router.delete('/:id', chatController.deleteMessage);

export default router;
