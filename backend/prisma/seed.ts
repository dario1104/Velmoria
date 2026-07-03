import prisma from '../src/prisma/client';
import * as bcrypt from 'bcrypt';

async function main() {
  const password = await bcrypt.hash('Test1234', 12);
  const user = await prisma.user.upsert({
    where: { email: 'test@velmoria.app' },
    update: {},
    create: { email: 'test@velmoria.app', password, name: 'Test User' },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'amico@velmoria.app' },
    update: {},
    create: { email: 'amico@velmoria.app', password, name: 'Amico Utente' },
  });

  const trip = await prisma.trip.create({
    data: {
      userId: user.id,
      title: 'Weekend a Roma',
      description: 'Visita ai monumenti principali',
      startDate: new Date('2026-07-02T10:00:00Z'),
      endDate: new Date('2026-07-02T18:00:00Z'),
      isActive: false,
      countries: ['Italia'],
      cities: ['Roma'],
    },
  });

  await prisma.tripMember.create({
    data: { tripId: trip.id, userId: user.id, role: 'owner', color: '#7c4dff' },
  });

  await prisma.gpsPoint.createMany({
    data: [
      { tripId: trip.id, userId: user.id, latitude: 41.9028, longitude: 12.4964, timestamp: new Date('2026-07-02T10:00:00Z') },
      { tripId: trip.id, userId: user.id, latitude: 41.9060, longitude: 12.4760, timestamp: new Date('2026-07-02T10:30:00Z') },
      { tripId: trip.id, userId: user.id, latitude: 41.8930, longitude: 12.4820, timestamp: new Date('2026-07-02T11:00:00Z') },
    ],
  });

  const marker = await prisma.marker.create({
    data: {
      tripId: trip.id,
      userId: user.id,
      latitude: 41.9060,
      longitude: 12.4760,
      type: 'photo',
      category: 'monumento',
      content: 'Colosseo',
      mood: 'emozionato',
      rating: 5,
      placeName: 'Colosseo',
    },
  });

  await prisma.diaryEntry.create({
    data: {
      tripId: trip.id,
      userId: user.id,
      date: new Date('2026-07-02'),
      title: 'Giorno 1 - Arrivo a Roma',
      content: 'Visita al Colosseo e ai Fori Imperiali. Giornata magnifica!',
      mood: 'felice',
      weather: 'soleggiato',
    },
  });

  await prisma.wishlistTrip.create({
    data: {
      userId: user.id,
      title: 'Giappone',
      description: 'Viaggio in Giappone da fare assolutamente',
      destination: 'Tokyo, Giappone',
      latitude: 35.6762,
      longitude: 139.6503,
      priority: 5,
    },
  });

  await prisma.pointOfInterest.create({
    data: {
      name: 'Colosseo',
      description: 'Anfiteatro Flavio, simbolo di Roma',
      latitude: 41.8902,
      longitude: 12.4922,
      category: 'monumento',
      rating: 4.7,
      tags: ['storico', 'archeologia', 'impero_romano'],
    },
  });

  await prisma.pointOfInterest.create({
    data: {
      name: 'Fontana di Trevi',
      description: 'La più famosa fontana di Roma',
      latitude: 41.9009,
      longitude: 12.4833,
      category: 'monumento',
      rating: 4.6,
      tags: ['barocco', 'fontana', 'gratuito'],
    },
  });

  await prisma.pointOfInterest.create({
    data: {
      name: 'Galleria Borghese',
      description: 'Museo con capolavori di Bernini, Caravaggio e Raffaello',
      latitude: 41.9142,
      longitude: 12.4921,
      category: 'museo',
      rating: 4.8,
      tags: ['arte', 'rinascimento', 'scultura'],
    },
  });

  await prisma.calendarEvent.create({
    data: {
      tripId: trip.id,
      userId: user.id,
      title: 'Visita Colosseo',
      description: 'Tour guidato del Colosseo',
      location: 'Colosseo, Roma',
      startTime: new Date('2026-07-02T09:00:00Z'),
      endTime: new Date('2026-07-02T12:00:00Z'),
      category: 'visita',
    },
  });

  await prisma.userAchievement.create({
    data: {
      userId: user.id,
      badge: 'first_trip',
      title: 'Primo Viaggio',
      icon: 'map-outline',
    },
  });

  await prisma.transportLog.create({
    data: {
      tripId: trip.id,
      userId: user.id,
      type: 'treno',
      distance: 300,
      duration: 5400,
      startTime: new Date('2026-07-02T06:00:00Z'),
      fromPlace: 'Firenze',
      toPlace: 'Roma Termini',
    },
  });

  await prisma.friendRequest.create({
    data: {
      senderId: user.id,
      receiverId: user2.id,
      status: 'pending',
    },
  });

  console.log('Seed completato con successo');
  console.log(`Email: test@velmoria.app / Password: Test1234`);
  console.log(`Email: amico@velmoria.app / Password: Test1234`);
  console.log(`Totale utenti: 2, Viaggi: 1, POI: 3`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
