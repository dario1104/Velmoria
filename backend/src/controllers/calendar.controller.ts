import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { calendarService } from '../services/calendar.service';

export async function create(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const event = await calendarService.create(req.user!.id, req.body);
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
}

export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const events = await calendarService.findAll(req.user!.id);
    res.json(events);
  } catch (err) {
    next(err);
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    const event = await calendarService.findOne(req.user!.id, id);
    res.json(event);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const event = await calendarService.update(req.user!.id, id, req.body);
    res.json(event);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    await calendarService.remove(req.user!.id, id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function getByDate(req: Request, res: Response, next: NextFunction) {
  try {
    const events = await calendarService.getByDate(req.user!.id, req.query.date as string);
    res.json(events);
  } catch (err) {
    next(err);
  }
}

export async function getByTrip(req: Request, res: Response, next: NextFunction) {
  const tripId = req.params.tripId as string;
  try {
    const events = await calendarService.getByTrip(req.user!.id, tripId);
    res.json(events);
  } catch (err) {
    next(err);
  }
}
