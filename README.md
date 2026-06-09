# Mini CRM de Leads

## Stack Docker completa

Esta etapa adiciona a infraestrutura para subir o projeto com um unico `docker compose up -d --build`.

### Servicos

- `traefik`: roteia `http://localhost` para o frontend e `/api/*` para o backend
- `mysql`: banco principal da stack Docker
- `phpmyadmin`: administracao visual em `http://localhost:8081`
- `backend`: API Express + Prisma com `migrate deploy` no start
- `frontend`: app Next.js com autenticacao, dashboard, leads, detalhes e Kanban

### Variaveis opcionais

O `docker-compose.yml` ja possui defaults seguros para desenvolvimento. Se quiser sobrescrever algum valor, crie um arquivo `.env` na raiz com estas chaves:

```env
MYSQL_ROOT_PASSWORD=root3326
MYSQL_DATABASE=mini_crm_leads
MYSQL_USER=arthur
MYSQL_PASSWORD=3326
MYSQL_PORT=3308
JWT_SECRET=desenvolvimento-mini-crm-altere-esta-chave-antes-da-producao
CORS_ORIGIN=http://localhost
COOKIE_SECURE=false
COOKIE_SAME_SITE=strict
NEXT_PUBLIC_API_URL=http://localhost/api/v1
```

### Comandos principais

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f backend
docker compose exec backend npx prisma db seed
docker compose down
```

### URLs esperadas

- Frontend: `http://localhost`
- Backend health: `http://localhost/health`
- Backend API health: `http://localhost/api/v1/health`
- Login: `http://localhost/login`
- Registro: `http://localhost/register`
- Dashboard: `http://localhost/dashboard`
- Leads: `http://localhost/leads`
- Traefik dashboard: `http://localhost:8080`
- phpMyAdmin: `http://localhost:8081`
- MySQL direto no host: `localhost:3308`

### Observacoes

- A Etapa 9 adicionou dashboard visual, filtros, CRUD de leads, detalhe com interacoes e Kanban com persistencia de status.
- A Etapa 9b adiciona suite E2E com Playwright na raiz do projeto, usando o usuario seed `admin@teste.com / Admin@123`.
- O MySQL da stack raiz usa a porta `3308` no host para nao colidir com o compose local da etapa anterior em `mysql-local` (`3307`).
- O Traefik foi configurado com provider de arquivo para ficar estavel no Docker Desktop do Windows, sem depender da leitura do socket Docker.
- `COOKIE_SECURE=false` e usado somente no Docker local via HTTP. Em producao com HTTPS, use `COOKIE_SECURE=true`.
- Se voce quiser usar apenas a stack nova, pode parar o compose antigo de `mysql-local` antes de subir tudo.

### Testes E2E

Comandos na raiz do projeto:

```bash
npm install
npm run test:e2e:install
npm run test:e2e
```

Pre-requisitos para rodar os E2E:

- frontend e backend acessiveis em `http://localhost`
- banco e seed prontos com `admin@teste.com / Admin@123`
- opcionalmente sobrescrever `PLAYWRIGHT_BASE_URL` se estiver usando outra URL
- se quiser manter o rate limit ativo e liberar apenas o Playwright, configure no `.env` da raiz:

```env
RATE_LIMIT_E2E_BYPASS_ENABLED=true
E2E_TEST_KEY=crie_um_token_longo_e_aleatorio_so_para_testes_locais
```

Com isso:

- o backend continua com os limites normais para clientes comuns
- somente requisicoes locais em `localhost` com header `x-e2e-test-key` igual ao token configurado ignoram o rate limit
- o Playwright envia esse header automaticamente ao ler `E2E_TEST_KEY`

## Deploy

Foi adicionada uma documentacao especifica de deploy em:

- `docs/deploy/README.md`

Resumo do fluxo:

- Vercel para o frontend com `Root Directory = apps/frontend`
- Railway para o backend com `Root Directory = apps/backend`
- Railway MySQL para `DATABASE_URL`

Variaveis mais importantes em producao:

```env
NEXT_PUBLIC_API_URL=https://seu-backend.railway.app/api/v1
DATABASE_URL=mysql://usuario:senha@host:porta/database
JWT_SECRET=gere_um_segredo_longo_com_32_ou_mais_caracteres
CORS_ORIGIN=http://localhost,http://localhost:3000,https://mini-crm-leads.vercel.app
COOKIE_SECURE=true
COOKIE_SAME_SITE=none
```

Observacoes importantes:

- `NEXT_PUBLIC_API_URL` e lida em build time no frontend
- `CORS_ORIGIN` aceita uma lista separada por virgula para liberar mais de uma origin conhecida
- para frontend e backend em dominios diferentes, use `COOKIE_SECURE=true` e `COOKIE_SAME_SITE=none`
- o backend inclui `apps/backend/railway.json` com healthcheck em `/health`
