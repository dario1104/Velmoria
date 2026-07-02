import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { authenticate } from '../middleware/authenticate';
import { registerValidator, loginValidator, refreshValidator } from '../validators/auth.validators';

const router = Router();

router.post('/register', registerValidator, authController.register);
router.post('/login', loginValidator, authController.login);
router.post('/refresh', refreshValidator, authController.refresh);
router.get('/profile', authenticate, authController.profile);

export default router;
