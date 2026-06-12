# File Index

> Mapa rapido dos arquivos relevantes do projeto. Arquivos gerados, caches e dependencias instaladas foram omitidos.

## Raiz

- `.env.example` - exemplo da stack local completa com PostgreSQL, Traefik e frontend.
- `.gitignore` - evita versionar segredos, caches e artefatos de build.
- `.nvmrc` - fixa a versao recomendada do Node.
- `Agents.md` - guia de atuacao do Codex neste repositorio.
- `CONTEXTO_MINICRMDELEADS.md` - contexto consolidado do projeto e da migracao.
- `HISTORY.md` - historico tecnico cronologico com decisoes e incidentes.
- `docker-compose.yml` - stack principal local com Traefik, PostgreSQL, pgAdmin, backend e frontend.
- `package.json` - scripts do workspace e comandos de teste de ponta a ponta.
- `package-lock.json` - lockfile da raiz do workspace.
- `playwright.config.ts` - configuracao global do Playwright.
- `PROMPT-EXECUTOR.md` - meta-prompt de execucao por etapas.
- `PROMPT-MESTRE.md` - prompt mestre com a fonte de verdade tecnica.
- `README.md` - guia principal de uso, ambiente e deploy.
- `teste-tecnico-fullstack-jr.pdf` - enunciado original do desafio.

## apps/backend

- `.env.example` - exemplo local do backend com variaveis validas para desenvolvimento.
- `.env.test.example` - exemplo isolado para a suite de testes.
- `Dockerfile` - imagem do backend para Railway, Docker Hub e ambiente local.
- `jest.config.ts` - configuracao do Jest para backend.
- `package.json` - scripts, dependencias e comandos do backend.
- `package-lock.json` - lockfile do backend.
- `railway.json` - configuracao de deploy e healthcheck do Railway.
- `tsconfig.json` - configuracao de compilacao TypeScript do backend.
- `tsconfig.test.json` - configuracao TypeScript especifica para testes.

### apps/backend/prisma

- `seed.cjs` - executa o seed no formato consumido pelo Prisma.
- `seed.ts` - versao TypeScript do seed com os dados iniciais.
- `schema.prisma` - schema oficial do banco PostgreSQL.
- `migrations/20260606210000_init/migration.sql` - migracao inicial do projeto.

### apps/backend/src

- `app.ts` - configura Express, CORS, middlewares e rotas principais.
- `server.ts` - sobe o servidor HTTP e trata shutdown gracioso.

#### config

- `config/database.ts` - instancia compartilhada do PrismaClient.
- `config/env.ts` - valida e normaliza as variaveis de ambiente.

#### controllers

- `controllers/authController.ts` - register, login, logout e me.
- `controllers/dashboardController.ts` - resumo do dashboard.
- `controllers/healthController.ts` - endpoint de saude da API.
- `controllers/interactionController.ts` - CRUD de interacoes.
- `controllers/leadController.ts` - CRUD e status dos leads.

#### middlewares

- `middlewares/authMiddleware.ts` - protege rotas privadas com cookie httpOnly.
- `middlewares/errorMiddleware.ts` - formata erros padrao da API.
- `middlewares/rateLimitMiddleware.ts` - aplica limite geral e bypass de E2E.
- `middlewares/validationMiddleware.ts` - valida corpo, params e query com Zod.

#### repositories

- `repositories/dashboardRepository.ts` - consultas agregadas do dashboard.
- `repositories/interactionRepository.ts` - persistencia de interacoes.
- `repositories/leadRepository.ts` - persistencia e filtros de leads.
- `repositories/userRepository.ts` - acesso aos usuarios.

#### routes

- `routes/authRoutes.ts` - rotas de autenticacao.
- `routes/dashboardRoutes.ts` - rotas do dashboard.
- `routes/interactionRoutes.ts` - rotas de interacao aninhadas no lead.
- `routes/leadRoutes.ts` - rotas de leads e status.
- `routes/router.ts` - monta `/api/v1`.

#### services

- `services/authService.ts` - regras de negocio de autenticacao.
- `services/dashboardService.ts` - consolidacao dos dados do dashboard.
- `services/interactionService.ts` - regras de negocio de interacoes.
- `services/leadService.ts` - regras de negocio de leads.

#### types

- `types/auth.ts` - contratos de auth.
- `types/dashboard.ts` - contratos do dashboard.
- `types/express.d.ts` - extensao do Request com usuario autenticado.
- `types/interaction.ts` - contratos de interacao.
- `types/lead.ts` - contratos de lead.

#### utils

- `utils/AppError.ts` - erro padrao com status code e codigo interno.
- `utils/asyncHandler.ts` - wrapper para capturar erros em handlers async.
- `utils/cookieOptions.ts` - opcoes do cookie httpOnly do token.

#### validators

- `validators/authValidator.ts` - schema de entrada de register/login.
- `validators/interactionValidator.ts` - schema de interacoes.
- `validators/leadValidator.ts` - schema de leads e status.

### apps/backend/tests

- `tests/setup.ts` - setup global do Jest.
- `tests/setupEnv.ts` - prepara o ambiente isolado para testes.
- `tests/helpers/factories.ts` - factories e helpers para auth dos testes.
- `tests/integration/auth.test.ts` - integracao dos fluxos de auth.
- `tests/integration/leads.test.ts` - integracao de leads.
- `tests/unit/authService.test.ts` - unidade do servico de auth.
- `tests/unit/leadService.test.ts` - unidade do servico de lead.

## apps/frontend

