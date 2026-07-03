import prisma from '../prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from '../middleware/errorHandler';

export class AuthService {
  async register(email: string, password: string, name?: string) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new AppError(409, 'Email già registrata');
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, password: hashed, name },
    });

    const tokens = this.generateTokens(user.id, user.email);
    return {
      user: { id: user.id, email: user.email, name: user.name },
      ...tokens,
    };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new AppError(401, 'Credenziali non valide');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AppError(401, 'Credenziali non valide');
    }

    const tokens = this.generateTokens(user.id, user.email);
    return {
      user: { id: user.id, email: user.email, name: user.name },
      ...tokens,
    };
  }

  async refresh(token: string) {
    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET || 'refresh-secret'
      ) as { sub: string; email: string };

      return this.generateTokens(payload.sub, payload.email);
    } catch {
      throw new AppError(401, 'Refresh token non valido');
    }
  }

  private generateTokens(userId: string, email: string) {
    const payload = { id: userId, email };
    const expiresIn = parseInt(process.env.JWT_EXPIRES_IN || '86400', 10);

    return {
      accessToken: jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
        expiresIn,
      }),
      refreshToken: jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET || 'refresh-secret',
        { expiresIn: parseInt(process.env.JWT_REFRESH_EXPIRES_IN || '604800', 10) }
      ),
      expiresIn,
    };
  }

  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new AppError(404, 'Utente non trovato');
    }
    return { message: 'Email di reset inviata' };
  }

  async resetPassword(token: string, newPassword: string) {
    throw new AppError(400, 'Token non valido o scaduto');
  }

  async verifyEmail(token: string) {
    throw new AppError(400, 'Token non valido');
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new AppError(404, 'Utente non trovato');
    }
    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) {
      throw new AppError(401, 'Password attuale non corretta');
    }
    const hashed = await bcrypt.hash(newPassword, 12);
    return prisma.user.update({ where: { id: userId }, data: { password: hashed } });
  }

  async updateProfile(userId: string, data: { name?: string; avatarUrl?: string; bio?: string; phone?: string }) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new AppError(404, 'Utente non trovato');
    }
    return prisma.user.update({ where: { id: userId }, data });
  }

  async deleteAccount(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new AppError(404, 'Utente non trovato');
    }
    return prisma.user.delete({ where: { id: userId } });
  }

  async getSettings(userId: string) {
    let settings = await prisma.userSettings.findUnique({ where: { userId } });
    if (!settings) {
      settings = await prisma.userSettings.create({ data: { userId } });
    }
    return settings;
  }

  async updateSettings(userId: string, data: Record<string, unknown>) {
    await this.getSettings(userId);
    return prisma.userSettings.update({ where: { userId }, data });
  }
}

export const authService = new AuthService();
