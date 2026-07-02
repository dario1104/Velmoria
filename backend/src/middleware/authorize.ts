import { Request, Response, NextFunction } from 'express';

export function authorize(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Non autenticato' });
      return;
    }

    if (roles.length > 0) {
      const userRole = (req.user as any).role;
      if (!userRole || !roles.includes(userRole)) {
        res.status(403).json({ error: 'Permessi insufficienti' });
        return;
      }
    }

    next();
  };
}
