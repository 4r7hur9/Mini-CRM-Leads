# CONTEXTO_MINICRMDELEADS

## 1. Objetivo geral do projeto

Construir um Mini CRM de Leads full-stack, com:

- autenticacao com JWT em cookie httpOnly;
- CRUD de leads com ownership por usuario;
- interacoes por lead;
- dashboard com metricas e Kanban;
- frontend responsivo com UX real de produto;
- backend em Express + Prisma;
- deploy no Railway (backend + banco) e Vercel (frontend);
- testes backend com Jest/Supertest e E2E com Playwright;
- documentacao completa e rastreavel.

Nesta fase do projeto, o objetivo operacional virou a migracao completa de MySQL para PostgreSQL, com branch dedicada e historia viva do que foi feito.

## 2. Stack usada

- Frontend: Next.js 16.2.x, React 19, TypeScript
- Backend: Express, TypeScript, Prisma 5.22, Zod, bcrypt, JWT, Helmet, CORS, express-rate-limit
- Banco: PostgreSQL
- Admin DB local: pgAdmin
- Docker: Docker Compose + Traefik
- Testes backend: Jest, ts-jest, Supertest
- Testes E2E: Playwright
- Feedback visual: react-toastify
- Gerenciamento de estado frontend: Zustand
- Formulários: react-hook-form + zod
- HTTP client frontend: Axios com `withCredentials`

## 3. Estrutura de pastas principal

```text
mini-crm-leads/
├── apps/
│   ├── backend/
│   └── frontend/
├── docs/
│   ├── ai/
│   └── deploy/
├── e2e/
├── postgres-local/
├── traefik/
├── docker-compose.yml
├── .env.example
├── HISTORY.md
├── PROMPT-MESTRE.md
├── PROMPT-EXECUTOR.md
├── README.md
└── playwright.config.ts
```

## 4. Arquivos mais importantes e função de cada um

### Raiz

- `README.md`: visão geral do projeto, setup, Docker, testes e deploy
- `HISTORY.md`: cronologia viva das decisões, etapas, incidentes e correções
- `PROMPT-MESTRE.md`: documento mestre com escopo técnico e ordem de execução
- `PROMPT-EXECUTOR.md`: prompt operacional com etapas, pausas e validações
- `.env.example`: variáveis de ambiente da stack principal
- `docker-compose.yml`: stack local principal com Traefik + PostgreSQL + pgAdmin + backend + frontend
- `playwright.config.ts`: configuração da suíte E2E

### Backend

- `apps/backend/src/app.ts`: montagem do Express, middlewares e rotas
- `apps/backend/src/config/env.ts`: validação das variáveis de ambiente
- `apps/backend/src/config/database.ts`: singleton do Prisma Client
- `apps/backend/prisma/schema.prisma`: schema oficial do banco
- `apps/backend/prisma/migrations/20260606210000_init/migration.sql`: migration inicial reescrita para PostgreSQL
- `apps/backend/prisma/seed.cjs`: seed de usuários/leads/interactions
- `apps/backend/tests/setup.ts`: limpeza do banco antes de cada teste
- `apps/backend/tests/setupEnv.ts`: definição do ambiente de teste
- `apps/backend/.env.example`: exemplo de env local do backend
- `apps/backend/.env.test.example`: exemplo de env de teste
- `apps/backend/Dockerfile`: imagem do backend em Node 24

### Frontend

- `apps/frontend/src/app/layout.tsx`: layout raiz e registro global do ToastContainer
- `apps/frontend/src/features/auth/components/LoginForm.tsx`: login com toast de sucesso/erro
- `apps/frontend/src/features/auth/components/RegisterForm.tsx`: cadastro com toast
- `apps/frontend/src/features/auth/components/LogoutButton.tsx`: logout com toast
- `apps/frontend/src/features/leads/components/LeadsPageClient.tsx`: listagem, criação, edição e exclusão de leads
- `apps/frontend/src/features/leads/components/LeadDetailPageClient.tsx`: detalhe do lead e interacoes
- `apps/frontend/src/features/dashboard/components/DashboardPageClient.tsx`: dashboard e Kanban
- `apps/frontend/src/components/ui/ToastViewport.tsx`: container global do react-toastify
- `apps/frontend/src/lib/toast.ts`: helpers centralizados de toast
- `apps/frontend/package.json`: dependencias, overrides e engines do frontend
- `apps/frontend/Dockerfile`: imagem frontend em Node 24
- `apps/frontend/.env.local.example`: env local do frontend

### Docs

