# 3. Database

## 3.1 Schema Entità-Relazioni

```
User (1) ---- (N) Trip (1) ---- (N) GpsPoint
                        (1) ---- (N) Marker (1) ---- (N) Media
```

## 3.2 Modello Dati

### User
| Colonna | Tipo | Descrizione |
|---------|------|-------------|
| id | UUID (PK) | Identificatore univoco |
| email | VARCHAR(255) UNIQUE | Email utente |
| password | VARCHAR(255) | Hash bcrypt |
| name | VARCHAR(100) | Nome visualizzato |
| avatar_url | TEXT | URL avatar |
| created_at | TIMESTAMPTZ | Data registrazione |

### Trip
| Colonna | Tipo | Descrizione |
|---------|------|-------------|
| id | UUID (PK) | Identificatore univoco |
| user_id | UUID (FK) | Proprietario |
| title | VARCHAR(200) | Titolo viaggio |
| description | TEXT | Descrizione |
| start_date | TIMESTAMPTZ | Data inizio |
| end_date | TIMESTAMPTZ | Data fine |
| is_active | BOOLEAN | Tracking in corso |

### GpsPoint
| Colonna | Tipo | Descrizione |
|---------|------|-------------|
| id | UUID (PK) | Identificatore univoco |
| trip_id | UUID (FK) | Viaggio associato |
| latitude | DOUBLE | Latitudine |
| longitude | DOUBLE | Longitudine |
| timestamp | TIMESTAMPTZ | Data acquisizione |
| speed | DOUBLE | Velocità (m/s) |
| accuracy | DOUBLE | Accuratezza (m) |

### Marker
| Colonna | Tipo | Descrizione |
|---------|------|-------------|
| id | UUID (PK) | Identificatore univoco |
| trip_id | UUID (FK) | Viaggio associato |
| latitude | DOUBLE | Latitudine |
| longitude | DOUBLE | Longitudine |
| type | VARCHAR(20) | photo/video/audio/text |
| content | TEXT | Contenuto o URL |
| mood | VARCHAR(50) | Emozione |

### Media
| Colonna | Tipo | Descrizione |
|---------|------|-------------|
| id | UUID (PK) | Identificatore univoco |
| marker_id | UUID (FK) | Marker associato |
| file_url | TEXT | URL del file |
| file_type | VARCHAR(50) | MIME type |
| file_size | INTEGER | Dimensione byte |
| metadata | JSONB | Metadati EXIF |
