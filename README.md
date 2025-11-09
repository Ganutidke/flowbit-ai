# Flowbit AI Analytics Dashboard

## 🧠 Overview
Production-ready analytics dashboard with AI chat integration.

## 🚀 Tech Stack
- Next.js 15 (App Router)
- TailwindCSS + ShadCN/UI
- Chart.js
- PostgreSQL + Prisma
- Vanna AI + Groq (Self-hosted)

## 🧱 Architecture
[Insert diagram or short explanation of data flow: Frontend → API → Vanna → SQL → DB → UI]

## ⚙️ Setup
1. Clone repo
2. Add `.env` with keys:
```
DATABASE_URL=
NEXT_PUBLIC_API_BASE=/api
VANNA_API_URL=https://bigquery.vanna.ai/api/v0/chat_sse

VANNA_API_KEY=

````
3. Run:
```bash
npm install
npm run dev

```
## 🌐 Access at http://localhost:3000

📊 Features

1. Dashboard with charts and stats

2. AI chat with SQL generation

3. Responsive UI

4. Inline skeletons for smooth UX

## Demo