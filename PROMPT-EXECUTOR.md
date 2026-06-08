# PROMPT EXECUTOR - Mini CRM de Leads

> Use este prompt para executar o `PROMPT-MESTRE.md` com controle de etapas.
> Este arquivo nao substitui o prompt mestre. Ele e uma camada operacional para impedir execucao baguncada, excesso de escopo por turno e avancos sem validacao.

---

## 1. Missao

Voce deve construir o projeto **Mini CRM de Leads** completo seguindo o arquivo `PROMPT-MESTRE.md` como fonte de verdade tecnica.

O objetivo e executar tudo em etapas, da **Etapa 1** ate a **Etapa 11**, incluindo os diferenciais opcionais previstos no prompt mestre:

- Docker completo com Traefik, MySQL, phpMyAdmin, backend e frontend.
- Testes E2E com Playwright.
- Preparacao para deploy em Vercel e Railway.
- Documentacao final de uso de IA.
- Checklist manual de entrega, incluindo GitHub privado e convite para `rodrigoamb`.

Voce deve agir como um engenheiro de software senior completo: rigoroso, pragmatico, seguro, organizado e focado em entregar software funcionando. Nao use frases vagas como "QI 299" para justificar decisoes. Demonstre senioridade pela execucao: leitura do contexto, escolhas simples, validacao real, commits bons e comunicacao clara.

---

## 2. Fonte de Verdade

Antes de qualquer implementacao, leia e use o `PROMPT-MESTRE.md`.

Regras de precedencia:

1. `PROMPT-MESTRE.md` define a arquitetura, stack, schema, endpoints, seguranca, design, testes, Docker, deploy, documentacao e ordem oficial.
2. `PROMPT-EXECUTOR.md` define o processo de execucao, validacao, pausa e aprovacao entre etapas.
3. Se houver conflito tecnico entre os dois, siga o `PROMPT-MESTRE.md`.
4. Se houver conflito de processo, siga este `PROMPT-EXECUTOR.md`.
5. Se alguma instrucao estiver inviavel no ambiente atual, explique o bloqueio, proponha a menor adaptacao segura e aguarde aprovacao antes de mudar o escopo.

Se estiver trabalhando em uma IA com acesso ao repositorio, comece sempre inspecionando:

- `PROMPT-MESTRE.md`
- `README.md`
- estrutura atual de pastas
- `git status`
- arquivos de configuracao ja existentes
- etapa atual ou primeira etapa incompleta

---

## 3. Modo de Trabalho Obrigatorio

Trabalhe **uma etapa por vez**.

Voce esta proibido de avancar para a proxima etapa sem:

- concluir a implementacao da etapa atual;
- rodar as validacoes tecnicas possiveis;
- corrigir falhas encontradas;
- listar o que o usuario precisa fazer manualmente;
- sugerir o commit da etapa;
- perguntar explicitamente: **"Posso avancar para a proxima etapa?"**

Se o usuario pedir "execute tudo", interprete como:

> "Execute todas as etapas, mas com pausa obrigatoria, validacao e aprovacao ao final de cada uma."

Nao implemente multiplas etapas em um unico bloco, exceto quando a etapa atual depender de um ajuste minimo de etapa anterior para corrigir quebra real. Nesse caso, explique a correcao.

---

## 4. Protocolo Fixo Para Cada Etapa

Em toda etapa, siga exatamente este ciclo.

### 4.1 Diagnostico inicial

Antes de editar arquivos:

1. Leia a parte relevante do `PROMPT-MESTRE.md`.
2. Inspecione o estado atual do repositorio.
3. Identifique arquivos existentes que serao reaproveitados.
4. Verifique se ha mudancas nao relacionadas no Git.
5. Declare qual etapa sera executada e qual sera o criterio de pronto.

### 4.2 Plano curto da etapa

Antes de codar, apresente um plano curto com:

- objetivo da etapa;
- principais entregaveis;
- arquivos ou areas que serao alteradas;
- validacoes que serao executadas;
- riscos ou dependencias manuais.

### 4.3 Implementacao

Durante a implementacao:

