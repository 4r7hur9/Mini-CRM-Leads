# Mini CRM de Leads

## Stack Docker completa

Esta etapa adiciona a infraestrutura para subir o projeto com um unico `docker compose up -d --build`.

### Servicos

- `traefik`: roteia `http://localhost` para o frontend e `/api/*` para o backend
- `mysql`: banco principal da stack Docker
- `phpmyadmin`: administracao visual em `http://localhost:8081`
- `backend`: API Express + Prisma com `migrate deploy` no start
- `frontend`: app Next.js minimo para validar a stack antes da Etapa 8

### Variaveis opcionais

O `docker-compose.yml` ja possui defaults seguros para desenvolvimento. Se quiser sobrescrever algum valor, crie um arquivo `.env` na raiz com estas chaves:

```env
MYSQL_ROOT_PASSWORD=root3326
MYSQL_DATABASE=mini_crm_leads
MYSQL_USER=arthur
MYSQL_PASSWORD=3326
MYSQL_PORT=3308
JWT_SECRET=desenvolvimento-mini-crm-altere-esta-chave-antes-da-producao
CORS_ORIGIN=http://localhost
COOKIE_SECURE=false
NEXT_PUBLIC_API_URL=http://localhost/api/v1
```

### Comandos principais

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f backend
docker compose exec backend npx prisma db seed
docker compose down
```

### URLs esperadas

- Frontend: `http://localhost`
- Backend health: `http://localhost/api/v1/health`
- Login: `http://localhost/login`
- Registro: `http://localhost/register`
- Area privada: `http://localhost/dashboard`
- Traefik dashboard: `http://localhost:8080`
- phpMyAdmin: `http://localhost:8081`
- MySQL direto no host: `localhost:3308`

### Observacoes

- A autenticacao do frontend foi adicionada na Etapa 8. As telas completas de leads e dashboard visual entram na Etapa 9.
- O MySQL da stack raiz usa a porta `3308` no host para nao colidir com o compose local da etapa anterior em `mysql-local` (`3307`).
- O Traefik foi configurado com provider de arquivo para ficar estavel no Docker Desktop do Windows, sem depender da leitura do socket Docker.
- `COOKIE_SECURE=false` e usado somente no Docker local via HTTP. Em producao com HTTPS, use `COOKIE_SECURE=true`.
- Se voce quiser usar apenas a stack nova, pode parar o compose antigo de `mysql-local` antes de subir tudo.
