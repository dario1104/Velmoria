import dotenv from 'dotenv';
dotenv.config();

import prisma from '../src/prisma/client';
import * as bcrypt from 'bcrypt';

async function main() {
  const password = await bcrypt.hash('Test1234!', 12);

  // --- Pulisci dati esistenti (ordine: figli prima dei genitori) ---
  await prisma.timelineEvent.deleteMany();
  await prisma.transportLog.deleteMany();
  await prisma.userAchievement.deleteMany();
  await prisma.calendarEvent.deleteMany();
  await prisma.diaryEntry.deleteMany();
  await prisma.marker.deleteMany();
  await prisma.gpsPoint.deleteMany();
  await prisma.tripMember.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.tripInvite.deleteMany();
  await prisma.friend.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.pointOfInterest.deleteMany();
  await prisma.user.deleteMany();

  // --- Utenti ---
  const user = await prisma.user.create({
    data: { email: 'test@velmoria.app', password, name: 'Mario Rossi' },
  });

  const user2 = await prisma.user.create({
    data: { email: 'amico@velmoria.app', password, name: 'Laura Bianchi' },
  });

  // --- Amicizia ---
  await prisma.friend.createMany({
    data: [
      { userId: user.id, friendId: user2.id },
      { userId: user2.id, friendId: user.id },
    ],
  });

  // --- Viaggio 1: Weekend a Roma (pubblico, completato) ---
  const trip1 = await prisma.trip.create({
    data: {
      id: 'trip-roma-001',
      userId: user.id,
      title: 'Weekend a Roma',
      description: 'Visita ai monumenti principali della capitale',
      startDate: new Date('2026-07-02T10:00:00Z'),
      endDate: new Date('2026-07-02T18:00:00Z'),
      isActive: false,
      visibility: 'public',
      countries: ['Italia'],
      cities: ['Roma'],
      totalDistance: 4.2,
      totalTime: 28800,
    },
  });

  await prisma.tripMember.createMany({
    data: [
      { tripId: trip1.id, userId: user.id, role: 'owner', color: '#7c4dff' },
      { tripId: trip1.id, userId: user2.id, role: 'member', color: '#fc0b7b' },
    ],
  });

  await prisma.gpsPoint.createMany({
    data: [
      { tripId: trip1.id, userId: user.id, latitude: 41.9028, longitude: 12.4964, timestamp: new Date('2026-07-02T10:00:00Z'), speed: 0 },
      { tripId: trip1.id, userId: user.id, latitude: 41.9060, longitude: 12.4760, timestamp: new Date('2026-07-02T10:30:00Z'), speed: 1.2 },
      { tripId: trip1.id, userId: user.id, latitude: 41.8930, longitude: 12.4820, timestamp: new Date('2026-07-02T11:00:00Z'), speed: 0.8 },
      { tripId: trip1.id, userId: user2.id, latitude: 41.8980, longitude: 12.4900, timestamp: new Date('2026-07-02T10:15:00Z'), speed: 0 },
      { tripId: trip1.id, userId: user2.id, latitude: 41.9050, longitude: 12.4780, timestamp: new Date('2026-07-02T10:45:00Z'), speed: 1.0 },
    ],
  });

  await prisma.marker.createMany({
    data: [
      { id: 'marker-colosseo', tripId: trip1.id, userId: user.id, latitude: 41.8902, longitude: 12.4922, type: 'monumento', category: 'storico', content: 'Il Colosseo è semplicemente spettacolare!', mood: 'emozionato', rating: 5, placeName: 'Colosseo' },
      { id: 'marker-trevi', tripId: trip1.id, userId: user2.id, latitude: 41.9009, longitude: 12.4833, type: 'monumento', category: 'barocco', content: 'Fontana di Trevi, lanciata una monetina!', mood: 'felice', rating: 5, placeName: 'Fontana di Trevi' },
      { id: 'marker-carbonara', tripId: trip1.id, userId: user.id, latitude: 41.9012, longitude: 12.4785, type: 'food', category: 'ristorante', content: 'La miglior carbonara di sempre da Da Enzo', mood: 'felice', rating: 5, placeName: 'Da Enzo al 29' },
    ],
  });

  // --- Viaggio 2: Trekking Dolomiti (privato, in corso) ---
  const trip2 = await prisma.trip.create({
    data: {
      id: 'trip-dolomiti-002',
      userId: user.id,
      title: 'Trekking Dolomiti',
      description: "Escursione tra le montagne più belle d'Italia",
      startDate: new Date(),
      isActive: true,
      visibility: 'private',
      countries: ['Italia'],
      cities: ['Bolzano', "Cortina d'Ampezzo"],
    },
  });

  await prisma.tripMember.create({
    data: { tripId: trip2.id, userId: user.id, role: 'owner', color: '#7c4dff' },
  });

  // --- POI ---
  const poiData = [
    { name: 'Colosseo', desc: 'Anfiteatro Flavio, simbolo di Roma', lat: 41.8902, lon: 12.4922, cat: 'monumento', rating: 4.7, tags: ['storico', 'archeologia'] },
    { name: 'Fontana di Trevi', desc: 'La più famosa fontana di Roma', lat: 41.9009, lon: 12.4833, cat: 'monumento', rating: 4.6, tags: ['barocco', 'fontana'] },
    { name: 'Galleria Borghese', desc: 'Museo con capolavori di Bernini e Caravaggio', lat: 41.9142, lon: 12.4921, cat: 'museo', rating: 4.8, tags: ['arte', 'rinascimento'] },
  ];
  for (const p of poiData) {
    await prisma.pointOfInterest.create({
      data: { id: `poi-${p.name.toLowerCase().replace(/\s+/g, '-')}`, name: p.name, description: p.desc, latitude: p.lat, longitude: p.lon, category: p.cat, rating: p.rating, tags: p.tags },
    });
  }

  // --- Diary ---
  await prisma.diaryEntry.create({
    data: {
      tripId: trip1.id, userId: user.id, date: new Date('2026-07-02'),
      title: 'Giorno 1 - Arrivo a Roma',
      content: 'Visitato Colosseo e Fori Imperiali. Pranzo con carbonara da Da Enzo. Giornata perfetta!',
      mood: 'felice', weather: 'soleggiato',
    },
  });

  // --- Calendar event ---
  await prisma.calendarEvent.create({
    data: {
      id: 'cal-colosseo', tripId: trip1.id, userId: user.id,
      title: 'Visita Colosseo', description: 'Tour guidato del Colosseo con Laura',
      location: 'Colosseo, Roma', startTime: new Date('2026-07-02T09:00:00Z'),
      endTime: new Date('2026-07-02T12:00:00Z'), category: 'visita', color: '#7c4dff',
    },
  });

  // --- Achievement ---
  await prisma.userAchievement.createMany({
    data: [
      { userId: user.id, badge: 'first_trip', title: 'Primo Viaggio', icon: 'map-outline' },
      { userId: user.id, badge: 'explorer', title: 'Esploratore', icon: 'compass-outline' },
    ],
  });

  // --- Transport ---
  await prisma.transportLog.create({
    data: {
      id: 'transport-treno-001', tripId: trip1.id, userId: user.id,
      type: 'treno', distance: 300, duration: 5400,
      startTime: new Date('2026-07-02T06:00:00Z'), fromPlace: 'Firenze', toPlace: 'Roma Termini', cost: 45.50,
    },
  });

  // --- Timeline ---
  await prisma.timelineEvent.create({
    data: {
      id: 'tl-arrivo', tripId: trip1.id, userId: user.id, type: 'arrival',
      title: 'Arrivo a Roma', content: 'Arrivati a Roma Termini',
      latitude: 41.9010, longitude: 12.5010, timestamp: new Date('2026-07-02T10:00:00Z'),
    },
  });

  console.log('');
  console.log('╔══════════════════════════════════════════╗');
  console.log('║         Seed completato con successo      ║');
  console.log('╠══════════════════════════════════════════╣');
  console.log('║  Email: test@velmoria.app                ║');
  console.log('║  Email: amico@velmoria.app                ║');
  console.log('║  Password: Test1234!                     ║');
  console.log('╠══════════════════════════════════════════╣');
  console.log('║  Utenti: 2                               ║');
  console.log('║  Viaggi: 2 (1 completato + 1 in corso)   ║');
  console.log('║  POI: 3                                  ║');
  console.log('║  Marker: 3                               ║');
  console.log('║  Amicizia: test ↔ amico                  ║');
  console.log('║  Viaggio condiviso: Weekend a Roma       ║');
  console.log('╚══════════════════════════════════════════╝');
  console.log('');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
