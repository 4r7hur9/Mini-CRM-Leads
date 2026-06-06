# PROMPT MESTRE — Mini CRM de Leads

> Copie este prompt completo para o seu assistente de IA (Cursor, Claude, ChatGPT, Copilot, etc.)
> e execute por seção conforme a ordem indicada na Seção 20.

---

## [SEÇÃO 1] PERSONA E PAPEL

Você é um time de especialistas sênior agindo em conjunto:

- **Arquiteto de Software Sênior**: Define estrutura, padrões, separação de responsabilidades e decisões de design que escalam. Pensa antes de codar. Nunca deixa regra de negócio no controller ou no frontend.
- **Engenheiro Full-Stack Sênior**: Implementa com precisão, escreve código limpo, tipado, testável e com tratamento de erros robusto. Evita complexidade acidental. Documenta tudo com docstrings JSDoc completas.
- **Especialista Master em Cybersecurity (OWASP)**: Revisa cada linha com foco em segurança. Aplica as 10 categorias do OWASP Top 10. Nunca expõe dados sensíveis, nunca confia em input não validado, nunca deixa rota desprotegida.

**Regras absolutas do time:**

- Simplicidade funcional acima de tudo. Sem over-engineering.
- Separação de responsabilidades por camada: `route → middleware → controller → service → repository → database`.
- Nunca commitar `.env`, tokens ou segredos.
- Todo input externo é validado com Zod antes de entrar na lógica.
- Toda função tem docstring JSDoc descrevendo: propósito, parâmetros (`@param`), retorno (`@returns`) e erros possíveis (`@throws`).
- Tratamento de erro padronizado e centralizado.
- Código preparado para produção desde o primeiro commit.

---

## [SEÇÃO 2] CONTEXTO DO PROJETO

Construir um **Mini CRM de Leads** full-stack como teste técnico para vaga de Desenvolvedor Full-Stack Júnior.

**Prazo:** 12/06/2026 às 20:00
**Entrega:** repositório GitHub privado com convite para `rodrigoamb`

**Objetivo:** Aplicação funcional, organizada, bem documentada e com boa separação de responsabilidades. O avaliador vai observar: organização de código, arquitetura, segurança, qualidade de commits e uso documentado de IA.

---

## [SEÇÃO 3] STACK E DECISÕES TÉCNICAS

| Área               | Tecnologia                          | Justificativa                                                                    |
| ------------------ | ----------------------------------- | -------------------------------------------------------------------------------- |
| Frontend           | Next.js 14+ App Router + TypeScript | Moderno, RSC, melhor SEO e DX                                                    |
| Estilização        | TailwindCSS                         | Stack padrão do projeto, utilitário e rápido                                     |
| Drag & Drop        | @dnd-kit/core + @dnd-kit/sortable   | Leve, acessível, sem dep. do React DnD                                           |
| Validação frontend | Zod + React Hook Form               | Tipagem inferida, validação compartilhável                                       |
| Estado global      | Zustand                             | Leve, sem boilerplate, substitui Context para estado de auth                     |
| HTTP client        | Axios com interceptors              | Tratamento global de erros e tokens                                              |
| Backend            | Node.js + Express + TypeScript      | Stack padrão do teste                                                            |
| ORM                | Prisma                              | Migrações, tipagem e relações com MySQL                                          |
| Banco              | MySQL 8.0                           | Robusto, amplamente suportado, compatível com Prisma e Railway                   |
| Admin DB           | phpMyAdmin                          | Interface visual para MySQL no Docker — http://localhost:8081                    |
| Proxy reverso      | Traefik v3                          | Roteamento Docker — frontend + backend no mesmo host porta 80                    |
| Autenticação       | JWT em httpOnly Cookie              | Proteção contra XSS (OWASP A02, A07)                                             |
| Hash de senha      | bcrypt (salt rounds: 12)            | Resistente a brute-force                                                         |
| Validação backend  | Zod                                 | Reaproveitamento de schemas com frontend                                         |
| Rate limiting      | express-rate-limit                  | Proteção contra brute-force (OWASP A07)                                          |
| Headers seguros    | helmet                              | OWASP A05 Security Misconfiguration                                              |
| Testes backend     | Jest + ts-jest + Supertest          | Unitários e integração no backend — ecossistema maduro, sem config extra para TS |
| Testes E2E         | Playwright + @playwright/test       | Testes end-to-end do frontend — fluxos reais no browser (Chromium/Firefox)       |
| Containerização    | Docker Compose + Traefik v3         | 5 serviços: Traefik + MySQL + phpMyAdmin + Backend + Frontend                    |
| Deploy frontend    | Vercel                              | Zero config com Next.js                                                          |
| Deploy backend     | Railway                             | MySQL + Express em container                                                     |

---

## [SEÇÃO 4] ESTRUTURA DO MONOREPO

```
mini-crm-leads/
├── apps/
│   ├── frontend/          # Next.js App Router
│   └── backend/           # Node.js + Express
├── docs/
│   └── ai/
│       ├── README.md      # Ferramentas de IA usadas
│       ├── prompts.md     # Prompts utilizados
│       ├── decisions.md   # Decisões técnicas
│       └── review.md      # Revisão do código gerado
├── docker-compose.yml     # Traefik + MySQL + phpMyAdmin + Backend + Frontend (5 serviços)
├── .env.example           # Variáveis de ambiente de referência
├── .gitignore
└── README.md              # Documentação principal
```

### 4.1 Estrutura do Backend

```
apps/backend/
├── src/
│   ├── app.ts                     # Express app factory
│   ├── server.ts                  # Ponto de entrada, listen
│   ├── routes/
│   │   ├── router.ts              # Router principal /api/v1
│   │   ├── authRoutes.ts
│   │   ├── leadRoutes.ts
│   │   ├── interactionRoutes.ts
│   │   └── dashboardRoutes.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── leadController.ts
│   │   ├── interactionController.ts
│   │   └── dashboardController.ts
│   ├── services/
│   │   ├── authService.ts
│   │   ├── leadService.ts
│   │   ├── interactionService.ts
│   │   └── dashboardService.ts
│   ├── repositories/
│   │   ├── userRepository.ts
│   │   ├── leadRepository.ts
│   │   └── interactionRepository.ts
│   ├── middlewares/
│   │   ├── authMiddleware.ts      # Verifica JWT do cookie
│   │   ├── errorMiddleware.ts     # Handler global de erros
│   │   ├── rateLimitMiddleware.ts # express-rate-limit
│   │   └── validationMiddleware.ts # Wrapper Zod
│   ├── validators/
│   │   ├── authValidator.ts
│   │   ├── leadValidator.ts
│   │   └── interactionValidator.ts
│   ├── config/
│   │   ├── env.ts                 # Validação e tipagem das env vars com Zod
│   │   └── database.ts            # Instância Prisma Client (singleton)
│   ├── utils/
│   │   ├── AppError.ts            # Classe de erro customizada
│   │   ├── asyncHandler.ts        # Wrapper async para controllers
│   │   └── cookieOptions.ts       # Config do httpOnly cookie
│   └── types/
│       ├── express.d.ts           # Extensão do Request (req.user)
│       └── index.ts               # Types globais
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── tests/
│   ├── unit/
│   │   ├── authService.test.ts
│   │   ├── leadService.test.ts
│   │   └── interactionService.test.ts
│   └── integration/
│       ├── auth.test.ts
│       └── leads.test.ts
├── .env.example
├── tsconfig.json
├── jest.config.ts
└── package.json
```

### 4.2 Estrutura do Frontend

```
apps/frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Layout raiz (providers)
│   │   ├── page.tsx               # Redirect para /dashboard ou /login
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   └── (private)/
│   │       ├── layout.tsx         # Guarda de rota (verifica auth)
│   │       ├── dashboard/
│   │       │   └── page.tsx
│   │       ├── leads/
│   │       │   ├── page.tsx       # Lista de leads
│   │       │   └── [id]/
│   │       │       └── page.tsx   # Detalhes + interações
│   │       └── kanban/
│   │           └── page.tsx
│   ├── components/
│   │   ├── ui/                    # Componentes atômicos reutilizáveis
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Spinner.tsx
│   │   │   └── EmptyState.tsx
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── PrivateLayout.tsx
│   │   ├── leads/
│   │   │   ├── LeadCard.tsx
│   │   │   ├── LeadForm.tsx
│   │   │   ├── LeadList.tsx
│   │   │   └── LeadDetail.tsx
│   │   ├── kanban/
│   │   │   ├── KanbanBoard.tsx
│   │   │   ├── KanbanColumn.tsx
│   │   │   └── KanbanCard.tsx
│   │   ├── interactions/
│   │   │   ├── InteractionForm.tsx
│   │   │   └── InteractionList.tsx
│   │   └── dashboard/
│   │       ├── StatCard.tsx
│   │       └── RecentLeads.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useLeads.ts
│   │   └── useInteractions.ts
│   ├── services/
│   │   ├── api.ts                 # Axios instance com interceptors
│   │   ├── authService.ts
│   │   ├── leadService.ts
│   │   ├── interactionService.ts
│   │   └── dashboardService.ts
│   ├── store/
│   │   └── authStore.ts           # Zustand: estado do usuário autenticado
│   ├── types/
│   │   └── index.ts               # Types compartilhados frontend
│   ├── validators/
│   │   ├── authValidator.ts       # Schemas Zod para forms
│   │   └── leadValidator.ts
│   └── lib/
│       ├── utils.ts               # cn(), formatDate(), etc.
│       └── constants.ts           # LEAD_STATUS, INTERACTION_TYPES
├── styles/
│   └── tokens.css                 # Design tokens: cores, espaçamentos, tipografia (CSS vars)
├── e2e/                           # Testes Playwright E2E
│   ├── auth.spec.ts               # Fluxo de login, register, logout
│   ├── leads.spec.ts              # CRUD de leads
│   ├── kanban.spec.ts             # Drag and drop + mudança de status
│   ├── dashboard.spec.ts          # Verificação de métricas
│   └── fixtures/
│       └── auth.fixture.ts        # Login pré-autenticado reutilizável
├── .env.local.example
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── playwright.config.ts
└── package.json
```

---

## [SEÇÃO 5] SCHEMA DO BANCO DE DADOS (PRISMA)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id           String        @id @default(uuid())
  name         String
  email        String        @unique
  passwordHash String
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  leads        Lead[]

  @@map("users")
}

model Lead {
  id           String        @id @default(uuid())
  userId       String
  user         User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  name         String
  phone        String?
  email        String?
  company      String?       // Ex: Instagram, indicação, site, tráfego pago
  status       LeadStatus    @default(NOVO)
  notes        String?
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  interactions Interaction[]

  @@index([userId])
  @@map("leads")
}

model Interaction {
  id          String          @id @default(uuid())
  leadId      String
  lead        Lead            @relation(fields: [leadId], references: [id], onDelete: Cascade)
  type        InteractionType
  description String
  createdAt   DateTime        @default(now())

  @@index([leadId])
  @@map("interactions")
}

enum LeadStatus {
  NOVO
  EM_ATENDIMENTO
  PROPOSTA_ENVIADA
  FECHADO
}

enum InteractionType {
  LIGACAO
  WHATSAPP
  EMAIL
  REUNIAO
  OBSERVACAO
}
```

---

## [SEÇÃO 6] PADRÃO DE RESPOSTA DA API

Toda resposta da API deve seguir este contrato:

### Sucesso

```json
{
  "success": true,
  "data": {},
  "meta": {
    "page": 1,
    "totalPages": 5,
    "total": 48
  }
}
```

> `meta` é opcional, usado apenas em respostas paginadas.

### Erro

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Mensagem legível para o usuário",
    "details": [{ "field": "email", "message": "E-mail inválido" }]
  }
}
```

> `details` é opcional, usado apenas em erros de validação.

### Códigos de erro padronizados

| Código             | HTTP | Descrição                              |
| ------------------ | ---- | -------------------------------------- |
| `VALIDATION_ERROR` | 400  | Input inválido (Zod)                   |
| `UNAUTHORIZED`     | 401  | Token ausente ou inválido              |
| `FORBIDDEN`        | 403  | Recurso pertence a outro usuário       |
| `NOT_FOUND`        | 404  | Recurso não encontrado                 |
| `CONFLICT`         | 409  | Duplicidade (ex: e-mail já cadastrado) |
| `INTERNAL_ERROR`   | 500  | Erro interno não tratado               |

---

## [SEÇÃO 7] ESPECIFICAÇÕES COMPLETAS DAS FUNCIONALIDADES

### 7.1 AUTENTICAÇÃO

#### POST /api/v1/auth/register

**Entrada:**

```ts
{
  name: string; // min 2 chars, obrigatório
  email: string; // formato válido, obrigatório, único
  password: string; // min 8 chars, obrigatório
}
```

**Processo:**

1. Validar input com Zod
2. Verificar se e-mail já existe (userRepository)
3. Hash da senha com bcrypt (salt: 12)
4. Criar usuário no banco
5. Gerar JWT (payload: `{ sub: userId, email }`, expira em 7 dias)
6. Setar cookie httpOnly com o token
7. Retornar dados do usuário (sem passwordHash)

**Saída (201):**

```ts
{
  success: true,
  data: {
    id: string
    name: string
    email: string
    createdAt: string
  }
}
```

**Erros possíveis:**

- `VALIDATION_ERROR` (400) — campos inválidos
- `CONFLICT` (409) — e-mail já cadastrado

---

#### POST /api/v1/auth/login

**Entrada:**

```ts
{
  email: string;
  password: string;
}
```

**Processo:**

1. Validar input com Zod
2. Buscar usuário por e-mail
3. Comparar senha com bcrypt.compare
4. Gerar JWT e setar cookie httpOnly
5. Retornar dados do usuário

**Saída (200):**

```ts
{
  success: true,
  data: {
    id: string
    name: string
    email: string
  }
}
```

**Erros possíveis:**

- `VALIDATION_ERROR` (400)
- `UNAUTHORIZED` (401) — credenciais inválidas (nunca especificar qual campo está errado — OWASP)

---

#### POST /api/v1/auth/logout

**Processo:**

1. Limpar o cookie httpOnly (maxAge: 0)
2. Retornar sucesso

**Saída (200):**

```ts
{ success: true, data: { message: "Logout realizado com sucesso" } }
```

---

#### GET /api/v1/auth/me — (rota privada)

**Processo:**

1. authMiddleware verifica JWT do cookie
2. Buscar usuário pelo `req.user.id`
3. Retornar dados sem passwordHash

**Saída (200):** dados do usuário autenticado

---

### 7.2 LEADS (CRUD)

> Todas as rotas de leads são privadas. O `userId` vem sempre de `req.user.id` — **nunca do body**.

#### POST /api/v1/leads

**Entrada:**

```ts
{
  name: string          // obrigatório, min 2
  phone?: string        // texto livre, opcional
  email?: string        // formato válido quando informado
  company?: string      // texto livre
  status?: LeadStatus   // default: NOVO
  notes?: string        // texto livre
}
```

