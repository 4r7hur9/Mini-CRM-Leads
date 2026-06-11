/**
 * Bootstrap global do Jest no backend.
 *
 * Responsavel por setup global do Jest.
 *
 * Prepara validacoes comuns antes da execucao das suites.
 */
import { prisma } from "../src/config/database";

beforeEach(async () => {
  await prisma.interaction.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
