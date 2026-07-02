import { Request, Response, NextFunction } from 'express';
import { mediaService } from '../services/media.service';
import prisma from '../prisma/client';

export async function findByMarker(req: Request, res: Response, next: NextFunction) {
  const markerId = req.params.markerId as string;
  try {
    const media = await mediaService.findByMarker(markerId);
    res.json(media);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    await mediaService.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
