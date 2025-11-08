// components/ChatWithData.tsx
"use client";
import { useState } from "react";
export default function ChatWithData(){
  const [q, setQ] = useState("");
  const [resp, setResp] = useState<any>(null);
  const submit = async () => {
    setResp(null);
    const r = await fetch('/api/chat-with-data', {
      method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ query: q })
    });
    const d = await r.json();
    setResp(d);
  };

  return (
    <div className="card p-4">
      <div className="mb-2">Chat with Data</div>
      <textarea value={q} onChange={e=>setQ(e.target.value)} className="w-full h-24 p-2 border" />
      <div className="flex gap-2 mt-2">
        <button className="btn" onClick={submit}>Ask</button>
      </div>
      {resp && <pre className="mt-3 text-sm">{JSON.stringify(resp, null, 2)}</pre>}
    </div>
  );
}
