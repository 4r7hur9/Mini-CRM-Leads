# Decisoes tecnicas

## Runtime

- baseline final em `Node 24 LTS + npm 11`

## Banco

- PostgreSQL como banco oficial
- Prisma como ORM
- pgAdmin para administracao local

## Frontend

- Next.js App Router
- Zustand para auth
- Axios com `withCredentials`
- `react-toastify` para feedback visual de auth e CRUD principal

## Infra local

- Traefik como proxy reverso
- `docker-compose.yml` para stack completa
- `postgres-local/docker-compose.yml` para banco isolado

## Deploy

- backend no Railway
- frontend no Vercel