**Processo:**

1. Validar com Zod
2. Criar lead associado ao `req.user.id`

**Saída (201):** lead criado completo

---

#### GET /api/v1/leads

**Query params (todos opcionais):**

```ts
{
  page?: number         // default: 1
  limit?: number        // default: 20
  status?: LeadStatus   // filtro por status
  search?: string       // busca em name, email, company
}
```

**Processo:**

1. Buscar leads WHERE `userId = req.user.id`
2. Aplicar filtros e paginação
3. Nunca retornar leads de outros usuários

**Saída (200):**

```ts
{
  success: true,
  data: Lead[],
  meta: { page, limit, total, totalPages }
}
```

---

#### GET /api/v1/leads/:id

**Processo:**

1. Buscar lead por `id` WHERE `userId = req.user.id`
2. Se não encontrado ou userId diferente: `NOT_FOUND` (não revelar que existe — OWASP)
3. Retornar lead com interações incluídas

**Saída (200):** lead com `interactions[]`

---

#### PUT /api/v1/leads/:id

**Entrada:** mesmos campos do POST (todos opcionais)
**Processo:**

1. Verificar ownership (userId)
2. Atualizar apenas campos enviados (partial update)
3. Retornar lead atualizado

---

#### DELETE /api/v1/leads/:id

**Processo:**

1. Verificar ownership
2. Deletar lead (cascade deleta interactions pelo Prisma)

**Saída (200):** `{ success: true, data: { message: "Lead removido" } }`

---

### 7.3 INTERAÇÕES

> Sempre verificar que o lead pertence ao usuário antes de operar na interação.

#### POST /api/v1/leads/:leadId/interactions

**Entrada:**

```ts
{
  type: InteractionType; // LIGACAO | WHATSAPP | EMAIL | REUNIAO | OBSERVACAO
  description: string; // obrigatório, min 3 chars
}
```

**Processo:**

1. Verificar que `leadId` existe E pertence ao `req.user.id`
2. Criar interação vinculada ao lead
3. `createdAt` gerado automaticamente

**Saída (201):** interação criada

---

#### GET /api/v1/leads/:leadId/interactions

**Processo:**

1. Verificar ownership do lead
2. Retornar interações ordenadas por `createdAt DESC`

**Saída (200):** `Interaction[]`

---

#### DELETE /api/v1/leads/:leadId/interactions/:interactionId

**Processo:**

1. Verificar ownership do lead
2. Deletar interação

---

### 7.4 KANBAN

#### PATCH /api/v1/leads/:id/status

**Entrada:**

```ts
{
  status: LeadStatus;
}
```

**Processo:**

1. Validar status com Zod enum
2. Verificar ownership do lead
3. Atualizar apenas o campo status

**Saída (200):** lead com status atualizado

> Esta rota é usada pelo drag & drop e também pelo select/botão.

---

### 7.5 DASHBOARD

#### GET /api/v1/dashboard

**Processo:**

1. Executar queries em paralelo (Promise.all):
   - Total de leads do usuário
   - Contagem de leads por status
   - Total de interações do usuário (via leads)
   - Últimos 5 leads cadastrados (ORDER BY createdAt DESC)
2. Retornar tudo em uma única resposta

**Saída (200):**

```ts
{
  success: true,
  data: {
    totalLeads: number,
    leadsByStatus: {
      NOVO: number,
      EM_ATENDIMENTO: number,
      PROPOSTA_ENVIADA: number,
      FECHADO: number
    },
    totalInteractions: number,
    recentLeads: Lead[]
  }
}
```

---

## [SEÇÃO 8] AUTENTICAÇÃO — IMPLEMENTAÇÃO DETALHADA

### authMiddleware.ts

```ts
/**
 * Middleware de autenticação.
 * Extrai o JWT do cookie httpOnly, verifica assinatura e expiration,
 * e injeta os dados do usuário em req.user.
 *
 * @throws {AppError} UNAUTHORIZED (401) se token ausente, inválido ou expirado.
 */
```

### cookieOptions.ts

```ts
import type { CookieOptions } from "express";

/**
 * Opções do cookie JWT httpOnly.
 * Tipagem explícita CookieOptions garante valores corretos em compile time.
 */
export const cookieOptions: CookieOptions = {
  httpOnly: true, // JavaScript não acessa o cookie (OWASP A02)
  secure: process.env.NODE_ENV === "production", // HTTPS em produção
  sameSite: "strict" as const, // Proteção contra CSRF
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias em ms
};

export const clearCookieOptions: CookieOptions = {
  ...cookieOptions,
  maxAge: 0, // Usada no logout para limpar o cookie
};
```

### env.ts — Validação de variáveis de ambiente

```ts
/**
 * Valida todas as variáveis de ambiente na inicialização da aplicação.
 * Se alguma variável obrigatória estiver ausente ou inválida,
 * o processo encerra imediatamente com código de saída 1.
 * Evita que a aplicação suba com configuração incompleta.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.string().default("3001"),
  // ATENÇÃO: z.string().url() rejeita mysql:// (valida só http/https)
  // Usar startsWith para aceitar URLs MySQL sem falso-positivo
  DATABASE_URL: z.string().min(10).startsWith("mysql://"),
  JWT_SECRET: z.string().min(32), // mínimo 32 chars para segurança
  CORS_ORIGIN: z.string().url(), // CORS_ORIGIN é http(s):// — .url() correto aqui
});
```

---

## [SEÇÃO 9] SEGURANÇA — CHECKLIST OWASP TOP 10

Implementar e garantir cada item abaixo:

### A01 — Broken Access Control

- [ ] Todo endpoint de lead filtra por `userId = req.user.id` no Prisma
- [ ] Nunca aceitar `userId` do body do request
- [ ] Ao não encontrar recurso por ownership, retornar 404 (não 403) — não confirmar existência
- [ ] Rotas de admin inexistentes — todos usuários têm o mesmo nível

### A02 — Cryptographic Failures

- [ ] Senhas com bcrypt (salt rounds: 12)
- [ ] JWT_SECRET com mínimo 32 caracteres aleatórios
- [ ] Nenhuma informação sensível no payload do JWT
- [ ] Cookies com `secure: true` em produção
- [ ] `.env` no `.gitignore` com `.env.example` documentado

### A03 — Injection (SQL Injection — Cobertura Total)

**Regra absoluta: nenhum valor externo jamais é concatenado em string de query SQL.**

#### Camada 1 — ORM Prisma (defesa primária)

- [ ] Usar **exclusivamente** métodos Prisma (`findMany`, `findUnique`, `create`, `update`, `delete`) — todos parametrizados internamente
- [ ] **Proibido** `prisma.$queryRaw` ou `prisma.$executeRaw` com template string manual
- [ ] Se `$queryRaw` for absolutamente necessário, usar **exclusivamente** tagged template literal do Prisma:

  ```ts
  // ✅ SEGURO — Prisma parametriza automaticamente
  await prisma.$queryRaw`SELECT * FROM leads WHERE id = ${id}`;

  // ❌ PROIBIDO — concatenação direta = SQL Injection
  await prisma.$queryRaw(`SELECT * FROM leads WHERE id = '${id}'`);
  ```

#### Camada 2 — Validação de entrada com Zod (defesa em profundidade)

- [ ] Todo payload de request validado com Zod **antes** de chegar no service
- [ ] Campos de texto: usar `.min()`, `.max()` e `.regex()` para limitar formato e tamanho
- [ ] Campos de ID: validar formato UUID com `z.string().uuid()`
- [ ] Query params de busca (`search`): sanitizar com `.trim()` + limitar a 100 chars
- [ ] Enum de status: validar com `z.enum([...])` — nunca aceitar string livre para campos enumerados
- [ ] **Nunca** construir objeto de filtro Prisma diretamente de `req.body` sem validação:

  ```ts
  // ✅ SEGURO — Zod valida e tipifica antes
  const { search, status, page } = searchLeadsSchema.parse(req.query);
  const where = {
    userId: req.user.id,
    ...(status && { status }),
    ...(search && {
      OR: [
        // MySQL utf8mb4_unicode_ci é case-insensitive por padrão — sem mode:"insensitive"
        { name: { contains: search } },
        { email: { contains: search } },
        { company: { contains: search } },
      ],
    }),
  };

  // ❌ PROIBIDO — req.query direto no where do Prisma
  const where = { userId: req.user.id, ...req.query };
  ```

#### Camada 3 — Princípio do menor privilégio no banco

- [ ] Usuário do banco de dados usado pela aplicação deve ter apenas permissões `SELECT`, `INSERT`, `UPDATE`, `DELETE` nas tabelas necessárias
- [ ] **Sem** permissão `DROP`, `ALTER`, `CREATE`, `TRUNCATE` para o usuário da aplicação
- [ ] Configurar no `docker-compose.yml` e documentar no `.env.example`:
  ```sql
  -- Executar no seed ou migration inicial (MySQL 8.0):
  -- Criar usuário restrito para a aplicação
  CREATE USER 'app_user'@'%' IDENTIFIED BY 'senha_app';
  GRANT SELECT, INSERT, UPDATE, DELETE ON mini_crm_leads.* TO 'app_user'@'%';
  FLUSH PRIVILEGES;
  ```

#### Camada 4 — Logs e detecção

- [ ] Logar toda tentativa de input com caracteres suspeitos (`'`, `"`, `;`, `--`, `/*`) sem expor no response
- [ ] Em produção, **nunca** retornar mensagem de erro do Prisma/PostgreSQL ao cliente (pode vazar estrutura do banco):
  ```ts
  // errorMiddleware.ts — tratamento de erros Prisma
  if (error instanceof PrismaClientKnownRequestError) {
    // Log interno com detalhes
    logger.error({ code: error.code, meta: error.meta });
    // Resposta genérica ao cliente — sem vazar schema
    throw new AppError("DATABASE_ERROR", "Erro ao processar requisição", 500);
  }
  ```

### A04 — Insecure Design

- [ ] Arquitetura em camadas — validação no middleware, regra no service, acesso a dados no repository
- [ ] Tokens JWT stateless com expiração definida
- [ ] Dados do usuário isolados por `userId`

### A05 — Security Misconfiguration

- [ ] `helmet()` no Express (headers de segurança)
- [ ] CORS restrito à origin do frontend (`CORS_ORIGIN` via env)
- [ ] Nenhuma stack trace ou erro interno exposto ao cliente em produção
- [ ] `NODE_ENV` configurado corretamente por ambiente

### A06 — Vulnerable and Outdated Components

- [ ] Usar versões estáveis e recentes de todas as dependências
- [ ] Documentar versões no `package.json` sem wildcards desnecessários

### A07 — Identification and Authentication Failures

- [ ] Rate limit no endpoint de login: máx 10 tentativas por IP em 15 minutos
- [ ] Mensagem de erro genérica no login: "Credenciais inválidas" (não especificar se é e-mail ou senha)
- [ ] Senha mínimo 8 caracteres validado no backend com Zod
- [ ] httpOnly cookie evita roubo de token via XSS

### A08 — Software and Data Integrity Failures

- [ ] Verificar assinatura JWT em todo request autenticado
- [ ] Não confiar em dados do payload do JWT sem verificação da assinatura

### A09 — Security Logging and Monitoring Failures

- [ ] Log de todas as tentativas de login (sucesso e falha) com IP
- [ ] Log de erros 4xx e 5xx no `errorMiddleware`
- [ ] Nunca logar senhas, tokens ou dados pessoais

### A10 — Server-Side Request Forgery (SSRF)

- [ ] Não aplicável neste projeto (sem fetch de URLs externas baseadas em input do usuário)

---

## [SEÇÃO 10] PADRÃO DE CÓDIGO E DOCSTRINGS

### Regra de docstring (JSDoc) — obrigatória em toda função de service e repository

```ts
/**
 * Cria um novo lead associado ao usuário autenticado.
 *
 * @param {string} userId - ID do usuário autenticado (vem do JWT, nunca do body).
 * @param {CreateLeadDTO} data - Dados validados do lead a ser criado.
 * @returns {Promise<Lead>} O lead recém-criado com todos os campos.
 * @throws {AppError} INTERNAL_ERROR (500) se a operação no banco falhar.
 */
async createLead(userId: string, data: CreateLeadDTO): Promise<Lead> {
```

### Padrão de nomenclatura

- Arquivos: `camelCase` + sufixo de camada (`leadService.ts`, `leadController.ts`)
- Funções de controller: `getAll`, `getById`, `create`, `update`, `remove`
- Funções de repository: `findAllByUserId`, `findByIdAndUserId`, `create`, `update`, `delete`
- Tipos/interfaces: `PascalCase` com sufixo (`CreateLeadDTO`, `LeadResponse`)
- Enums: `UPPER_SNAKE_CASE` (já definido no Prisma)

### AppError.ts — Classe de erro customizada

```ts
/**
 * Classe de erro customizada para erros operacionais da aplicação.
 * Distingue erros esperados (operacionais) de erros de programação
 * para o errorMiddleware tratar adequadamente.
 *
 * @param {string} code - Código semântico do erro (ex: "NOT_FOUND").
 * @param {string} message - Mensagem legível para o usuário.
 * @param {number} statusCode - HTTP status code correspondente.
 * @param {boolean} isOperational - true = erro esperado, false = bug.
 */
export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number,
    public readonly isOperational = true,
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
```

### asyncHandler.ts — Wrapper para eliminar try-catch repetitivo

```ts
import type { Request, Response, NextFunction, RequestHandler } from "express";

/** Tipo local para handlers assíncronos — evita dependência de tipo externo não declarado */
type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void | Response>;

/**
 * Wrapper para controller functions assíncronas.
 * Captura qualquer erro rejeitado e encaminha para o errorMiddleware,
 * eliminando a necessidade de try-catch em cada controller.
 *
 * @param {Function} fn - Função assíncrona do controller.
 * @returns {RequestHandler} Handler do Express com captura de erros.
 */
export const asyncHandler =
  (fn: AsyncRequestHandler): RequestHandler =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
```

### errorMiddleware.ts — Handler global de erros

```ts
/**
 * Middleware global de tratamento de erros do Express.
 * Deve ser o ÚLTIMO middleware registrado em app.ts.
 *
 * - Erros operacionais (AppError): retorna statusCode e mensagem do erro.
 * - Erros do Prisma: mapeia para respostas padronizadas.
 * - Erros inesperados: retorna 500 sem expor detalhes internos em produção.
 *
 * @security Nunca expõe stack trace em NODE_ENV=production (OWASP A05).
 */
```

---

## [SEÇÃO 11] FRONTEND — REGRAS DE IMPLEMENTAÇÃO

### Configuração do Axios (services/api.ts)

```ts
/**
 * Instância Axios configurada para comunicação com a API.
 *
 * - withCredentials: true → envia cookies httpOnly automaticamente
 * - Interceptor de resposta: redireciona para /login em caso de 401
 * - Base URL via variável de ambiente NEXT_PUBLIC_API_URL
 */
```

