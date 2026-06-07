import bcrypt from "bcrypt";
import { InteractionType, LeadStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Admin@123", 12);

  const user = await prisma.user.upsert({
    where: { email: "admin@teste.com" },
    update: {
      name: "Admin Teste",
      passwordHash,
    },
    create: {
      name: "Admin Teste",
      email: "admin@teste.com",
      passwordHash,
    },
  });

  await prisma.lead.deleteMany({
    where: { userId: user.id },
  });

  await prisma.lead.create({
    data: {
      userId: user.id,
      name: "Marina Costa",
      phone: "(11) 99999-1001",
      email: "marina.costa@example.com",
      company: "Instagram",
      status: LeadStatus.NOVO,
      notes: "Interessada em conhecer o servico ainda esta semana.",
      interactions: {
        create: [
          {
            type: InteractionType.WHATSAPP,
            description: "Primeiro contato realizado pelo WhatsApp.",
          },
        ],
      },
    },
  });

  await prisma.lead.create({
    data: {
      userId: user.id,
      name: "Rafael Almeida",
      phone: "(21) 98888-2002",
      email: "rafael.almeida@example.com",
      company: "Indicacao",
      status: LeadStatus.EM_ATENDIMENTO,
      notes: "Pediu retorno com proposta basica.",
      interactions: {
        create: [
          {
            type: InteractionType.LIGACAO,
            description: "Ligacao de qualificacao concluida.",
          },
          {
            type: InteractionType.EMAIL,
            description: "Resumo da conversa enviado por e-mail.",
          },
        ],
      },
    },
  });

  await prisma.lead.create({
    data: {
      userId: user.id,
      name: "Camila Rocha",
      phone: "(31) 97777-3003",
      email: "camila.rocha@example.com",
      company: "Site",
      status: LeadStatus.PROPOSTA_ENVIADA,
      notes: "Aguardando retorno sobre a proposta enviada.",
      interactions: {
        create: [
          {
            type: InteractionType.REUNIAO,
            description: "Reuniao de apresentacao realizada.",
          },
        ],
      },
    },
  });

  await prisma.lead.create({
    data: {
      userId: user.id,
      name: "Bruno Martins",
      phone: "(41) 96666-4004",
      email: "bruno.martins@example.com",
      company: "Trafego pago",
      status: LeadStatus.FECHADO,
      notes: "Lead convertido em cliente.",
      interactions: {
        create: [
          {
            type: InteractionType.OBSERVACAO,
            description: "Contrato fechado apos negociacao final.",
          },
        ],
      },
    },
  });

  console.log("Seed concluido: admin@teste.com / Admin@123");
}

main()
  .catch((error) => {
    console.error("Erro ao executar seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
