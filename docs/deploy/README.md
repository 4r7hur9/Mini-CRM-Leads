# Deploy de producao

Este projeto foi preparado para publicar:

- frontend no Vercel;
- backend no Railway;
- banco PostgreSQL no Railway.

## Visao geral

- frontend: `apps/frontend`
- backend: `apps/backend`
- API publica esperada: `https://seu-backend.railway.app/api/v1`
- frontend publico esperado: `https://mini-crm-leads.vercel.app`

## Ordem recomendada

1. provisionar o PostgreSQL no Railway;
2. publicar o backend no Railway;
3. obter a URL publica do backend;
4. publicar o frontend no Vercel com `NEXT_PUBLIC_API_URL`;
5. executar smoke test completo.

## Backend no Railway

### Root Directory

- `apps/backend`

O projeto inclui:

- `apps/backend/Dockerfile`
- `apps/backend/railway.json`

### Variaveis obrigatorias

```env
DATABASE_URL=postgresql://usuario:senha@host:porta/database?schema=public
JWT_SECRET=gere_um_segredo_longo_com_32_ou_mais_caracteres
CORS_ORIGIN=https://seu-frontend.vercel.app
COOKIE_SECURE=true
COOKIE_SAME_SITE=none
```

### Variaveis opcionais

```env
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_GENERAL_MAX=300
RATE_LIMIT_AUTH_MAX=10
RATE_LIMIT_E2E_BYPASS_ENABLED=false
RATE_LIMIT_E2E_BYPASS_KEY=
```

### Banco no mesmo projeto Railway

Se o PostgreSQL estiver no mesmo projeto, use a variavel compartilhada do proprio servico. Exemplo conceitual:

```env
DATABASE_URL=${{ Postgres.DATABASE_URL }}
```

Importante:

- o nome `Postgres` deve bater com o nome real do servico no seu painel;
- confirme no modal de conexao do Railway qual e a variavel exata exibida para o seu banco.

### Prisma no build e no runtime

- o `Dockerfile` roda `prisma generate` durante o build;
- por isso existe uma URL placeholder apenas para gerar o client;
- a conexao real continua obrigatoria em runtime para `prisma migrate deploy` e para a API subir.

## Frontend no Vercel

### Root Directory

- `apps/frontend`

### Variavel obrigatoria

```env
NEXT_PUBLIC_API_URL=https://seu-backend.railway.app/api/v1
```

Observacoes:

- o navegador usa `/api/v1` no mesmo dominio do frontend;
- `NEXT_PUBLIC_API_URL` e lida em build time pelo Next.js para fazer rewrite/proxy ate o backend;
- se a URL do backend mudar, o frontend precisa de novo deploy.

## Cookies, CORS e sessao

Este projeto usa:

- cookie httpOnly para autenticacao;
- `withCredentials: true` no frontend;
- `credentials: true` no CORS do backend.

Para frontend e backend em dominios diferentes, use:

```env
COOKIE_SECURE=true
COOKIE_SAME_SITE=none
CORS_ORIGIN=https://seu-frontend.vercel.app
```

Se voce tiver mais de uma origin conhecida, pode separar por virgula:

```env
CORS_ORIGIN=http://localhost,http://localhost:3000,https://seu-frontend.vercel.app
```

## Healthcheck

O arquivo `apps/backend/railway.json` configura:

- `healthcheckPath: /health`
- `healthcheckTimeout: 120`

Endpoints esperados:

- `GET /health`
- `GET /api/v1/health`

## Smoke test de producao

Depois que as URLs publicas estiverem prontas:

1. abrir frontend publico;
2. registrar usuario novo;
3. fazer login;
4. criar lead;
5. editar lead;
6. mover lead no Kanban;
7. registrar interacao;
8. validar dashboard;
9. fazer logout;
10. tentar abrir `/dashboard` sem sessao e confirmar redirecionamento.

## Limites do que a IA nao conclui sozinha

Ainda dependem de acao manual externa:

- criar projeto no Vercel;
- criar projeto e banco no Railway;
- preencher variaveis no painel;
- confirmar URLs publicas;
- aceitar permissoes e autenticar nos servicos;
- executar o smoke test final em producao.
