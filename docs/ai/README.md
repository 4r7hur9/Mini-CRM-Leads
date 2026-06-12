# Documentacao de IA

Este projeto usou IA de forma ativa, mas nao como piloto automatico. A IA ajudou a acelerar leitura de codigo, planejamento, implementacao, testes, investigacao de erros e documentacao. As decisoes finais, as correcoes de rota e as validacoes foram feitas olhando o sistema rodando, os diffs, os logs e os testes.

## Quais ferramentas de IA foram usadas?

- Codex no VS Code, como principal assistente de desenvolvimento.
- GitHub Copilot, como apoio pontual durante escrita e revisao de codigo.

A IA foi usada como par tecnico: eu dava contexto, conferia o resultado, testava e ajustava o que nao batia com o comportamento real do projeto.

## Em quais partes do projeto a IA ajudou?

- planejar a execucao por etapas, em vez de tentar resolver tudo de uma vez;
- estruturar backend Express com TypeScript, Prisma, Zod e JWT;
- montar controllers, services, repositories, middlewares e validators;
- criar e ajustar migrations, seed e configuracao do Prisma;
- desenvolver o frontend em Next.js com telas de auth, dashboard, leads, detalhes e Kanban;
- integrar Axios, Zustand, React Hook Form e `react-toastify`;
- criar testes backend com Jest e Supertest;
- criar testes E2E com Playwright para auth, dashboard, leads e Kanban;
- configurar Docker Compose, Traefik, PostgreSQL e pgAdmin;
- investigar problemas de CORS, cookies, Railway, Vercel e proxy `/api/v1`;
- revisar documentacao, prompts, historico tecnico e variaveis de ambiente.

## Em quais partes eu decidi manualmente?

As decisoes mais importantes foram humanas, principalmente quando havia trade-off ou risco de ambiente:

- manter a autenticacao por JWT em cookie HttpOnly;
- usar PostgreSQL como banco oficial;
- separar frontend no Vercel e backend/banco no Railway;
- manter o proxy `/api/v1` no frontend;
- preservar rate limit e criar bypass apenas para E2E com chave controlada;
- criar uma branch dedicada para a migracao antes de voltar para `main`;
- validar responsividade e usabilidade no navegador, nao apenas por teste automatizado;
- revisar variaveis reais de Railway/Vercel sem expor segredos;
- decidir que erros de login, cadastro e CRUD deveriam ter feedback visual com toast;
- aprovar cada etapa e cada commit antes de avancar.

## Quais limitacoes ou erros a IA apresentou?

A IA ajudou bastante, mas tambem errou quando o contexto dependia de ambiente real.

- Em alguns momentos sugeriu comandos de PowerShell enquanto o fluxo pratico estava sendo feito em Bash.
- A configuracao de bancos locais e banco de teste precisou ser explicada e ajustada para nao virar uma bagunca de ambientes.
- O e-mail inicial do pgAdmin nao era aceito como valido.
- Uma tentativa inicial de resolver a vulnerabilidade transitiva de `postcss` por override nao funcionou; a solucao correta foi reinstalacao limpa.
- O fluxo de logout precisou ser corrigido porque o redirecionamento automatico por `401` escondia a confirmacao visual.
- O erro de producao mais demorado parecia backend/proxy, mas a causa raiz era simples e externa ao codigo: faltava `https://` em `NEXT_PUBLIC_API_URL` na Vercel.

Esses pontos foram descobertos com logs, DevTools, testes locais, smoke tests e comparacao entre o que o codigo dizia e o que o sistema realmente fazia.

## Como revisei o codigo ou texto gerado?

Nada relevante entrou sem revisao. O processo usado foi:

- ler o diff antes de aceitar a mudanca;
- rodar typecheck e build quando a alteracao tocava codigo;
- validar Prisma com `prisma validate`, `generate`, migrations e seed;
- rodar testes backend e E2E;
- subir a stack Docker local quando havia mudanca de infra;
- testar `/health`, `/api/v1/health`, login, cadastro, logout, leads e Kanban;
- conferir Network/Console no navegador durante falhas de deploy;
- revisar documentacao para tirar texto generico, duplicado ou que nao refletia o projeto real.

Os detalhes ficam em:

- [`prompts.md`](./prompts.md)
- [`decisions.md`](./decisions.md)
- [`review.md`](./review.md)
- [`../../HISTORY.md`](../../HISTORY.md)
