# Velmoria — Todo List

## Fase 1: Fondamenta (MVP)

### Backend
- [ ] Setup NestJS/Express con TypeScript
- [ ] Configurazione Prisma + PostgreSQL
- [ ] Schema database (User, Trip, GpsPoint, Marker, Media)
- [ ] API autenticazione (register, login, refresh)
- [ ] API CRUD viaggi
- [ ] API punti GPS (salvataggio batch incluso)
- [ ] API CRUD marker
- [ ] API upload media
- [ ] API statistiche viaggio (distanza Haversine, tempi, velocità)
- [ ] Middleware: JWT auth, rate limiting, validazione
- [ ] Test unitari (Jest)

### Frontend
- [ ] Setup Ionic Angular + routing
- [ ] Schermata login/registrazione
- [ ] Schermata lista viaggi
- [ ] Schermata mappa con Leaflet
- [ ] Tracciamento GPS live
- [ ] Creazione marker con media
- [ ] Timeline cronologica
- [ ] Dashboard statistiche
- [ ] Replay animato del percorso
- [ ] Tema scuro (dark mode)
- [ ] Test unitari (Jasmine/Karma)

### Infrastruttura
- [ ] Docker + Docker Compose
- [ ] CI/CD con GitHub Actions
- [ ] Deploy backend (Railway/AWS)
- [ ] Deploy frontend (Vercel/Railway)

## Fase 2: Offline & Affidabilità
- [ ] IndexedDB / SQLite per caching offline
- [ ] Coda offline per punti GPS e marker
- [ ] Sincronizzazione automatica
- [ ] Service Worker per tile map
- [ ] Gestione conflitti di sincronizzazione

## Fase 3: Evoluzioni
- [ ] AI travel diary automatico
- [ ] Social sharing viaggi
- [ ] Live trip sharing
- [ ] AR memory overlay
- [ ] Supporto multi-lingua (EN)
- [ ] Esportazione dati (GPX, JSON, PDF)

## Completato
- [x] Documentazione SRS completa
- [x] Setup repository Git
- [x] Struttura progetto backend/frontend
