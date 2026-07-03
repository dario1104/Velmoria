import crypto from 'crypto';
import bcrypt from 'bcrypt';
import prisma from '../prisma/client';

export function generaCodice(): string {
  return crypto.randomInt(100000, 999999).toString();
}

export async function creaCodice(userId: string, tipo: string = '2fa_login'): Promise<string> {
  const codice = generaCodice();
  const hash = await bcrypt.hash(codice, 6);
  const scadenza = new Date(Date.now() + 15 * 60 * 1000);

  await prisma.$transaction(async (tx) => {
    await tx.codiceVerifica.updateMany({
      where: { userId, tipo, usato: false },
      data: { usato: true },
    });
    await tx.codiceVerifica.create({
      data: { userId, codice: hash, tipo, scadenza },
    });
  });

  return codice;
}

export async function verificaCodice(userId: string, codice: string, tipo: string = '2fa_login'): Promise<boolean> {
  const records = await prisma.codiceVerifica.findMany({
    where: {
      userId, tipo, usato: false,
      scadenza: { gte: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  });

  for (const record of records) {
    const match = await bcrypt.compare(codice, record.codice);
    if (match) {
      await prisma.codiceVerifica.update({ where: { id: record.id }, data: { usato: true } });
      return true;
    }
  }
  return false;
}
