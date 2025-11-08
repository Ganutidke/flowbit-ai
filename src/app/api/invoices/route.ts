import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
  const q = url.searchParams.get('q') || '';
  const sortBy = url.searchParams.get('sortBy') || 'invoiceDate';
  const sortDir = url.searchParams.get('sortDir') === 'desc' ? 'desc' : 'asc';

  const where: any = {};
  if (q) {
    where.OR = [
      { invoiceNumber: { contains: q, mode: 'insensitive' } },
      { status: { contains: q, mode: 'insensitive' } },
      { vendor: { name: { contains: q, mode: 'insensitive' } } },
      { customer: { name: { contains: q, mode: 'insensitive' } } }
    ];
  }

  const [items, total] = await Promise.all([
    prisma.invoice.findMany({
      where,
      include: { vendor: true, customer: true },
      orderBy: { [sortBy]: sortDir },
      skip: (page - 1) * pageSize,
      take: pageSize
    }),
    prisma.invoice.count({ where })
  ]);

  return new Response(JSON.stringify({
    items,
    total,
    page,
    pageSize
  }), { status: 200 });
}
