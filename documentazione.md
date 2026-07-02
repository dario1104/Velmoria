# Documentazione Velmora

Piattaforma cross-platform per diario di viaggio geolocalizzato multimediale.

---

## 1. Stack Tecnologico

| Livello | Tecnologia |
|---------|-----------|
| Frontend mobile/web | Ionic Framework + Angular |
| Mappa | Leaflet + OpenStreetMap tiles |
| Backend API | Node.js + Express 5 |
| Database | PostgreSQL |
| ORM | Prisma 7 |
| Autenticazione | JWT + bcrypt |
| Container | Docker + Docker Compose |
| CI/CD | GitHub Actions |

---

## 2. Struttura del Progetto

```
Velmora/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Schema database
│   │   └── seed.ts                # Dati di test
│   ├── src/
│   │   ├── config/                # Configurazioni
│   │   ├── controllers/           # Gestione richieste HTTP
│   │   │   ├── auth.controller.ts
│   │   │   ├── trips.controller.ts
│   │   │   ├── gps.controller.ts
│   │   │   ├── markers.controller.ts
│   │   │   └── media.controller.ts
│   │   ├── middleware/            # Middleware Express
│   │   │   ├── authenticate.ts    # Verifica JWT
│   │   │   ├── authorize.ts       # Controllo ruoli
│   │   │   ├── errorHandler.ts    # Gestione errori
│   │   │   └── upload.ts          # Upload file (multer)
│   │   ├── prisma/
│   │   │   └── client.ts          # Client Prisma singleton
│   │   ├── routes/                # Definizione rotte
│   │   │   ├── index.ts           # Aggregatore rotte
│   │   │   ├── auth.routes.ts
│   │   │   ├── trips.routes.ts
│   │   │   ├── gps.routes.ts
│   │   │   ├── markers.routes.ts
│   │   │   └── media.routes.ts
│   │   ├── services/              # Logica di business
│   │   │   ├── auth.service.ts
│   │   │   ├── trips.service.ts
│   │   │   ├── gps.service.ts
│   │   │   ├── markers.service.ts
│   │   │   └── media.service.ts
│   │   ├── utils/
│   │   │   └── helpers.ts         # Funzioni di utilità
│   │   ├── validators/            # Schema validazione
│   │   │   ├── auth.validators.ts
│   │   │   ├── trips.validators.ts
│   │   │   ├── gps.validators.ts
│   │   │   └── markers.validators.ts
│   │   ├── app.ts                 # Setup Express
│   │   └── server.ts              # Entry point
│   ├── uploads/                   # File caricati
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   └── src/app/
│       ├── core/                  # Guards, interceptors, services
│       ├── shared/                # Componenti, pipe, model
│       └── features/              # Moduli funzionali
└── docs/                          # Documentazione estesa
```

---

## 3. Schema Database

```
User (1) ---- (N) Trip (1) ---- (N) GpsPoint
                        (1) ---- (N) Marker (1) ---- (N) Media
```

### Modelli

**User** (tabella `users`)
| Colonna | Tipo | Note |
|---------|------|------|
| id | UUID PK | auto-generato |
| email | VARCHAR(255) UNIQUE | |
| password | VARCHAR(255) | hash bcrypt |
| name | VARCHAR(100) | opzionale |
| avatar_url | TEXT | opzionale |
| created_at | TIMESTAMPTZ | auto |
| updated_at | TIMESTAMPTZ | auto |

**Trip** (tabella `trips`)
| Colonna | Tipo | Note |
|---------|------|------|
| id | UUID PK | auto-generato |
| user_id | UUID FK -> users | |
| title | VARCHAR(200) | |
| description | TEXT | opzionale |
| start_date | TIMESTAMPTZ | |
| end_date | TIMESTAMPTZ | opzionale |
| is_active | BOOLEAN | default true |
| created_at | TIMESTAMPTZ | auto |

**GpsPoint** (tabella `gps_points`)
| Colonna | Tipo | Note |
|---------|------|------|
| id | UUID PK | auto-generato |
| trip_id | UUID FK -> trips | |
| latitude | DOUBLE | |
| longitude | DOUBLE | |
| timestamp | TIMESTAMPTZ | |
| speed | DOUBLE? | m/s |
| accuracy | DOUBLE? | metri |
| altitude | DOUBLE? | metri |

**Marker** (tabella `markers`)
| Colonna | Tipo | Note |
|---------|------|------|
| id | UUID PK | auto-generato |
| trip_id | UUID FK -> trips | |
| latitude | DOUBLE | |
| longitude | DOUBLE | |
| type | VARCHAR(20) | photo/video/audio/text |
| content | TEXT? | |
| mood | VARCHAR(50)? | |
| created_at | TIMESTAMPTZ | auto |

**Media** (tabella `media`)
| Colonna | Tipo | Note |
|---------|------|------|
| id | UUID PK | auto-generato |
| marker_id | UUID FK -> markers | |
| file_url | TEXT | |
| file_type | VARCHAR(50) | MIME type |
| file_size | INT? | bytes |
| metadata | JSONB? | metadati EXIF |
| created_at | TIMESTAMPTZ | auto |

---

## 4. API REST

Tutte le rotte sono prefissate con `/api/v1`.

### 4.1 Auth

| Metodo | Endpoint | Auth | Descrizione |
|--------|----------|------|-------------|
| POST | /auth/register | No | Registrazione |
| POST | /auth/login | No | Login |
| POST | /auth/refresh | No | Refresh token |
| GET | /auth/profile | JWT | Profilo utente |

