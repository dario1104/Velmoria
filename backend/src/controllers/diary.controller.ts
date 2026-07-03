import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { diaryService } from '../services/diary.service';

export async function create(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const entry = await diaryService.create(req.user!.id, req.body);
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
}

export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const entries = await diaryService.findAll(req.user!.id);
    res.json(entries);
  } catch (err) {
    next(err);
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    const entry = await diaryService.findOne(req.user!.id, id);
    res.json(entry);
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
    const entry = await diaryService.update(req.user!.id, id, req.body);
    res.json(entry);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    await diaryService.remove(req.user!.id, id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function getByTrip(req: Request, res: Response, next: NextFunction) {
  const tripId = req.params.tripId as string;
  try {
    const entries = await diaryService.getByTrip(tripId);
    res.json(entries);
  } catch (err) {
    next(err);
  }
}
