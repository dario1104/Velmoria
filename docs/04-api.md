# 4. API REST

## 4.1 Autenticazione

| Endpoint | Metodo | Descrizione | Auth |
|----------|--------|-------------|------|
| /api/v1/auth/register | POST | Registrazione | No |
| /api/v1/auth/login | POST | Login | No |
| /api/v1/auth/refresh | POST | Refresh token | Refresh |
| /api/v1/auth/logout | POST | Logout | JWT |

## 4.2 Viaggi (Trip)

| Endpoint | Metodo | Descrizione | Auth |
|----------|--------|-------------|------|
| /api/v1/trips | GET | Elenco viaggi | JWT |
| /api/v1/trips | POST | Crea viaggio | JWT |
| /api/v1/trips/:id | GET | Dettaglio viaggio | JWT |
| /api/v1/trips/:id | PATCH | Modifica viaggio | JWT |
| /api/v1/trips/:id | DELETE | Elimina viaggio | JWT |
| /api/v1/trips/:id/finish | POST | Conclude viaggio | JWT |
| /api/v1/trips/:id/stats | GET | Statistiche | JWT |

## 4.3 Punti GPS

| Endpoint | Metodo | Descrizione | Auth |
|----------|--------|-------------|------|
| /api/v1/trips/:id/gps | GET | Punti GPS | JWT |
| /api/v1/trips/:id/gps | POST | Salva punto | JWT |
| /api/v1/gps/batch | POST | Batch punti | JWT |

## 4.4 Marker

| Endpoint | Metodo | Descrizione | Auth |
|----------|--------|-------------|------|
| /api/v1/trips/:id/markers | GET | Marker del viaggio | JWT |
| /api/v1/trips/:id/markers | POST | Crea marker | JWT |
| /api/v1/markers/:id | GET | Dettaglio marker | JWT |
| /api/v1/markers/:id | PATCH | Modifica marker | JWT |
| /api/v1/markers/:id | DELETE | Elimina marker | JWT |

## 4.5 Media

| Endpoint | Metodo | Descrizione | Auth |
|----------|--------|-------------|------|
| /api/v1/markers/:id/media | GET | Media del marker | JWT |
| /api/v1/media/upload | POST | Upload file | JWT |
| /api/v1/media/:id | DELETE | Elimina media | JWT |

## 4.6 Formato Risposta

**Successo:**
```json
{ "success": true, "data": { ... }, "meta": { "page": 1, "limit": 20, "total": 100 } }
```

**Errore:**
```json
{ "success": false, "error": { "code": "ERROR_CODE", "message": "Descrizione" } }
```
