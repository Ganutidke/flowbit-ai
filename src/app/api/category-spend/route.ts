import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function normalizeBigInt(obj: any) {
  const out: any = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k] = typeof v === "bigint" ? Number(v) : v;
  }
  return out;
}

export async function GET() {
  try {
    const rows: any[] = await prisma.$queryRaw`
      SELECT COALESCE(li."description", 'Uncategorized') AS category,
             SUM(li."totalPrice") as spend
      FROM "LineItem" li
      GROUP BY category
      ORDER BY spend DESC;
    `;

    const safe = rows.map(normalizeBigInt);
    return new Response(JSON.stringify(safe), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
