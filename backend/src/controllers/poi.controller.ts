import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { poiService } from '../services/poi.service';

export async function search(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await poiService.search(req.query as any);
    res.json(results);
  } catch (err) {
    next(err);
  }
}

export async function getNearby(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await poiService.getNearby(req.query as any);
    res.json(results);
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
    const poi = await poiService.create(req.body);
    res.status(201).json(poi);
  } catch (err) {
    next(err);
  }
}

export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const pois = await poiService.findAll(req.query as any);
    res.json(pois);
  } catch (err) {
    next(err);
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    const poi = await poiService.findOne(id);
    res.json(poi);
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
    const poi = await poiService.update(id, req.body);
    res.json(poi);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    await poiService.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
