import prisma from '../prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
  async register(email: string, password: string, name?: string) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw { statusCode: 409, message: 'Email già registrata' };
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
      throw { statusCode: 401, message: 'Credenziali non valide' };
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw { statusCode: 401, message: 'Credenziali non valide' };
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
      throw { statusCode: 401, message: 'Refresh token non valido' };
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
}

export const authService = new AuthService();
