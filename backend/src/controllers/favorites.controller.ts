import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { favoritesService } from '../services/favorites.service';

export async function add(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const favorite = await favoritesService.add(req.user!.id, req.body.poiId);
    res.status(201).json(favorite);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  const poiId = req.params.poiId as string;
  try {
    await favoritesService.remove(req.user!.id, poiId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const favorites = await favoritesService.list(req.user!.id);
    res.json(favorites);
  } catch (err) {
    next(err);
  }
}
