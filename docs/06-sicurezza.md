# 6. Sicurezza

| Categoria | Misura |
|-----------|--------|
| Autenticazione | JWT con refresh token rotation |
| Password | Hashing bcrypt (costo 12) |
| Autorizzazione | Middleware ownership check |
| Transport | HTTPS/TLS 1.3 obbligatorio |
| XSS | Angular sanitization + CSP header |
| CSRF | SameSite cookie + double-submit |
| SQL Injection | Prisma ORM (query parametrizzate) |
| Rate Limiting | 100 req/min autenticato, 20/min login |
| Media | Scansione malware + validazione MIME |
| Headers | Helmet.js |
| Backup | pg_dump giornaliero criptato su S3 |
