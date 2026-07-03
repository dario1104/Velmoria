import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { wishlistService } from '../services/wishlist.service';

export async function create(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const item = await wishlistService.create(req.user!.id, req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const items = await wishlistService.findAll(req.user!.id);
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    const item = await wishlistService.findOne(req.user!.id, id);
    res.json(item);
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
    const item = await wishlistService.update(req.user!.id, id, req.body);
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    await wishlistService.remove(req.user!.id, id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