**Registrazione:**
```json
POST /api/v1/auth/register
{ "email": "user@example.com", "password": "Pass1234", "name": "Nome" }
→ 201 { "user": { "id", "email", "name" }, "accessToken", "refreshToken", "expiresIn" }
```

**Login:**
```json
POST /api/v1/auth/login
{ "email": "user@example.com", "password": "Pass1234" }
→ 200 { "user": { "id", "email", "name" }, "accessToken", "refreshToken", "expiresIn" }
```

### 4.2 Trips (protette JWT)

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | /trips | Elenco viaggi utente |
| POST | /trips | Crea viaggio |
| GET | /trips/:id | Dettaglio viaggio |
| PATCH | /trips/:id | Modifica viaggio |
| DELETE | /trips/:id | Elimina viaggio |
| POST | /trips/:id/finish | Conclude viaggio |
| GET | /trips/:id/stats | Statistiche viaggio |

### 4.3 GPS (protette JWT)

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | /trips/:tripId/gps | Punti GPS del viaggio |
| POST | /trips/:tripId/gps | Salva punto GPS |
| POST | /gps/batch | Salva batch punti GPS |

### 4.4 Markers (protette JWT)

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | /trips/:tripId/markers | Marker del viaggio |
| POST | /trips/:tripId/markers | Crea marker |
| GET | /markers/:id | Dettaglio marker |
| PATCH | /markers/:id | Modifica marker |
| DELETE | /markers/:id | Elimina marker |

### 4.5 Media (protette JWT)

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | /markers/:markerId/media | Media del marker |
| POST | /media/upload | Upload file (multipart) |
| DELETE | /media/:id | Elimina media |

---

## 5. Sicurezza

| Categoria | Misura |
|-----------|--------|
| Autenticazione | JWT (access + refresh token) |
| Password | Hashing bcrypt (costo 12) |
| Autorizzazione | Middleware ownership check |
| Trasporto | HTTPS/TLS 1.3 |
| XSS | Helmet + sanitizzazione |
| SQL Injection | Prisma ORM (query parametrizzate) |
| Rate Limiting | 100 req/min autenticato |
| Headers | Helmet.js |
| Storage | Docker + backup pg_dump |

Il middleware `authenticate` estrae il token Bearer dall'header Authorization, verifica con `jwt.verify()` e popola `req.user` con `{ id, email }`.

---

## 6. Setup e Avvio

### Prerequisiti
- Node.js >= 22
- PostgreSQL
- Docker (opzionale)

### Installazione
```bash
# Backend
cd backend
cp .env.example .env  # configurare DATABASE_URL e JWT_SECRET
npm install
npx prisma migrate dev
npm run seed
npm run dev
```

### Docker
```bash
docker-compose up -d
```

### Scripts
| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia in watch mode (tsx) |
| `npm run build` | Compila TypeScript |
| `npm start` | Avvia in produzione |
| `npm run seed` | Popola database con dati test |
| `npm run prisma:studio` | Apre Prisma Studio |

### Ambiente
```env
DATABASE_URL="postgresql://velmora:password@localhost:5432/velmora"
JWT_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret"
PORT=3000
CORS_ORIGIN=http://localhost:8100
```

---

## 7. Frontend

### Schermate principali
| Schermata | Route | Descrizione |
|-----------|-------|-------------|
| Login | /auth/login | Form di accesso |
| Registrazione | /auth/register | Form registrazione |
| Lista viaggi | /trips | Elenco viaggi |
| Mappa viaggio | /trips/:id/map | Mappa + percorso GPS |
| Timeline | /trips/:id/timeline | Eventi cronologici |
| Statistiche | /trips/:id/stats | Dashboard dati |
| Replay | /trips/:id/replay | Animazione percorso |

### Offline Mode
- IndexedDB per caching dati
- Coda offline per operazioni non sincronizzate
- Sincronizzazione automatica al ripristino connessione
- Service Worker per caching tile mappa

---

## 8. Frontend (Ionic Angular)

### Struttura
```
frontend/src/app/
├── core/
│   ├── guards/          # Route guards (AuthGuard)
│   ├── interceptors/    # HTTP interceptors (JWT, error)
│   ├── services/        # AuthService, GpsService, OfflineService
│   └── constants/       # Configurazioni
├── shared/
│   ├── components/      # Map, marker-popup, stats-card, media-preview
│   ├── pipes/           # Format distance, time, date
│   └── models/          # Interfacce TypeScript
└── features/
    ├── auth/            # Registrazione, login, profilo
    ├── trips/           # Lista viaggi, creazione, dettaglio
    ├── map/             # Schermata mappa principale
    ├── markers/         # Creazione e gestione marker
    ├── timeline/        # Timeline cronologica
    ├── stats/           # Dashboard statistiche
    ├── replay/          # Replay animato
    └── settings/        # Impostazioni utente
```

---

## 9. Bootstrap dell'Applicazione

```bash
# 1. Creare il file .env
cp backend/.env.example backend/.env

# 2. Modificare .env con i propri dati

# 3. Avviare PostgreSQL (via Docker)
docker run -d --name velmora-db -e POSTGRES_USER=velmora -e POSTGRES_PASSWORD=password -e POSTGRES_DB=velmora -p 5432:5432 postgres:16

# 4. Installare dipendenze backend
cd backend && npm install

# 5. Generare client Prisma e migrare
npx prisma generate
npx prisma migrate dev --name init

# 6. Seed dati di test
npm run seed

# 7. Avviare backend
npm run dev   # http://localhost:3000

# 8. Installare e avviare frontend
cd ../frontend && npm install && ionic serve
```