- preserve a arquitetura definida no `PROMPT-MESTRE.md`;
- mantenha separacao por camadas;
- nao invente stack nova;
- nao remova codigo do usuario sem necessidade;
- nao commite `.env`, tokens, credenciais ou arquivos sensiveis;
- use `.env.example` para documentar variaveis;
- valide input externo com Zod;
- mantenha regras de ownership por usuario;
- trate erros de forma padronizada;
- prefira simplicidade funcional a overengineering.

### 4.4 Validacao tecnica

Ao final da etapa, rode as validacoes possiveis no ambiente atual.

Exemplos:

- `npm run build`
- `npm test`
- `npm run lint`
- `npx prisma validate`
- `npx prisma migrate dev`
- `docker-compose up -d --build`
- `npm run test:e2e`

Se um comando falhar:

1. leia o erro;
2. corrija a causa;
3. rode novamente;
4. so pare se o bloqueio depender de credencial, servico externo, permissao ou acao manual do usuario.

### 4.5 Checklist manual

Toda etapa deve terminar com uma lista clara do que o usuario precisa fazer manualmente, quando houver.

Exemplos:

- preencher `.env`;
- iniciar Docker Desktop;
- criar banco local;
- abrir uma URL no navegador;
- conferir tela visualmente;
- fazer login em Vercel, Railway ou GitHub;
- criar repositorio privado;
- convidar `rodrigoamb`;
- confirmar deploy;
- executar comandos que exigem permissao local.

### 4.6 Fechamento da etapa

No fim de cada etapa, responda obrigatoriamente neste formato:

````md
## Etapa concluida: [numero e nome]

### O que foi feito

- ...

### Arquivos alterados

- ...

### Validacoes executadas

- Comando: ...
  Resultado: ...

### Pendencias ou bloqueios

- ...

### Acoes manuais para voce

- ...

### Commit sugerido

```bash
git add ...
git commit -m "tipo(escopo): resumo objetivo da entrega" \
  -m "Contexto: ..." \
  -m "Inclui: ..." \
  -m "Impacto: ..."
```
````

### Proxima etapa

Posso avancar para a proxima etapa?

---

## 5. Politica de Bloqueio

Uma etapa nao pode ser considerada concluida se:

- o projeto nao compila por erro introduzido na etapa;
- testes essenciais da etapa falham;
- migrations nao rodam quando a etapa depende delas;
- endpoint principal da etapa nao responde;
- fluxo visual principal esta quebrado;
- Docker nao sobe na etapa de Docker;
- E2E nao roda na etapa de E2E por erro de implementacao;
- documentacao obrigatoria nao foi atualizada na etapa final.

Bloqueios aceitaveis, desde que explicados:

- falta de Docker Desktop;
- falta de MySQL local;
- ausencia de credenciais externas;
- login necessario em GitHub, Vercel ou Railway;
- porta local ocupada;
- comando indisponivel no sistema;
- dependencia externa fora do ar.

Nunca finja que uma etapa passou. Se nao validou, diga exatamente o que nao foi validado e por que.

---

## 6. Mapa Oficial de Execucao

Siga a ordem abaixo. Ela replica a Secao 20 do `PROMPT-MESTRE.md`.

### Etapa 1 - Banco de Dados (MySQL + Prisma)

Objetivo: banco configurado, Prisma pronto, schema validado, migration inicial e seed.

Entregaveis:

- estrutura `apps/backend`;
- Prisma configurado com MySQL;
- `schema.prisma` com User, Lead, Interaction e enums;
- migration inicial;
- seed com usuario e dados de teste;
- `.env.example` necessario.

Validacoes:

- `npx prisma validate`
- `npx prisma migrate dev --name init`
- `npx prisma db seed`
- opcional: `npx prisma studio`

Acoes manuais:

- garantir MySQL rodando;
- preencher `DATABASE_URL`;
- abrir Prisma Studio, se necessario;
- conferir se seed criou usuario de teste.

Commit sugerido:

- `chore(db): bootstrap prisma + datasource mysql`
- `feat(db): schema completo + migration inicial + seed`

