import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { friendsService } from '../services/friends.service';

export async function sendRequest(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const request = await friendsService.sendRequest(req.user!.id, req.body.receiverId, req.body.message);
    res.status(201).json(request);
  } catch (err) {
    next(err);
  }
}

export async function acceptRequest(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    const result = await friendsService.acceptRequest(id, req.user!.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function rejectRequest(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    await friendsService.rejectRequest(id, req.user!.id);
    res.json({ message: 'Richiesta rifiutata' });
  } catch (err) {
    next(err);
  }
}

export async function cancelRequest(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    await friendsService.cancelRequest(id, req.user!.id);
    res.json({ message: 'Richiesta annullata' });
  } catch (err) {
    next(err);
  }
}

export async function removeFriend(req: Request, res: Response, next: NextFunction) {
  const friendId = req.params.friendId as string;
  try {
    await friendsService.removeFriend(req.user!.id, friendId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function getFriends(req: Request, res: Response, next: NextFunction) {
  try {
    const friends = await friendsService.getFriends(req.user!.id);
    res.json(friends);
  } catch (err) {
    next(err);
  }
}

export async function getFollowers(req: Request, res: Response, next: NextFunction) {
  try {
    const followers = await friendsService.getFollowers(req.user!.id);
    res.json(followers);
  } catch (err) {
    next(err);
  }
}

export async function getFollowing(req: Request, res: Response, next: NextFunction) {
  try {
    const following = await friendsService.getFollowing(req.user!.id);
    res.json(following);
  } catch (err) {
    next(err);
  }
}

export async function searchUsers(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const users = await friendsService.searchUsers(req.body.query, req.user!.id);
    res.json(users);
  } catch (err) {
    next(err);
  }
}
