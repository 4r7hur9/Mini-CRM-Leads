# PROMPT-EXECUTOR

> Use este arquivo para executar o `PROMPT-MESTRE.md` em etapas pequenas, revisaveis e bloqueadas por aprovacao.
> Ele nao substitui o prompt mestre. Ele e a camada operacional que controla ordem, validacao, pausas e escopo.

---

## 1. Missao

Sua missao e executar o projeto **Mini CRM de Leads** completo com base no `PROMPT-MESTRE.md`, seguindo uma estrategia de entrega profissional:

- uma branch dedicada de migracao;
- uma etapa por vez;
- validacao tecnica ao final de cada etapa;
- registro continuo no `HISTORY.md`;
- acoes manuais claras;
- commits semanticos sugeridos;
- pausa obrigatoria para aprovacao antes de avancar.

O objetivo final desta fase e:

- migrar totalmente do banco legado para PostgreSQL;
- atualizar o runtime para `Node 24 LTS + npm 11`;
- substituir referencias ativas do banco legado por PostgreSQL, `pgAdmin` e stack nova;
- adicionar feedback visual com `react-toastify`;
- alinhar backend, frontend, Docker, testes, Playwright, deploy e documentacao;
- preservar a `main` como referencia estavel ate o fechamento da branch de migracao.

---

## 2. Fonte de Verdade

Antes de qualquer implementacao:

1. leia `PROMPT-MESTRE.md`;
2. leia `README.md`;
3. leia `HISTORY.md`, se existir;
4. inspecione `git status`;
5. descubra a etapa atual;
6. execute somente a etapa atual.

Regras de precedencia:

1. `PROMPT-MESTRE.md` e a fonte de verdade tecnica.
2. `PROMPT-EXECUTOR.md` e a fonte de verdade do processo de execucao.
3. `HISTORY.md` guarda a cronologia real do que ja foi feito, ajustado, quebrado, corrigido e validado.
4. Se houver conflito tecnico, siga o `PROMPT-MESTRE.md`.
5. Se houver conflito de processo, siga este `PROMPT-EXECUTOR.md`.

---

## 3. Estrategia de Branch Obrigatoria

Trabalhe nesta iniciativa em uma branch longa e dedicada:

```bash
git checkout -b chore/postgresql-migration
```

Regras:

- toda esta migracao acontece nessa branch;
- nao usar sub-branches por etapa como padrao;
- fazer pushes frequentes para backup e rastreabilidade;
- se a `main` mudar durante a migracao:

```bash
git fetch origin
git merge origin/main
```

- evitar rebase com force-push em fluxo longo;
- so integrar de volta para `main` depois de validar build, testes, E2E, Docker, deploy e docs finais;
- o merge final para `main` deve preservar historico, preferencialmente sem squash.

---

## 4. Modo de Trabalho Obrigatorio

Voce deve trabalhar **uma etapa por vez**.

E proibido avancar para a proxima etapa sem:

- concluir a implementacao da etapa atual;
- validar o que for possivel tecnicamente;
- corrigir falhas antes de seguir;
- atualizar o `HISTORY.md`;
- listar acoes manuais do usuario;
- sugerir commits da etapa;
- perguntar explicitamente:

**"Posso avancar para a proxima etapa?"**

Se o usuario disser "execute tudo", interprete como:

> "Execute em sequencia, mas pare ao final de cada etapa com validacao, resumo, acoes manuais e pedido de aprovacao."

---

## 5. Regras de Execucao Senior

Durante qualquer etapa:

- leia antes de editar;
- preserve o escopo da etapa;
- prefira mudancas pequenas e verificaveis;
- siga a arquitetura existente quando ela continuar valida;
- remova legados ativos do banco anterior quando fizer sentido tecnico;
- nao deixe referencias ativas do banco anterior no produto final;
- use `HISTORY.md` para registrar decisoes e incidentes;
- nao commite `.env`, segredos ou credenciais reais;
- documente variaveis em arquivos de exemplo;
- valide com build, testes, Docker e E2E conforme a etapa permitir;
- se build, teste, migration, Docker ou deploy falhar, corrija antes de avancar.

---

## 6. Protocolo Obrigatorio por Etapa

Em toda etapa, siga sempre este ciclo:

### 6.1 Diagnostico inicial

Antes de editar:

1. releia a parte relevante do `PROMPT-MESTRE.md`;
2. revise o estado atual do repositorio;
3. identifique os arquivos que serao alterados;
4. declare qual etapa sera executada;
5. defina criterio de pronto.

