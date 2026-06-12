# Mini CRM de Leads

Mini CRM full-stack para gestão de leads. O projeto entrega autenticação com cookie HttpOnly, dashboard, Kanban, interações por lead, testes automatizados, Docker local e deploy com frontend na Vercel e backend no Railway.

Este repositório foi desenvolvido para o **Teste Técnico Full-Stack Jr | Next.js + Node.js + PostgreSQL**.

## Stack

- **Frontend:** Next.js App Router, React, TypeScript, Zustand, Axios, React Hook Form, Zod e `react-toastify`
- **Backend:** Node.js, Express, TypeScript, Prisma, Zod, bcrypt, JWT, Helmet, CORS e rate limit
- **Banco:** PostgreSQL
- **Admin local do banco:** pgAdmin
- **Infra local:** Docker Compose + Traefik
- **Testes backend:** Jest + Supertest
- **Testes E2E:** Playwright
- **Deploy:** Vercel para frontend e Railway para backend/banco

## Estrutura principal

```text
apps/
  backend/      API Express, Prisma, migrations, seed e testes backend
  frontend/     Aplicação Next.js, telas, componentes, features e services
docs/
  ai/           Documentação do uso de IA
  deploy/       Guia de deploy Railway/Vercel
e2e/            Testes Playwright
postgres-local/ Banco PostgreSQL isolado para desenvolvimento/testes
traefik/        Configuração do proxy reverso local
```

Documentação auxiliar:

| Arquivo | Função |
| --- | --- |
| `docs/file-index.md` | Mapa dos arquivos e responsabilidades do projeto. |
| `docs/environment.md` | Guia central das variáveis por contexto. |
| `docs/documentation-audit.md` | Auditoria de documentação técnica e cobertura TSDoc. |
| `docs/deploy/README.md` | Passo a passo de deploy e variáveis de produção. |
| `docs/ai/README.md` | Visão geral do uso de IA no projeto. |
| `docs/ai/prompts.md` | Prompts principais usados durante o desenvolvimento. |
| `docs/ai/decisions.md` | Decisões técnicas explicadas em linguagem direta. |
| `docs/ai/review.md` | Revisão do que foi gerado, corrigido e validado. |
| `HISTORY.md` | Histórico técnico, incidentes, decisões e validações. |

## Pré-requisitos

- Node.js 24 LTS
- npm 11
- Docker Desktop com Docker Compose
- Git

## Instalação

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd mini-crm-leads
```

Instale as dependências:

```bash
npm install

cd apps/backend
npm install

cd ../frontend
npm install
```

## Variáveis de ambiente

Use os arquivos de exemplo como referência:

| Contexto | Arquivo |
| --- | --- |
| Stack Docker local | `.env.example` |
| Backend local fora do Compose | `apps/backend/.env.example` |
| Backend de teste | `apps/backend/.env.test.example` |
| Frontend local | `apps/frontend/.env.local.example` |

O guia completo fica em `docs/environment.md`.

Exemplo da raiz para a stack Docker:

```env
POSTGRES_DB=mini_crm_leads
POSTGRES_USER=arthur
POSTGRES_PASSWORD=3326
POSTGRES_PORT=5433
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=admin123456
JWT_SECRET=desenvolvimento-mini-crm-altere-esta-chave-antes-da-producao
CORS_ORIGIN=http://localhost
COOKIE_SECURE=false
COOKIE_SAME_SITE=strict
NEXT_PUBLIC_API_URL=http://localhost/api/v1
RATE_LIMIT_E2E_BYPASS_ENABLED=false
E2E_TEST_KEY=
```

Em produção, atenção especial para:

- `NEXT_PUBLIC_API_URL` precisa ser uma URL absoluta com `https://` e terminar em `/api/v1`;
- `COOKIE_SECURE=true`;
- `COOKIE_SAME_SITE=none`;
- `CORS_ORIGIN` precisa conter a URL pública do frontend;
- `JWT_SECRET` deve ser longo e exclusivo do ambiente.

## Subir com Docker

Na raiz:

```bash
cp .env.example .env
docker compose up -d --build
docker compose ps
docker compose exec backend npx prisma db seed
```

Serviços da stack:

- `traefik`
- `postgres`
- `pgadmin`
- `backend`
- `frontend`

URLs locais:

| Serviço | URL |
| --- | --- |
| Frontend | `http://localhost` |
| Health backend | `http://localhost/health` |
| Health API | `http://localhost/api/v1/health` |
| Login | `http://localhost/login` |
| Registro | `http://localhost/register` |
| Traefik dashboard | `http://localhost:8080` |
| pgAdmin | `http://localhost:8081` |
| PostgreSQL no host | `localhost:5433` |

Credenciais do seed:

```text
email: admin@teste.com
senha: Admin@123
```

## Banco isolado

Para rodar somente o banco de desenvolvimento/testes:

```bash
cd postgres-local
docker compose up -d
docker compose ps
```

Porta exposta:

```text
localhost:5434
```

URLs comuns:

```env
DATABASE_URL=postgresql://arthur:3326@localhost:5434/mini_crm_leads?schema=public
DATABASE_URL=postgresql://arthur:3326@localhost:5434/mini_crm_leads_test?schema=public
```

## Rodar sem Docker completo

Backend:

```bash
cd apps/backend
npm install
npx prisma generate
npm run dev
```

Frontend:

```bash
cd apps/frontend
npm install
npm run dev
```

## Prisma

No backend:

