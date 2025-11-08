// app/api/cash-outflow/route.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const result = await prisma.$queryRawUnsafe(`
      SELECT 
        range,
        COALESCE(SUM("discountedTotal"), 0) AS total
      FROM (
        SELECT 
          CASE
            WHEN "dueDate" < NOW() THEN 'Overdue'
            WHEN "dueDate" <= NOW() + INTERVAL '7 days' THEN '0–7 days'
            WHEN "dueDate" <= NOW() + INTERVAL '30 days' THEN '8–30 days'
            WHEN "dueDate" <= NOW() + INTERVAL '60 days' THEN '31–60 days'
            ELSE '60+ days'
          END AS range,
          "discountedTotal"
        FROM "Payment"
        WHERE "discountedTotal" IS NOT NULL
      ) grouped
      GROUP BY range
      ORDER BY 
        CASE range
          WHEN 'Overdue' THEN 1
          WHEN '0–7 days' THEN 2
          WHEN '8–30 days' THEN 3
          WHEN '31–60 days' THEN 4
          ELSE 5
        END;
    `);

    const formatted = Array.isArray(result)
      ? result.map((r: any) => ({
          range: r.range,
          total: Number(r.total ?? 0),
        }))
      : [];

    return new Response(JSON.stringify(formatted), { status: 200 });
  } catch (err) {
    console.error("❌ Cash-outflow API error:", err);
    return new Response(JSON.stringify({ error: "Query failed", details: err }), { status: 500 });
  }
}
