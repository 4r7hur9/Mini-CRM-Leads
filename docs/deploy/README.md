# Deploy de producao

Este projeto foi preparado para publicar:

- frontend no Vercel;
- backend no Railway;
- banco MySQL no Railway.

## Visao geral

- frontend: `apps/frontend`
- backend: `apps/backend`
- API publica esperada: `https://seu-backend.railway.app/api/v1`
- frontend publico esperado: `https://mini-crm-leads.vercel.app`

## Ordem recomendada

1. publicar o backend no Railway;
2. obter a URL publica do backend;
3. publicar o frontend no Vercel com `NEXT_PUBLIC_API_URL` apontando para a API;
4. executar smoke test completo.

## Frontend no Vercel

### Root Directory

No Vercel, importe o mesmo repositorio Git e configure:

- `Root Directory`: `apps/frontend`

### Variavel obrigatoria

```env
NEXT_PUBLIC_API_URL=https://seu-backend.railway.app/api/v1
```

Observacao importante:

- `NEXT_PUBLIC_API_URL` e lida em build time;
- se a URL do backend mudar, o frontend precisa de novo deploy.

## Backend no Railway

### Root Directory

No Railway, conecte o mesmo repositorio Git e configure:

- `Root Directory`: `apps/backend`

O projeto inclui `apps/backend/Dockerfile` e `apps/backend/railway.json`.

Observacao importante sobre Prisma no build:

- o `Dockerfile` do backend roda `prisma generate` durante o build;
- por isso, o arquivo foi preparado para aceitar `DATABASE_URL` como `ARG` no build do Railway;
- se a variavel real ainda nao estiver pronta, o build usa uma URL placeholder apenas para gerar o client do Prisma;
- a conexao real continua obrigatoria em runtime para `prisma migrate deploy` e para a API subir.

### Variaveis obrigatorias

```env
DATABASE_URL=mysql://usuario:senha@host:porta/database
JWT_SECRET=gere_um_segredo_longo_com_32_ou_mais_caracteres
CORS_ORIGIN=http://localhost,http://localhost:3000,https://mini-crm-leads.vercel.app
COOKIE_SECURE=true
COOKIE_SAME_SITE=none
```

### Variaveis opcionais

```env
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_GENERAL_MAX=300
RATE_LIMIT_AUTH_MAX=10
```

No Railway, se o banco MySQL estiver no mesmo projeto, a forma recomendada e criar no backend:

```env
DATABASE_URL=${{ MySQL.MYSQL_URL }}
```

O nome `MySQL` deve bater com o nome real do servico no painel do Railway.

## Cookies, CORS e credenciais

Este projeto usa:

- cookie httpOnly para autenticacao;
- `withCredentials: true` no frontend;
- `credentials: true` no CORS do backend.

Para frontend e backend em dominios diferentes, use:

```env
COOKIE_SECURE=true
COOKIE_SAME_SITE=none
CORS_ORIGIN=http://localhost,http://localhost:3000,https://mini-crm-leads.vercel.app
```

`CORS_ORIGIN` aceita uma lista separada por virgula. Mantenha apenas origins conhecidas e usadas por voce.

Se voce servir frontend e backend no mesmo dominio via proxy reverso, pode manter:

```env
COOKIE_SECURE=true
COOKIE_SAME_SITE=strict
```

## Healthcheck do Railway

O arquivo `apps/backend/railway.json` configura:

- `healthcheckPath`: `/health`
- `healthcheckTimeout`: `120`
- politica de reinicio em falha

O endpoint esperado e:

```txt
GET /health
```

A API tambem expoe a mesma verificacao em:

```txt
GET /api/v1/health
```

## Smoke test de producao

Depois que as URLs publicas estiverem prontas:

1. abrir frontend publico;
2. registrar usuario novo;
3. fazer login;
4. criar lead;
5. editar lead;
6. mover lead no Kanban;
7. validar dashboard;
8. fazer logout;
9. tentar abrir `/dashboard` sem sessao e confirmar redirecionamento.

## Registro honesto desta etapa

Nesta etapa, o repositorio ficou preparado para deploy, mas a publicacao final depende de acoes manuais:

- criar projeto no Vercel;
- criar projeto e banco no Railway;
- preencher variaveis;
- confirmar URLs publicas;
- executar smoke test em producao.
