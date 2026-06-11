# Mini CRM de Leads

Mini CRM full-stack para gestao de leads, autenticacao com cookie httpOnly, dashboard, Kanban, interacoes e deploy em Railway + Vercel.

## Stack

- `frontend`: Next.js App Router + TypeScript
- `backend`: Express + TypeScript
- `orm`: Prisma
- `banco`: PostgreSQL
- `ui admin banco`: pgAdmin
- `proxy local`: Traefik
- `testes backend`: Jest + Supertest
- `testes e2e`: Playwright
- `feedback visual`: react-toastify

## Estrutura principal

- `apps/frontend`
- `apps/backend`
- `docker-compose.yml`
- `postgres-local/docker-compose.yml`
- `docs/deploy/README.md`
- `docs/file-index.md`
- `docs/ai/README.md`
- `HISTORY.md`
- `PROMPT-MESTRE.md`
- `PROMPT-EXECUTOR.md`

## Variaveis de ambiente

Arquivos de referencia:

- `.env.example`
- `apps/backend/.env.example`
- `apps/frontend/.env.local.example`

### Variaveis por contexto

| Contexto | Arquivo | Observacao |
| --- | --- | --- |
| Stack local completa | `.env.example` | Copie para `.env` na raiz antes de subir o Docker. |
| Backend local | `apps/backend/.env.example` | Use para rodar o backend fora do compose. |
| Backend de teste | `apps/backend/.env.test.example` | Use para a suite de testes isolada. |
| Frontend local | `apps/frontend/.env.local.example` | Use no `npm run dev` do Next.js. |
| Producao Vercel | variavel do projeto | `NEXT_PUBLIC_API_URL` precisa ser URL absoluta com `https://`. |

Se quiser usar a stack completa localmente, copie a raiz:

```bash
cp .env.example .env
```

Principais chaves da raiz:

```env
POSTGRES_DB=mini_crm_leads
POSTGRES_USER=arthur
POSTGRES_PASSWORD=3326
POSTGRES_PORT=5433
PGADMIN_DEFAULT_EMAIL=admin@mini-crm.local
PGADMIN_DEFAULT_PASSWORD=admin123456
JWT_SECRET=desenvolvimento-mini-crm-altere-esta-chave-antes-da-producao
CORS_ORIGIN=http://localhost
COOKIE_SECURE=false
COOKIE_SAME_SITE=strict
NEXT_PUBLIC_API_URL=http://localhost/api/v1
RATE_LIMIT_E2E_BYPASS_ENABLED=false
E2E_TEST_KEY=
```

## Subir tudo com Docker

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f backend
docker compose exec backend npx prisma db seed
```

### Servicos da stack principal

- `traefik`
- `postgres`
- `pgadmin`
- `backend`
- `frontend`

### URLs esperadas

- frontend: `http://localhost`
- backend health: `http://localhost/health`
- backend api health: `http://localhost/api/v1/health`
- login: `http://localhost/login`
- registro: `http://localhost/register`
- dashboard do Traefik: `http://localhost:8080`
- pgAdmin: `http://localhost:8081`
- PostgreSQL direto no host: `localhost:5433`

### Credenciais seed

- email: `admin@teste.com`
- senha: `Admin@123`

## Banco isolado para desenvolvimento/testes

Quando quiser subir apenas o banco local isolado:

```bash
cd postgres-local
docker compose up -d
docker compose ps
```

Porta exposta:

- `localhost:5434`

URL esperada para backend local:

```env
DATABASE_URL=postgresql://arthur:3326@localhost:5434/mini_crm_leads?schema=public
```

URL esperada para testes:

```env
DATABASE_URL=postgresql://arthur:3326@localhost:5434/mini_crm_leads_test?schema=public
```

## Rodar sem Docker completo

### Backend

```bash
cd apps/backend
npm install
npx prisma generate
npm run dev
```

### Frontend

```bash
cd apps/frontend
npm install
npm run dev
```

## Prisma

Comandos principais no backend:

```bash
npx prisma validate
npx prisma generate
npx prisma migrate dev --name init_postgresql
npm run db:seed
```

## Testes

### Backend

```bash
cd apps/backend
npm test
```

### E2E

Na raiz:

```bash
npm install
npm run test:e2e:install
npm run test:e2e
```

Se quiser liberar apenas o Playwright do rate limit local:

```env
RATE_LIMIT_E2E_BYPASS_ENABLED=true
E2E_TEST_KEY=crie_um_token_longo_e_aleatorio_so_para_testes_locais
```

## Deploy

Resumo:

- frontend no Vercel com `Root Directory = apps/frontend`
- backend no Railway com `Root Directory = apps/backend`
- banco PostgreSQL no Railway
- `NEXT_PUBLIC_API_URL` em producao deve terminar em `/api/v1` e incluir `https://`

Variaveis mais importantes em producao:

```env
NEXT_PUBLIC_API_URL=https://seu-backend.railway.app/api/v1
DATABASE_URL=postgresql://usuario:senha@host:porta/database?schema=public
JWT_SECRET=gere_um_segredo_longo_com_32_ou_mais_caracteres
CORS_ORIGIN=https://seu-frontend.vercel.app
COOKIE_SECURE=true
COOKIE_SAME_SITE=none
```

Doc detalhada:

- `docs/deploy/README.md`

Documentacao auxiliar:

- `docs/file-index.md`
- `docs/ai/README.md`
- `docs/ai/prompts.md`
- `docs/ai/decisions.md`
- `docs/ai/review.md`

## Contexto vivo

O historico tecnico do projeto fica em:

- `HISTORY.md`

Ele registra etapas, incidentes, correcoes e decisoes da migracao e das entregas anteriores.
