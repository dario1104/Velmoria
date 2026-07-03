import { Router } from 'express';
import * as adminController from '../controllers/admin.controller';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';
import {
  updateUserRoleValidator,
  moderateContentValidator,
  createCategoryValidator,
  updateCategoryValidator,
} from '../validators/admin.validators';

const router = Router();

router.use(authenticate);
router.use(authorize('admin'));

router.get('/users', adminController.getUsers);
router.get('/users/:userId', adminController.getUser);
router.patch('/users/:userId/role', updateUserRoleValidator, adminController.updateUserRole);
router.delete('/users/:userId', adminController.deleteUser);

router.get('/reports', adminController.getReports);
router.patch('/reports/:id/resolve', adminController.resolveReport);
router.post('/moderate', moderateContentValidator, adminController.moderateContent);

router.get('/stats', adminController.getStats);

router.get('/categories', adminController.getCategories);
router.post('/categories', createCategoryValidator, adminController.createCategory);
router.patch('/categories/:id', updateCategoryValidator, adminController.updateCategory);
router.delete('/categories/:id', adminController.deleteCategory);

export default router;
