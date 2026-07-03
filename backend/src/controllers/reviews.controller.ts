import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { reviewsService } from '../services/reviews.service';

export async function create(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const review = await reviewsService.create(req.user!.id, req.body);
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
}

export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const reviews = await reviewsService.findAll(req.user!.id);
    res.json(reviews);
  } catch (err) {
    next(err);
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    const review = await reviewsService.findOne(id);
    res.json(review);
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
    const review = await reviewsService.update(id, req.user!.id, req.body);
    res.json(review);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    await reviewsService.remove(id, req.user!.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function getByPlace(req: Request, res: Response, next: NextFunction) {
  const poiId = req.params.poiId as string;
  try {
    const reviews = await reviewsService.getByPlace(poiId);
    res.json(reviews);
  } catch (err) {
    next(err);
  }
}