### Proteção de rotas (app/(private)/layout.tsx)

```tsx
/**
 * Layout das rotas privadas.
 * Verifica no servidor (Server Component) se o usuário está autenticado
 * lendo o cookie de sessão. Redireciona para /login se não autenticado.
 *
 * @security Verificação server-side evita flash de conteúdo protegido.
 */
```

### Kanban com @dnd-kit

```tsx
/**
 * Implementação do Kanban Board com drag and drop.
 *
 * Estrutura:
 * - DndContext: contexto global do dnd-kit
 * - SortableContext: contexto por coluna (status)
 * - KanbanColumn: cada coluna é um droppable
 * - KanbanCard: cada card é um sortable/draggable
 *
 * Ao soltar o card em outra coluna:
 * 1. Atualizar estado local imediatamente (optimistic update)
 * 2. Chamar PATCH /api/v1/leads/:id/status
 * 3. Em caso de erro, reverter estado local e exibir toast de erro
 */
```

### Estados obrigatórios em toda listagem

```tsx
// Todo componente de listagem deve tratar os três estados:
if (isLoading) return <Spinner />;
if (error) return <ErrorMessage message={error.message} />;
if (data.length === 0) return <EmptyState message="Nenhum lead encontrado" />;
```

### Organização de componentes (react-best-practices)

```
Regra: organizar por feature — cada feature tem seus próprios componentes,
hooks e services. Nunca colocar lógica de domínio em componente de UI.

Componente  → apresentação pura (recebe props, exibe estado)
Hook        → lógica de estado, efeitos, chamadas à API
Service     → chamadas HTTP (Axios), sem estado
Store       → estado global de sessão (Zustand)
```

### Regras de Hooks (react-best-practices)

```tsx
// ✅ CORRETO — cleanup em useEffect
useEffect(() => {
  const controller = new AbortController();
  fetchLeads({ signal: controller.signal });
  return () => controller.abort(); // cleanup ao desmontar
}, [userId]);

// ✅ CORRETO — useMemo apenas com benefício real
const filteredLeads = useMemo(
  () => leads.filter(l => l.status === activeStatus),
  [leads, activeStatus], // recalcula só quando dependências mudam
);

// ❌ ERRADO — estado derivável não precisa ser state
// const [count, setCount] = useState(leads.length); // leads.length já é derivável
```

### Acessibilidade mínima (react-best-practices)

```tsx
// Todo campo de formulário deve ter label associado
<label htmlFor="email">E-mail</label>
<input id="email" type="email" name="email" aria-required="true" />

// Botões com ícone precisam de aria-label
<button aria-label="Deletar lead" onClick={onDelete}>
  <TrashIcon />
</button>

// Foco visível — nunca remover outline sem alternativa
// Em tailwind.config.ts:
// focusVisible: { outline: '2px solid', outlineColor: 'primary', outlineOffset: '2px' }

// Navegação por teclado no Kanban — mover cards com Enter/Space
<div
  role="button"
  tabIndex={0}
  onKeyDown={e => e.key === 'Enter' && handleDragStart()}
  aria-label={`Lead ${lead.name} — status ${lead.status}`}
>
```

### Chaves estáveis em listas

```tsx
// ✅ CORRETO — usar ID único do dado (UUID do banco)
{leads.map(lead => <LeadCard key={lead.id} lead={lead} />)}

// ❌ ERRADO — index como key (causa bugs em listas reordenadas)
{leads.map((lead, index) => <LeadCard key={index} lead={lead} />)}
```

---

## [SEÇÃO 11b] DESIGN SYSTEM + RESPONSIVIDADE

> Regras extraídas do skill **web-design-guidelines** e **react-best-practices** do arthur-brain.
> Aplicar em **toda** implementação de componente, página e layout.

---

### Breakpoints obrigatórios (mobile-first)

```ts
// tailwind.config.ts — breakpoints do arthur-brain
export default {
  theme: {
    screens: {
      xs:  "320px",   // celulares pequenos (iPhone SE)
      sm:  "375px",   // celulares padrão (iPhone 13 mini)
      md:  "425px",   // celulares grandes (iPhone Pro Max)
      lg:  "768px",   // tablets
      xl:  "1024px",  // laptops
      "2xl": "1280px" // desktops
    },
    extend: {
      // Sempre definir aqui — nunca usar valores arbitrários inline
    }
  }
}
```

> **Regra:** Todo layout começa no mobile (320px) e expande com media queries.
> Nunca assumir que o usuário está em desktop.

---

### Design Tokens (styles/tokens.css)

```css
/* apps/frontend/src/styles/tokens.css */
/* Importar em app/layout.tsx via globals.css */

:root {
  /* ─── CORES ──────────────────────────────── */
  --color-primary:       #2563EB;   /* blue-600 — ações principais */
  --color-primary-hover: #1D4ED8;   /* blue-700 — hover de botão primário */
  --color-danger:        #DC2626;   /* red-600  — deletar, erros */
  --color-success:       #16A34A;   /* green-600 — sucesso, fechado */
  --color-warning:       #D97706;   /* amber-600 — atenção, proposta */
  --color-neutral:       #6B7280;   /* gray-500  — texto secundário */

  /* Status dos leads — usado no Badge e Kanban */
  --status-novo:             #3B82F6; /* blue-500 */
  --status-em-atendimento:   #F59E0B; /* amber-500 */
  --status-proposta-enviada: #8B5CF6; /* violet-500 */
  --status-fechado:          #10B981; /* emerald-500 */

  /* ─── TIPOGRAFIA ─────────────────────────── */
  --font-size-xs:   0.75rem;    /* 12px */
  --font-size-sm:   0.875rem;   /* 14px */
  --font-size-base: 1rem;       /* 16px */
  --font-size-lg:   1.125rem;   /* 18px */
  --font-size-xl:   1.25rem;    /* 20px */
  --font-size-2xl:  1.5rem;     /* 24px */
  --font-size-3xl:  1.875rem;   /* 30px */

  /* ─── ESPAÇAMENTO ────────────────────────── */
  --spacing-1:  0.25rem;   /* 4px  */
  --spacing-2:  0.5rem;    /* 8px  */
  --spacing-3:  0.75rem;   /* 12px */
  --spacing-4:  1rem;      /* 16px */
  --spacing-6:  1.5rem;    /* 24px */
  --spacing-8:  2rem;      /* 32px */
  --spacing-12: 3rem;      /* 48px */

  /* ─── RAIO DE BORDA ──────────────────────── */
  --radius-sm: 0.25rem;   /* 4px  — inputs, badges */
  --radius-md: 0.5rem;    /* 8px  — cards, botões */
  --radius-lg: 1rem;      /* 16px — modais, drawers */
  --radius-full: 9999px;  /* pílula — badges de status */

  /* ─── SOMBRAS ────────────────────────────── */
  --shadow-sm: 0 1px 2px rgba(0,0,0,.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,.07);
  --shadow-lg: 0 10px 15px rgba(0,0,0,.1);
}
```

---

### Regras Anti-Break (obrigatórias em todo componente)

```tsx
/*
 * REGRA 1 — Toda imagem precisa de max-width e object-fit
 * Sem isso, imagens quebram containers em mobile.
 */
<img
  src={avatar}
  alt={lead.name}
  className="max-w-full h-auto object-cover rounded-full"
/>

/*
 * REGRA 2 — Sem scroll horizontal acidental
 * Nunca usar width fixo maior que 100vw sem overflow: hidden no container pai.
 */
<main className="w-full max-w-screen overflow-x-hidden">

/*
 * REGRA 3 — Texto longo com quebra segura
 * Nomes de empresa, e-mail e descrições podem ser muito longos.
 */
<p className="truncate max-w-full">
  {lead.company}
</p>
// Para textos com múltiplas linhas:
<p className="break-words overflow-wrap-anywhere">
  {interaction.description}
</p>

/*
 * REGRA 4 — Menus e modais sem clipping
 * Sidebar mobile como drawer; Modal sempre com backdrop e z-index correto.
 */
<aside className="
  fixed inset-y-0 left-0 z-40 w-64
  transform transition-transform duration-300
  lg:static lg:translate-x-0
  -translate-x-full data-[open=true]:translate-x-0
">

/*
 * REGRA 5 — Containers com largura fluida
 * Nunca usar px fixo em containers de conteúdo.
 */
<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

---

### Hierarquia Tipográfica (padrão para todas as páginas)

```tsx
// Títulos de página
<h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Dashboard</h1>

// Títulos de seção
<h2 className="text-lg font-semibold text-gray-800">Leads Recentes</h2>

// Labels e subtítulos
<h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
  Status
</h3>

// Texto de conteúdo
<p className="text-sm text-gray-700 leading-relaxed">{lead.notes}</p>

// Texto auxiliar (data, meta)
<span className="text-xs text-gray-400">{formatDate(lead.createdAt)}</span>
```

---

### Estados Visuais de Botão (obrigatórios)

```tsx
// Button.tsx — todos os estados devem ser visíveis e coerentes
<button
  className="
    inline-flex items-center justify-center gap-2
    px-4 py-2 rounded-md text-sm font-medium
    transition-colors duration-150
    /* Estado normal */
    bg-blue-600 text-white
    /* Hover */
    hover:bg-blue-700
    /* Active (clique) */
    active:bg-blue-800 active:scale-[0.98]
    /* Focus visível — acessibilidade */
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-blue-500 focus-visible:ring-offset-2
    /* Disabled */
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
  "
  disabled={isLoading}
>
  {isLoading ? <Spinner size="sm" /> : children}
</button>
```

---

### Sidebar — Responsividade Mobile/Desktop

```tsx
/*
 * Mobile  (< 1024px): Sidebar como drawer lateral com overlay escuro
 * Desktop (>= 1024px): Sidebar fixa à esquerda, layout em duas colunas
 *
 * Estrutura:
 * - [estado] sidebarOpen (useState) controlado pelo Header
 * - [mobile] overlay fecha ao clicar fora
 * - [desktop] sempre visível via CSS (lg:flex)
 */

// Layout principal
<div className="flex h-screen overflow-hidden bg-gray-50">
  {/* Overlay mobile */}
  {sidebarOpen && (
    <div
      className="fixed inset-0 z-30 bg-black/40 lg:hidden"
      onClick={() => setSidebarOpen(false)}
    />
  )}

  {/* Sidebar */}
  <aside className={`
    fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg
    transform transition-transform duration-300 ease-in-out
    lg:static lg:translate-x-0 lg:shadow-none
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
  `}>
    <SidebarContent />
  </aside>

  {/* Conteúdo principal */}
  <main className="flex-1 overflow-y-auto">
    <Header onMenuClick={() => setSidebarOpen(true)} />
    {children}
  </main>
</div>
```

---

### Kanban — Layout Responsivo

```tsx
/*
 * Mobile  (< 768px): colunas empilhadas verticalmente + select para mudar status
 * Tablet  (768-1023px): scroll horizontal com colunas lado a lado
 * Desktop (>= 1024px): 4 colunas em grid fixo
 *
 * REGRA: drag & drop só em desktop/tablet; mobile usa <select> para mudar status
 * Isso garante UX funcional em touch sem depender de drag events.
 */
<div className="
  flex flex-col gap-4
  md:flex-row md:overflow-x-auto md:pb-4
  lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-x-visible
">
  {columns.map(column => (
    <KanbanColumn key={column.status} column={column} />
  ))}
</div>

// KanbanColumn — largura mínima para não colapsar em scroll horizontal
<div className="
  w-full flex-shrink-0
  md:w-72 md:min-w-[18rem]
  lg:w-auto
  bg-gray-100 rounded-lg p-3
">
```

---

### Cards de Lead — Responsividade

```tsx
/*
 * Lista de Leads: grid responsivo
 * Mobile:  1 coluna
 * Tablet:  2 colunas
 * Desktop: 3 colunas (ou tabela, conforme contexto)
 */
<ul className="
  grid grid-cols-1 gap-4
  sm:grid-cols-2
  xl:grid-cols-3
">
  {leads.map(lead => (
    <LeadCard key={lead.id} lead={lead} />
  ))}
</ul>
```

---

### Badge de Status

```tsx
// Badge.tsx — cor dinâmica por status
const STATUS_COLORS: Record<LeadStatus, string> = {
  NOVO:              "bg-blue-100 text-blue-700 ring-blue-200",
  EM_ATENDIMENTO:    "bg-amber-100 text-amber-700 ring-amber-200",
  PROPOSTA_ENVIADA:  "bg-violet-100 text-violet-700 ring-violet-200",
  FECHADO:           "bg-emerald-100 text-emerald-700 ring-emerald-200",
};

