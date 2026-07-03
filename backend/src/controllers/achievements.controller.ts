import { Request, Response, NextFunction } from 'express';
import { achievementsService } from '../services/achievements.service';

export async function listUserAchievements(req: Request, res: Response, next: NextFunction) {
  try {
    const achievements = await achievementsService.listUserAchievements(req.user!.id);
    res.json(achievements);
  } catch (err) {
    next(err);
  }
}

export async function getAllBadges(req: Request, res: Response, next: NextFunction) {
  try {
    const badges = await achievementsService.getAllBadges();
    res.json(badges);
  } catch (err) {
    next(err);
  }
}
