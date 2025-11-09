import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  const vannaURL = "https://bigquery.vanna.ai/api/v0/chat_sse";

  try {
    const response = await fetch(vannaURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "VANNA-API-KEY": process.env.VANNA_API_KEY!,
      },
      body: JSON.stringify({
        message: query,
        user_email: "gtidke332@gmail.com",
        agent_id: "flowbitaitracker",
        acceptable_responses: ["text", "sql", "dataframe", "image"],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("❌ Vanna Error:", errText);
      return new Response(
        JSON.stringify({ error: "Vanna API request failed", detail: errText }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Stream back the SSE response directly to frontend
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        const reader = response.body!.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          controller.enqueue(value);
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err: any) {
    console.error("⚠️ Error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to connect to Vanna", detail: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