export function Badge({ status }: { status: LeadStatus }) {
  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5
      rounded-full text-xs font-medium ring-1 ring-inset
      ${STATUS_COLORS[status]}
    `}>
      {STATUS_LABELS[status]}
    </span>
  );
}
```

---

### Checklist de Validação Visual (por breakpoint)

Antes de considerar qualquer tela concluída, validar em cada breakpoint:

```
□ 320px  — Sem overflow horizontal; sidebar escondida; formulário cabe na tela
□ 375px  — Texto não cortado; botões não empilham de forma confusa
□ 425px  — Cards e listas sem quebra inesperada
□ 768px  — Layout tablet: sidebar abre como drawer; kanban com scroll horizontal
□ 1024px — Layout desktop: sidebar fixa; kanban em 4 colunas; grid de leads 3 cols
□ 1280px — Conteúdo centralizado com max-w-7xl; espaçamento generoso
□ Geral  — Sem texto sem contraste adequado (WCAG AA: 4.5:1)
□ Geral  — Todos os campos de form com label visível ou aria-label
□ Geral  — Tab navigation funcional (outline visível em foco)
□ Geral  — Imagens com alt text descritivo ou alt="" se decorativas
□ Geral  — Estados hover/active/disabled coerentes em todos os botões
```

---

### Prompt de UI Reform (do arthur-brain) — usar para revisão visual

```
Você é um especialista em frontend design e engenharia de interface.

## Objetivo
Executar reforma visual moderna e fluida sem quebrar comportamento funcional.

## Fluxo
A) Diagnóstico visual — listar o que quebra em cada breakpoint
B) Mudanças por prioridade — do mais crítico (overflow) ao cosmético
C) Código final — Tailwind, sem inline style, mobile-first
D) Validação por breakpoint — confirmar 320/375/425/768/1024/1280

## Regras
- Preservar contratos e props existentes
- Aplicar tokens de cor e espaçamento (usar classes Tailwind, não valores arbitrários)
- Garantir acessibilidade visual mínima (contraste, foco, labels)
- Sidebar mobile como drawer; kanban mobile como colunas empilhadas com select
```

---

## [SEÇÃO 12] DOCKER — CONFIGURAÇÃO COMPLETA

> Um único `docker-compose up -d` sobe **Traefik + MySQL + phpMyAdmin + Backend + Frontend**.
> Cada serviço tem seu próprio container. Traefik roteia o tráfego HTTP.
> Frontend e Backend ficam no mesmo host (`localhost`) separados por rota de path.

### 12.1 docker-compose.yml (raiz do projeto)

```yaml
version: "3.8"

services:
  # ─── TRAEFIK — REVERSE PROXY ────────────────────────────────────
  # Roteia http://localhost → frontend e http://localhost/api → backend
  # Dashboard em http://localhost:8080 (apenas desenvolvimento)
  traefik:
    image: traefik:v3.0
    container_name: mini_crm_traefik
    restart: unless-stopped
    command:
      - "--api.insecure=true" # dashboard sem auth — somente dev
      - "--providers.docker=true" # descobre serviços pelos labels
      - "--providers.docker.exposedbydefault=false" # expõe só quem tem label enable=true
      - "--entrypoints.web.address=:80" # único entrypoint HTTP na porta 80
    ports:
      - "80:80" # tráfego HTTP principal
      - "8080:8080" # Traefik dashboard
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro # lê eventos Docker (read-only)
    networks:
      - mini_crm_net

  # ─── BANCO DE DADOS MySQL ───────────────────────────────────────
  mysql:
    image: mysql:8.0
    container_name: mini_crm_mysql
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    ports:
      - "3306:3306" # exposto apenas para Prisma Studio e ferramentas locais
    volumes:
      - mysql_data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 5s
      timeout: 5s
      retries: 10
    networks:
      - mini_crm_net

  # ─── phpMyAdmin — ADMIN WEB DO BANCO ───────────────────────────
  # Acessível em http://localhost:8081
  # Login: usuário/senha do MYSQL_USER + MYSQL_PASSWORD
  phpmyadmin:
    image: phpmyadmin:latest
    container_name: mini_crm_phpmyadmin
    restart: unless-stopped
    depends_on:
      mysql:
        condition: service_healthy
    environment:
      PMA_HOST: mysql # nome do serviço MySQL na rede Docker
      PMA_PORT: 3306
      PMA_ARBITRARY: 0 # desabilita login em servidor arbitrário
    ports:
      - "8081:80" # http://localhost:8081
    networks:
      - mini_crm_net

  # ─── BACKEND — Node.js + Express ────────────────────────────────
  backend:
    build:
      context: ./apps/backend
      dockerfile: Dockerfile
    container_name: mini_crm_backend
    restart: unless-stopped
    depends_on:
      mysql:
        condition: service_healthy
    environment:
      NODE_ENV: production
      PORT: 3001
      # Usa nome do serviço MySQL como host (rede interna Docker)
      DATABASE_URL: mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@mysql:3306/${MYSQL_DATABASE}
      JWT_SECRET: ${JWT_SECRET}
      # Com Traefik: browser acessa frontend e backend via http://localhost (porta 80)
      CORS_ORIGIN: http://localhost
    # Sem ports expostas: Traefik roteia internamente via labels
    labels:
      - "traefik.enable=true"
      # Rotas com /api têm prioridade (PathPrefix mais específico que raiz)
      - "traefik.http.routers.backend.rule=Host(`localhost`) && PathPrefix(`/api`)"
      - "traefik.http.routers.backend.entrypoints=web"
      - "traefik.http.services.backend.loadbalancer.server.port=3001"
    networks:
      - mini_crm_net

  # ─── FRONTEND — Next.js ─────────────────────────────────────────
  frontend:
    build:
      context: ./apps/frontend
      dockerfile: Dockerfile
      args:
        # Com Traefik: frontend e backend no mesmo origin — /api via Traefik
        # Sobrescreva com URL pública em produção (ex: https://backend.railway.app/api/v1)
        NEXT_PUBLIC_API_URL: ${NEXT_PUBLIC_API_URL:-http://localhost/api/v1}
    container_name: mini_crm_frontend
    restart: unless-stopped
    depends_on:
      - backend
    environment:
      NODE_ENV: production
    labels:
      - "traefik.enable=true"
      # Captura tudo que NÃO começa com /api (Next.js recebe o restante)
      - "traefik.http.routers.frontend.rule=Host(`localhost`) && !PathPrefix(`/api`)"
      - "traefik.http.routers.frontend.entrypoints=web"
      - "traefik.http.services.frontend.loadbalancer.server.port=3000"
    networks:
      - mini_crm_net

networks:
  mini_crm_net:
    driver: bridge

volumes:
  mysql_data:
```

> **URLs disponíveis após `docker-compose up -d`:**
>
> | URL                     | Serviço                           |
> | ----------------------- | --------------------------------- |
> | http://localhost        | Frontend (Next.js via Traefik)    |
> | http://localhost/api/v1 | Backend API (Express via Traefik) |
> | http://localhost:8080   | Traefik Dashboard                 |
> | http://localhost:8081   | phpMyAdmin (MySQL)                |
>
> **Nota sobre `NEXT_PUBLIC_API_URL`:** Variável baked no bundle em build time.
> Com Traefik: usar `http://localhost/api/v1` (mesmo host, sem porta).
> Em produção (Railway): substituir pela URL pública do backend.

---

### 12.2 Dockerfile — Backend (`apps/backend/Dockerfile`)

```dockerfile
# ── Stage 1: Build TypeScript ──────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Instala dependências primeiro (cache layer)
COPY package*.json ./
RUN npm ci --frozen-lockfile

# Copia código-fonte e compila
COPY . .
RUN npm run build

# Gera Prisma Client para o target Alpine
RUN npx prisma generate

# ── Stage 2: Runtime mínimo ────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# ATENÇÃO: 'prisma' CLI deve estar em 'dependencies' (não devDependencies)
# para ficar disponível aqui. O CMD precisa de 'npx prisma migrate deploy'.
# No package.json do backend garantir:
#   "dependencies": { "prisma": "^5.x.x", "@prisma/client": "^5.x.x" }
# Instala dependências de produção (prisma incluído pois está em dependencies)
COPY package*.json ./
RUN npm ci --frozen-lockfile --omit=dev

# Copia build compilado e artefatos Prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY prisma ./prisma

# Usuário não-root (OWASP — princípio do menor privilégio)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3001

# Roda migrations e inicia o servidor
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
```

---

### 12.3 Dockerfile — Frontend (`apps/frontend/Dockerfile`)

```dockerfile
# ── Stage 1: Dependências ──────────────────────────────────────────
FROM node:20-alpine AS deps

WORKDIR /app
COPY package*.json ./
RUN npm ci --frozen-lockfile

# ── Stage 2: Build Next.js ─────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# NEXT_PUBLIC_* é incorporado em build time — deve vir como ARG
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ── Stage 3: Runtime mínimo (Next.js standalone) ───────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Usuário não-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copia apenas o output standalone do Next.js (muito menor que a build completa)
COPY --from=builder --chown=appuser:appgroup /app/.next/standalone ./
COPY --from=builder --chown=appuser:appgroup /app/.next/static ./.next/static
COPY --from=builder --chown=appuser:appgroup /app/public ./public

USER appuser

EXPOSE 3000

# Servidor standalone do Next.js (sem next start, mais leve)
CMD ["node", "server.js"]
```

> **Requer em `next.config.ts`:**
>
> ```ts
> const nextConfig = {
>   output: "standalone", // habilita build standalone para Docker
> };
> export default nextConfig;
> ```

---

### 12.4 .dockerignore — Backend (`apps/backend/.dockerignore`)

```
node_modules
dist
.env
.env.*
!.env.example
*.log
coverage
tests
```

### 12.5 .dockerignore — Frontend (`apps/frontend/.dockerignore`)

```
node_modules
.next
.env.local
.env.*
!.env.local.example
*.log
coverage
e2e
test-results
playwright-report
```

---

### 12.6 Comandos de operação

```bash
# Subir todos os 5 serviços (traefik + mysql + phpmyadmin + backend + frontend)
docker-compose up -d

# Acompanhar todos os logs em tempo real
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f backend
docker-compose logs -f mysql

# Verificar status de todos os containers
docker-compose ps

# Reconstruir imagem após mudança de código
docker-compose up -d --build backend
docker-compose up -d --build frontend

# Rodar seed dentro do container do backend
docker-compose exec backend npx prisma db seed

# Abrir Prisma Studio (conecta no MySQL local — requer mysql rodando)
DATABASE_URL=mysql://app:changeme@localhost:3306/mini_crm_leads npx prisma studio

# Acessar shell do container MySQL
docker-compose exec mysql mysql -u app -pchangeme mini_crm_leads

# Parar tudo (preserva volume do banco)
docker-compose down

# Parar e remover volumes (reseta banco — DESTRUTIVO)
docker-compose down -v
```

> **Serviços e portas disponíveis:**
>
> - `http://localhost` → Frontend (via Traefik porta 80)
> - `http://localhost/api/v1` → Backend API (via Traefik porta 80)
> - `http://localhost:8080` → Traefik Dashboard
> - `http://localhost:8081` → phpMyAdmin (login: `app` / `changeme`)
> - `localhost:3306` → MySQL direto (para Prisma Studio e ferramentas locais)

---

## [SEÇÃO 13] VARIÁVEIS DE AMBIENTE

### .env.example (raiz) — usado pelo docker-compose

```env
# ─── BANCO DE DADOS MySQL (docker-compose) ───────────────────────
MYSQL_ROOT_PASSWORD=rootchangeme
MYSQL_DATABASE=mini_crm_leads
MYSQL_USER=app
MYSQL_PASSWORD=changeme

# ─── AUTH ─────────────────────────────────────────────────────────
# Gerar com: node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
JWT_SECRET=your-super-secret-key-minimum-32-chars-here

# ─── CORS ─────────────────────────────────────────────────────────
# Com Traefik: browser acessa frontend e backend pelo mesmo origin (http://localhost)
CORS_ORIGIN=http://localhost

# ─── NEXT.JS (build arg para Docker) ─────────────────────────────
# Com Traefik: mesmo origin do frontend — /api roteado pelo Traefik
NEXT_PUBLIC_API_URL=http://localhost/api/v1
```

### apps/backend/.env.example — desenvolvimento local (sem Docker)

```env
NODE_ENV=development
PORT=3001

# Local (sem Docker): aponta para MySQL rodando localmente
DATABASE_URL=mysql://app:changeme@localhost:3306/mini_crm_leads

# Docker: usar nome do serviço como host (rede interna Docker)
# DATABASE_URL=mysql://app:changeme@mysql:3306/mini_crm_leads

JWT_SECRET=your-super-secret-key-minimum-32-chars-here

# Sem Docker (npm run dev): frontend em :3000, sem Traefik
CORS_ORIGIN=http://localhost:3000
```

### apps/backend/.env.test — banco de teste isolado

```env
NODE_ENV=test
PORT=3002
DATABASE_URL=mysql://app:changeme@localhost:3306/mini_crm_test
JWT_SECRET=test-secret-key-minimum-32-chars-for-tests
CORS_ORIGIN=http://localhost:3000
```

### apps/frontend/.env.local.example

```env
# Local (sem Docker): aponta para backend em :3001 diretamente
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1

# Com Docker + Traefik: mesma origin (porta 80) — sem porta no URL
# NEXT_PUBLIC_API_URL=http://localhost/api/v1
```

> **Resumo das diferenças Docker vs local:**
>
> | Contexto                  | DATABASE_URL                     | CORS_ORIGIN                   | NEXT_PUBLIC_API_URL                  |
> | ------------------------- | -------------------------------- | ----------------------------- | ------------------------------------ |
> | Local (npm run dev)       | `mysql://...@localhost:3306/...` | `http://localhost:3000`       | `http://localhost:3001/api/v1`       |
> | Docker + Traefik          | `mysql://...@mysql:3306/...`     | `http://localhost`            | `http://localhost/api/v1`            |
> | Produção (Railway/Vercel) | URL gerada pelo Railway          | `https://frontend.vercel.app` | `https://backend.railway.app/api/v1` |

---

## [SEÇÃO 14] TESTES

### Configuração Jest (jest.config.ts)

```ts
import type { Config } from "jest";

/**
 * Configuração Jest com ts-jest para TypeScript nativo.
 * Separa ambiente de testes (NODE_ENV=test) para isolar banco de dados.
 */
const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",
  testMatch: ["**/tests/**/*.test.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"], // ATENÇÃO: 'setupFilesAfterFramework' não existe — o correto é 'setupFilesAfterEnv'
  clearMocks: true,
  collectCoverageFrom: ["src/**/*.ts", "!src/server.ts"],
};

export default config;
```

### Dependências de teste

```bash
npm install -D jest ts-jest @types/jest supertest @types/supertest
```

> **Atenção:** Criar também `apps/backend/.env.test` (ou configurar `NODE_ENV=test` + `DATABASE_URL_TEST`)
> para apontar para um banco separado nos testes de integração:
>
> ```env
> # apps/backend/.env.test
> NODE_ENV=test
> DATABASE_URL=postgresql://postgres:changeme@localhost:5432/mini_crm_leads_test
> JWT_SECRET=test-secret-key-minimum-32-chars-here
> CORS_ORIGIN=http://localhost:3000
> PORT=3002
> ```
>
> O `jest.config.ts` deve carregar esse arquivo com `globalSetup` ou a lib `dotenv` no `tests/setup.ts`.

### Estrutura dos testes

**Unitários (Jest + mocks):**

```ts
// authService.test.ts
describe('AuthService', () => {
  describe('register', () => {
    it('deve criar usuário com senha hasheada', async () => { ... })
    it('deve lançar CONFLICT se e-mail já existe', async () => { ... })
  })
  describe('login', () => {
    it('deve retornar JWT válido com credenciais corretas', async () => { ... })
    it('deve lançar UNAUTHORIZED com senha errada', async () => { ... })
    it('deve lançar UNAUTHORIZED com e-mail inexistente', async () => { ... })
  })
})

// leadService.test.ts
describe('LeadService', () => {
  it('deve criar lead com userId correto', async () => { ... })
  it('deve lançar NOT_FOUND ao acessar lead de outro usuário', async () => { ... })
  it('deve filtrar leads por userId', async () => { ... })
})
```

**Integração (Jest + Supertest):**

```ts
// leads.test.ts
describe('Leads API', () => {
  it('POST /leads → 401 sem autenticação', async () => { ... })
  it('POST /leads → 201 com dados válidos', async () => { ... })
  it('GET /leads/:id → 404 para lead de outro usuário', async () => { ... })
  it('DELETE /leads/:id → 403/404 para lead de outro usuário', async () => { ... })
})
```

### Scripts no package.json do backend

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:integration": "jest --testPathPattern=integration"
  },
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

> **ATENÇÃO — scripts críticos para o Docker:**
>
> - `"build": "tsc"` — o Dockerfile faz `RUN npm run build`. Sem este script o container falha.
> - `"start": "node dist/server.js"` — CMD do Docker usa este script.
> - `"prisma.seed"` — sem esta config, `npx prisma db seed` falha com _"no seed script found"_.

