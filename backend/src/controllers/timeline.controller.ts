import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { timelineService } from '../services/timeline.service';

export async function getTimeline(req: Request, res: Response, next: NextFunction) {
  const tripId = req.params.tripId as string;
  try {
    const events = await timelineService.getTimeline(tripId);
    res.json(events);
  } catch (err) {
    next(err);
  }
}

export async function createEvent(req: Request, res: Response, next: NextFunction) {
  const tripId = req.params.tripId as string;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const event = await timelineService.createEvent(tripId, req.user!.id, req.body);
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
}
