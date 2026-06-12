# Prompts utilizados

Este arquivo nao e uma transcricao completa da conversa. Ele registra os prompts mais importantes e o tipo de decisao que saiu deles.

## Prompt 1 - Estrutura inicial do backend

- **Ferramenta usada:** Codex no VS Code, com apoio pontual do GitHub Copilot.
- **Prompt resumido:** Estruturar uma API Express com TypeScript, Prisma, PostgreSQL, Zod, JWT em cookie HttpOnly e separacao entre routes, controllers, services e repositories.
- **Resultado:** A IA ajudou a montar a base do backend, incluindo organizacao de pastas, schema Prisma, seed, middlewares e tratamento inicial de erros.
- **O que aproveitei:** A separacao em camadas, a ideia dos validators com Zod, o seed de usuario de teste e a estrutura de middlewares globais.
- **O que alterei:** Revisei ownership por usuario, contratos de entrada, CORS com credentials e detalhes de seguranca do cookie.

## Prompt 2 - Autenticacao e sessao

- **Ferramenta usada:** Codex no VS Code.
- **Prompt resumido:** Implementar cadastro, login, logout e rota `me`, usando JWT em cookie HttpOnly e protegendo rotas privadas com middleware.
- **Resultado:** Foram criadas as rotas de auth e o fluxo de sessao usado pelo frontend.
- **O que aproveitei:** Geracao e verificacao do token, middleware de autenticacao e estrutura das respostas.
- **O que alterei:** Ajustei o comportamento de logout para preservar a confirmacao visual em `/login?loggedOut=1`, porque o redirecionamento por `401` estava passando por cima da experiencia esperada.

## Prompt 3 - Docker, banco e ambiente

- **Ferramenta usada:** Codex no VS Code.
- **Prompt resumido:** Criar uma stack local com backend, frontend, PostgreSQL, pgAdmin e Traefik, alem de documentar variaveis por ambiente.
- **Resultado:** A stack local passou a subir com Compose, proxy reverso e banco oficial do projeto.
- **O que aproveitei:** Estrutura do Compose, separacao entre stack principal e banco isolado de teste, healthchecks e documentacao inicial.
- **O que alterei:** Corrigi portas, e-mail do pgAdmin, variaveis e a forma de explicar banco principal versus banco de teste.

## Prompt 4 - Deploy Railway/Vercel

- **Ferramenta usada:** Codex no VS Code.
- **Prompt resumido:** Investigar por que o frontend em producao nao conseguia logar mesmo com backend aparentemente no ar.
- **Resultado:** A investigacao passou por CORS, cookies, imagem Docker, healthcheck e rewrite da Vercel.
- **O que aproveitei:** A lista de hipoteses e a validacao por headers, Network e logs.
- **O que alterei:** A causa raiz foi confirmada manualmente: `NEXT_PUBLIC_API_URL` estava sem `https://` na Vercel. Depois disso, o projeto passou a validar URL absoluta no build.

## Prompt 5 - Documentacao final

- **Ferramenta usada:** Codex no VS Code.
- **Prompt resumido:** Organizar README, documentacao de IA, historico tecnico, mapa de arquivos e guia de variaveis para entrega do teste.
- **Resultado:** Foram criados e revisados `docs/ai/*`, `docs/environment.md`, `docs/file-index.md`, `docs/documentation-audit.md` e `HISTORY.md`.
- **O que aproveitei:** A estrutura documental e o checklist de entrega.
- **O que alterei:** Reescrevi e deixei com minhas proprias palavras partes que estavam genericas demais para refletir melhor as decisoes reais, os erros encontrados e o processo de revisao.
