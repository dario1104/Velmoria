import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  if (err && typeof err === 'object' && 'statusCode' in err && 'message' in err) {
    const e = err as { statusCode: number; message: string };
    res.status(e.statusCode).json({ error: e.message });
    return;
  }

  console.error('Errore non gestito:', err);
  res.status(500).json({ error: err instanceof Error ? err.message : 'Errore interno del server', stack: err instanceof Error ? err.stack : undefined });
}
