import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { tripsService } from '../services/trips.service';

export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const trips = await tripsService.findAll(req.user!.id);
    res.json(trips);
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
    const trip = await tripsService.create(req.user!.id, req.body.title, req.body.description);
    res.status(201).json(trip);
  } catch (err) {
    next(err);
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    const trip = await tripsService.findOne(req.user!.id, id);
    res.json(trip);
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
    const trip = await tripsService.update(req.user!.id, id, req.body);
    res.json(trip);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    await tripsService.remove(req.user!.id, id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function finish(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    const trip = await tripsService.finish(req.user!.id, id);
    res.json(trip);
  } catch (err) {
    next(err);
  }
}

export async function stats(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    const result = await tripsService.getStats(req.user!.id, id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function duplicate(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    const trip = await tripsService.duplicate(req.user!.id, id);
    res.status(201).json(trip);
  } catch (err) {
    next(err);
  }
}

export async function addMember(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const member = await tripsService.addMember(req.user!.id, id, req.body.userId, req.body.role);
    res.status(201).json(member);
  } catch (err) {
    next(err);
  }
}

export async function removeMember(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  const memberId = req.params.memberId as string;
  try {
    await tripsService.removeMember(req.user!.id, id, memberId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function updateMemberRole(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  const memberId = req.params.memberId as string;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const member = await tripsService.updateMemberRole(req.user!.id, id, memberId, req.body.role);
    res.json(member);
  } catch (err) {
    next(err);
  }
}

export async function getMembers(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    const members = await tripsService.getMembers(req.user!.id, id);
    res.json(members);
  } catch (err) {
    next(err);
  }
}

export async function getPublicTrips(req: Request, res: Response, next: NextFunction) {
  try {
    const trips = await tripsService.getPublicTrips(req.query as any);
    res.json(trips);
  } catch (err) {
    next(err);
  }
}

export async function getTripsByUser(req: Request, res: Response, next: NextFunction) {
  const userId = req.params.userId as string;
  try {
    const trips = await tripsService.getTripsByUser(userId);
    res.json(trips);
  } catch (err) {
    next(err);
  }
}

export async function inviteCollaborator(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    const result = await tripsService.inviteCollaborator(req.user!.id, id, req.body.receiverId, req.body.message);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getInvites(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    const invites = await tripsService.getInvites(req.user!.id, id);
    res.json(invites);
  } catch (err) {
    next(err);
  }
}

export async function getMyInvites(req: Request, res: Response, next: NextFunction) {
  try {
    const invites = await tripsService.getMyInvites(req.user!.id);
    res.json(invites);
  } catch (err) {
    next(err);
  }
}

export async function acceptInvite(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    const result = await tripsService.respondToInvite(req.user!.id, id, true);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function rejectInvite(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    const result = await tripsService.respondToInvite(req.user!.id, id, false);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function setVisibility(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    const trip = await tripsService.setVisibility(req.user!.id, id, req.body.visibility);
    res.json(trip);
  } catch (err) {
    next(err);
  }
}
