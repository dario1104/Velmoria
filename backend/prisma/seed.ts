import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('Test1234', 12);
  const user = await prisma.user.upsert({
    where: { email: 'test@velmora.app' },
    update: {},
    create: { email: 'test@velmora.app', password, name: 'Test User' },
  });

  const trip = await prisma.trip.create({
    data: {
      userId: user.id,
      title: 'Weekend a Roma',
      description: 'Visita ai monumenti principali',
      startDate: new Date('2026-07-02T10:00:00Z'),
      endDate: new Date('2026-07-02T18:00:00Z'),
      isActive: false,
    },
  });

  await prisma.gpsPoint.createMany({
    data: [
      { tripId: trip.id, latitude: 41.9028, longitude: 12.4964, timestamp: new Date('2026-07-02T10:00:00Z') },
      { tripId: trip.id, latitude: 41.9060, longitude: 12.4760, timestamp: new Date('2026-07-02T10:30:00Z') },
      { tripId: trip.id, latitude: 41.8930, longitude: 12.4820, timestamp: new Date('2026-07-02T11:00:00Z') },
    ],
  });

  await prisma.marker.create({
    data: {
      tripId: trip.id,
      latitude: 41.9060,
      longitude: 12.4760,
      type: 'photo',
      content: 'Colosseo',
      mood: 'emozionato',
    },
  });

  console.log('Seed completato con successo');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