- `.env.local.example` - exemplo local do frontend com a URL da API.
- `Dockerfile` - imagem do frontend para Vercel, Docker e ambientes locais.
- `next.config.ts` - rewrite da API e validacao da URL publica.
- `next-env.d.ts` - declaracoes geradas pelo Next.
- `package.json` - scripts, dependencias e engines do frontend.
- `package-lock.json` - lockfile do frontend.
- `tsconfig.json` - configuracao TypeScript do frontend.

### apps/frontend/src/app

- `app/layout.tsx` - layout global do App Router.
- `app/page.tsx` - redireciona a home para dashboard.
- `app/globals.css` - estilos globais da aplicacao.
- `app/(auth)/layout.tsx` - layout das telas publicas de auth.
- `app/(auth)/login/page.tsx` - pagina de login.
- `app/(auth)/register/page.tsx` - pagina de cadastro.
- `app/(private)/layout.tsx` - layout protegido do app autenticado.
- `app/(private)/dashboard/page.tsx` - pagina do dashboard.
- `app/(private)/leads/page.tsx` - pagina da lista de leads.
- `app/(private)/leads/[id]/page.tsx` - pagina de detalhe do lead.

### apps/frontend/src/components/layout

- `components/layout/AppHeader.tsx` - topo com navegacao e logout.
- `components/layout/AppShell.tsx` - estrutura base da area autenticada.
- `components/layout/AppSidebar.tsx` - menu lateral da area autenticada.

### apps/frontend/src/components/ui

- `components/ui/Badge.tsx` - indicador visual reutilizavel.
- `components/ui/Button.tsx` - botao padrao do sistema.
- `components/ui/EmptyState.tsx` - estado vazio reutilizavel.
- `components/ui/Modal.tsx` - modal base.
- `components/ui/SelectField.tsx` - select estilizado.
- `components/ui/Spinner.tsx` - indicador de carregamento.
- `components/ui/TextAreaField.tsx` - campo textarea padrao.
- `components/ui/TextField.tsx` - campo de texto padrao.
- `components/ui/ToastViewport.tsx` - viewport global dos toasts.

### apps/frontend/src/features/auth

- `components/AuthCard.tsx` - card visual para login e cadastro.
- `components/AuthSessionGate.tsx` - trava de sessao para area privada.
- `components/LoginForm.tsx` - formulario de login.
- `components/LogoutButton.tsx` - acao de logout.
- `components/RegisterForm.tsx` - formulario de cadastro.
- `components/UserGreeting.tsx` - saudacao do usuario autenticado.
- `services/authService.ts` - chamadas de auth para a API.
- `store/authStore.ts` - estado global de autenticacao.
- `types.ts` - tipos da feature de auth.
- `utils/logoutRedirect.ts` - controle do redirecionamento apos logout.
- `validators.ts` - schemas de validacao do formulario.

### apps/frontend/src/features/dashboard

- `components/DashboardPageClient.tsx` - pagina client do dashboard.
- `components/KanbanBoard.tsx` - quadro Kanban dos leads.
- `components/MetricCard.tsx` - card de metricas.
- `services/dashboardService.ts` - chamadas do dashboard na API.

### apps/frontend/src/features/leads

- `components/InteractionForm.tsx` - formulario de interacoes.
- `components/LeadDetailPageClient.tsx` - tela de detalhe do lead.
- `components/LeadFilters.tsx` - filtros da lista de leads.
- `components/LeadForm.tsx` - formulario de cadastro e edicao.
- `components/LeadListItem.tsx` - item individual da listagem.
- `components/LeadsPageClient.tsx` - pagina client da lista de leads.
- `components/LeadStatusBadge.tsx` - badge de status do lead.
- `constants.ts` - constantes de apoio da feature.
- `services/leadService.ts` - chamadas da API para leads.
- `types.ts` - tipos da feature de leads.
- `validators.ts` - schemas de validacao de leads.

### apps/frontend/src/lib

- `lib/constants.ts` - constantes compartilhadas do frontend.
- `lib/formatters.ts` - formatadores de data, moeda e texto.
- `lib/toast.ts` - helpers de notificacao visual.

### apps/frontend/src/services

- `services/api.ts` - cliente Axios, interceptors e tratamento de erros.

### apps/frontend/src/types

- `types/api.ts` - contratos padrao de resposta da API.

## e2e

- `auth.spec.ts` - fluxos de login, cadastro e logout.
- `dashboard.spec.ts` - cenarios do dashboard.
- `kanban.spec.ts` - comportamento do Kanban.
- `leads.spec.ts` - fluxos de leads e interacoes.
- `fixtures/auth.fixture.ts` - contexto autenticado reutilizavel.

## docs

### docs/ai

- `docs/ai/README.md` - guia de preenchimento da documentacao de uso de IA.
- `docs/ai/prompts.md` - lista guiada dos prompts principais usados no projeto.
- `docs/ai/decisions.md` - registro das decisoes tecnicas explicadas em primeira pessoa.
- `docs/ai/review.md` - revisao do que foi gerado, ajustado ou descartado com apoio de IA.

### docs/deploy

- `docs/deploy/README.md` - guia operacional de deploy em Railway e Vercel.

### docs/environment

- `docs/environment.md` - guia centralizado das variaveis por contexto de execucao.

### docs/documentation-audit

- `docs/documentation-audit.md` - auditoria de cobertura, riscos e observacoes da documentacao tecnica.

## Infraestrutura local

- `postgres-local/docker-compose.yml` - banco PostgreSQL isolado para desenvolvimento e testes.
- `traefik/dynamic.yml` - rotas e backend do Traefik para a stack local.
