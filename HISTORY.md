# HISTORY

Registro cronologico e tecnico do Mini CRM de Leads.

O formato aqui mistura narrativa curta com pontos de auditoria, para manter contexto humano sem perder rastreabilidade.

## 1. Origem do projeto

Objetivo inicial:

- criar um Mini CRM de Leads full-stack para teste tecnico;
- usar backend Express + Prisma;
- usar frontend Next.js;
- entregar deploy em Railway + Vercel;
- manter testes backend e E2E;
- documentar o uso de IA e as decisoes tecnicas.

Estado inicial:

- stack com MySQL;
- docker local com Traefik;
- prompts oficiais em fase de definicao;
- fluxo dividido em etapas para evitar retrabalho.

## 2. Prompts oficiais e fluxo de execucao

Decisao:

- criar `PROMPT-MESTRE.md` como fonte de verdade tecnica;
- criar `PROMPT-EXECUTOR.md` como camada operacional;
- exigir pausa, validacao e aprovacao ao fim de cada etapa.

Auditoria:

- etapas numeradas e controladas;
- commits semanticos por bloco funcional;
- registro de contexto no `HISTORY.md`.

## 3. Primeiras entregas do backend

Resumo:

- estrutura inicial do backend criada;
- schema Prisma definido;
- migrations iniciais montadas;
- seed com usuario e leads de exemplo;
- configuracao base de ambiente e erros padronizados.

Auditoria:

- autenticacao com JWT em cookie httpOnly;
- CORS, cookie-parser, helmet e rate limit aplicados;
- Prisma singleton e validacao de env preparados;
- seed com `admin@teste.com / Admin@123`.

## 4. Regra de negocio principal

Resumo:

- CRUD de leads com ownership por usuario;
- interacoes por lead;
- dashboard com metricas e funil.

Auditoria:

- auth com login, registro, logout e `me`;
- leads com filtros, busca, paginação e status;
- historico de interacoes por lead;
- dashboard com agregacoes de negocio.

## 5. Testes backend e E2E

Resumo:

- suite backend criada com Jest + Supertest;
- suite E2E criada com Playwright;
- cobertura dos fluxos criticos do produto.

Auditoria:

- testes backend usam banco real de teste via Prisma;
- Playwright cobre auth, dashboard, leads e Kanban;
- o ambiente de teste exige banco isolado ativo.

## 6. Frontend e experiencia de usuario

Resumo:

- layout privado, login e registro;
- dashboard visual;
- listagem e detalhe de leads;
- Kanban responsivo;
- interacoes e filtros;
- estados de loading, empty e error.

Auditoria:

- Axios com `withCredentials`;
- Zustand para auth;
- validação com react-hook-form + zod;
- responsividade ajustada para desktop e mobile.

## 7. Docker local inicial

Resumo:

- stack local montada com Traefik + MySQL + phpMyAdmin + backend + frontend;
- compose isolado para banco local;
- portas e variaveis documentadas.

Auditoria:

- `mysql-local` foi usado como ambiente de banco isolado;
- a stack principal era voltada ao desenvolvimento local;
- o deploy seguia o modelo Railway + Vercel.

## 8. Branch de migracao

Resumo:

- criada a branch `chore/postgresql-migration`;
- o trabalho passou a acontecer de forma exclusiva nessa branch;
- a `main` ficou como referencia estavel.

Auditoria:

- o plano foi reorganizado para migracao completa;
- `HISTORY.md` passou a ser artefato obrigatorio;
- o executor passou a exigir validacao ao fim de cada etapa.

## 9. Upgrade de runtime

Resumo:

- projeto atualizado para Node 24 LTS + npm 11;
- Dockerfiles migrados para `node:24-alpine`;
- `engines` adicionados aos manifests;
- `.nvmrc` criado.

Auditoria:

- frontend e backend passaram a usar baseline moderna e alinhada;
- a stack ficou consistente com o plano final.

## 10. Migracao para PostgreSQL

Resumo:

- Docker principal trocado para PostgreSQL + pgAdmin;
- banco isolado renomeado para `postgres-local`;
- Prisma trocado para `provider = "postgresql"`;
- migrations e envs ajustados;
- README e docs de deploy reescritos.

Auditoria:

- portas locais reorganizadas:
  - stack principal: `5433`
  - banco isolado: `5434`
- o MySQL passou a ser apenas legado historico;
- `phpMyAdmin` foi substituido por `pgAdmin`;
- o backend passou a usar `postgresql://`.

## 11. Feedback visual com React-Toastify

Resumo:

- `react-toastify` adicionado ao frontend;
- container global registrado no layout;
- toasts aplicados nos fluxos principais;
- logout passou a mostrar confirmacao simples na tela de login apos o redirecionamento.

Auditoria:

- login
- registro
- criar lead
- editar lead
- excluir lead
- registrar interacao
- excluir interacao
- mover lead no dashboard
- logout intencional identificado durante o redirecionamento;
- confirmacao `Sessao encerrada com sucesso.` exibida em `/login?loggedOut=1`;
- redirecionamentos automaticos por `401` preservam a confirmacao de logout.

## 12. E2E alinhado ao comportamento final

Resumo:

- specs Playwright cobrem os fluxos principais;
- teste de logout alinhado ao feedback atual em `/login?loggedOut=1`;
- suite completa validada com PostgreSQL ativo;
- docs de IA criadas;
- prompt mestre e executor atualizados;
- README principal reescrito.

Auditoria:

- suite E2E listada com 27 testes;
- spec de autenticacao: 9 de 9 testes passaram;
- suite E2E completa: 27 de 27 testes passaram;
- Chromium, Firefox e mobile Chrome validados;
- fluxos de cadastro, login invalido, login, logout, dashboard, leads, interacoes e Kanban passam;
- docs auxiliares passaram a refletir a arquitetura real;
- a base de contexto ficou pronta para outra conta do Codex.

## 13. Correção de dependência transitiva no frontend

Resumo:

- `npm audit` apontou vulnerabilidade moderada em `postcss` via `next`;
- foi tentado override conservador;
- a solução final foi reinstalação limpa do frontend;
- o `next` subiu para `16.2.9`;
- o `npm audit` do frontend zerou.

Auditoria:

- `postcss` transitivo passou a ficar em `8.5.15`;
- o build do frontend permaneceu verde;
- a correção foi feita sem downgrades agressivos.

## 14. Validacoes executadas nesta branch

- `npm.cmd run build` no backend: ok
- `npm.cmd run build` no frontend: ok
- `npx.cmd prisma validate`: ok
- `npx.cmd prisma generate`: ok
- migrations aplicadas no PostgreSQL principal: ok
- migrations aplicadas no PostgreSQL de teste: ok
- seed no PostgreSQL principal: ok
- testes backend: 19 de 19 passaram
- `docker compose config`: ok
- `docker compose up -d --build`: ok
- stack principal com PostgreSQL, pgAdmin, backend, frontend e Traefik: ok
- `GET /health`: HTTP 200
- `GET /api/v1/health`: HTTP 200
- smoke de login, logout e confirmacao visual: ok
- `npm.cmd run test:e2e:list`: ok
- `npx.cmd playwright test e2e/auth.spec.ts`: 9 de 9 passaram
- `npm.cmd run test:e2e`: 27 de 27 passaram
- `npm.cmd audit` no frontend: ok

## 15. Incidentes e bloqueios

Incidentes resolvidos:

- Docker Desktop/daemon esteve indisponivel no inicio da validacao;
- `postgres-local` nao subiu enquanto o daemon estava inativo;
- testes backend falharam enquanto o banco de teste em `localhost:5434` nao existia;
- pgAdmin reiniciava porque `admin@mini-crm.local` nao era aceito como email valido;
- o email padrao do pgAdmin foi corrigido para `admin@example.com`;
- containers orfaos de MySQL e phpMyAdmin foram removidos da stack principal;
- o feedback de logout era atropelado pelos redirecionamentos automaticos de seguranca;
- o logout intencional passou a preservar o destino `/login?loggedOut=1`.

Bloqueio atual:

- nenhuma falha de infraestrutura local ativa;
- nenhuma falha E2E ativa;
- validacao de deploy PostgreSQL no Railway/Vercel permanece como proxima etapa.

## 16. Commit e push

- commit principal da migracao:
  - `987f500 chore(postgresql): consolidar migracao e feedback visual`
- push realizado na branch `chore/postgresql-migration`

## 17. Estado atual

Resumo:

- o projeto esta documentado e codificado para PostgreSQL;
- o frontend esta com build e audit verdes;
- o backend compila e o Prisma valida;
- PostgreSQL isolado e stack principal estao ativos;
- migrations, seed, testes backend e rotas de saude foram validados;
- a Etapa 5 de feedback visual esta concluida;
- a Etapa 6 de E2E esta concluida.

Auditoria:

- stack principal local esta saudavel;
- banco PostgreSQL principal e banco de teste estao disponiveis;
- logout mostra confirmacao visivel na tela de login;
- suite E2E completa esta verde;
- alteracoes da Etapa 6 ainda nao foram commitadas;
- deploy final, documentacao final e fechamento da branch permanecem pendentes.

## 18. Proximos passos

1. realizar o commit de fechamento da Etapa 6
2. iniciar a Etapa 7 e revisar Railway/Vercel com PostgreSQL
3. validar smoke test de producao
4. concluir documentacao final e busca de residuos ativos do banco legado
5. preparar o merge final para `main`

## 19. Regra final

- PostgreSQL e o banco oficial.
- MySQL pode aparecer apenas como legado historico.
- O fluxo de trabalho continua por etapas curtas, com validacao, registro e aprovacao.

## 20. Incidente de deploy: rewrite do frontend para backend

Sintoma:

- em producao, cadastro e login nao respondiam corretamente;
- o navegador chamava `https://mini-crm-leads.vercel.app/api/v1/auth/register`;
- a resposta era `404 Not Found`;
- os headers indicavam passagem pelo Railway, mostrando que o problema nao era CORS nem banco nesse ponto.

Causa raiz:

- o rewrite do Next.js removia o prefixo `/api/v1` antes de encaminhar para o backend;
- quando `NEXT_PUBLIC_API_URL` era configurada apenas com a raiz do backend Railway, o backend recebia `/auth/register`;
- a API Express registra as rotas em `/api/v1`, entao `/auth/register` nao existe e retorna 404.

Correcao aplicada:

- `apps/frontend/next.config.ts` passou a normalizar `NEXT_PUBLIC_API_URL`;
- se a variavel vier sem `/api/v1`, o frontend adiciona automaticamente;
- se a variavel ja vier com `/api/v1`, o comportamento permanece igual.

Acao manual necessaria:

- redeploy do frontend na Vercel para aplicar o novo rewrite;
- manter `NEXT_PUBLIC_API_URL` apontando para a URL publica do backend Railway, com ou sem `/api/v1`.