```bash
npx prisma validate
npx prisma generate
npx prisma migrate dev --name init_postgresql
npx prisma migrate deploy
npm run db:seed
```

## Testes

Backend:

```bash
cd apps/backend
npm test
```

E2E:

```bash
npm install
npm run test:e2e:install
npm run test:e2e
```

Para liberar apenas o Playwright do rate limit local:

```env
RATE_LIMIT_E2E_BYPASS_ENABLED=true
E2E_TEST_KEY=crie_um_token_longo_e_aleatorio_so_para_testes_locais
```

## Deploy

Resumo do deploy:

- frontend na Vercel com root em `apps/frontend`;
- backend no Railway como container Docker baseado em `apps/backend/Dockerfile`;
- PostgreSQL no Railway;
- comunicação do frontend com backend via rewrite/proxy em `/api/v1`.

Variáveis principais:

```env
NEXT_PUBLIC_API_URL=https://seu-backend.railway.app/api/v1
DATABASE_URL=postgresql://usuario:senha@host:porta/database?schema=public
JWT_SECRET=gere_um_segredo_longo_com_32_ou_mais_caracteres
CORS_ORIGIN=https://seu-frontend.vercel.app
COOKIE_SECURE=true
COOKIE_SAME_SITE=none
```

Guia detalhado: `docs/deploy/README.md`.

## Arquitetura visual

### 1. Visão geral

```mermaid
flowchart LR
  User[Usuário no navegador]

  subgraph Frontend[Next.js na Vercel]
    UI[Páginas e componentes]
    Store[Zustand]
    APIClient[Axios com credentials]
  end

  subgraph Backend[Express no Railway]
    Routes[Routes]
    Middlewares[Auth, CORS, Helmet, rate limit]
    Controllers[Controllers]
    Services[Services]
    Repositories[Repositories]
    Prisma[Prisma Client]
  end

  DB[(PostgreSQL)]

  User --> UI
  UI --> Store
  UI --> APIClient
  APIClient -->|/api/v1| Routes
  Routes --> Middlewares --> Controllers --> Services --> Repositories --> Prisma --> DB
  Routes -->|Set-Cookie HttpOnly| User
```

### 2. Camadas do backend

```mermaid
flowchart TD
  Request[HTTP Request]
  Response[HTTP Response]

  Request --> MW[Middlewares]
  MW --> CT[Controllers]
  CT --> SV[Services]
  SV --> RP[Repositories]
  RP --> PR[Prisma Client]
  PR --> PG[(PostgreSQL)]
  PG --> PR --> RP --> SV --> CT --> Response
```

### 3. Modelo de dados

```mermaid
erDiagram
  User ||--o{ Lead : possui
  Lead ||--o{ Interaction : registra

  User {
    string id PK
    string name
    string email UNIQUE
    string passwordHash
    datetime createdAt
    datetime updatedAt
  }

  Lead {
    string id PK
    string userId FK
    string name
    string email
    string phone
    string company
    string status
    string notes
    datetime createdAt
    datetime updatedAt
  }

  Interaction {
    string id PK
    string leadId FK
    string type
    string description
    datetime createdAt
  }
```

### 4. Stack local

```mermaid
flowchart LR
  Browser[Navegador]

  subgraph DockerCompose[Docker Compose local]
    Traefik[Traefik]
    Front[Frontend]
    Back[Backend]
    Postgres[PostgreSQL]
    PgAdmin[pgAdmin]
  end

  Browser -->|80| Traefik
  Traefik -->|/| Front
  Traefik -->|/api/v1| Back
  Back --> Postgres
  Browser -->|8081| PgAdmin
```

### 5. Fluxo de autenticação

```mermaid
sequenceDiagram
  participant U as Usuário
  participant F as Frontend
  participant A as API Express
  participant D as PostgreSQL

  U->>F: envia email e senha
  F->>A: POST /api/v1/auth/login
  A->>D: busca usuário
  D-->>A: retorna usuário
  A-->>F: Set-Cookie HttpOnly + dados públicos
  F-->>U: redireciona para dashboard
```

## Funcionalidades entregues

- cadastro, login, logout e rota `me`;
- sessão via JWT em cookie HttpOnly;
- CRUD de leads com isolamento por usuário;
- registro de interações por lead;
- dashboard com métricas e funil;
- Kanban responsivo com alteração de status;
- validações com Zod e formulários com React Hook Form;
- feedback visual com `react-toastify`;
- testes backend com Jest + Supertest;
- testes E2E com Playwright;
- Docker local com Traefik, PostgreSQL, pgAdmin, backend e frontend;
- deploy preparado para Vercel, Railway e PostgreSQL.

## Melhorias futuras

- ampliar filtros e métricas do dashboard;
- adicionar recuperação de senha e verificação de e-mail;
- melhorar observabilidade em produção com logs estruturados e monitoramento de erros;
- criar importação/exportação de leads;
- adicionar permissões por papel caso o produto evolua para times;
- melhorar a camada visual com um design system mais consistente.

## Decisões técnicas principais

- backend em camadas para separar HTTP, regra de negócio e persistência;
- PostgreSQL como banco oficial;
- Prisma como ORM e controle de migrations;
- JWT em cookie HttpOnly;
- CORS com credentials e origem controlada;
- Helmet, cookie-parser e rate limit como base de segurança;
- Axios com `withCredentials` no frontend;
- Zustand para estado de autenticação;
- Playwright para validar fluxos reais de uso;
- `HISTORY.md` como memória técnica do projeto.