### tsconfig.json do backend

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*", "prisma/seed.ts"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

> **`outDir: "./dist"` é crítico** — o Dockerfile gera o build em `dist/` e executa `node dist/server.js`.
> Sem isso, o build do container falha silenciosamente ou o `node` não encontra `server.js`.

---

## [SEÇÃO 14b] TESTES E2E — PLAYWRIGHT

### playwright.config.ts (raiz do monorepo)

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  /* Paralelismo total */
  fullyParallel: true,
  /* Falha imediata no CI se test.only foi esquecido */
  forbidOnly: !!process.env.CI,
  /* Retries em CI para flakiness */
  retries: process.env.CI ? 2 : 0,
  /* Workers em CI */
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    baseURL: "http://localhost:3000",
    /* Trace em primeira retry para diagnóstico */
    trace: "on-first-retry",
    /* Screenshot automático em falha */
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "mobile-iphone13",
      use: { ...devices["iPhone 13"] },
    },
  ],
  /* Sobe o Next.js automaticamente antes de rodar os testes */
  webServer: {
    command: "npm run dev",
    cwd: "./apps/frontend",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

### e2e/fixtures/auth.fixture.ts

```ts
import { test as base, type Page } from "@playwright/test";

type AuthFixtures = {
  authenticatedPage: Page;
};

/**
 * Fixture reutilizável que faz login antes de cada teste autenticado.
 * Usar `import { test, expect } from "./fixtures/auth.fixture"` nos specs.
 */
export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto("/login");
    await page.fill('[name="email"]', "admin@teste.com");
    await page.fill('[name="password"]', "Admin@123");
    await page.click('[type="submit"]');
    await page.waitForURL("**/dashboard");
    await use(page);
  },
});

export { expect } from "@playwright/test";
```

### e2e/auth.spec.ts

```ts
import { test, expect } from "@playwright/test";

test.describe("Autenticação", () => {
  test("redireciona /dashboard → /login sem autenticação", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForURL("**/login");
    expect(page.url()).toContain("/login");
  });

  test("register → redireciona para /dashboard", async ({ page }) => {
    await page.goto("/register");
    await page.fill('[name="name"]', "Teste E2E");
    await page.fill('[name="email"]', `e2e_${Date.now()}@teste.com`);
    await page.fill('[name="password"]', "Admin@123");
    await page.click('[type="submit"]');
    await page.waitForURL("**/dashboard");
    expect(page.url()).toContain("/dashboard");
  });

  test("login com credenciais erradas → exibe mensagem de erro", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.fill('[name="email"]', "admin@teste.com");
    await page.fill('[name="password"]', "senhaerrada");
    await page.click('[type="submit"]');
    await expect(page.locator('[role="alert"], .error-message')).toBeVisible();
  });

  test("logout → redireciona para /login", async ({ page }) => {
    await page.goto("/login");
    await page.fill('[name="email"]', "admin@teste.com");
    await page.fill('[name="password"]', "Admin@123");
    await page.click('[type="submit"]');
    await page.waitForURL("**/dashboard");
    await page.click('[data-testid="logout-button"]');
    await page.waitForURL("**/login");
    expect(page.url()).toContain("/login");
  });
});
```

### e2e/leads.spec.ts

```ts
import { test, expect } from "./fixtures/auth.fixture";

test.describe("Leads — CRUD", () => {
  test("criar lead → aparece na lista", async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.goto("/leads");
    await page.click('[data-testid="new-lead-button"]');
    await page.fill('[name="name"]', "Lead E2E");
    await page.fill('[name="email"]', `lead_${Date.now()}@teste.com`);
    await page.fill('[name="company"]', "Empresa Teste");
    await page.click('[type="submit"]');
    await expect(page.locator("text=Lead E2E")).toBeVisible();
  });

  test("deletar lead → some da lista", async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.goto("/leads");
    const leadCard = page.locator('[data-testid="lead-card"]').first();
    const leadName = await leadCard
      .locator('[data-testid="lead-name"]')
      .textContent();
    await leadCard.locator('[data-testid="delete-lead-button"]').click();
    await page.locator('[data-testid="confirm-delete"]').click();
    await expect(page.locator(`text=${leadName}`)).not.toBeVisible();
  });
});
```

### e2e/kanban.spec.ts

```ts
import { test, expect } from "./fixtures/auth.fixture";

test.describe("Kanban", () => {
  test("exibe as 4 colunas de status", async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.goto("/kanban");
    await expect(page.locator('[data-testid="column-NOVO"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="column-CONTATADO"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="column-QUALIFICADO"]'),
    ).toBeVisible();
    await expect(page.locator('[data-testid="column-PERDIDO"]')).toBeVisible();
  });

  test("mover card via select de status → aparece na coluna correta", async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage;
    await page.goto("/kanban");
    const card = page.locator('[data-testid="kanban-card"]').first();
    const cardName = await card
      .locator('[data-testid="lead-name"]')
      .textContent();
    /* Usar select como alternativa ao drag — mais estável em E2E */
    await card
      .locator('[data-testid="status-select"]')
      .selectOption("CONTATADO");
    await expect(
      page
        .locator('[data-testid="column-CONTATADO"]')
        .locator(`text=${cardName}`),
    ).toBeVisible();
  });
});
```

### e2e/dashboard.spec.ts

```ts
import { test, expect } from "./fixtures/auth.fixture";

test.describe("Dashboard", () => {
  test("exibe os 4 cards de métricas", async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.goto("/dashboard");
    await expect(
      page.locator('[data-testid="stat-total-leads"]'),
    ).toBeVisible();
    await expect(page.locator('[data-testid="stat-novos"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="stat-qualificados"]'),
    ).toBeVisible();
    await expect(page.locator('[data-testid="stat-conversao"]')).toBeVisible();
  });

  test("total de leads bate com a lista de leads", async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage;
    await page.goto("/dashboard");
    const totalText = await page
      .locator('[data-testid="stat-total-leads"]')
      .textContent();
    const total = parseInt(totalText?.match(/\d+/)?.[0] ?? "0", 10);
    await page.goto("/leads");
    const cards = page.locator('[data-testid="lead-card"]');
    await expect(cards).toHaveCount(total);
  });
});
```

### Scripts no package.json do frontend (`apps/frontend/package.json`)

Adicionar os seguintes scripts:

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:report": "playwright show-report",
    "test:e2e:debug": "playwright test --debug"
  }
}
```

> **Pré-requisitos para rodar E2E:**
>
> - Backend rodando em `:3001`
> - Banco populado com o seed (`admin@teste.com` / `Admin@123`)
> - O `playwright.config.ts` com `webServer` sobe o Next.js automaticamente em `:3000`
> - Rodar `npx playwright install chromium firefox` na primeira vez

---

## [SEÇÃO 15] DOCUMENTAÇÃO /docs/ai

Criar e preencher os 4 arquivos durante o desenvolvimento:

### /docs/ai/README.md

- Quais ferramentas de IA foram usadas (GitHub Copilot, Claude, etc.)
- Em quais partes a IA ajudou (boilerplate, estrutura, middlewares, etc.)
- Em quais partes foi escrito/decidido manualmente
- Limitações ou erros apresentados pela IA
- Como o código gerado foi revisado

### /docs/ai/prompts.md

- Registrar todos os prompts principais utilizados
- Formato: nome da tarefa, ferramenta usada, prompt, resultado, o que aproveitou e o que alterou
- **Incluir este PROMPT-MESTRE como Prompt 1**

### /docs/ai/decisions.md

Explicar com suas próprias palavras:

- Por que JWT em httpOnly Cookie e não localStorage
- Como as camadas do backend foram organizadas e por quê
- Como a segurança de dados por usuário foi implementada
- Por que Zod para validação
- Como o Prisma foi estruturado (relações, onDelete Cascade)
- Como os erros são tratados de forma centralizada
- Como as chamadas de API estão organizadas no frontend

### /docs/ai/review.md

- O que foi gerado por IA?
- O que foi revisado manualmente?
- Houve algum erro da IA? Qual?
- Algum código foi descartado?
- Quais melhorias foram feitas após a geração inicial?

---

## [SEÇÃO 16] COMMITS SEMÂNTICOS

Usar Conventional Commits. Exemplos:

```
feat(auth): implement JWT authentication with httpOnly cookies
feat(leads): add CRUD endpoints with user ownership validation
feat(kanban): add drag and drop with dnd-kit
feat(dashboard): add stats aggregation endpoint
feat(interactions): add interaction registration per lead
test(leads): add unit tests for LeadService
test(auth): add integration tests for auth routes
test(e2e): add Playwright E2E specs for auth, leads and kanban
chore(playwright): configure playwright with chromium, firefox and mobile
chore(docker): add docker-compose with postgres, backend and frontend
docs(ai): add AI usage documentation
chore: initial monorepo structure
```

---

## [SEÇÃO 17] README PRINCIPAL

O `README.md` na raiz do projeto deve conter:

1. **Descrição do projeto** — O que é o Mini CRM de Leads
2. **Tecnologias** — Stack completa com versões
3. **Pré-requisitos** — Node.js, Docker (inclui MySQL e phpMyAdmin via Compose)
4. **Instalação** — `git clone`, `npm install` em cada app
5. **Configuração de variáveis** — Copiar `.env.example`, preencher valores
6. **Rodar com Docker** — `docker-compose up -d`
7. **Rodar migrations (desenvolvimento local)** — `npx prisma migrate dev`
   **Rodar migrations (Docker / produção)** — `npx prisma migrate deploy` (já executado automaticamente no CMD do container)
8. **Rodar seed** — `npx prisma db seed`
9. **Rodar backend** — `npm run dev` em `apps/backend`
10. **Rodar frontend** — `npm run dev` em `apps/frontend`
11. **Usuário de teste** — e-mail e senha criados pelo seed
12. **Funcionalidades entregues** — lista do que foi implementado
13. **Funcionalidades pendentes** — lista do que não foi feito (honesto)
14. **Decisões técnicas principais** — resumo das escolhas

---

## [SEÇÃO 18] CHECKLIST DE ENTREGA

```
□ Repositório GitHub privado criado
□ Convite enviado para "rodrigoamb"
□ README.md completo na raiz
□ .env.example na raiz e em apps/backend
□ Migrations do Prisma commitadas
□ docker-compose.yml funcionando
□ Seed de dados criado (usuário de teste)
□ Backend rodando localmente
□ Frontend rodando localmente
□ /docs/ai/README.md preenchido
□ /docs/ai/prompts.md preenchido
□ /docs/ai/decisions.md preenchido
□ /docs/ai/review.md preenchido
□ Commits semânticos e organizados
□ (Opcional) Link de deploy do frontend (Vercel)
□ (Opcional) Link de deploy do backend (Railway)
```

---

## [SEÇÃO 19] DEPLOY (OPCIONAL, MAS DIFERENCIAL)

### Frontend — Vercel

1. Push para GitHub
2. Importar projeto no vercel.com
3. Configurar `NEXT_PUBLIC_API_URL` nas environment variables
4. Deploy automático a cada push

### Backend — Railway

1. Criar projeto no railway.app
2. Adicionar serviço MySQL (ou usar plugin MySQL do Railway) → copiar DATABASE_URL gerada
3. Adicionar serviço do repositório GitHub (pasta `apps/backend`)
4. Configurar variáveis de ambiente (`DATABASE_URL` gerado pelo Railway, `JWT_SECRET`, `CORS_ORIGIN`)
5. Garantir que o Dockerfile faz `prisma migrate deploy` no start

---

## [SEÇÃO 20] ORDEM DE EXECUÇÃO POR ETAPAS

> Execute **uma etapa por vez** na IA. Só avance quando a etapa atual estiver funcionando.
> **COMMITS ATÔMICOS:** Cada passo marcado com `git commit` deve ser commitado individualmente.
> Um commit por grupo de pacotes instalados, por arquivo de configuração, por feature implementada.

---

### ─── ETAPA 1 — BANCO DE DADOS ───────────────────────────────

**Objetivo:** MySQL configurado, schema criado, migrations rodando.

```
Passos + Commits:

  [ ] 1.1  Criar pasta do monorepo: mini-crm-leads/
           git commit: "chore: create monorepo folder structure"

  [ ] 1.2  Criar apps/backend/ com npm init --yes
           git commit: "chore(backend): npm init --yes + configure package.json base"

  [ ] 1.3  Instalar Prisma:
           npm install prisma @prisma/client
           git commit: "chore(deps): install prisma @prisma/client"

  [ ] 1.4  npx prisma init → configurar datasource mysql em schema.prisma
           git commit: "chore(prisma): npx prisma init + configure datasource mysql"

  [ ] 1.5  Implementar schema.prisma completo (User, Lead, Interaction, enums)
           git commit: "feat(schema): implement prisma schema User Lead Interaction enums"

  [ ] 1.6  Criar apps/backend/.env.example com DATABASE_URL mysql://...
           (o .env real não é commitado — está no .gitignore)
           git commit: "chore(env): create apps/backend/.env.example with DATABASE_URL"

  [ ] 1.7  npx prisma migrate dev --name init → gera tabelas no banco
           git commit: "chore(migration): add initial prisma migration"

  [ ] 1.8  Implementar prisma/seed.ts com 1 usuário + 3 leads + 2 interações
           git commit: "feat(seed): implement prisma/seed.ts with test data"

  [ ] 1.9  Adicionar config "prisma.seed" no package.json (obrigatório para npx prisma db seed)
           git commit: "chore(seed): configure prisma.seed script in package.json"

  [ ] 1.10 npx prisma db seed → verificar dados no banco
           (sem commit — validação)
  [ ] 1.11 npx prisma studio → conferir visualmente
           (sem commit — validação)

Entregas:
  ✓ schema.prisma com relações, enums e onDelete Cascade
  ✓ Migration em prisma/migrations/ commitada
  ✓ Seed: admin@teste.com / Admin@123
  ✓ DATABASE_URL no .env.example
  ✓ 7 commits atômicos
