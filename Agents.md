# Instruções do Projeto para o Codex

## Objetivo

Este projeto é um CRM web em desenvolvimento. Antes de alterar código, entenda a estrutura, preserve decisões já tomadas e avance por etapas pequenas e rastreáveis.

Leia sempre também:

- [CONTEXTO_MINICRMDELEADS.md](./CONTEXTO_MINICRMDELEADS.md)
- [HISTORY.md](./HISTORY.md)
- [PROMPT-MESTRE.md](./PROMPT-MESTRE.md)
- [PROMPT-EXECUTOR.md](./PROMPT-EXECUTOR.md)

## Regras

- Não reescrever o projeto inteiro sem necessidade.
- Fazer mudanças pequenas, seguras e rastreáveis.
- Sempre explicar quais arquivos foram alterados.
- Sempre verificar TypeScript, Prisma, Docker, migrations e variáveis de ambiente.
- Não expor senhas reais em respostas.
- Antes de sugerir deploy, validar build, banco e migrations.
- Antes de avançar, registrar o que mudou no `HISTORY.md`.
- Trabalhar em uma branch dedicada de migração até concluir tudo.

## Prioridades de trabalho

1. Entender o estado atual do projeto.
2. Fazer uma etapa por vez.
3. Validar tecnicamente o que foi alterado.
4. Corrigir falhas antes de seguir.
5. Atualizar documentação e `HISTORY.md`.
6. Sugerir commit semântico.
7. Pedir aprovação antes de avançar.

## Stack atual

- Frontend: Next.js 16.2.x, React 19, TypeScript
- Backend: Express, TypeScript, Prisma 5.22, Zod, bcrypt, JWT, Helmet, CORS, express-rate-limit
- Banco oficial: PostgreSQL
- Admin local: pgAdmin
- Docker: Docker Compose + Traefik
- Testes backend: Jest + Supertest
- Testes E2E: Playwright
- Feedback visual: react-toastify
- Estado frontend: Zustand
- Formulários: react-hook-form + zod
- HTTP client frontend: Axios com `withCredentials`

## Fluxo operacional obrigatório

### Antes de editar

- ler o contexto da branch
- identificar a etapa atual
- conferir `git status`
- localizar arquivos afetados
- evitar mexer em partes fora do escopo

### Durante a execução

- manter as alterações pequenas
- não quebrar o que já funciona
- não misturar várias etapas sem necessidade
- quando houver dependência de ambiente, deixar isso explícito

### Depois de editar

- rodar as validações possíveis
- registrar no `HISTORY.md`
- listar ações manuais
- sugerir commit
- informar o que ainda está bloqueado por ambiente

## Comandos úteis

- `docker compose up -d --build`
- `docker compose config`
- `docker compose ps`
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run test`
- `npm run test:e2e`
- `npx prisma generate`
- `npx prisma validate`
- `npx prisma migrate dev`
- `npx prisma migrate deploy`
- `npm run db:seed`

## Contexto técnico que não pode ser esquecido

- PostgreSQL é o banco oficial agora.
- MySQL só pode aparecer como legado histórico dentro do `HISTORY.md`.
- `pgAdmin` substitui `phpMyAdmin`.
- O runtime final de referência é Node 24 LTS + npm 11.
- O frontend usa `react-toastify` para feedback visual.
- O backend usa cookie httpOnly, CORS com credentials e rate limit.
- O frontend continua com rewrite/proxy em `/api/v1`.
- O E2E envia `x-e2e-test-key` quando configurado.
- Os testes backend usam banco real de teste via Prisma.
- Docker local principal e banco isolado têm portas diferentes para não conflitar.
- A branch de migração é `chore/postgresql-migration`.

## Último plano pendente

### Estado atual

O projeto já passou por:

- migração estrutural para PostgreSQL
- atualização de runtime
- atualização de Dockerfiles
- atualização de prompts e documentação
- adição de `react-toastify`
- ajuste inicial de E2E
- correção da vulnerabilidade transitiva de `postcss` no frontend

### O que ainda falta validar

1. subir o Docker Desktop da máquina
2. executar `cd postgres-local && docker compose up -d`
3. criar o banco de teste `mini_crm_leads_test`
4. rodar migrations no banco principal e no banco de teste
5. rodar o seed no banco principal
6. executar `cd apps/backend && npm test`
7. executar a stack principal `docker compose up -d --build`
8. testar `/health` e `/api/v1/health`
9. testar login, dashboard, CRUD de leads e interacoes no frontend
10. executar `npm run test:e2e`
11. revisar Railway/Vercel com PostgreSQL
12. fechar a branch com merge para `main` quando tudo estiver verde

### Próximas entregas esperadas

- backend e banco validados localmente
- frontend validado com stack completa
- E2E verde
- deploy revisado em Railway/Vercel
- fechamento da branch de migração

## Ações manuais que o usuário precisa fazer

- iniciar Docker Desktop
- verificar portas e volumes se houver conflito
- conferir credenciais e variáveis externas no Railway/Vercel
- validar o smoke test de produção
- aprovar o merge final para `main`

## O que sempre reportar ao final de cada etapa

- arquivos alterados
- comandos executados
- resultado das validações
- erros restantes
- ações manuais necessárias
- commit sugerido
- pergunta: `Posso avançar para a próxima etapa?`
