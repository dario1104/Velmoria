import { Request, Response, NextFunction } from 'express';
import { replayService } from '../services/replay.service';

export async function getReplayData(req: Request, res: Response, next: NextFunction) {
  const tripId = req.params.tripId as string;
  try {
    const data = await replayService.getReplayData(tripId);
    res.json(data);
  } catch (err) {
    next(err);
  }
}
