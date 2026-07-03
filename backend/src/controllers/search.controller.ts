import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { searchService } from '../services/search.service';

export async function search(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const results = await searchService.search(req.query as any, req.user!.id);
    res.json(results);
  } catch (err) {
    next(err);
  }
}
