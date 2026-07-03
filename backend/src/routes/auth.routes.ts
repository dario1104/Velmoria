import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { authenticate } from '../middleware/authenticate';
import {
  registerValidator,
  loginValidator,
  refreshValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
  updateProfileValidator,
  verify2faValidator,
} from '../validators/auth.validators';

const router = Router();

router.post('/register', registerValidator, authController.register);
router.post('/login', loginValidator, authController.login);
router.post('/verify-2fa', verify2faValidator, authController.verify2fa);
router.post('/refresh', refreshValidator, authController.refresh);
router.post('/forgot-password', forgotPasswordValidator, authController.forgotPassword);
router.post('/reset-password', resetPasswordValidator, authController.resetPassword);
router.get('/verify-email/:token', authController.verifyEmail);

router.use(authenticate);

router.get('/profile', authController.profile);
router.patch('/profile', updateProfileValidator, authController.updateProfile);
router.post('/change-password', changePasswordValidator, authController.changePassword);
router.delete('/account', authController.deleteAccount);
router.get('/settings', authController.getSettings);
router.patch('/settings', authController.updateSettings);

export default router;
