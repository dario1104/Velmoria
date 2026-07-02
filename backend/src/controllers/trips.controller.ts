import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { tripsService } from '../services/trips.service';

export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const trips = await tripsService.findAll(req.user!.id);
    res.json(trips);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const trip = await tripsService.create(req.user!.id, req.body.title, req.body.description);
    res.status(201).json(trip);
  } catch (err) {
    next(err);
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    const trip = await tripsService.findOne(req.user!.id, id);
    res.json(trip);
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
    const trip = await tripsService.update(req.user!.id, id, req.body);
    res.json(trip);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    await tripsService.remove(req.user!.id, id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function finish(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    const trip = await tripsService.finish(req.user!.id, id);
    res.json(trip);
  } catch (err) {
    next(err);
  }
}

export async function stats(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    const result = await tripsService.getStats(req.user!.id, id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
