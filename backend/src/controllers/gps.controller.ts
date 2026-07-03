import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { gpsService } from '../services/gps.service';

export async function getPoints(req: Request, res: Response, next: NextFunction) {
  const tripId = req.params.tripId as string;
  try {
    const points = await gpsService.getPoints(tripId);
    res.json(points);
  } catch (err) {
    next(err);
  }
}

export async function createPoint(req: Request, res: Response, next: NextFunction) {
  const tripId = req.params.tripId as string;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const point = await gpsService.createPoint(tripId, { ...req.body, userId: req.user!.id });
    res.status(201).json(point);
  } catch (err) {
    next(err);
  }
}

export async function createBatch(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const pointsWithUser = req.body.points.map((p: any) => ({ ...p, userId: req.user!.id }));
    const result = await gpsService.createBatch(pointsWithUser);
    res.status(201).json({ count: result.count });
  } catch (err) {
    next(err);
  }
}
