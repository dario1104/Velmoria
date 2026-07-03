import { Router } from 'express';
import * as expensesController from '../controllers/expenses.controller';
import { authenticate } from '../middleware/authenticate';
import { createExpenseValidator, updateExpenseValidator, splitExpenseValidator } from '../validators/expenses.validators';

const router = Router();

router.use(authenticate);

router.post('/', createExpenseValidator, expensesController.create);
router.get('/history', expensesController.getHistory);
router.get('/trip/:tripId', expensesController.findByTrip);
router.get('/trip/:tripId/balance', expensesController.getBalance);
router.get('/:id', expensesController.findOne);
router.patch('/:id', updateExpenseValidator, expensesController.update);
router.delete('/:id', expensesController.remove);
router.post('/:id/split', splitExpenseValidator, expensesController.split);

export default router;
