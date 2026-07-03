import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { expensesService } from '../services/expenses.service';

export async function create(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const expense = await expensesService.create(req.user!.id, req.body);
    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
}

export async function findByTrip(req: Request, res: Response, next: NextFunction) {
  const tripId = req.params.tripId as string;
  try {
    const expenses = await expensesService.findByTrip(tripId);
    res.json(expenses);
  } catch (err) {
    next(err);
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    const expense = await expensesService.findOne(id);
    res.json(expense);
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
    const expense = await expensesService.update(id, req.body);
    res.json(expense);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  try {
    await expensesService.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function split(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id as string;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const result = await expensesService.split(id, req.body.splits);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getBalance(req: Request, res: Response, next: NextFunction) {
  const tripId = req.params.tripId as string;
  try {
    const balance = await expensesService.getBalance(tripId);
    res.json(balance);
  } catch (err) {
    next(err);
  }
}

export async function getHistory(req: Request, res: Response, next: NextFunction) {
  try {
    const history = await expensesService.getHistory(req.user!.id);
    res.json(history);
  } catch (err) {
    next(err);
  }
}
