# Revisao tecnica

## Ajustes relevantes desta fase

- migracao do banco oficial para PostgreSQL
- atualizacao dos Dockerfiles para Node 24
- alinhamento do Prisma e das migrations ao novo banco
- adicao de feedback visual com `react-toastify`
- alinhamento inicial dos testes E2E aos novos estados visuais

## Pontos que exigem validacao continua

- migrations e seed no PostgreSQL local e remoto
- estabilidade da stack Docker completa
- suite backend apontando para banco de teste isolado
- suite Playwright validando toasts sem flakiness
- deploy Railway/Vercel com variaveis corretas
