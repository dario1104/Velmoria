import { Request, Response, NextFunction } from 'express';
import { notificationService } from '../services/notification.service';

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const notifications = await notificationService.list(req.user!.id);
    res.json(notifications);
  } catch (err) {
    next(err);
  }
}

export async function markRead(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    await notificationService.markRead(req.user!.id, id);
    res.json({ message: 'Notifica segnata come letta' });
  } catch (err) {
    next(err);
  }
}

export async function markAllRead(req: Request, res: Response, next: NextFunction) {
  try {
    await notificationService.markAllRead(req.user!.id);
    res.json({ message: 'Tutte le notifiche segnate come lette' });
  } catch (err) {
    next(err);
  }
}

export async function getUnreadCount(req: Request, res: Response, next: NextFunction) {
  try {
    const count = await notificationService.getUnreadCount(req.user!.id);
    res.json({ count });
  } catch (err) {
    next(err);
  }
}
