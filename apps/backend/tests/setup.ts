import { prisma } from "../src/config/database";

beforeEach(async () => {
  await prisma.interaction.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
