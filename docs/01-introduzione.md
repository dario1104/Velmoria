# 1. Introduzione

## 1.1 Scopo del sistema

**Velmora** è una piattaforma cross-platform (mobile e web) per la creazione di un diario di viaggio geolocalizzato multimediale. Il sistema consente agli utenti di tracciare percorsi GPS in tempo reale, registrare punti di interesse (memory marker) con contenuti multimediali associati (foto, video, audio, testo), visualizzare statistiche di viaggio e riprodurre il percorso sotto forma di replay animato su mappa interattiva.

## 1.2 Obiettivi

1. Digitalizzare l'esperienza di viaggio come memoria strutturata e persistente
2. Integrare geolocalizzazione, multimedia e timeline in un'unica interfaccia coerente
3. Fornire una visualizzazione interattiva dei percorsi su mappa con Leaflet e OpenStreetMap
4. Supportare l'uso offline con sincronizzazione differita
5. Garantire scalabilità dell'architettura backend

## 1.3 Tecnologie utilizzate

| Livello | Tecnologia |
|---------|-----------|
| Frontend mobile/web | Ionic Framework + Angular |
| Mappa | Leaflet + OpenStreetMap tiles |
| Backend API | Node.js + Express / NestJS |
| Database | PostgreSQL |
| ORM | Prisma |
| Storage media | AWS S3 / Cloudinary |
| Autenticazione | JWT + bcrypt |
| Container | Docker + Docker Compose |
| CI/CD | GitHub Actions |

## 1.4 Definizioni e acronimi

- **GPS**: Global Positioning System
- **Marker**: Punto geolocalizzato sulla mappa con un ricordo associato
- **Track**: Sequenza di punti GPS che rappresenta un percorso
- **Timeline**: Vista cronologica degli eventi di un viaggio
- **Replay**: Animazione del percorso nel tempo
- **JWT**: JSON Web Token
- **ORM**: Object-Relational Mapping
- **CRUD**: Create, Read, Update, Delete