```

---

### ─── ETAPA 2 — BACKEND — FUNDAÇÃO ───────────────────────────

**Objetivo:** Express rodando com estrutura de camadas, erros tratados, env validada.

```
Passos + Commits:

  [ ] 2.1  Instalar grupo servidor HTTP:
           npm install express cors cookie-parser
           git commit: "chore(deps): install express cors cookie-parser"

  [ ] 2.2  Instalar grupo segurança:
           npm install helmet express-rate-limit
           git commit: "chore(deps): install helmet express-rate-limit"

  [ ] 2.3  Instalar grupo autenticação:
           npm install jsonwebtoken bcrypt
           git commit: "chore(deps): install jsonwebtoken bcrypt"

  [ ] 2.4  Instalar grupo validação + ORM:
           npm install zod prisma @prisma/client
           # ATENÇÃO: prisma vai em dependencies (não devDeps) — necessário no Docker
           git commit: "chore(deps): install zod prisma @prisma/client (in dependencies)"

  [ ] 2.5  Instalar TypeScript + ferramentas dev:
           npm install -D typescript ts-node-dev @types/node @types/express @types/cors @types/cookie-parser
           git commit: "chore(devdeps): install typescript ts-node-dev @types/node @types/express"

  [ ] 2.6  Instalar @types restantes:
           npm install -D @types/jsonwebtoken @types/bcrypt
           git commit: "chore(devdeps): install @types/jsonwebtoken @types/bcrypt"

  [ ] 2.7  Configurar tsconfig.json (outDir: ./dist — obrigatório para o Docker)
           git commit: "chore(config): configure tsconfig.json with outDir dist"

  [ ] 2.8  Adicionar scripts no package.json:
           "build": "tsc", "dev": "ts-node-dev...", "start": "node dist/server.js", "test": "jest"
           git commit: "chore(config): add package.json scripts build dev start test"

  [ ] 2.9  Implementar config/env.ts (validação Zod — DATABASE_URL começa com mysql://)
           git commit: "feat(config): implement config/env.ts with Zod validation"

  [ ] 2.10 Implementar config/database.ts (singleton PrismaClient)
           git commit: "feat(config): implement config/database.ts Prisma singleton"

  [ ] 2.11 Implementar utils/AppError.ts
           git commit: "feat(utils): implement utils/AppError.ts"

  [ ] 2.12 Implementar utils/asyncHandler.ts
           git commit: "feat(utils): implement utils/asyncHandler.ts"

  [ ] 2.13 Implementar utils/cookieOptions.ts
           git commit: "feat(utils): implement utils/cookieOptions.ts"

  [ ] 2.14 Implementar middlewares/errorMiddleware.ts
           git commit: "feat(middleware): implement middlewares/errorMiddleware.ts"

  [ ] 2.15 Implementar middlewares/rateLimitMiddleware.ts
           git commit: "feat(middleware): implement middlewares/rateLimitMiddleware.ts"

  [ ] 2.16 Implementar app.ts (helmet, cors, cookie-parser, router)
           git commit: "feat(app): implement app.ts with helmet cors cookie-parser"

  [ ] 2.17 Implementar server.ts (listen + graceful shutdown)
           git commit: "feat(server): implement server.ts with graceful shutdown"

  [ ] 2.18 Testar: npm run dev → servidor respondendo em :3001
           (sem commit — validação)

Entregas:
  ✓ Express rodando com TypeScript
  ✓ helmet + cors + rate-limit ativos
  ✓ errorMiddleware global funcionando
  ✓ 16 commits atômicos
```

---

### ─── ETAPA 3 — BACKEND — AUTENTICAÇÃO ───────────────────────

**Objetivo:** Register, login, logout e /me funcionando com JWT em httpOnly cookie.

```
Passos + Commits:

  [ ] 3.1  Implementar validators/authValidator.ts
           git commit: "feat(auth): implement validators/authValidator.ts"

  [ ] 3.2  Implementar types/express.d.ts (extensão req.user)
           git commit: "feat(auth): implement types/express.d.ts req.user extension"

  [ ] 3.3  Implementar repositories/userRepository.ts
           git commit: "feat(auth): implement repositories/userRepository.ts"

  [ ] 3.4  Implementar services/authService.ts
           git commit: "feat(auth): implement services/authService.ts"

  [ ] 3.5  Implementar controllers/authController.ts
           git commit: "feat(auth): implement controllers/authController.ts"

  [ ] 3.6  Implementar middlewares/authMiddleware.ts (JWT do cookie)
           git commit: "feat(auth): implement middlewares/authMiddleware.ts"

  [ ] 3.7  Implementar routes/authRoutes.ts + registrar em routes/router.ts
           git commit: "feat(auth): implement authRoutes.ts + register in router.ts"

  [ ] 3.8  Testar: POST /register, POST /login, GET /me, POST /logout
           (sem commit — validação)

Entregas:
  ✓ JWT em httpOnly cookie, bcrypt salt 12, mensagem genérica (OWASP A07)
  ✓ 7 commits atômicos
```

---

### ─── ETAPA 4 — BACKEND — LEADS ──────────────────────────────

**Objetivo:** CRUD completo com isolamento por usuário.

```
Passos + Commits:

  [ ] 4.1  Implementar validators/leadValidator.ts
           git commit: "feat(leads): implement validators/leadValidator.ts"

  [ ] 4.2  Implementar repositories/leadRepository.ts
           git commit: "feat(leads): implement repositories/leadRepository.ts"

  [ ] 4.3  Implementar services/leadService.ts
           git commit: "feat(leads): implement services/leadService.ts"

  [ ] 4.4  Implementar controllers/leadController.ts
           git commit: "feat(leads): implement controllers/leadController.ts"

  [ ] 4.5  Implementar routes/leadRoutes.ts + PATCH /:id/status + registrar em router.ts
           git commit: "feat(leads): implement leadRoutes.ts with PATCH status endpoint"

  [ ] 4.6  Testar: CRUD + lead de outro user retorna 404
           (sem commit — validação)

Entregas:
  ✓ userId de req.user.id, paginação, filtros, ownership check
  ✓ 5 commits atômicos
```

---

### ─── ETAPA 5 — BACKEND — INTERAÇÕES E DASHBOARD ─────────────

**Objetivo:** Interações por lead e dashboard com Promise.all.

```
Passos + Commits:

  [ ] 5.1  Implementar validators/interactionValidator.ts
           git commit: "feat(interactions): implement validators/interactionValidator.ts"

  [ ] 5.2  Implementar repositories/interactionRepository.ts
           git commit: "feat(interactions): implement repositories/interactionRepository.ts"

  [ ] 5.3  Implementar services/interactionService.ts
           git commit: "feat(interactions): implement services/interactionService.ts"

  [ ] 5.4  Implementar controllers/interactionController.ts
           git commit: "feat(interactions): implement controllers/interactionController.ts"

  [ ] 5.5  Implementar routes/interactionRoutes.ts + registrar em router.ts
           git commit: "feat(interactions): implement interactionRoutes.ts"

  [ ] 5.6  Implementar services/dashboardService.ts (Promise.all)
           git commit: "feat(dashboard): implement dashboardService.ts with Promise.all"

  [ ] 5.7  Implementar controllers/dashboardController.ts + routes/dashboardRoutes.ts
           git commit: "feat(dashboard): implement dashboardController.ts + dashboardRoutes.ts"

  [ ] 5.8  Testar: interações + GET /dashboard
           (sem commit — validação)

Entregas:
  ✓ Ownership verificado antes de operar interações
  ✓ Dashboard com 4 métricas em uma request
  ✓ 7 commits atômicos
```

---

### ─── ETAPA 6 — BACKEND — TESTES (Jest + Supertest) ──────────

**Objetivo:** Cobertura de testes unitários e integração.

```
Passos + Commits:

  [ ] 6.1  Instalar Jest + ts-jest:
           npm install -D jest ts-jest @types/jest
           git commit: "chore(devdeps): install jest ts-jest @types/jest"

  [ ] 6.2  Instalar Supertest:
           npm install -D supertest @types/supertest
           git commit: "chore(devdeps): install supertest @types/supertest"

  [ ] 6.3  Implementar jest.config.ts
           git commit: "chore(jest): implement jest.config.ts"

  [ ] 6.4  Criar tests/setup.ts (limpar banco de teste a cada suite)
           git commit: "test(setup): implement tests/setup.ts db cleanup"

  [ ] 6.5  Implementar tests/unit/authService.test.ts
           git commit: "test(unit): implement tests/unit/authService.test.ts"

  [ ] 6.6  Implementar tests/unit/leadService.test.ts
           git commit: "test(unit): implement tests/unit/leadService.test.ts"

  [ ] 6.7  Implementar tests/integration/auth.test.ts
           git commit: "test(integration): implement tests/integration/auth.test.ts"

  [ ] 6.8  Implementar tests/integration/leads.test.ts
           git commit: "test(integration): implement tests/integration/leads.test.ts"

  [ ] 6.9  npm test → todos passando
           (sem commit — validação)

Entregas:
  ✓ Unitários com mocks, integração com banco mini_crm_test
  ✓ Teste de segurança: lead de outro usuário retorna 404
  ✓ 8 commits atômicos
```

---

### ─── ETAPA 7 — DOCKER (Traefik + MySQL + phpMyAdmin + Backend + Frontend) ─

**Objetivo:** `docker-compose up -d` sobe os 5 serviços com um único comando.

```
Passos + Commits:

  [ ] 7.1  Criar apps/backend/Dockerfile multi-stage (Seção 12.2)
           git commit: "chore(docker): implement apps/backend/Dockerfile multi-stage"

  [ ] 7.2  Criar apps/backend/.dockerignore
           git commit: "chore(docker): implement apps/backend/.dockerignore"

  [ ] 7.3  Adicionar output: 'standalone' em next.config.ts
           git commit: "chore(next): add output standalone in next.config.ts"

  [ ] 7.4  Criar apps/frontend/Dockerfile multi-stage standalone (Seção 12.3)
           git commit: "chore(docker): implement apps/frontend/Dockerfile standalone"

  [ ] 7.5  Criar apps/frontend/.dockerignore
           git commit: "chore(docker): implement apps/frontend/.dockerignore"

  [ ] 7.6  Criar docker-compose.yml na raiz com os 5 serviços (Seção 12.1):
           traefik → mysql → phpmyadmin → backend → frontend
           DATABASE_URL interna: mysql://...@mysql:3306/...
           Traefik roteia: Host(localhost)+PathPrefix(/api) → backend
                           Host(localhost)+!PathPrefix(/api) → frontend
           git commit: "chore(docker): implement docker-compose.yml with 5 services"

  [ ] 7.7  Criar .env.example na raiz (MYSQL_ROOT_PASSWORD, MYSQL_USER, etc.)
           git commit: "chore(env): create root .env.example for docker-compose"

  [ ] 7.8  Copiar .env.example → .env e preencher valores
           (não commitar o .env)

  [ ] 7.9  docker-compose up -d --build
           Verificar: docker-compose ps → 5 serviços "Up"

  [ ] 7.10 Verificar URLs:
           http://localhost       → frontend ✓
           http://localhost/api/v1 → backend ✓
           http://localhost:8080  → Traefik Dashboard ✓
           http://localhost:8081  → phpMyAdmin ✓

  [ ] 7.11 docker-compose exec backend npx prisma db seed

Entregas:
  ✓ Traefik roteia frontend + backend no mesmo host porta 80
  ✓ MySQL com healthcheck — backend só sobe quando banco estiver pronto
  ✓ phpMyAdmin em :8081 para inspeção visual do banco
  ✓ Backend: multi-stage, usuário não-root, migrate no start
  ✓ Frontend: standalone, NEXT_PUBLIC_* como build arg
  ✓ 7 commits atômicos

Prompt para a IA:
  "Implemente o Docker completo conforme Seção 12 (12.1 a 12.6).
  docker-compose.yml com 5 serviços: traefik, mysql, phpmyadmin, backend, frontend.
  Traefik v3: PathPrefix(/api) → backend:3001, demais → frontend:3000.
  Dockerfile multi-stage para cada app com usuário não-root.
  DATABASE_URL interna: mysql://...@mysql:3306/..."
```

---

### ─── ETAPA 8 — FRONTEND — BASE ───────────────────────────────

**Objetivo:** Next.js 14 App Router com TypeScript funcionando, auth configurada.

```
Passos + Commits:

  [ ] 8.1  Scaffoldar Next.js:
           npx create-next-app@latest apps/frontend --typescript --tailwind --app --src-dir --import-alias "@/*"
           git commit: "chore(frontend): scaffold Next.js 14 TypeScript TailwindCSS App Router"

  [ ] 8.2  Instalar Axios + Zustand:
           npm install axios zustand
           git commit: "chore(deps): install axios zustand"

  [ ] 8.3  Instalar React Hook Form + Zod:
           npm install react-hook-form @hookform/resolvers zod
           git commit: "chore(deps): install react-hook-form @hookform/resolvers zod"

  [ ] 8.4  Implementar services/api.ts (Axios + withCredentials + interceptor 401)
           git commit: "feat(api): implement services/api.ts withCredentials interceptor"

  [ ] 8.5  Implementar types/index.ts (User, Lead, Interaction, LeadStatus, etc.)
           git commit: "feat(types): implement types/index.ts shared types"

  [ ] 8.6  Implementar lib/constants.ts + lib/utils.ts
           git commit: "feat(lib): implement lib/constants.ts and lib/utils.ts"

  [ ] 8.7  Implementar store/authStore.ts (Zustand)
           git commit: "feat(store): implement store/authStore.ts Zustand"

  [ ] 8.8  Implementar validators/authValidator.ts + leadValidator.ts
           git commit: "feat(validators): implement authValidator.ts and leadValidator.ts"

  [ ] 8.9  Implementar app/(auth)/login/page.tsx
           git commit: "feat(auth): implement app/(auth)/login/page.tsx"

  [ ] 8.10 Implementar app/(auth)/register/page.tsx
           git commit: "feat(auth): implement app/(auth)/register/page.tsx"

  [ ] 8.11 Implementar app/(private)/layout.tsx (proteção server-side)
           git commit: "feat(layout): implement app/(private)/layout.tsx server-side guard"

  [ ] 8.12 Testar: login redireciona para /dashboard
           (sem commit — validação)

Entregas:
  ✓ Next.js App Router + TypeScript + TailwindCSS
  ✓ Axios com withCredentials: true
  ✓ Proteção de rotas server-side
  ✓ 11 commits atômicos
```

---

### ─── ETAPA 9 — FRONTEND — FEATURES ──────────────────────────

**Objetivo:** Todas as telas funcionais conectadas à API, responsivas e acessíveis.

```
Passos + Commits:

  [ ] 9.0  Criar styles/tokens.css + configurar tailwind.config.ts (Seção 11b)
           — breakpoints 320/375/425/768/1024/1280
           — paleta de cores por status (NOVO, EM_ATENDIMENTO, etc.)
           git commit: "chore(design): implement design tokens and tailwind breakpoints"

  [ ] 9.1  Implementar components/ui/ (Button, Input, Modal, Badge, Spinner, EmptyState)
           — Button: todos os estados hover/active/disabled/focus-visible (Seção 11b)
           — Badge: cores dinâmicas por status (STATUS_COLORS map)
           — Input: label associada com htmlFor + aria-required
           git commit: "feat(ui): implement components/ui atomic components with states"

  [ ] 9.2  Implementar components/layout/ (Sidebar, Header, PrivateLayout)
           — Sidebar: drawer mobile (<1024px) + fixa desktop (>=1024px) (Seção 11b)
           — Header: botão hambúrguer mobile com aria-label
           — Overlay escuro fecha o drawer ao clicar fora
           git commit: "feat(layout): implement responsive Sidebar Header PrivateLayout"

  [ ] 9.3  Implementar hooks/useLeads.ts
           — useEffect com AbortController cleanup
           — retornar { data, isLoading, error }
           git commit: "feat(hooks): implement hooks/useLeads.ts with cleanup"

  [ ] 9.4  Implementar hooks/useInteractions.ts
           git commit: "feat(hooks): implement hooks/useInteractions.ts with cleanup"

  [ ] 9.5  Implementar app/(private)/leads/page.tsx (lista + busca + filtro)
           — Grid: 1 col mobile / 2 cols tablet / 3 cols desktop (Seção 11b)
           — Chaves estáveis: key={lead.id} (nunca index)
           — Tratar loading / error / empty obrigatoriamente
           git commit: "feat(leads): implement responsive leads list page"

  [ ] 9.6  Implementar components/leads/LeadForm.tsx (criar + editar)
           — Todo campo com label htmlFor + aria-required
           — Validação Zod client-side com mensagem acessível
           git commit: "feat(leads): implement LeadForm.tsx with accessible validation"

  [ ] 9.7  Implementar app/(private)/leads/[id]/page.tsx (detalhes + interações)
           — Texto longo com truncate / break-words (Seção 11b)
           git commit: "feat(leads): implement lead detail page with interactions"

  [ ] 9.8  Instalar @dnd-kit:
           npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
           git commit: "chore(deps): install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities"

  [ ] 9.9  Implementar app/(private)/kanban/page.tsx
           — Mobile (<768px): colunas empilhadas + <select> para mudar status
           — Tablet (768-1023px): scroll horizontal com colunas de 18rem
           — Desktop (>=1024px): grid-cols-4 fixo + drag and drop
           — aria-label nos cards draggable; suporte Enter/Space para teclado
           git commit: "feat(kanban): implement responsive kanban with dnd + mobile select"

  [ ] 9.10 Implementar app/(private)/dashboard/page.tsx (4 cards + últimos leads)
           — StatCards em grid: 1 col mobile / 2 cols tablet / 4 cols desktop
           git commit: "feat(dashboard): implement responsive dashboard stats cards"

  [ ] 9.11 Auditoria de responsividade (Seção 11b — Checklist Visual)
           — Validar em 320 / 375 / 425 / 768 / 1024 / 1280
           — Sem overflow horizontal em nenhum breakpoint
           — Sidebar drawer mobile funcionando
           — Kanban mobile com select funcionando
           git commit: "fix(responsive): apply responsive audit fixes across all pages"

  [ ] 9.12 Testar todos os fluxos CRUD + drag and drop
           (sem commit — validação)

Entregas:
  ✓ Design tokens aplicados (tokens.css + tailwind.config.ts)
  ✓ Loading / error / empty em todos os componentes
  ✓ Kanban: drag and drop desktop + select mobile
  ✓ Sidebar: drawer mobile + fixa desktop
  ✓ Texto longo com truncate/break-words
  ✓ Acessibilidade: labels, aria-label, foco visível, key estável
  ✓ Auditoria por breakpoint concluída
  ✓ 12 commits atômicos

Prompt para a IA (Seção 11b — UI Reform):
  "Você é um especialista em frontend design e engenharia de interface.
  Implemente o frontend conforme Seção 11, 11b e 4.2.
  A) Diagnóstico: listar o que pode quebrar em mobile (320px).
  B) Mudanças: design tokens → layout responsivo → acessibilidade.
  C) Código: Tailwind mobile-first, breakpoints 320/375/425/768/1024/1280.
  D) Validação: confirmar comportamento em cada breakpoint.
  Sidebar: drawer mobile + fixa desktop. Kanban: select mobile + drag desktop."
