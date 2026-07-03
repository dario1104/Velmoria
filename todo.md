# Velmoria — Todo List

## Legenda
- `[ ]` Da fare
- `[x]` Completato
- `(UI)` Solo HTML+SCSS
- `(logica)` Solo logica/backend
- `(full)` UI + logica

---

## Fase 0: Setup & Auth

### Backend
- [x] Setup Express + TypeScript
- [x] Configurazione Prisma + PostgreSQL
- [x] Schema database completo (20+ modelli)
- [x] API register/login/refresh
- [x] API forgot-password/reset-password
- [x] API verify-email
- [x] API change-password
- [x] API update-profile / delete-account
- [x] API settings (get/update)
- [x] Middleware JWT, rate limiting, validazione

### Frontend — Auth Pages
- [x] Home page (landing)
- [x] Login page
- [x] Register page
- [x] (UI) Forgot password page
- [x] (UI) Reset password page
- [x] (UI) Verify email page
- [x] (UI) Change password page
- [x] (UI) Edit profile page
- [ ] (logica) Auth service completo
- [ ] (logica) Validazione form lato client
- [ ] Test unitari (Jest / Jasmine)

---

## Fase 1: Trips & Mappa

### Backend
- [x] API CRUD viaggi
- [x] API punti GPS (salvataggio batch incluso)
- [x] API CRUD marker
- [x] API upload media
- [x] API statistiche viaggio (Haversine)
- [x] API itinerario tappe
- [x] API duplicazione viaggio
- [x] API collaboratori/inviti

### Frontend — Trip Pages
- [x] (UI) Trips list page
- [x] (UI) Trip detail page
- [x] (UI) Trip form (create/edit)
- [x] (UI) Itinerary page (tappe giornaliere)
- [x] (UI) Itinerary stop form
- [x] (UI) Marker form (foto, video, audio, mood, rating, categoria)
- [x] (UI) Map page (Leaflet + markers + percorsi)
- [x] (UI) Timeline cronologica
- [x] (UI) Gallery page (media per viaggio/luogo)
- [x] (UI) Replay animato percorso
- [x] (UI) Stats dashboard
- [x] (UI) Expenses page + form
- [x] (UI) Packing list page
- [x] (UI) Activities page + form
- [ ] (logica) Servizi trips/gps/markers/media
- [ ] (logica) GPS tracking live
- [ ] (logica) Leaflet integrazione
- [ ] Test unitari

---

## Fase 2: Social & Esplora

### Backend
- [x] API amici (richiedi, accetta, rifiuta, rimuovi)
- [x] API follower/following
- [x] API ricerca utenti
- [x] API profili pubblici
- [x] API POI (luoghi di interesse)
- [x] API recensioni (CRUD)
- [x] API preferiti/favorites
- [x] API wishlist
- [x] API notifiche
- [x] API chat (messaggi, gruppi)
- [x] API ricerca avanzata (filtri: città, categoria, distanza, prezzo, etc.)

### Frontend — Social Pages
- [x] (UI) Friends list page
- [x] (UI) Followers page
- [x] (UI) Following page
- [x] (UI) User search page
- [x] (UI) Public profile page
- [x] (UI) Notifications page
- [x] (UI) Chat list page
- [x] (UI) Chat conversation page
- [ ] (logica) Servizi social/chat/notifiche

### Frontend — Explore Pages
- [x] (UI) Explore page (ricerca, categorie, trending)
- [x] (UI) Place detail page
- [x] (UI) Review form
- [x] (UI) Favorites / Collezioni page
- [x] (UI) Wishlist page
- [ ] (logica) Servizi explore/ricerca

---

## Fase 3: Profilo & Impostazioni

### Backend
- [x] API profilo (get/update)
- [x] API statistiche personali
- [x] API achievements/badge
- [x] API impostazioni (tema, lingua, privacy, notifiche)
- [x] API gestione dispositivi/sessioni

### Frontend — Account Pages
- [x] (UI) Profile page (completa: cover, avatar, bio, stats)
- [x] (UI) Settings page (tema, lingua, privacy, notifiche)
- [x] (UI) Privacy settings page
- [x] (UI) Device management page
- [x] (UI) Badges / Achievement page
- [x] (UI) Import/Export page
- [ ] (logica) Servizi profilo/impostazioni

---

## Fase 4: Admin & Infrastruttura

### Backend
- [x] API admin (gestione utenti, moderazione, statistiche globali)
- [x] API categorie/luoghi

### Frontend — Admin Pages
- [x] (UI) Admin dashboard
- [x] (UI) Admin users management
- [x] (UI) Admin moderation
- [ ] (logica) Servizi admin

### Infrastruttura
- [x] CI/CD con GitHub Actions

---

## Fase 5: Funzionalità Future

- [ ] AI travel diary automatico
- [ ] Assistente di viaggio IA
- [ ] Riconoscimento monumenti tramite fotocamera
- [ ] Traduttore integrato
- [ ] Modalità offline con sincronizzazione
- [ ] Mappe offline
- [ ] Condivisione posizione in tempo reale
- [ ] Integrazione voli/prenotazioni
- [ ] Orari trasporti pubblici
- [ ] Biglietti attrazioni
- [ ] Calendario condiviso
- [ ] Playlist del viaggio
- [ ] Scanner ricevute
- [ ] Conversione valute
- [ ] Ricerca compagni di viaggio
- [ ] Eventi nelle vicinanze

---

## Completato
- [x] Documentazione SRS completa
- [x] Setup repository Git
- [x] Struttura progetto backend/frontend
- [x] Backend API completo (Express + Prisma + PostgreSQL)
- [x] Frontend Ionic Angular con tema scuro
- [x] Auth pages (login, register, forgot/reset password)
- [x] Trip pages (lista, dettaglio, form, itinerario, marker)
- [x] Mappa con selettore viaggio
- [x] Timeline, Gallery, Replay, Stats
- [x] Expenses, Packing, Activities
- [x] Social pages (friends, followers, following, search, chat, notifications)
- [x] Explore pages (explore, place detail, reviews, favorites, wishlist)
- [x] Profile completo e Settings
- [x] Admin dashboard, users, moderation
- [x] CI/CD pipeline
