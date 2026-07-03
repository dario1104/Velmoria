import { Router } from 'express';
import * as calendarController from '../controllers/calendar.controller';
import { authenticate } from '../middleware/authenticate';
import {
  createCalendarEventValidator,
  updateCalendarEventValidator,
  getByDateValidator,
} from '../validators/calendar.validators';

const router = Router();

router.use(authenticate);

router.get('/', calendarController.findAll);
router.post('/', createCalendarEventValidator, calendarController.create);
router.get('/by-date', getByDateValidator, calendarController.getByDate);
router.get('/:id', calendarController.findOne);
router.patch('/:id', updateCalendarEventValidator, calendarController.update);
router.delete('/:id', calendarController.remove);
router.get('/trip/:tripId', calendarController.getByTrip);

export default router;
