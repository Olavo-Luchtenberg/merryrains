#!/usr/bin/env node
/**
 * Libera acesso ao livro manualmente (para compras já feitas antes do webhook)
 * Uso: node scripts/liberar-compra.js email@exemplo.com
 */

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
  const email = process.argv[2]
  if (!email || !email.includes("@")) {
    console.error("Uso: node scripts/liberar-compra.js email@exemplo.com")
    process.exit(1)
  }

  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
    include: { purchase: true },
  })

  if (!user) {
    console.error("Usuário não encontrado:", email)
    process.exit(1)
  }

  if (user.purchase) {
    console.log("✅ Este usuário já possui acesso ao livro.")
    process.exit(0)
  }

  await prisma.purchase.create({
    data: {
      userId: user.id,
      email: user.email,
      paymentId: "manual-" + Date.now(),
    },
  })

  console.log("✅ Acesso liberado para:", email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