- `docs/deploy/README.md`: guia de deploy em Railway/Vercel
- `docs/ai/README.md`: visão geral do uso de IA
- `docs/ai/prompts.md`: prompts usados
- `docs/ai/decisions.md`: decisões técnicas
- `docs/ai/review.md`: revisão e riscos

## 5. O que já foi implementado

- branch dedicada criada: `chore/postgresql-migration`
- prompts oficial e operacional reorganizados para PostgreSQL
- `HISTORY.md` criado e iniciado
- runtime alinhado para Node 24 LTS + npm 11
- Dockerfiles do backend e frontend atualizados para `node:24-alpine`
- stack local migrada de MySQL/phpMyAdmin para PostgreSQL/pgAdmin
- compose local isolado renomeado de `mysql-local` para `postgres-local`
- schema Prisma migrado para `provider = "postgresql"`
- migration inicial reescrita em SQL de PostgreSQL
- envs de exemplo atualizadas para PostgreSQL
- feedback visual com `react-toastify` adicionado no frontend
- toasts aplicados em:
  - login
  - registro
  - logout
  - criação/edição/exclusão de lead
  - criação/exclusão de interacao
  - movimentacao de lead no dashboard
- E2E ajustado para validar mensagens de sucesso/erro
- README principal reescrito
- docs de deploy reescritas
- docs de IA criadas
- commit e push feitos na branch

## 6. O que foi alterado nesta sessão

Nesta sessão, a correção mais importante foi a vulnerabilidade moderada de `postcss` no frontend:

- foi identificado que o problema não vinha do `postcss` direto do projeto, mas de uma dependencia transitiva dentro do `next`
- foi tentado primeiro um override conservador
- esse override com conflito nao funcionou bem no npm
- a abordagem correta foi reinstalar o frontend de forma limpa
- o `next` foi atualizado da linha `16.2.7` para `16.2.9` dentro do range existente
- depois disso, o `npm audit` do frontend zerou
- o build do frontend continuou passando

Também nesta sessão:

- foi gerado e salvo este arquivo de contexto na raiz
- foi feito commit e push da branch `chore/postgresql-migration`

## 7. Bugs encontrados e soluções tentadas

### Bug 1: `npm audit` acusando `postcss < 8.5.10`

Sintoma:

- `npm audit` apontava 2 vulnerabilidades moderadas no frontend
- a origem era `postcss` aninhado dentro do `next`

Soluções tentadas:

- tentar override direto em `postcss`
- tentar override em `next -> postcss`

Resultado:

- override direto gerou conflito com dependencia direta
- override em `next` nao foi o caminho final mais estável
- a solucao funcional foi reinstalacao limpa do frontend, com atualizacao para `next@16.2.9`

### Bug 2: Docker daemon indisponivel

Sintoma:

- `docker compose up -d` falhou com erro de conexao ao pipe do Docker Desktop

Solução tentada:

- nenhuma correção de código era necessária
- o bloqueio era de ambiente

Resultado:

- a validacao real do compose ficou pendente de o Docker Desktop estar rodando

### Bug 3: Testes backend falhando por nao conseguir conectar em `localhost:5434`

Sintoma:

- `npm test` no backend falhou em todos os testes
- Prisma nao conseguiu chegar no banco de teste em `localhost:5434`

Solução tentada:

- a migration e o setup de teste foram alinhados para PostgreSQL
- o banco de teste ainda depende de subir a stack local corretamente

Resultado:

- o erro atual e de ambiente, nao de logica de testes

## 8. Erros atuais ainda não resolvidos

- o Docker Desktop/daemon nao estava acessivel no momento da validacao
- a stack local `postgres-local` nao subiu por causa disso
- os testes backend ainda precisam de um banco PostgreSQL ativo em `localhost:5434`
- a validacao real de migration/seed e testes backend depende de subir esse banco

## 9. Comandos usados até agora

### Inspecao e busca

- `git status --short --branch`
- `git remote -v`
- `rg -n "mysql|MySQL|phpmyadmin|3306|3307|3308|mysql://|MYSQL_" -S ...`
- `Get-Content ...`

### Build e validação

- `npm.cmd run build` no backend
- `npm.cmd run build` no frontend
- `npx.cmd prisma validate`
- `npx.cmd prisma generate`
- `docker compose config`
- `npm.cmd run test:e2e:list`
- `npm.cmd audit`
- `npm.cmd ls postcss next`

### Dependencias

- `npm.cmd install`

### Git

- `git add -A`
- `git commit -m "..."`
- `git push origin chore/postgresql-migration`

### Docker e banco

