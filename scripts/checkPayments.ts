import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const payments = await prisma.payment.findMany({
    take: 10,
    select: { id: true, dueDate: true, discountedTotal: true },
  });
  console.log("🧾 Sample payments:", payments);
}
main();
