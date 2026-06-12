# Revisao do uso de IA

## O que foi gerado com ajuda de IA?

A IA ajudou a gerar a primeira versao de varias partes: backend em camadas, schema Prisma, seed, middlewares, controllers, services, telas do frontend, testes backend, testes E2E e documentacao.

Isso nao significa que tudo foi aceito como veio. Em varios momentos a IA entregou uma direcao boa, mas a versao final saiu depois de leitura, teste e ajuste fino.

## O que foi revisado manualmente?

Revisei principalmente os pontos em que erro pequeno vira problema grande:

- relacao entre usuario, lead e interacao;
- filtros por `userId` para proteger dados;
- cookie HttpOnly, `sameSite`, `secure` e CORS;
- variaveis do Railway e da Vercel;
- Docker Compose e portas locais;
- migrations, seed e banco de teste;
- fluxos de login, cadastro, logout e dashboard no navegador;
- mensagens visuais com toast;
- relatorios de Playwright e logs de producao.

## Houve erro da IA?

Sim. E alguns foram bem educativos.

O caso mais claro foi o deploy. Por bastante tempo a investigacao parecia apontar para backend, imagem Docker, Railway ou rewrite. No fim, o problema real era a variavel `NEXT_PUBLIC_API_URL` na Vercel sem `https://`. A IA ajudou a levantar hipoteses, mas a confirmacao veio olhando Network, headers e testando as URLs diretamente.

Outro erro foi no logout: a primeira solucao mostrava mensagem, mas o redirecionamento automatico de seguranca atropelava a tela. O fluxo precisou ser ajustado para preservar `loggedOut=1`.

Tambem houve uma tentativa inicial de resolver uma vulnerabilidade transitiva com override de dependencia. Nao resolveu. A solucao correta foi uma reinstalacao limpa do frontend, validada com build e audit.

## Algum codigo ou texto foi descartado?

Sim.

- configuracoes antigas de banco e admin local foram removidas do fluxo ativo;
- uma abordagem de override para dependencia do frontend foi descartada;
- textos muito genericos de documentacao foram reescritos;
- explicacoes que pareciam corretas, mas nao batiam com o comportamento real do deploy, foram substituidas pelo relato da causa raiz.

## Quais melhorias foram feitas depois da geracao inicial?

- migracao completa para PostgreSQL;
- runtime alinhado para Node 24 LTS e npm 11;
- Docker local com PostgreSQL, pgAdmin, backend, frontend e Traefik;
- feedback visual com `react-toastify`;
- E2E com 27 testes passando em Chromium, Firefox e mobile Chrome;
- validacao explicita de `NEXT_PUBLIC_API_URL` com protocolo;
- documentacao de variaveis em `docs/environment.md`;
- README com arquitetura visual em Mermaid;
- `HISTORY.md` como memoria tecnica do projeto.

O maior ganho foi sair de uma aplicacao que "funciona na minha maquina" para um projeto com trilha de decisao, testes e explicacao suficiente para outra pessoa continuar sem recomecar do zero.
