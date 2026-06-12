# Decisoes tecnicas

Este arquivo registra as escolhas que realmente guiam o projeto. A ideia aqui nao e repetir definicoes de livro, e sim explicar por que o Mini CRM ficou organizado desse jeito.

## Por que escolhi JWT?

Escolhi JWT porque o projeto precisava de uma sessao simples, stateless e facil de integrar entre frontend e backend separados.

O token nao fica salvo em `localStorage`. Ele e enviado em cookie HttpOnly, reduzindo a exposicao a scripts no navegador. No frontend, o Axios trabalha com `withCredentials`, entao o browser envia o cookie automaticamente nas chamadas protegidas.

Essa escolha encaixou bem no escopo do teste: autenticacao real, separacao entre frontend e API, sem precisar criar uma tabela de sessoes ou um fluxo de refresh token mais complexo.

## Como organizei o backend em camadas?

O backend ficou separado por responsabilidade:

- `routes`: declaram os endpoints e conectam middlewares aos controllers;
- `controllers`: recebem a request, chamam a camada certa e devolvem resposta HTTP;
- `services`: concentram regra de negocio e validacoes que dependem do dominio;
- `repositories`: isolam as consultas Prisma;
- `middlewares`: cuidam de autenticacao, tratamento de erro, rate limit e validacao;
- `validators`: guardam os schemas Zod usados para validar entrada;
- `config`: centraliza ambiente, Prisma e configuracoes compartilhadas.

Essa divisao deixou o projeto mais facil de testar. Controller nao precisa saber detalhe de banco, service nao precisa conhecer Express, e repository nao decide regra de negocio.

## Como protegi os dados por usuario?

A regra principal é que o lead pertence a um usuario. O backend nao confia no frontend para dizer o dono do dado.

O usuario autenticado vem do token validado pelo middleware de auth. A partir dai, services e repositories sempre filtram operacoes usando o `userId` da sessao. Isso evita que uma pessoa consiga listar, editar ou apagar leads de outra apenas trocando um id na URL.

Tambem entram algumas protecoes de borda:

- CORS com origem controlada e credentials;
- cookie HttpOnly;
- Helmet nos headers HTTP;
- rate limit geral e especifico para auth;
- validacao de payload com Zod antes de processar dados.

## Como estruturei o Prisma?

O Prisma e a camada de persistencia. O schema define `User`, `Lead` e `Interaction`, com relacoes claras:

- um usuario possui muitos leads;
- um lead possui muitas interacoes;
- interacoes dependem do lead;
- leads sao filtrados pelo usuario autenticado.

O cliente Prisma fica centralizado em `apps/backend/src/config/database.ts`. As consultas ficam nos repositories, nao espalhadas por controllers. Isso facilita trocar uma consulta, testar comportamento e entender onde o banco e acessado.

As migrations ficam versionadas para que o banco possa ser reconstruido de forma previsivel em outro ambiente.

## Como organizei as chamadas de API no frontend?

O frontend nao chama `fetch` ou Axios solto em cada componente. As chamadas ficam em services e passam pelo cliente Axios configurado.

Esse cliente usa `withCredentials` porque a sessao depende de cookie HttpOnly. Tambem existe tratamento para respostas de erro, principalmente `401`, que precisa redirecionar para login sem quebrar fluxos intencionais como logout.

Na pratica, os componentes ficam mais focados em tela, formulario e estado visual. A conversa com a API fica em uma camada propria.

## Como tratei erros?

No backend, erros sao padronizados por middleware. Erros esperados, como validacao ou credenciais invalidas, voltam com status e mensagem controlados. Erros inesperados nao devem vazar detalhes internos.

No frontend, os erros importantes aparecem para a pessoa usando o sistema. `react-toastify` foi usado para feedback de login, cadastro, CRUD e interacoes. Erros de campo continuam perto dos inputs, porque esse tipo de retorno precisa ser mais direto.

Essa combinacao evita duas coisas ruins: API silenciosa demais e interface que falha sem explicar nada.

## Como validei dados?

Usei Zod no backend para validar entrada antes de chegar na regra de negocio. No frontend, formularios usam `react-hook-form` com validacao alinhada aos contratos esperados pela API.

Isso reduz diferencas entre "o formulario aceita" e "a API rejeita". Quando algo falha, a resposta tende a ser mais previsivel.

## Decisoes que devem ser preservadas

- manter ownership por usuario em todas as consultas sensiveis;
- nao salvar JWT em `localStorage`;
- manter CORS, cookies e proxy documentados antes de mexer em deploy;
- nao espalhar chamada Prisma fora dos repositories;
- manter `.env.example` e `docs/environment.md` alinhados;
- registrar incidentes relevantes no `HISTORY.md`;
- quando usar IA, revisar o resultado como codigo de outra pessoa: lendo, testando e ajustando.
