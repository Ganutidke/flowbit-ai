import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const totalSpendAgg = await prisma.invoice.aggregate({ _sum: { total: true } });
    const totalSpend = totalSpendAgg._sum.total ?? 0;

    const invoiceCount = await prisma.invoice.count();

    const docsUploaded = await prisma.invoice.count();

    const avg = invoiceCount ? totalSpend / invoiceCount : 0;

    return new Response(JSON.stringify({
      totalSpend,
      totalInvoices: invoiceCount,
      documentsUploaded: docsUploaded,
      averageInvoiceValue: avg
    }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal" }), { status: 500 });
  } finally {
    // await prisma.$disconnect();
  }
}