---

### Etapa 2 - Backend Fundacao (Express + Seguranca)

Objetivo: servidor TypeScript com arquitetura base, middlewares globais e tratamento de erro.

Entregaveis:

- setup Node.js + Express + TypeScript;
- scripts de desenvolvimento, build e start;
- `app.ts` e `server.ts`;
- config de ambiente com Zod;
- Prisma singleton;
- `AppError`, `asyncHandler` e `errorMiddleware`;
- Helmet, CORS, cookie-parser e rate limit;
- rota de health check.

Validacoes:

- `npm run build`
- `npm run dev`
- chamada para `/health`

Acoes manuais:

- conferir porta `3001`;
- ajustar `.env` local se necessario;
- testar endpoint no navegador, curl, Insomnia ou Postman.

Commit sugerido:

- `chore(backend): setup TypeScript + scripts + dependencias core`
- `feat(core): config de ambiente + prisma singleton + tratamento de erros`
- `feat(app): app express com seguranca base`

---

### Etapa 3 - Autenticacao

Objetivo: registro, login, logout e rota `/me` com JWT em cookie httpOnly.

Entregaveis:

- validators de auth;
- repository, service e controller de auth;
- hash de senha com bcrypt;
- JWT com payload seguro;
- cookie httpOnly;
- middleware de autenticacao;
- tipagem de `req.user`;
- rotas `/auth/register`, `/auth/login`, `/auth/logout`, `/auth/me`.

Validacoes:

- registrar usuario;
- fazer login;
- acessar `/auth/me`;
- fazer logout;
- confirmar erro generico em credenciais invalidas.

Acoes manuais:

- testar com cliente HTTP que preserve cookies;
- conferir se cookie esta httpOnly;
- confirmar que `passwordHash` nunca aparece na resposta.

Commit sugerido:

- `feat(auth): dominio de autenticacao completo`
- `feat(auth): middleware e rotas de autenticacao integradas`

---

### Etapa 4 - Leads (CRUD + Ownership)

Objetivo: CRUD de leads com isolamento por usuario autenticado.

Entregaveis:

- validators de lead;
- repository, service, controller e routes;
- criar, listar, buscar por id, atualizar e deletar lead;
- filtros por status;
- busca por nome, email e empresa;
- paginacao;
- PATCH de status para Kanban;
- ownership em todas as consultas.

Validacoes:

- criar lead autenticado;
- listar leads do usuario;
- filtrar por status;
- buscar por texto;
- atualizar lead;
- mover status;
- deletar lead;
- tentar acessar lead de outro usuario e receber 404.

Acoes manuais:

- testar endpoints com cookies ativos;
- criar dois usuarios para validar isolamento;
- conferir payloads e mensagens de erro.

Commit sugerido:

- `feat(leads): CRUD base com validacao e ownership`
- `feat(leads): filtros paginacao busca e status`

---

### Etapa 5 - Interacoes + Dashboard

Objetivo: registrar historico de contato por lead e expor metricas consolidadas.

Entregaveis:

- modulo de interacoes;
- criar, listar e remover interacoes;
- validacao de ownership via lead;
- dashboard com total de leads, leads por status, total de interacoes e ultimos leads;
- queries paralelas quando fizer sentido.

Validacoes:

- criar interacao em lead proprio;
- listar interacoes ordenadas;
- deletar interacao;
- impedir interacao em lead de outro usuario;
- consultar `/dashboard` e conferir agregacoes.

Acoes manuais:

- criar massa minima de leads e interacoes;
- conferir se os numeros do dashboard batem com o banco.

Commit sugerido:

- `feat(interactions): modulo de interacoes por lead`
- `feat(dashboard): agregacoes do funil de leads`

---

### Etapa 6 - Testes Backend (Jest + Supertest)

Objetivo: proteger regras criticas do backend com testes unitarios e de integracao.

Entregaveis:

- Jest + ts-jest + Supertest configurados;
- ambiente de teste isolado;
- setup/teardown de teste;
- testes de auth;
- testes de leads;
- cobertura minima de services e rotas criticas.

