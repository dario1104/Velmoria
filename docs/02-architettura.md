# 2. Architettura del Sistema

## 2.1 Architettura Three-Tier

Velmora adotta un'architettura **Three-Tier** (tre livelli):

1. **Presentation Tier**: Applicazione Ionic Angular con mappa Leaflet
2. **Logic Tier**: Backend Node.js (NestJS) con logica di business
3. **Data Tier**: Database PostgreSQL + Prisma ORM + S3 storage

```
[Client Layer] --> [Application Layer] --> [Data Layer]
     Ionic              NestJS/Express         PostgreSQL
     Angular            API REST               Prisma
     Leaflet            JWT Auth               S3 Media
```

## 2.2 Pattern MVC + Repository

Il backend adotta il pattern **MVC** con **Repository Pattern**:

- **Controller**: Gestione richieste HTTP, validazione
- **Service**: Logica di business
- **Repository**: Accesso ai dati tramite Prisma

## 2.3 Diagramma di Deployment

```
+------------------+     +-----------------------+
|  Dispositivo     |     |   Server Cloud        |
|  Utente          | --> |   - Backend (Node.js) |
|  - Ionic App     |     |   - PostgreSQL        |
|  - Leaflet Map   |     |   - Nginx (SSL)       |
|  - GPS           |     |   - S3 Storage        |
+------------------+     +-----------------------+
```
