# Velmoria

**Velmoria** è una piattaforma cross-platform (mobile + web) per la creazione di un diario di viaggio geolocalizzato multimediale. Traccia percorsi GPS in tempo reale, registra ricordi con foto, video, audio e testo, e visualizza statistiche e replay dei tuoi viaggi su mappa interattiva.

## Stack Tecnologico

| Livello | Tecnologia |
|---------|-----------|
| Frontend | Ionic Framework + Angular |
| Mappa | Leaflet + OpenStreetMap |
| Backend | Node.js + Express / NestJS |
| Database | PostgreSQL + Prisma ORM |
| Storage | AWS S3 / Cloudinary |
| Autenticazione | JWT + bcrypt |
| Container | Docker + Docker Compose |
| CI/CD | GitHub Actions |

## Struttura del Progetto

```
velmoria/
├── backend/          # API NestJS/Express + Prisma
├── frontend/         # App Ionic Angular
├── docs/             # Documentazione
├── .github/          # CI/CD workflows
├── docker-compose.yml
├── README.md
└── todo.md
```

## Prerequisiti

- Node.js >= 20 LTS
- Git
- Docker >= 24 + Docker Compose
- PostgreSQL 15+
- Ionic CLI: `npm install -g @ionic/cli`
- Angular CLI: `npm install -g @angular/cli`

## Setup Rapido

```bash
# Backend
cd backend
cp .env.example .env
npm install
npx prisma migrate dev
npm run start:dev

# Frontend
cd frontend
cp .env.example .env
npm install
ionic serve
```

## Documentazione

La documentazione completa è disponibile in `docs/` e include specifica dei requisiti, architettura, API, database e manuali.

## Licenza

MIT