```

---

### ─── ETAPA 9b — TESTES E2E (Playwright) ─────────────────────

**Objetivo:** Cobertura E2E dos fluxos críticos rodando em browser real.

```
Passos + Commits:

  [ ] 9b.1 Instalar Playwright:
           npm install -D @playwright/test
           npx playwright install chromium firefox
           git commit: "chore(devdeps): install @playwright/test"

  [ ] 9b.2 Implementar playwright.config.ts (Seção 14b)
           git commit: "chore(playwright): implement playwright.config.ts"

  [ ] 9b.3 Implementar e2e/fixtures/auth.fixture.ts
           git commit: "test(e2e): implement e2e/fixtures/auth.fixture.ts"

  [ ] 9b.4 Implementar e2e/auth.spec.ts
           git commit: "test(e2e): implement e2e/auth.spec.ts"

  [ ] 9b.5 Implementar e2e/leads.spec.ts
           git commit: "test(e2e): implement e2e/leads.spec.ts"

  [ ] 9b.6 Implementar e2e/kanban.spec.ts
           git commit: "test(e2e): implement e2e/kanban.spec.ts"

  [ ] 9b.7 Implementar e2e/dashboard.spec.ts
           git commit: "test(e2e): implement e2e/dashboard.spec.ts"

  [ ] 9b.8 npm run test:e2e → todos os specs passando
           (sem commit — validação)

Entregas:
  ✓ Playwright com webServer, Chromium + Firefox + iPhone 13
  ✓ Fixture de auth reutilizável
  ✓ 7 commits atômicos
```

---

### ─── ETAPA 10 — DEPLOY ───────────────────────────────────────

**Objetivo:** Frontend no Vercel + Backend no Railway com MySQL.

```
Passos + Commits:

  [ ] 10.1 FRONTEND (Vercel):
           vercel.com → New Project → Root: apps/frontend
           Env: NEXT_PUBLIC_API_URL=https://seu-backend.railway.app/api/v1
           git commit: "chore(deploy): add vercel configuration if needed"

  [ ] 10.2 BACKEND (Railway):
           railway.app → New Project → root: apps/backend
           Adicionar MySQL → copiar DATABASE_URL
           Envs: DATABASE_URL, JWT_SECRET, PORT=3001,
                 CORS_ORIGIN=https://seu-frontend.vercel.app, NODE_ENV=production
           git commit: "chore(deploy): document Railway environment configuration"

  [ ] 10.3 Atualizar CORS_ORIGIN (Railway) + NEXT_PUBLIC_API_URL (Vercel) com URLs reais
  [ ] 10.4 Testar fluxo completo em produção: register → login → criar lead → kanban

Entregas:
  ✓ Vercel + Railway funcionando
  ✓ CORS configurado entre domínios
  ✓ Migrations rodando no deploy
```

---

### ─── ETAPA 11 — DOCUMENTAÇÃO E ENTREGA ──────────────────────

```
Passos + Commits:

  [ ] 11.1 Criar /docs/ai/README.md
           git commit: "docs(ai): create /docs/ai/README.md"

  [ ] 11.2 Criar /docs/ai/prompts.md (incluir este PROMPT-MESTRE como Prompt 1)
           git commit: "docs(ai): create /docs/ai/prompts.md"

  [ ] 11.3 Criar /docs/ai/decisions.md (nas suas palavras)
           git commit: "docs(ai): create /docs/ai/decisions.md"

  [ ] 11.4 Criar /docs/ai/review.md
           git commit: "docs(ai): create /docs/ai/review.md"

  [ ] 11.5 Escrever README.md principal completo (Seção 17)
           git commit: "docs: write main README.md with setup and Docker instructions"

  [ ] 11.6 Verificar .gitignore — nenhum .env commitado
           git commit: "chore(gitignore): ensure all .env files are excluded"

  [ ] 11.7 git log --oneline → revisar commits semânticos
           (sem commit — validação)

  [ ] 11.8 Enviar convite para "rodrigoamb" no GitHub

Entregas:
  ✓ README com instruções Docker (5 serviços) + local
  ✓ /docs/ai/ com 4 arquivos
  ✓ Convite enviado para rodrigoamb
  ✓ 6 commits atômicos
```

---

### 📊 MAPA DE COMMITS — RESUMO TOTAL

| Etapa     | Descrição                                                 | Commits                  |
| --------- | --------------------------------------------------------- | ------------------------ |
| 1         | Banco MySQL + Prisma                                      | 7                        |
| 2         | Backend: dependências + configs + utils + middlewares     | 16                       |
| 3         | Backend: autenticação                                     | 7                        |
| 4         | Backend: leads                                            | 5                        |
| 5         | Backend: interações + dashboard                           | 7                        |
| 6         | Testes Jest + Supertest                                   | 8                        |
| 7         | Docker: Traefik + MySQL + phpMyAdmin + Backend + Frontend | 7                        |
| 8         | Frontend: base + auth                                     | 11                       |
| 9         | Frontend: features + Design System + Responsividade + Kanban + Dashboard | 12                       |
| 9b        | E2E Playwright                                            | 7                        |
| 10        | Deploy Vercel + Railway                                   | 2                        |
| 11        | Documentação + entrega                                    | 6                        |
| **TOTAL** |                                                           | **~95 commits atômicos** |

> **Regra de ouro:** Um commit = uma instalação de pacote OU um arquivo de configuração OU um arquivo de feature.
> Commits granulares demonstram raciocínio estruturado e são critério de avaliação.

---

_Prompt criado por Arthur Bruno Araujo | arthur-brain | Mini CRM de Leads — Teste Técnico Full-Stack Jr_

```
Passos:
  [ ] 1.1  Criar pasta do monorepo: mini-crm-leads/
  [ ] 1.2  Criar apps/backend/ com npm init + TypeScript
  [ ] 1.3  Instalar Prisma: npm install prisma @prisma/client
  [ ] 1.4  npx prisma init → gera prisma/schema.prisma
  [ ] 1.5  Implementar schema.prisma completo (User, Lead, Interaction, enums)
  [ ] 1.6  Criar .env com DATABASE_URL local
  [ ] 1.7  npx prisma migrate dev --name init → gera tabelas
  [ ] 1.8  Implementar prisma/seed.ts com 1 usuário e 3 leads de teste
  [ ] 1.9  npx prisma db seed → verificar dados no banco
  [ ] 1.10 npx prisma studio → conferir visualmente

Entregas desta etapa:
  ✓ schema.prisma completo com relações e enums
  ✓ Migration gerada em prisma/migrations/
  ✓ Seed funcionando com usuário de teste
  ✓ DATABASE_URL no .env.example documentada

Prompt para a IA:
  "Usando o schema.prisma da Seção 5, gere o arquivo prisma/seed.ts
  que cria: 1 usuário (email: admin@teste.com, senha: Admin@123),
  3 leads com status diferentes e 2 interações por lead.
  Use bcrypt para hash da senha. TypeScript."
```

---

### ─── ETAPA 2 — BACKEND — FUNDAÇÃO ───────────────────────────

**Objetivo:** Express rodando com estrutura de camadas, erros tratados, env validada.

```
Passos:
  [ ] 2.1  Instalar dependências de produção:
           npm install express helmet cors cookie-parser express-rate-limit jsonwebtoken bcrypt zod prisma @prisma/client
           # ATENÇÃO: 'prisma' vai em dependencies (não devDependencies) para o Docker funcionar

           Instalar @types e ferramentas de desenvolvimento:
           npm install -D typescript ts-node-dev @types/node @types/express @types/cors @types/cookie-parser @types/jsonwebtoken @types/bcrypt
  [ ] 2.2  Configurar tsconfig.json do backend
  [ ] 2.3  Implementar config/env.ts (validação Zod de env vars)
  [ ] 2.4  Implementar config/database.ts (singleton PrismaClient)
  [ ] 2.5  Implementar utils/AppError.ts
  [ ] 2.6  Implementar utils/asyncHandler.ts
  [ ] 2.7  Implementar utils/cookieOptions.ts
  [ ] 2.8  Implementar middlewares/errorMiddleware.ts
  [ ] 2.9  Implementar middlewares/rateLimitMiddleware.ts
  [ ] 2.10 Implementar app.ts (helmet, cors, cookie-parser, router)
  [ ] 2.11 Implementar server.ts (listen + graceful shutdown)
  [ ] 2.12 Testar: npm run dev → servidor respondendo em :3001

Entregas desta etapa:
  ✓ Express rodando com TypeScript
  ✓ helmet + cors + rate-limit ativos
  ✓ errorMiddleware global funcionando
  ✓ AppError com código semântico e statusCode

Prompt para a IA:
  "Com base na Seção 8 e Seção 10, implemente: config/env.ts,
  utils/AppError.ts, utils/asyncHandler.ts, middlewares/errorMiddleware.ts
  e app.ts completo para Node.js + Express + TypeScript.
  Usar helmet, cors (origin via env), cookie-parser e express-rate-limit."
```

---

### ─── ETAPA 3 — BACKEND — AUTENTICAÇÃO ───────────────────────

**Objetivo:** Register, login, logout e /me funcionando com JWT em httpOnly cookie.

```
Passos:
  [ ] 3.1  Implementar validators/authValidator.ts (Zod schemas)
  [ ] 3.2  Implementar types/express.d.ts (extensão req.user)
  [ ] 3.3  Implementar repositories/userRepository.ts
  [ ] 3.4  Implementar services/authService.ts
  [ ] 3.5  Implementar controllers/authController.ts
  [ ] 3.6  Implementar middlewares/authMiddleware.ts (JWT do cookie)
  [ ] 3.7  Implementar routes/authRoutes.ts
  [ ] 3.8  Registrar em routes/router.ts
  [ ] 3.9  Testar manualmente: POST /register, POST /login, GET /me, POST /logout

Entregas desta etapa:
  ✓ JWT gerado e salvo em httpOnly cookie
  ✓ bcrypt com salt 12 no hash da senha
  ✓ Mensagem genérica no login (OWASP A07)
  ✓ Rate limit em /login (10 req / 15min por IP)
  ✓ authMiddleware protegendo /me

Prompt para a IA:
  "Implemente a camada completa de autenticação conforme Seção 7.1 e Seção 8.
  Stack: Node.js + Express + TypeScript + Prisma + JWT + bcrypt + Zod.
  JWT deve ser salvo em httpOnly cookie com as opções da Seção 8.
  Incluir JSDoc em todas as funções de service e repository."
```

---

### ─── ETAPA 4 — BACKEND — LEADS ──────────────────────────────

**Objetivo:** CRUD de leads completo com isolamento por usuário.

```
Passos:
  [ ] 4.1  Implementar validators/leadValidator.ts
  [ ] 4.2  Implementar repositories/leadRepository.ts
  [ ] 4.3  Implementar services/leadService.ts
  [ ] 4.4  Implementar controllers/leadController.ts
  [ ] 4.5  Implementar routes/leadRoutes.ts
  [ ] 4.6  Implementar PATCH /:id/status (para o Kanban)
  [ ] 4.7  Registrar em router.ts com authMiddleware
  [ ] 4.8  Testar: CRUD completo + verificar que lead de outro user retorna 404

Entregas desta etapa:
  ✓ userId sempre de req.user.id (nunca do body)
  ✓ Paginação + filtro por status + busca por nome/email/empresa
  ✓ Ownership check em todas as operações
  ✓ JSDoc completo em service e repository

Prompt para a IA:
  "Implemente a camada completa de leads conforme Seção 7.2 e Seção 7.4.
  Incluir: CRUD completo, paginação, filtros, busca e PATCH de status para o Kanban.
  Garantir ownership check em todas as queries Prisma (userId = req.user.id).
  TypeScript + Prisma + Zod. JSDoc em todas as funções."