### 6.2 Plano curto da etapa

Explique:

- objetivo;
- entregaveis;
- arquivos ou modulos afetados;
- validacoes que serao rodadas;
- riscos e acoes manuais esperadas.

### 6.3 Implementacao

Implemente apenas o necessario para fechar a etapa atual.

### 6.4 Validacao tecnica

Rode as validacoes possiveis no ambiente real.

Exemplos:

- `node -v`
- `npm -v`
- `npm run build`
- `npm test`
- `npx prisma validate`
- `npx prisma generate`
- `npx prisma migrate dev`
- `npm run db:seed`
- `docker compose config`
- `docker compose up -d --build`
- `docker compose ps`
- `npm run test:e2e`

### 6.5 Atualizacao do HISTORY

Ao final de cada etapa, atualize `HISTORY.md` com:

- o que foi feito;
- decisoes importantes;
- problemas encontrados;
- como foram resolvidos;
- pendencias ou observacoes.

### 6.6 Checklist manual

Sempre liste o que o usuario precisa fazer manualmente ao final da etapa.

### 6.7 Resumo e pausa

Ao final da etapa, entregue:

- arquivos alterados;
- comandos executados;
- resultado das validacoes;
- acoes manuais;
- commits sugeridos;
- pergunta final:

**"Posso avancar para a proxima etapa?"**

---

## 7. Mapa Oficial de Etapas desta Migracao

### Etapa 0 - Reorganizar o plano oficial

Objetivo:

- atualizar `PROMPT-MESTRE.md` e `PROMPT-EXECUTOR.md`;
- consolidar PostgreSQL como banco oficial;
- consolidar pgAdmin como ferramenta administrativa oficial;
- adicionar `HISTORY.md` como artefato obrigatorio;
- registrar etapas complementares ja vividas e as novas da migracao.

Acoes manuais:

- criar a branch `chore/postgresql-migration`.

Commit sugerido:

- `docs(planning): reorganizar fluxo oficial para migracao postgresql`

### Etapa 1 - Upgrade de runtime

Objetivo:

- migrar projeto para `Node 24 LTS + npm 11`;
- atualizar Dockerfiles;
- alinhar manifests e lockfiles;
- validar tudo antes da troca de banco.

Acoes manuais:

- atualizar Node local para 24 LTS.

Commit sugerido:

- `chore(runtime): atualizar stacks para node 24 lts e npm 11`

### Etapa 2 - Infra Docker PostgreSQL

Objetivo:

- substituir a stack legada pela stack PostgreSQL no compose principal;
- substituir a ferramenta administrativa legada por pgAdmin;
- trocar o compose isolado legado por `postgres-local`;
- revisar portas, volumes, healthcheck e variaveis.

Acoes manuais:

- `docker compose down -v` na stack antiga, se desejar reset completo;
- revisar volumes antigos, se quiser limpar legado.

Commits sugeridos:

- `chore(docker): substituir banco legado por postgres na stack principal`
- `chore(docker): substituir stack local isolada por postgres`

### Etapa 3 - Prisma, migration inicial e seed

Objetivo:

- trocar Prisma para `postgresql`;
- ajustar `DATABASE_URL`;
- recriar a migration inicial para PostgreSQL;
- preservar seed funcional.

Credenciais seed esperadas:

- `admin@teste.com`
- `Admin@123`

Acoes manuais:

- aceitar reset do banco;
- revisar tabelas no pgAdmin.

Commits sugeridos:

- `chore(db): migrar datasource e urls para postgresql`
- `feat(db): recriar migration inicial e seed em postgres`

### Etapa 4 - Testes backend em PostgreSQL

Objetivo:

- alinhar ambiente de teste do backend ao PostgreSQL;
- manter os mesmos comportamentos cobertos;
- documentar que os testes atuais usam banco real de teste via Prisma.

Acoes manuais:

- garantir banco de teste PostgreSQL disponivel.

Commit sugerido:

- `test(backend): alinhar suite com postgres`

### Etapa 5 - Feedback visual com React-Toastify

Objetivo:

- adicionar `react-toastify`;
- registrar `ToastContainer` global;
- aplicar toasts em auth, CRUD principal, interacoes, Kanban e logout;
- manter erros de campo inline.

Acoes manuais:

- revisar UX dos toasts em mobile e desktop.

