import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { authService } from '../services/auth.service';
import { creaCodice, verificaCodice } from '../services/codice-verifica.service';
import { sendCodiceVerifica } from '../services/email.service';

export async function register(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const result = await authService.register(req.body.email, req.body.password, req.body.name, req.body.bio, req.body.phone);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const user = await authService.verifyCredentials(req.body.email, req.body.password);
    const codice = await creaCodice(user.id, '2fa_login');
    await sendCodiceVerifica(user.email, codice);
    res.json({ require2fa: true, userId: user.id, email: user.email });
  } catch (err) {
    next(err);
  }
}

export async function verify2fa(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const valido = await verificaCodice(req.body.userId, req.body.codice, '2fa_login');
    if (!valido) {
      res.status(401).json({ error: 'Codice non valido o scaduto' });
      return;
    }
    const result = await authService.completeLogin(req.body.userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const result = await authService.refresh(req.body.refreshToken);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function profile(req: Request, res: Response) {
  const user = await authService.getProfile(req.user!.id);
  res.json(user);
}

export async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    await authService.forgotPassword(req.body.email);
    res.json({ message: 'Email di reset inviata' });
  } catch (err) {
    next(err);
  }
}

export async function resetPassword(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    await authService.resetPassword(req.body.token, req.body.password);
    res.json({ message: 'Password reimpostata con successo' });
  } catch (err) {
    next(err);
  }
}

export async function verifyEmail(req: Request, res: Response, next: NextFunction) {
  try {
    await authService.verifyEmail(req.params.token as string);
    res.json({ message: 'Email verificata con successo' });
  } catch (err) {
    next(err);
  }
}

export async function changePassword(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    await authService.changePassword(req.user!.id, req.body.oldPassword, req.body.newPassword);
    res.json({ message: 'Password cambiata con successo' });
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const user = await authService.updateProfile(req.user!.id, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function deleteAccount(req: Request, res: Response, next: NextFunction) {
  try {
    await authService.deleteAccount(req.user!.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function getSettings(req: Request, res: Response, next: NextFunction) {
  try {
    const settings = await authService.getSettings(req.user!.id);
    res.json(settings);
  } catch (err) {
    next(err);
  }
}

export async function updateSettings(req: Request, res: Response, next: NextFunction) {
  try {
    const settings = await authService.updateSettings(req.user!.id, req.body);
    res.json(settings);
  } catch (err) {
    next(err);
  }
}
