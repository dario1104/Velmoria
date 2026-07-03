import { Request, Response, NextFunction } from 'express';
import { mediaService } from '../services/media.service';

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

export async function uploadWithThumbnail(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Nessun file caricato' });
      return;
    }

    const result = await mediaService.uploadWithThumbnail(req.body.markerId, req.body.type, req.file, req.body.generateThumbnail !== 'false');
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}
