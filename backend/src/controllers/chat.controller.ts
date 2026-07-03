import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { chatService } from '../services/chat.service';

export async function getConversation(req: Request, res: Response, next: NextFunction) {
  const userId = req.params.userId as string;
  try {
    const messages = await chatService.getConversation(req.user!.id, userId);
    res.json(messages);
  } catch (err) {
    next(err);
  }
}

export async function sendMessage(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const message = await chatService.sendMessage(req.user!.id, req.body.receiverId, req.body.content, req.body.tripId);
    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
}

export async function editMessage(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const message = await chatService.editMessage(req.user!.id, id, req.body.content);
    res.json(message);
  } catch (err) {
    next(err);
  }
}

export async function deleteMessage(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    await chatService.deleteMessage(req.user!.id, id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
