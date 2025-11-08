import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  // last 12 months monthly invoice count & spend
  const now = new Date();
  const months = Array.from({ length: 12 }).map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
    return { year: d.getFullYear(), month: d.getMonth() + 1, label: d.toLocaleString('default', { month: 'short' }) };
  });

  const results = await Promise.all(months.map(async (m) => {
    const start = new Date(m.year, m.month - 1, 1);
    const end = new Date(m.year, m.month - 1 + 1, 1);
    const agg = await prisma.invoice.aggregate({
      where: { invoiceDate: { gte: start, lt: end } },
      _count: { _all: true },
      _sum: { total: true }
    });
    return {
      label: m.label,
      invoiceCount: agg._count._all ?? 0,
      totalSpend: agg._sum.total ?? 0
    };
  }));

  return new Response(JSON.stringify(results), { status: 200 });
}