Validacoes:

- `npm test`
- `npm run test:coverage`, se configurado

Acoes manuais:

- garantir banco de teste disponivel;
- conferir `.env.test`;
- aceitar que testes podem resetar dados do banco de teste.

Commit sugerido:

- `test(backend): infraestrutura de testes`
- `test(backend): suite de auth e leads`

---

### Etapa 7 - Docker Completo (5 servicos)

Objetivo: subir a stack inteira com um comando.

Entregaveis:

- Dockerfile multi-stage do backend;
- Dockerfile standalone do frontend;
- `.dockerignore` em backend e frontend;
- `docker-compose.yml` com Traefik, MySQL, phpMyAdmin, backend e frontend;
- healthcheck do MySQL;
- roteamento `/api` para backend;
- frontend em `http://localhost`;
- phpMyAdmin em `http://localhost:8081`;
- documentacao de variaveis e comandos.

Validacoes:

- `docker-compose up -d --build`
- `docker-compose ps`
- abrir `http://localhost`
- abrir `http://localhost/api/v1/health`
- abrir `http://localhost:8081`

Acoes manuais:

- iniciar Docker Desktop;
- liberar portas `80`, `8080`, `8081`, `3000`, `3001` se necessario;
- conferir logs dos containers;
- conferir credenciais do phpMyAdmin.

Commit sugerido:

- `chore(docker): dockerfiles multi-stage`
- `feat(docker): compose com traefik mysql backend e frontend`
- `docs(docker): variaveis e comandos de operacao`

---

### Etapa 8 - Frontend Base (Next.js + Auth)

Objetivo: base web com autenticacao funcional e estrutura de cliente.

Entregaveis:

- Next.js App Router com TypeScript;
- TailwindCSS;
- Axios com `withCredentials`;
- store de auth com Zustand;
- validators e types compartilhados quando aplicavel;
- paginas de login e registro;
- layout privado;
- redirect para login quando nao autenticado;
- redirect para dashboard quando autenticado.

Validacoes:

- `npm run build`
- fluxo register -> dashboard;
- fluxo login -> dashboard;
- refresh mantendo sessao;
- logout voltando para login;
- 401 redirecionando para login.

Acoes manuais:

- rodar backend;
- preencher `NEXT_PUBLIC_API_URL`;
- testar no navegador;
- conferir cookies no DevTools.

Commit sugerido:

- `chore(frontend): scaffold next com dependencias essenciais`
- `feat(frontend): cliente api e estado de autenticacao`
- `feat(auth-ui): telas e fluxo de autenticacao`

---

### Etapa 9 - Frontend Features + Design/Responsivo

Objetivo: entregar telas finais do CRM com UX robusta, responsiva e acessivel.

Entregaveis:

- design system base;
- componentes Button, Input, Modal, Badge, Spinner e EmptyState;
- Sidebar e Header;
- dashboard visual;
- listagem de leads;
- filtros;
- formulario de criar/editar lead;
- pagina de detalhes;
- interacoes por lead;
- Kanban com dnd-kit;
- fallback mobile por select ou controle equivalente;
- estados loading, error, empty e success;
- responsividade em 320, 375, 425, 768, 1024 e 1280 px.

Validacoes:

- `npm run build`
- criar lead pela UI;
- editar lead pela UI;
- deletar lead pela UI;
- criar interacao pela UI;
- mover lead no Kanban e persistir;
- validar sem overflow horizontal nos breakpoints.

Acoes manuais:

- testar visualmente no navegador;
- abrir DevTools em breakpoints;
- conferir contraste, foco, labels e navegacao por teclado.

Commit sugerido:

- `feat(ui): design system responsivo`
- `feat(leads-ui): telas de leads e detalhes`
- `feat(kanban-dashboard): kanban e dashboard responsivos`

---

### Etapa 9b - E2E (Playwright)

Objetivo: validar fluxos criticos em navegador real.

Entregaveis:

- Playwright configurado;
- fixture de autenticacao;
- specs de auth;
- specs de leads;
- specs de kanban;
- specs de dashboard;
- scripts no package.json;
- documentacao de como rodar.

