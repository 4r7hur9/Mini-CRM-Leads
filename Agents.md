# InstruÃ§Ãµes do Projeto para o Codex

## Objetivo

Este projeto Ã© um CRM web em desenvolvimento. Antes de alterar cÃ³digo, entenda a estrutura, preserve decisÃµes jÃ¡ tomadas e avance por etapas pequenas e rastreÃ¡veis.

Leia sempre tambÃ©m:

- [CONTEXTO_MINICRMDELEADS.md](./CONTEXTO_MINICRMDELEADS.md)
- [HISTORY.md](./HISTORY.md)
- [PROMPT-MESTRE.md](./PROMPT-MESTRE.md)
- [PROMPT-EXECUTOR.md](./PROMPT-EXECUTOR.md)

## Regras

- NÃ£o reescrever o projeto inteiro sem necessidade.
- Fazer mudanÃ§as pequenas, seguras e rastreÃ¡veis.
- Sempre explicar quais arquivos foram alterados.
- Sempre verificar TypeScript, Prisma, Docker, migrations e variÃ¡veis de ambiente.
- NÃ£o expor senhas reais em respostas.
- Antes de sugerir deploy, validar build, banco e migrations.
- Antes de avanÃ§ar, registrar o que mudou no `HISTORY.md`.
- Trabalhar em uma branch dedicada de migraÃ§Ã£o atÃ© concluir tudo.

## Prioridades de trabalho

1. Entender o estado atual do projeto.
2. Fazer uma etapa por vez.
3. Validar tecnicamente o que foi alterado.
4. Corrigir falhas antes de seguir.
5. Atualizar documentaÃ§Ã£o e `HISTORY.md`.
6. Sugerir commit semÃ¢ntico.
7. Pedir aprovaÃ§Ã£o antes de avanÃ§ar.

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
- FormulÃ¡rios: react-hook-form + zod
- HTTP client frontend: Axios com `withCredentials`

## Fluxo operacional obrigatÃ³rio

### Antes de editar

- ler o contexto da branch
- identificar a etapa atual
- conferir `git status`
- localizar arquivos afetados
- evitar mexer em partes fora do escopo

### Durante a execuÃ§Ã£o

- manter as alteraÃ§Ãµes pequenas
- nÃ£o quebrar o que jÃ¡ funciona
- nÃ£o misturar vÃ¡rias etapas sem necessidade
- quando houver dependÃªncia de ambiente, deixar isso explÃ­cito

### Depois de editar

- rodar as validaÃ§Ãµes possÃ­veis
- registrar no `HISTORY.md`
- listar aÃ§Ãµes manuais
- sugerir commit
- informar o que ainda estÃ¡ bloqueado por ambiente

## Comandos Ãºteis

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

## Contexto tÃ©cnico que nÃ£o pode ser esquecido

- PostgreSQL Ã© o banco oficial agora.
- Banco legado só pode aparecer dentro do `HISTORY.md`.
- `pgAdmin` substitui `phpMyAdmin`.
- O runtime final de referÃªncia Ã© Node 24 LTS + npm 11.
- O frontend usa `react-toastify` para feedback visual.
- O backend usa cookie httpOnly, CORS com credentials e rate limit.
- O frontend continua com rewrite/proxy em `/api/v1`.
- O E2E envia `x-e2e-test-key` quando configurado.
- Os testes backend usam banco real de teste via Prisma.
- Docker local principal e banco isolado tÃªm portas diferentes para nÃ£o conflitar.
- A branch de migraÃ§Ã£o Ã© `chore/postgresql-migration`.

## Ãšltimo plano pendente

### Estado atual

O projeto jÃ¡ passou por:

- migraÃ§Ã£o estrutural para PostgreSQL
- atualizaÃ§Ã£o de runtime
- atualizaÃ§Ã£o de Dockerfiles
- atualizaÃ§Ã£o de prompts e documentaÃ§Ã£o
- adiÃ§Ã£o de `react-toastify`
- ajuste inicial de E2E
- correÃ§Ã£o da vulnerabilidade transitiva de `postcss` no frontend

### O que ainda falta validar

1. subir o Docker Desktop da mÃ¡quina
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

### PrÃ³ximas entregas esperadas

- backend e banco validados localmente
- frontend validado com stack completa
- E2E verde
- deploy revisado em Railway/Vercel
- fechamento da branch de migraÃ§Ã£o

## AÃ§Ãµes manuais que o usuÃ¡rio precisa fazer

- iniciar Docker Desktop
- verificar portas e volumes se houver conflito
- conferir credenciais e variÃ¡veis externas no Railway/Vercel
- validar o smoke test de produÃ§Ã£o
- aprovar o merge final para `main`

## O que sempre reportar ao final de cada etapa

- arquivos alterados
- comandos executados
- resultado das validaÃ§Ãµes
- erros restantes
- aÃ§Ãµes manuais necessÃ¡rias
- commit sugerido
- pergunta: `Posso avanÃ§ar para a prÃ³xima etapa?`
