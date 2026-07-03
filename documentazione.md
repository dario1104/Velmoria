# Documentazione Velmoria

Piattaforma cross-platform per diario di viaggio geolocalizzato multimediale.

---

## 1. Stack Tecnologico

| Livello | Tecnologia |
|---------|-----------|
| Frontend mobile/web | Ionic Framework 8 + Angular 20 |
| Mappa | Leaflet + OpenStreetMap |
| Backend API | Node.js + Express 5 + TypeScript |
| Database | PostgreSQL 17 |
| ORM | Prisma 7 (adapter-pg) |
| Autenticazione | JWT + bcrypt |
| Runtime | tsx (watch/dev) + Node.js (prod) |

---

## 2. Struttura del Progetto

```
Velmoria/
├── backend/                   # API Express
│   ├── prisma/
│   │   ├── schema.prisma      # Schema database
│   │   └── seed.ts            # Dati di test
│   ├── src/
│   │   ├── controllers/       # Gestione richieste HTTP
│   │   │   ├── auth.controller.ts
│   │   │   ├── trips.controller.ts
│   │   │   ├── gps.controller.ts
│   │   │   ├── markers.controller.ts
│   │   │   └── media.controller.ts
│   │   ├── middleware/
│   │   │   ├── authenticate.ts    # Verifica JWT
│   │   │   ├── authorize.ts       # Controllo ruoli
│   │   │   ├── errorHandler.ts    # Gestione errori globale
│   │   │   └── upload.ts          # Upload file (multer)
│   │   ├── prisma/
│   │   │   └── client.ts          # Istanza PrismaClient
│   │   ├── routes/
│   │   │   ├── index.ts           # Aggregatore rotte
│   │   │   ├── auth.routes.ts
│   │   │   ├── trips.routes.ts
│   │   │   ├── gps.routes.ts
│   │   │   ├── markers.routes.ts
│   │   │   └── media.routes.ts
│   │   ├── services/          # Logica di business
│   │   │   ├── auth.service.ts
│   │   │   ├── trips.service.ts
│   │   │   ├── gps.service.ts
│   │   │   ├── markers.service.ts
│   │   │   └── media.service.ts
│   │   ├── utils/
│   │   │   └── helpers.ts         # Calcolo distanze haversine
│   │   ├── validators/            # Schemi express-validator
│   │   │   ├── auth.validators.ts
│   │   │   ├── trips.validators.ts
│   │   │   ├── gps.validators.ts
│   │   │   └── markers.validators.ts
│   │   ├── app.ts                 # Configurazione Express
│   │   └── server.ts              # Entry point
│   ├── uploads/                   # File caricati (gitignored)
│   ├── .env                       # Configurazione locale
│   ├── .env.example               # Template configurazione
│   ├── prisma.config.ts           # Config Prisma 7
│   ├── package.json
│   └── tsconfig.json
├── frontend/                  # App Ionic Angular
│   └── src/app/
│       ├── app-routing.module.ts
│       ├── app.module.ts
│       ├── app.component.ts
│       └── home/               # Home page (default)
├── .github/workflows/
│   └── ci.yml                  # CI/CD pipeline
├── start.js                    # Script avvio unificato
├── documentazione.md           # Questa documentazione
└── README.md
```

---

## 3. API REST

Tutte le rotte sono prefissate `/api/v1`.

### 3.1 Auth

| Metodo | Endpoint | Auth | Descrizione |
|--------|----------|------|-------------|
| POST | /auth/register | No | Registrazione |
| POST | /auth/login | No | Login |
| POST | /auth/refresh | No | Refresh token |
| GET | /auth/profile | JWT | Profilo utente |

### 3.2 Trips

| Metodo | Endpoint | Auth | Descrizione |
|--------|----------|------|-------------|
| GET | /trips | JWT | Elenco viaggi utente |
| POST | /trips | JWT | Crea viaggio |
| GET | /trips/:id | JWT | Dettaglio viaggio |
| PATCH | /trips/:id | JWT | Modifica viaggio |
| DELETE | /trips/:id | JWT | Elimina viaggio |
| POST | /trips/:id/finish | JWT | Conclude viaggio |
| GET | /trips/:id/stats | JWT | Statistiche viaggio |

### 3.3 GPS

| Metodo | Endpoint | Auth | Descrizione |
|--------|----------|------|-------------|
| GET | /trips/:tripId/gps | JWT | Punti GPS del viaggio |
| POST | /trips/:tripId/gps | JWT | Salva punto GPS |
| POST | /gps/batch | JWT | Salva batch punti |

### 3.4 Markers

| Metodo | Endpoint | Auth | Descrizione |
|--------|----------|------|-------------|
| GET | /trips/:tripId/markers | JWT | Marker del viaggio |
| POST | /trips/:tripId/markers | JWT | Crea marker |
| GET | /markers/:id | JWT | Dettaglio marker |
| PATCH | /markers/:id | JWT | Modifica marker |
| DELETE | /markers/:id | JWT | Elimina marker |

### 3.5 Media

| Metodo | Endpoint | Auth | Descrizione |
|--------|----------|------|-------------|
| GET | /markers/:markerId/media | JWT | Media del marker |
| POST | /media/upload | JWT | Upload file |
| DELETE | /media/:id | JWT | Elimina media |

### 3.6 Health

| Metodo | Endpoint | Auth | Descrizione |
|--------|----------|------|-------------|
| GET | /health | No | Health check |

---

## 4. Database (PostgreSQL + Prisma 7)

PostgreSQL 17 installato localmente. Configurare `DATABASE_URL` in `.env`.

5 modelli, relazioni:

```
User (1) --- (N) Trip (1) --- (N) GpsPoint
                      (1) --- (N) Marker (1) --- (N) Media
```

Tutte le tabelle usano UUID auto-generati, foreign key con cascade delete, indici su campi di ricerca.

---

## 5. Setup e Avvio

### Prerequisiti
- Node.js >= 20
- PostgreSQL 17 (installato e in esecuzione)

### Installazione rapida (tutto in auto)
```bash
node start.js
```

### Manuale
```bash
# Backend
cd backend
cp .env.example .env
npm install
npx prisma generate         # genera client Prisma
npm run dev                 # http://localhost:3000
npx prisma db push           # applica schema al database
npx tsx prisma/seed.ts       # seed dati di test

# Frontend (altro terminale)
cd frontend
npm install
npm start                   # http://localhost:4200
```

### Variabili d'ambiente (.env)
```
DATABASE_URL="postgresql://velmoria:password@localhost:5432/velmoria"
JWT_SECRET="<random-hex>"
JWT_REFRESH_SECRET="<random-hex>"
PORT=3000
CORS_ORIGIN=http://localhost:4200
```

---

## 6. Script start.js

```bash
node start.js               # setup + avvio backend + frontend + prisma studio
node start.js --no-start    # solo setup (installa dipendenze, genera Prisma)
node start.js --reset       # ricrea database (DROP SCHEMA public CASCADE + CREATE SCHEMA public)
```

Avvia automaticamente: backend (:3000), frontend (:4200), Prisma Studio (:5557).

---

## 7. Stato Attuale

| Componente | Stato |
|------------|-------|
| Backend API (Express) | Completo — auth, trips, gps, markers, media |
| Frontend (Ionic Angular) | Scaffold iniziale — solo home page |
| Database (PostgreSQL) | Schema completo, client generato, prisma db push |
| CI/CD (GitHub Actions) | Pipeline configurare |
| Documentazione | Questo file |
