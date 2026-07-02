import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { markersService } from '../services/markers.service';

export async function findByTrip(req: Request, res: Response, next: NextFunction) {
  const tripId = req.params.tripId as string;
  try {
    const markers = await markersService.findByTrip(tripId);
    res.json(markers);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  const tripId = req.params.tripId as string;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const marker = await markersService.create(tripId, req.body);
    res.status(201).json(marker);
  } catch (err) {
    next(err);
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    const marker = await markersService.findOne(id);
    res.json(marker);
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
    const marker = await markersService.update(id, req.body);
    res.json(marker);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    await markersService.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
