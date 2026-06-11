# Guia de variaveis de ambiente

Este arquivo centraliza o papel de cada variavel usada no Mini CRM de Leads.
Os valores abaixo sao exemplos ou placeholders; senhas reais devem ficar apenas em `.env` local ou nos paineis do Railway/Vercel.

## Stack local completa

Arquivo base: `.env.example` copiado para `.env` na raiz.

| Variavel | Usada por | Funcao |
| --- | --- | --- |
| `POSTGRES_DB` | Docker/PostgreSQL | Nome do banco principal da stack local. |
| `POSTGRES_USER` | Docker/PostgreSQL/backend | Usuario usado na conexao local do banco. |
| `POSTGRES_PASSWORD` | Docker/PostgreSQL/backend | Senha local do banco da stack. |
| `POSTGRES_PORT` | Docker/PostgreSQL | Porta exposta no host para acesso direto ao PostgreSQL. |
| `PGADMIN_DEFAULT_EMAIL` | pgAdmin | E-mail de login do pgAdmin local. |
| `PGADMIN_DEFAULT_PASSWORD` | pgAdmin | Senha de login do pgAdmin local. |
| `JWT_SECRET` | backend | Chave usada para assinar JWTs. Deve ter 32 ou mais caracteres. |
| `CORS_ORIGIN` | backend | Origem permitida para chamadas com cookies. Aceita lista separada por virgula. |
| `COOKIE_SECURE` | backend | Define se o cookie exige HTTPS. Em local costuma ser `false`. |
| `COOKIE_SAME_SITE` | backend | Politica SameSite do cookie. Em local costuma ser `strict`. |
| `NEXT_PUBLIC_API_URL` | frontend build | URL absoluta usada pelo rewrite do Next.js. Deve incluir `http://` ou `https://`. |
| `RATE_LIMIT_E2E_BYPASS_ENABLED` | backend | Liga ou desliga bypass de rate limit para E2E. |
| `E2E_TEST_KEY` | Docker/E2E | Token local que o compose repassa ao backend como `RATE_LIMIT_E2E_BYPASS_KEY`. |

## Backend local fora do compose

Arquivo base: `apps/backend/.env.example`.

| Variavel | Funcao |
| --- | --- |
| `NODE_ENV` | Ambiente de execucao: `development`, `production` ou `test`. |
| `PORT` | Porta HTTP do backend. |
| `DATABASE_URL` | String PostgreSQL usada pelo Prisma. |
| `JWT_SECRET` | Chave de assinatura dos tokens. |
| `CORS_ORIGIN` | Origem permitida do frontend local. |
| `COOKIE_SECURE` | `false` em HTTP local, `true` em producao HTTPS. |
| `COOKIE_SAME_SITE` | `strict` em local; `none` quando frontend e backend usam dominios HTTPS diferentes. |
| `RATE_LIMIT_WINDOW_MS` | Janela do rate limit. |
| `RATE_LIMIT_GENERAL_MAX` | Limite geral de requisicoes por janela. |
| `RATE_LIMIT_AUTH_MAX` | Limite especifico para rotas de autenticacao. |
| `RATE_LIMIT_E2E_BYPASS_ENABLED` | Ativa bypass controlado para Playwright. |
| `RATE_LIMIT_E2E_BYPASS_KEY` | Token recebido no header `x-e2e-test-key` durante E2E. |

## Backend de teste

Arquivo base: `apps/backend/.env.test.example`.

| Variavel | Funcao |
| --- | --- |
| `NODE_ENV` | Deve ser `test`. |
| `PORT` | Porta usada caso a suite precise subir servidor de teste. |
| `DATABASE_URL` | Banco PostgreSQL isolado para testes. |
| `JWT_SECRET` | Chave longa somente para testes. |
| `CORS_ORIGIN` | Origem usada pela suite local. |

## Frontend local

Arquivo base: `apps/frontend/.env.local.example`.

| Variavel | Funcao |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | URL absoluta da API usada pelo rewrite do Next.js em build/dev. |

## Producao

Railway/backend:

```env
DATABASE_URL=${{ Postgres.DATABASE_URL }}
JWT_SECRET=gere_um_segredo_longo_com_32_ou_mais_caracteres
CORS_ORIGIN=https://seu-frontend.vercel.app
COOKIE_SECURE=true
COOKIE_SAME_SITE=none
RATE_LIMIT_E2E_BYPASS_ENABLED=false
```

Vercel/frontend:

```env
NEXT_PUBLIC_API_URL=https://seu-backend.railway.app/api/v1
```

## Regras importantes

- `NEXT_PUBLIC_API_URL` precisa ser absoluta e incluir `http://` ou `https://`.
- Em producao cross-domain, use `COOKIE_SECURE=true` e `COOKIE_SAME_SITE=none`.
- Se `RATE_LIMIT_E2E_BYPASS_ENABLED=true`, o backend exige `RATE_LIMIT_E2E_BYPASS_KEY`.
- Na stack Docker local, a raiz usa `E2E_TEST_KEY`; o compose transforma esse valor em `RATE_LIMIT_E2E_BYPASS_KEY` dentro do backend.
- `DATABASE_URL` precisa apontar para PostgreSQL e incluir `?schema=public`.
