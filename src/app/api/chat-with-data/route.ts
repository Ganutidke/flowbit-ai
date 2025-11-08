// app/api/chat-with-data/route.ts
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query } = body;
    const VANNA = process.env.VANNA_API_BASE_URL;
    if (!VANNA) return new Response(JSON.stringify({ error: "VANNA not configured" }), { status: 500 });

    const r = await fetch(`${VANNA}/parse-sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VANNA_API_KEY || ''}`
      },
      body: JSON.stringify({ query })
    });

    const data = await r.json();
    // Expected Vanna response: { sql: "...", params: [], run: true/false }
    // If Vanna returns SQL, we optionally execute it against postgres (danger: validate)
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'internal' }), { status: 500 });
  }
}