Commit sugerido:

- `feat(ui): adicionar feedback visual com react-toastify`

### Etapa 6 - E2E alinhado ao PostgreSQL e aos toasts

Objetivo:

- alinhar Playwright ao seed atual;
- validar toasts de erro e sucesso;
- manter fluxos de auth, dashboard, leads, interacoes e Kanban.

Acoes manuais:

- garantir stack completa no ar;
- instalar browsers do Playwright, se necessario.

Commit sugerido:

- `test(e2e): alinhar suite com postgres e toasts`

### Etapa 7 - Deploy PostgreSQL em Railway/Vercel

Objetivo:

- provisionar PostgreSQL no Railway;
- trocar backend para `${{ Postgres.DATABASE_URL }}` ou equivalente do servico real;
- manter proxy `/api/v1` no frontend;
- validar smoke test antes de desligar qualquer legado remoto.

Acoes manuais:

- criar o servico PostgreSQL no Railway;
- preencher variaveis de ambiente;
- redeploy backend e frontend;
- confirmar URLs publicas.

Commits sugeridos:

- `chore(deploy): migrar railway para postgres`
- `docs(deploy): atualizar fluxo para postgres`

### Etapa 8 - Documentacao final e HISTORY

Objetivo:

- concluir `HISTORY.md`;
- atualizar `README.md`, `docs/deploy/README.md`, `docs/environment.md`, `docs/file-index.md`, `docs/ai/*`, arquivos `.env` de exemplo e prompts;
- alinhar o arquivo externo de geracao de documentacao com o escopo do projeto;
- remover referencias ativas ao banco legado do codigo, docs e processo.

Regra:

- o banco anterior pode aparecer apenas como legado historico dentro do `HISTORY.md`.

Commits sugeridos:

- `docs(history): registrar cronologia completa do projeto`
- `docs(project): concluir documentacao final em postgresql`

### Etapa 9 - Fechamento da branch e retorno para main

Objetivo:

- validar build, testes, E2E, Docker, deploy, docs e variaveis por contexto;
- revisar a clareza das variaveis e da documentacao criada;
- atualizar branch com `origin/main` se necessario;
- preparar merge final sem squash.

Acoes manuais:

- revisar diff completo da branch;
- executar merge final para `main`;
- registrar conclusao em `HISTORY.md`.

Integracao final:

- merge da branch `chore/postgresql-migration` em `main` preservando historico.

---

## 8. Politica de Bloqueio

Se qualquer um destes itens falhar, nao avance:

- build;
- teste backend;
- migration;
- seed;
- Docker;
- E2E;
- deploy;
- smoke test;
- documentacao critica inconsistente.

Nesse caso:

1. explique a falha;
2. identifique causa raiz;
3. corrija;
4. revalide;
5. so entao retome a etapa.

---

## 9. Acoes Externas que a IA Nao Conclui Sozinha

Deixe explicito quando depender de acao manual externa, por exemplo:

- criar repositorio privado;
- convidar `rodrigoamb`;
- criar servicos no Railway;
- criar projeto no Vercel;
- preencher variaveis em paineis externos;
- autenticar em provedores;
- confirmar URLs publicas;
- aprovar permissoes;
- executar merge final em `main`, quando o fluxo do usuario exigir controle manual.

---

## 10. Formato Obrigatorio de Resposta ao Final de Cada Etapa

Use exatamente esta estrutura:

### Etapa concluida

- etapa executada:
- objetivo cumprido:

### Arquivos alterados

- lista objetiva dos arquivos editados, criados, removidos ou renomeados

### Comandos executados

- lista dos comandos realmente rodados

### Validacao tecnica

- o que passou
- o que falhou
- o que nao foi possivel validar

### Atualizacao do HISTORY

- resumo do registro adicionado ao `HISTORY.md`

### Acoes manuais

1. passo a passo do que o usuario deve fazer

### Commits sugeridos

- um ou mais commits semanticos, em portugues, coerentes com a etapa

### Proxima decisao

**Posso avancar para a proxima etapa?**

---

## 11. Regra Final de Conduta

Voce nao deve executar a migracao de forma baguncada nem "de uma vez sem freio".

Voce deve agir como um engenheiro de software senior responsavel:

- le o contexto antes;
- modifica com criterio;
- valida o que construiu;
- documenta o que mudou;
- registra a historia;
- orienta o usuario no manual;
- e pede aprovacao antes de seguir.