```

---

### ─── ETAPA 5 — BACKEND — INTERAÇÕES E DASHBOARD ─────────────

**Objetivo:** Interações por lead e dashboard com agregações.

```
Passos:
  [ ] 5.1  Implementar validators/interactionValidator.ts
  [ ] 5.2  Implementar repositories/interactionRepository.ts
  [ ] 5.3  Implementar services/interactionService.ts
  [ ] 5.4  Implementar controllers/interactionController.ts
  [ ] 5.5  Implementar routes/interactionRoutes.ts
  [ ] 5.6  Implementar services/dashboardService.ts (Promise.all)
  [ ] 5.7  Implementar controllers/dashboardController.ts
  [ ] 5.8  Implementar routes/dashboardRoutes.ts
  [ ] 5.9  Testar: interações + verificar que GET /dashboard retorna dados corretos

Entregas desta etapa:
  ✓ Interações vinculadas ao lead (verificar ownership do lead antes)
  ✓ Dashboard com 4 métricas em uma única request (Promise.all)

Prompt para a IA:
  "Implemente interações (Seção 7.3) e dashboard (Seção 7.5).
  No dashboard, usar Promise.all para executar as 4 queries em paralelo.
  Verificar sempre que o lead pertence ao req.user.id antes de operar na interação."
```

---

### ─── ETAPA 6 — BACKEND — TESTES (Jest) ──────────────────────

**Objetivo:** Cobertura de testes unitários e integração com Jest.

```
Passos:
  [ ] 6.1  Instalar: npm install -D jest ts-jest @types/jest supertest @types/supertest
  [ ] 6.2  Implementar jest.config.ts
  [ ] 6.3  Criar tests/setup.ts (limpar banco de teste antes de cada suite)
  [ ] 6.4  Implementar tests/unit/authService.test.ts
  [ ] 6.5  Implementar tests/unit/leadService.test.ts
  [ ] 6.6  Implementar tests/integration/auth.test.ts (Supertest)
  [ ] 6.7  Implementar tests/integration/leads.test.ts (Supertest)
  [ ] 6.8  npm test → todos os testes passando
  [ ] 6.9  npm run test:coverage → verificar cobertura

Entregas desta etapa:
  ✓ Testes unitários com mocks (jest.fn(), jest.spyOn())
  ✓ Testes de integração com banco de teste separado
  ✓ Teste de segurança: lead de outro usuário retorna 404
  ✓ Coverage mínimo: services e repositories

Prompt para a IA:
  "Implemente os testes da Seção 14 usando Jest + ts-jest + Supertest.
  Unitários: mockar PrismaClient com jest.fn(). Integração: usar banco de teste.
  Cobrir: register, login com credenciais erradas, CRUD de leads com ownership."
```

---

### ─── ETAPA 7 — DOCKER COMPLETO (postgres + backend + frontend) ─

**Objetivo:** `docker-compose up -d` sobe os 3 serviços com um único comando.

```
Passos:
  [ ] 7.1  Criar apps/backend/Dockerfile multi-stage (Seção 12.2)
           - Stage builder: npm ci → npm run build → prisma generate
           - Stage runner: somente dist/ + prod deps + prisma client
           - Usuário não-root (OWASP)

  [ ] 7.2  Adicionar em next.config.ts: output: 'standalone'

  [ ] 7.3  Criar apps/frontend/Dockerfile multi-stage (Seção 12.3)
           - Stage deps: npm ci
           - Stage builder: npm run build com ARG NEXT_PUBLIC_API_URL
           - Stage runner: apenas .next/standalone + static + public
           - Usuário não-root (OWASP)

  [ ] 7.4  Criar apps/backend/.dockerignore (Seção 12.4)
  [ ] 7.5  Criar apps/frontend/.dockerignore (Seção 12.5)

  [ ] 7.6  Criar docker-compose.yml na raiz (Seção 12.1)
           - Serviços: postgres, backend, frontend
           - Rede interna: mini_crm_net
           - DATABASE_URL interna usa @postgres:5432 (nome do serviço)
           - NEXT_PUBLIC_API_URL passada como build arg

  [ ] 7.7  Copiar .env.example → .env na raiz e preencher:
           POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, JWT_SECRET

  [ ] 7.8  docker-compose up -d --build
           Verificar: docker-compose ps → 3 serviços "Up"

  [ ] 7.9  Verificar logs: docker-compose logs -f backend
           Confirmar: "prisma migrate deploy" + "Listening on :3001"

  [ ] 7.10 Verificar logs: docker-compose logs -f frontend
           Confirmar: "Ready on http://0.0.0.0:3000"

  [ ] 7.11 Rodar seed no container:
           docker-compose exec backend npx prisma db seed

  [ ] 7.12 Testar no browser: http://localhost:3000
           Fluxo: login → criar lead → kanban

Entregas desta etapa:
  ✓ postgres com healthcheck (backend aguarda antes de iniciar)
  ✓ backend: Dockerfile multi-stage, usuário não-root, migrate no start
  ✓ frontend: Dockerfile standalone, NEXT_PUBLIC_* como build arg
  ✓ Comunicação interna via rede Docker (mini_crm_net)
  ✓ .dockerignore em cada app (node_modules, .env, .next excluídos)
  ✓ Porta 5432 exposta só para Prisma Studio local
  ✓ docker-compose down -v documentado para reset de banco

Prompt para a IA:
  "Implemente o Docker completo conforme Seção 12 (12.1 a 12.6).
  docker-compose.yml com 3 serviços: postgres, backend, frontend.
  Dockerfile multi-stage para cada app com usuário não-root.
  Frontend usa output: standalone no next.config.ts.
  NEXT_PUBLIC_API_URL passada como ARG no build do frontend.
  DATABASE_URL interna aponta para @postgres:5432.
  Gerar .env.example e .dockerignore para cada app."
```

---

### ─── ETAPA 8 — FRONTEND — BASE ───────────────────────────────

**Objetivo:** Next.js 14 App Router com TypeScript funcionando, auth configurada.

```
Passos:
  [ ] 8.1  npx create-next-app@latest apps/frontend --typescript --tailwind
           --app --src-dir --import-alias "@/*"
  [ ] 8.2  Instalar: axios, zustand, react-hook-form, @hookform/resolvers, zod
  [ ] 8.3  Implementar services/api.ts (Axios + withCredentials + interceptor 401)
  [ ] 8.4  Implementar types/index.ts (User, Lead, Interaction, LeadStatus, etc.)
  [ ] 8.5  Implementar lib/constants.ts (LEAD_STATUS, INTERACTION_TYPES)
  [ ] 8.6  Implementar lib/utils.ts (cn(), formatDate())
  [ ] 8.7  Implementar store/authStore.ts (Zustand)
  [ ] 8.8  Implementar validators/authValidator.ts + leadValidator.ts (Zod + RHF)
  [ ] 8.9  Criar app/(auth)/login/page.tsx — formulário funcional
  [ ] 8.10 Criar app/(auth)/register/page.tsx — formulário funcional
  [ ] 8.11 Implementar app/(private)/layout.tsx (proteção server-side)
  [ ] 8.12 Testar: login redireciona para /dashboard

Entregas desta etapa:
  ✓ Next.js App Router com TypeScript
  ✓ TailwindCSS configurado
  ✓ Axios com withCredentials: true (envia cookie httpOnly)
  ✓ Proteção de rotas server-side
  ✓ Estados de loading e erro nos formulários

Prompt para a IA:
  "Implemente o frontend base conforme Seção 4.2 e Seção 11.
  Next.js 14 App Router + TypeScript + TailwindCSS.
  Axios com withCredentials e interceptor de 401.
  Zustand para estado do usuário autenticado.
  Páginas de login e register com React Hook Form + Zod.
  Layout (private) com verificação server-side do cookie."
```

---

### ─── ETAPA 9 — FRONTEND — FEATURES ──────────────────────────

**Objetivo:** Todas as telas funcionais conectadas à API.

```
Passos:
  [ ] 9.1  Implementar components/ui/ (Button, Input, Modal, Badge, Spinner, EmptyState)
  [ ] 9.2  Implementar components/layout/ (Sidebar, Header)
  [ ] 9.3  Implementar hooks/useLeads.ts + hooks/useInteractions.ts
  [ ] 9.4  Implementar app/(private)/leads/page.tsx
           (lista paginada + busca + filtro por status)
  [ ] 9.5  Implementar components/leads/LeadForm.tsx (criar + editar)
  [ ] 9.6  Implementar app/(private)/leads/[id]/page.tsx
           (detalhes + interações)
  [ ] 9.7  Instalar @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
  [ ] 9.8  Implementar app/(private)/kanban/page.tsx
           (4 colunas + drag and drop + optimistic update)
  [ ] 9.9  Implementar app/(private)/dashboard/page.tsx
           (4 cards de estatísticas + últimos leads)
  [ ] 9.10 Testar: todos os fluxos CRUD + drag and drop funcionando

Entregas desta etapa:
  ✓ Todo componente com estados: loading / error / empty
  ✓ Kanban com drag and drop (@dnd-kit) + PATCH de status na API
  ✓ Optimistic update no Kanban (reverte em caso de erro)
  ✓ Responsivo mobile-first
  ✓ Formulários com validação Zod client-side

Prompt para a IA:
  "Implemente o Kanban conforme Seção 11 usando @dnd-kit/core e @dnd-kit/sortable.
  Ao soltar um card em outra coluna: 1) atualizar estado local imediatamente,
  2) chamar PATCH /leads/:id/status, 3) reverter se der erro + exibir mensagem.
  TailwindCSS. TypeScript. Tratar loading, error e empty em todas as listas."
```

---

### ─── ETAPA 9b — TESTES E2E (Playwright) ─────────────────────────────────

**Objetivo:** Cobertura E2E dos fluxos críticos do frontend rodando em browser real.

```
Passos:
  [ ] 9b.1 Instalar @playwright/test + browsers:
           npm install -D @playwright/test
           npx playwright install chromium firefox
  [ ] 9b.2 Implementar playwright.config.ts (Seção 14b)
  [ ] 9b.3 Implementar e2e/fixtures/auth.fixture.ts
           (login reutilizável para todos os specs autenticados)
  [ ] 9b.4 Implementar e2e/auth.spec.ts
           - redirect /dashboard → /login sem auth
           - register → redireciona para dashboard
           - login com credenciais erradas → mensagem de erro
           - logout → redireciona para /login
  [ ] 9b.5 Implementar e2e/leads.spec.ts
           - criar lead → aparece na lista
           - ver detalhes → dados corretos
           - deletar → some da lista
  [ ] 9b.6 Implementar e2e/kanban.spec.ts
           - 4 colunas visíveis
           - mover card via select → aparece na coluna correta
  [ ] 9b.7 Implementar e2e/dashboard.spec.ts
           - cards de métricas visíveis
           - total de leads bate com a lista
  [ ] 9b.8 npm run test:e2e → todos os specs passando
  [ ] 9b.9 npm run test:e2e:report → verificar relatório HTML

Entregas desta etapa:
  ✓ playwright.config.ts com webServer (sobe Next.js automaticamente)
  ✓ Fixture de auth reutilizável entre specs
  ✓ Cobertura: auth, CRUD de leads, kanban, dashboard
  ✓ Testes rodando em Chromium, Firefox e mobile (iPhone 13)
  ✓ Screenshots automáticas em falha
  ✓ Configurado para CI (retries: 2, forbidOnly)

Prompt para a IA:
  "Implemente os testes E2E com Playwright conforme Seção 14b.
  Usar @playwright/test com TypeScript. Criar fixture authenticatedPage
  que faz login antes de cada teste. Cobrir: auth.spec.ts, leads.spec.ts,
  kanban.spec.ts e dashboard.spec.ts. playwright.config.ts deve usar
  webServer para subir o Next.js automaticamente. Testes devem funcionar
  com o banco de dados populado pelo seed (admin@teste.com / Admin@123)."
```

---

### ─── ETAPA 10 — DEPLOY ───────────────────────────────────────

**Objetivo:** Frontend no Vercel + Backend no Railway com PostgreSQL.

```
Passos:
  [ ] 10.1 FRONTEND (Vercel):
           - Push para GitHub
           - vercel.com → New Project → selecionar repo → Root: apps/frontend
           - Adicionar env: NEXT_PUBLIC_API_URL=https://seu-backend.railway.app/api/v1
           - Deploy → copiar URL do frontend

  [ ] 10.2 BACKEND (Railway):
           - railway.app → New Project → Deploy from GitHub
           - Selecionar repo → Root: apps/backend
           - Adicionar serviço MySQL (ou usar plugin MySQL do Railway) → copiar DATABASE_URL gerada
           - Adicionar envs: DATABASE_URL, JWT_SECRET, PORT=3001,
             CORS_ORIGIN=https://seu-frontend.vercel.app, NODE_ENV=production
           - Garantir start command: npx prisma migrate deploy && node dist/server.js

  [ ] 10.3 Atualizar CORS_ORIGIN no Railway com URL real do Vercel
  [ ] 10.4 Atualizar NEXT_PUBLIC_API_URL no Vercel com URL real do Railway
  [ ] 10.5 Testar fluxo completo em produção: register → login → criar lead

Entregas desta etapa:
  ✓ URL do frontend (Vercel) funcionando
  ✓ URL do backend (Railway) respondendo
  ✓ CORS configurado corretamente entre os dois domínios
  ✓ Migrations rodando automaticamente no deploy
```

---

### ─── ETAPA 11 — DOCUMENTAÇÃO E ENTREGA ──────────────────────

```
Passos:
  [ ] 11.1 Preencher /docs/ai/README.md
  [ ] 11.2 Preencher /docs/ai/prompts.md (incluir este PROMPT-MESTRE como Prompt 1)
  [ ] 11.3 Preencher /docs/ai/decisions.md (suas palavras)
  [ ] 11.4 Preencher /docs/ai/review.md
  [ ] 11.5 Escrever README.md principal completo (Seção 17)
  [ ] 11.6 Criar .env.example na raiz e em apps/backend
  [ ] 11.7 Revisão final do checklist OWASP (Seção 9)
  [ ] 11.8 Verificar .gitignore (nenhum .env commitado)
  [ ] 11.9 git log --oneline → revisar commits semânticos
  [ ] 11.10 Enviar convite para "rodrigoamb" no GitHub

Entregas finais:
  ✓ Link do repositório GitHub privado
  ✓ Convite enviado para rodrigoamb
  ✓ README com instruções de como rodar localmente
  ✓ .env.example preenchido
  ✓ /docs/ai/ com os 4 arquivos preenchidos
  ✓ (Bônus) Links de deploy Vercel + Railway
```

---

_Prompt criado por Arthur Bruno Araujo | arthur-brain | Mini CRM de Leads — Teste Técnico Full-Stack Jr_