Validacoes:

- `npx playwright install chromium firefox`, quando necessario;
- `npm run test:e2e`;
- evidencias de falha, se houver.

Acoes manuais:

- permitir instalacao dos browsers do Playwright;
- garantir backend e banco rodando;
- garantir seed com usuario de teste;
- revisar screenshots, traces ou videos se falhar.

Commit sugerido:

- `test(e2e): setup playwright e fixture de auth`
- `test(e2e): specs de auth leads kanban e dashboard`

---

### Etapa 10 - Deploy (Vercel + Railway)

Objetivo: preparar e orientar publicacao em ambiente real.

Entregaveis:

- ajustes de variaveis de producao;
- documentacao de deploy;
- checklist de smoke test;
- instrucoes para Vercel;
- instrucoes para Railway;
- observacoes de CORS, cookies, `secure`, `sameSite` e `withCredentials`;
- registro honesto do que foi ou nao publicado.

Validacoes:

- build local de producao;
- checklist de variaveis;
- smoke test em producao se as URLs forem fornecidas:
  - register;
  - login;
  - criar lead;
  - mover no Kanban;
  - logout.

Acoes manuais:

- criar/importar projeto no Vercel;
- criar/importar backend no Railway;
- criar banco MySQL no Railway ou configurar banco externo;
- preencher `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `NEXT_PUBLIC_API_URL`;
- confirmar URLs publicas;
- ajustar dominio e cookies se frontend/backend estiverem em dominios diferentes.

Commit sugerido:

- `chore(deploy): configuracao e documentacao de producao`

---

### Etapa 11 - Documentacao e Entrega

Objetivo: finalizar entrega com README, docs de IA, checklist e rastreabilidade tecnica.

Entregaveis:

- `README.md` completo;
- `/docs/ai/README.md`;
- `/docs/ai/prompts.md`;
- `/docs/ai/decisions.md`;
- `/docs/ai/review.md`;
- checklist final da Secao 18;
- registro de funcionalidades entregues e pendentes;
- comandos de instalacao, execucao, testes e Docker;
- usuario de teste;
- instrucoes de deploy, se aplicavel.

Validacoes:

- leitura completa do README;
- comandos documentados batem com scripts reais;
- `.env.example` existe e esta coerente;
- checklist de entrega revisado;
- `git status` limpo apos commits.

Acoes manuais:

- criar repositorio GitHub privado;
- subir codigo;
- convidar `rodrigoamb`;
- conferir se migrations foram commitadas;
- conferir se nenhum `.env` foi commitado;
- enviar links de deploy, se existirem;
- revisar documentacao final antes de entregar.

Commit sugerido:

- `docs(ai): documentacao completa de uso da IA`
- `docs(project): README final e checklist de entrega`

---

## 7. Comando Inicial Para a IA Executora

Quando for iniciar a execucao, use esta mensagem:

```md
Leia primeiro `PROMPT-EXECUTOR.md` e `PROMPT-MESTRE.md`.

Quero executar o projeto completo, mas uma etapa por vez.

Comece identificando o estado atual do repositorio e execute somente a primeira etapa incompleta da Secao 20 do `PROMPT-MESTRE.md`.

No fim da etapa, rode as validacoes possiveis, liste as acoes manuais, sugira o commit e pare perguntando:

"Posso avancar para a proxima etapa?"
```

---

## 8. Regras Para Qualidade da Entrega

Durante toda a execucao:

- priorize software funcionando antes de diferenciais;
- nunca esconda falhas de teste ou build;
- mantenha o escopo do teste tecnico;
- documente decisoes importantes;
- preserve clareza para avaliador junior/senior;
- evite arquitetura decorativa sem uso real;
- valide seguranca nos pontos realmente sensiveis;
- use commits que contem uma historia tecnica coerente;
- mantenha README e docs alinhados com o que foi realmente implementado.

O resultado final esperado e um projeto que o avaliador consiga clonar, configurar, rodar, testar e entender sem depender de explicacoes fora do repositorio.
