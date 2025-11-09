"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Square } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  type?: string;
  sql?: string;
  image_url?: string;
  table?: any;
}

export default function ChatWithData() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!query.trim() || loading) return;

    const newMsg: Message = { role: "user", content: query };
    setMessages((prev) => [...prev, newMsg]);
    setQuery("");
    setLoading(true);

    const controller = new AbortController();
    controllerRef.current = controller;

    const res = await fetch("/api/chat-with-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
      signal: controller.signal,
    });

    if (!res.ok) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error fetching response." },
      ]);
      setLoading(false);
      return;
    }

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let assistantMsg: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMsg]); 

    if (!reader) return;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n").filter((l) => l.startsWith("data:"));
      for (const line of lines) {
        try {
          const json = JSON.parse(line.replace("data:", "").trim());

          if (json.type === "text") {
            assistantMsg.content += "\n" + json.text;
          } else if (json.type === "sql") {
            assistantMsg.sql = json.query;
          } else if (json.type === "dataframe") {
            assistantMsg.table = json.json_table;
          } else if (json.type === "image") {
            assistantMsg.image_url = json.image_url;
          } else if (json.type === "end") {
            setLoading(false);
            return;
          }

          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { ...assistantMsg };
            return updated;
          });
        } catch (err) {
          console.warn("Parse error:", err);
        }
      }
    }

    setLoading(false);
  };

  const stopStreaming = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⏹️ Generation stopped." },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white border rounded-xl shadow-sm">
      <div className="px-4 py-3 border-b">
        <h2 className="text-lg font-semibold text-[#1B1464]">
          💬 Chat with Data
        </h2>
      </div>

      <ScrollArea className="flex-1 p-4 space-y-5 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <Card
              className={`max-w-[80%] p-3 shadow-sm my-4 transition-all duration-300 ${
                msg.role === "user"
                  ? "bg-[#1B1464] text-white rounded-tr-none"
                  : "bg-gray-50 border border-gray-200 rounded-tl-none"
              }`}
            >
              <div className="text-sm whitespace-pre-wrap">{msg.content}</div>

              {msg.sql && (
                <pre className="bg-gray-100 text-gray-800 text-xs p-2 mt-3 rounded-md border overflow-x-auto">
                  {msg.sql}
                </pre>
              )}

              {msg.table && (
                <div className="overflow-x-auto mt-3 border rounded-md">
                  <table className="text-xs w-full border-collapse">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        {msg.table.schema.fields.map((f: any) => (
                          <th key={f.name} className="p-2 text-left">
                            {f.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {msg.table.data.map((row: any, j: number) => (
                        <tr key={j} className="border-b last:border-none">
                          {Object.values(row).map((val: any, k) => (
                            <td key={k} className="p-2 text-gray-700">
                              {String(val)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {msg.image_url && (
                <img
                  src={msg.image_url}
                  alt="Vanna Chart"
                  className="rounded-lg mt-3 border"
                />
              )}
            </Card>
          </div>
        ))}
        <div ref={scrollRef} />
      </ScrollArea>

      <div className="border-t px-4 py-3 flex items-center gap-2 bg-white">
        <Input
          placeholder="Ask something like: 'Top 5 vendors by spend'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
          className="flex-1"
        />

        {!loading ? (
          <Button
            onClick={handleSend}
            className="bg-[#1B1464] hover:bg-[#130f45] text-white"
          >
            Send
          </Button>
        ) : (
          <Button
            onClick={stopStreaming}
            className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
          >
            <Square size={14} />
            Stop
          </Button>
        )}
      </div>
    </div>
  );
}
