import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { adminService } from '../services/admin.service';

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await adminService.getUsers(req.query as any);
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  const userId = req.params.userId as string;
  try {
    const user = await adminService.getUser(userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function updateUserRole(req: Request, res: Response, next: NextFunction) {
  const userId = req.params.userId as string;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const user = await adminService.updateUserRole(userId, req.body.role);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const userId = req.params.userId as string;
  try {
    await adminService.deleteUser(userId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function getReports(req: Request, res: Response, next: NextFunction) {
  try {
    const reports = await adminService.getReports(req.query as any);
    res.json(reports);
  } catch (err) {
    next(err);
  }
}

export async function resolveReport(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    const report = await adminService.resolveReport(id, req.body.action);
    res.json(report);
  } catch (err) {
    next(err);
  }
}

export async function moderateContent(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const result = await adminService.moderateContent(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getStats(req: Request, res: Response, next: NextFunction) {
  try {
    const stats = await adminService.getStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
}

export async function getCategories(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await adminService.getCategories();
    res.json(categories);
  } catch (err) {
    next(err);
  }
}

export async function createCategory(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const category = await adminService.createCategory(req.body);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
}

export async function updateCategory(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const category = await adminService.updateCategory(id, req.body);
    res.json(category);
  } catch (err) {
    next(err);
  }
}

export async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    await adminService.deleteCategory(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
