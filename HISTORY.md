# HISTORY

## Visao geral

Este arquivo registra a historia tecnica do Mini CRM de Leads para manter contexto entre etapas, revisoes e migracoes.

## Linha do tempo

### Base original

- Estrutura inicial do monorepo com backend Express + Prisma, frontend Next.js e Docker local.
- Persistencia original em MySQL.
- Deploy preparado com Railway para o backend e Vercel para o frontend.

### Evolucoes entregues antes desta branch

- Autenticacao com JWT em cookie httpOnly.
- CRUD de leads com ownership por usuario.
- Interacoes por lead e dashboard com metricas.
- Docker completo com Traefik.
- Frontend autenticado, dashboard, Kanban e responsividade.
- Suite backend com Jest e suite E2E com Playwright.
- Ajustes de sessao, CORS e proxy para Railway + Vercel.

### Branch `chore/postgresql-migration`

#### Etapa 0 - Reorganizacao do plano oficial

- Criada branch dedicada para a migracao longa.
- Inicio da revisao dos prompts oficiais para remover referencias ativas a MySQL.
- `HISTORY.md` adotado como artefato obrigatorio de contexto.

#### Etapa 1 - Upgrade de runtime

- Dockerfiles de backend e frontend atualizados para `node:24-alpine`.
- `package.json` da raiz, backend e frontend alinhados com `engines` para Node 24 e npm 11.
- Criado `.nvmrc` com a versao de referencia local.

#### Etapa 2 - Infra Docker PostgreSQL

- `docker-compose.yml` migrado para PostgreSQL + pgAdmin.
- `mysql-local` substituido por `postgres-local`.
- Novas portas definidas:
  - stack principal: `5433`
  - stack isolada: `5434`
- Arquivos de exemplo de ambiente recriados para refletir a nova stack.

#### Etapa 3 - Prisma, migration inicial e seed

- Prisma trocado para `provider = "postgresql"`.
- Migration inicial reescrita para PostgreSQL.
- `DATABASE_URL` do backend e do Dockerfile alinhadas com `postgresql://`.
- Seed preservado com o usuario `admin@teste.com / Admin@123`.

#### Etapa 4 - Testes backend em PostgreSQL

- Ambiente de teste do backend ajustado para `localhost:5434`.
- Criado `apps/backend/.env.test.example`.
- Validacao completa da suite ficou dependente de banco PostgreSQL ativo.

#### Etapa 5 - Feedback visual com React-Toastify

- `react-toastify` adicionado ao frontend.
- `ToastContainer` global registrado no layout raiz.
- Feedback visual aplicado em:
  - login
  - cadastro
  - logout
  - criar lead
  - editar lead
  - excluir lead
  - registrar e excluir interacao
  - mover lead no dashboard

#### Etapa 6 - E2E alinhado ao PostgreSQL e aos toasts

- Specs Playwright atualizadas para validar mensagens visuais de sucesso e erro.
- Listagem da suite E2E confirmada com 27 testes distribuidos em Chromium, Firefox e mobile.

#### Validacoes executadas nesta branch

- `npm.cmd run build` no backend: ok
- `npm.cmd run build` no frontend: ok
- `npx.cmd prisma validate`: ok
- `npx.cmd prisma generate`: ok
- `docker compose config`: ok
- `npm.cmd run test:e2e:list`: ok

#### Bloqueios encontrados

- Docker Desktop/daemon indisponivel na maquina no momento da validacao.
- Suite backend falhou por indisponibilidade do banco de teste em `localhost:5434`.
- Validacao real de migrations, seed e compose em runtime depende de subir o Docker primeiro.

#### Proximas etapas desta branch

- Validar migrations e seed com PostgreSQL real ativo.
- Executar a suite backend com o banco de teste em pe.
- Rodar a stack Docker completa.
- Executar os E2E completos com frontend, backend e banco ativos.
- Revisar o deploy PostgreSQL em Railway/Vercel e concluir o fechamento da branch.
