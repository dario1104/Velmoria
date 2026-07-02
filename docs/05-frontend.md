# 5. Frontend

## 5.1 Struttura

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
├── features/
│   ├── auth/            # Registrazione, login, profilo
│   ├── trips/           # Lista viaggi, creazione, dettaglio
│   ├── map/             # Schermata mappa principale
│   ├── markers/         # Creazione e gestione marker
│   ├── timeline/        # Timeline cronologica
│   ├── stats/           # Dashboard statistiche
│   ├── replay/          # Replay animato
│   └── settings/        # Impostazioni utente
```

## 5.2 Navigazione

| Schermata | Route | Descrizione |
|-----------|-------|-------------|
| Login | /auth/login | Form di accesso |
| Registrazione | /auth/register | Form registrazione |
| Lista viaggi | /trips | Elenco viaggi |
| Mappa viaggio | /trips/:id/map | Mappa + percorso |
| Timeline | /trips/:id/timeline | Eventi cronologici |
| Statistiche | /trips/:id/stats | Dashboard dati |
| Replay | /trips/:id/replay | Animazione percorso |

## 5.3 Integrazione Leaflet

La mappa utilizza Leaflet con tile OpenStreetMap:

```typescript
import * as L from 'leaflet';

const map = L.map('map').setView([41.9028, 12.4964], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Polilinea percorso
const route = L.polyline([], { color: '#00f5d4', weight: 4 }).addTo(map);

// Marker con popup
L.marker([lat, lng])
  .addTo(map)
  .bindPopup('<b>Memory</b><br>Contenuto multimediale');
```

## 5.4 Offline Mode

- IndexedDB per caching dati
- Coda offline per operazioni non sincronizzate
- Sincronizzazione automatica al ripristino connessione
- Service Worker per caching tile mappa