- tentativas de `docker compose up -d` e `docker compose ps` no `postgres-local`

## 10. Variáveis de ambiente necessárias

### Raiz

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

### Backend local

```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://arthur:3326@localhost:5434/mini_crm_leads?schema=public
JWT_SECRET=desenvolvimento-mini-crm-altere-esta-chave-antes-da-producao
CORS_ORIGIN=http://localhost:3000
COOKIE_SECURE=false
COOKIE_SAME_SITE=strict
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_GENERAL_MAX=300
RATE_LIMIT_AUTH_MAX=10
RATE_LIMIT_E2E_BYPASS_ENABLED=false
RATE_LIMIT_E2E_BYPASS_KEY=
```

### Backend test

```env
NODE_ENV=test
PORT=3002
DATABASE_URL=postgresql://arthur:3326@localhost:5434/mini_crm_leads_test?schema=public
JWT_SECRET=test_jwt_secret_minimum_32_chars_123456789
CORS_ORIGIN=http://localhost:3000
```

### Frontend local

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

### Produção

```env
NEXT_PUBLIC_API_URL=https://seu-backend.railway.app/api/v1
DATABASE_URL=postgresql://usuario:senha@host:porta/database?schema=public
JWT_SECRET=gere_um_segredo_longo_com_32_ou_mais_caracteres
CORS_ORIGIN=https://seu-frontend.vercel.app
COOKIE_SECURE=true
COOKIE_SAME_SITE=none
```

## 11. Como subir o projeto localmente

### Stack principal com Docker

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f backend
docker compose exec backend npx prisma db seed
```

### Banco isolado local

```bash
cd postgres-local
docker compose up -d
docker compose ps
```

### Backend sem Docker

```bash
cd apps/backend
npm.cmd install
npx prisma generate
npm run dev
```

### Frontend sem Docker

```bash
cd apps/frontend
npm.cmd install
npm run dev
```

## 12. Como rodar testes

### Backend

```bash
cd apps/backend
npm test
npm run test:coverage
```

### E2E

```bash
npm install
npm run test:e2e:install
npm run test:e2e
```

### Prisma

```bash
cd apps/backend
npx prisma validate
npx prisma generate
npx prisma migrate dev --name init_postgresql
npm run db:seed
```

## 13. Estado atual do Docker/Prisma/banco

### Docker

- `docker compose config` passou
- o Docker Desktop/daemon estava indisponivel quando tentei subir a stack
- isso impediu a validacao real do `postgres-local` e da stack principal

### Prisma

- `prisma validate` passou
- `prisma generate` passou
- schema ja está apontando para PostgreSQL

### Banco

- o banco local isolado esperado e `postgres-local` na porta `5434`
- o banco principal do compose esperado e `postgres` na porta `5433`
- o banco de teste do backend ainda precisa ser criado/confirmado quando o Docker subir

## 14. Próximos passos exatos em ordem

1. subir o Docker Desktop da máquina
2. executar `cd postgres-local && docker compose up -d`
3. criar o banco de teste `mini_crm_leads_test`
4. rodar migrations no banco principal e no banco de teste
5. rodar o seed no banco principal
6. executar `cd apps/backend && npm test`
7. executar a stack principal `docker compose up -d --build`
8. testar `/health` e `/api/v1/health`
9. testar login, dashboard, CRUD de leads e interações no frontend
10. executar `npm run test:e2e`
11. revisar Railway/Vercel com PostgreSQL
12. fechar a branch com merge para `main` quando tudo estiver verde

## 15. Decisões técnicas que não devem ser esquecidas

- PostgreSQL é o banco oficial agora
- MySQL só pode aparecer como legado histórico dentro do `HISTORY.md`
- `pgAdmin` substitui `phpMyAdmin`
- runtime final de referência: Node 24 LTS + npm 11
- frontend usa `react-toastify` para feedback visual de sucesso e erro
- backend usa cookie httpOnly, CORS com credentials e rate limit
- frontend continua com rewrite/proxy em `/api/v1`
- E2E envia `x-e2e-test-key` quando configurado
- testes backend usam banco real de teste via Prisma, não mock puro
- Docker local principal e banco isolado têm portas diferentes para não conflitar
- a branch de migração é `chore/postgresql-migration`
- o commit já foi feito e enviado ao GitHub

## Status final desta sessão

- commit realizado
- push realizado
- frontend audit corrigido
- build do frontend validado
- build do backend validado
- Prisma validado
- documentação base atualizada
- validação real do banco e dos testes backend ainda depende do Docker rodando na máquina
