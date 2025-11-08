import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function normalizeRow(row: any) {
  const out: any = {};
  for (const [k, v] of Object.entries(row)) {
    // convert BigInt to Number
    if (typeof v === "bigint") {
      out[k] = Number(v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

export async function GET() {
  try {
    const rows: any[] = await prisma.$queryRaw`
      SELECT v.name as vendor, SUM(i.total) as spend, COUNT(i.id) AS invoice_count
      FROM "Invoice" i
      LEFT JOIN "Vendor" v ON v.id = i."vendorId"
      GROUP BY v.name
      ORDER BY spend DESC
      LIMIT 10;
    `;

    const safe = rows.map(normalizeRow);

    return new Response(JSON.stringify(safe), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal" }), { status: 500 });
  }
}
