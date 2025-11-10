# Flowbit Analytics Dashboard — Project Documentation

This repository contains the full-stack implementation of **Flowbit Analytics Dashboard**, a data-driven web application built as part of the **Full Stack Developer Internship Assignment** at **Flowbit Private Limited**.

It features:
- A real-time **Analytics Dashboard**
- A **“Chat With Data”** module powered by **Vanna AI**
- A fully connected **PostgreSQL + Prisma** backend
- Deployed on **Vercel** with live API integration

---

## ⚙️ Setup Steps

### 🧱 1. Clone the Repository
```bash
git clone https://github.com/Ganutidke/flowbit-ai.git
cd flowbit-ai
````

### 🪄 2. Install Dependencies

This project is built as a **Turborepo monorepo** with the following structure:

| Path        | Technology            | Description                                 |
| ----------- | --------------------- | ------------------------------------------- |
| `/apps/`    | Next.js 15            | Frontend application                        |
| `/apps/api` | Next.js API / Express | Backend APIs                                |
| `/prisma`   | Prisma ORM            | Database schema, migrations, and seed       |
| `/data`     | JSON                  | Source dataset (`Analytics_Test_Data.json`) |

Install dependencies:

```bash
pnpm install
# or
npm install
```

---

### 🧩 3. Setup Environment Variables

Create `.env` files at both root and service levels.

| Variable                | Description                                 |
| ----------------------- | ------------------------------------------- |
| `DATABASE_URL`          | PostgreSQL connection string                |
| `NEXT_PUBLIC_API_BASE`  | Base path for frontend API calls            |
| `VANNA_API_KEY`         | Vanna AI Service API Key                    |
| `VANNA_API_URL`         | `https://bigquery.vanna.ai/api/v0/chat_sse` |
| `VANNA_CONNECTION_NAME` | Vanna connection name                       |

Example:

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require
NEXT_PUBLIC_API_BASE=/api
VANNA_API_URL=https://bigquery.vanna.ai/api/v0/chat_sse
VANNA_API_KEY=vn-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
VANNA_CONNECTION_NAME=flowbitaitracker
```

---

### 🗃️ 4. Setup Database

Run migrations and seed the JSON dataset into PostgreSQL.

```bash
pnpm prisma migrate deploy
pnpm prisma db seed
```

This will normalize and insert data from `Analytics_Test_Data.json` into relational tables:

* `Vendor`
* `Invoice`
* `Payment`
* `LineItem`

---

### 🚀 5. Run the Application

| Action               | Command          |
| -------------------- | ---------------- |
| Development          | `pnpm run dev`   |
| Build for Production | `pnpm run build` |
| Start Production     | `pnpm start`     |

Ensure the Vanna service is reachable at:
👉 `https://bigquery.vanna.ai/api/v0/chat_sse`

---

### ☁️ 6. Deployment

| Component            | Platform        |
| -------------------- | --------------- |
| **Frontend & API**   | Vercel          |
| **Vanna AI Service** | Vanna AI        |
| **Database**         | Neon PostgreSQL |

---

## 🔗 API Documentation

All API endpoints return JSON responses and follow REST conventions.
**Base URL:** `https://flowbit-ai-five.vercel.app/api`

| Endpoint              | Method | Description                                                              | Example Response                                                    |
| --------------------- | ------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| `/api/stats`          | `GET`  | Returns top-level metrics (total spend, total invoices, avg value, etc.) | `{ "totalSpend": 350000, "totalInvoices": 420, "avgInvoice": 850 }` |
| `/api/invoice-trends` | `GET`  | Monthly invoice trend for line chart                                     | `[ { "label": "Jan", "totalSpend": 50000, "invoiceCount": 40 } ]`   |
| `/api/vendors/top10`  | `GET`  | Top 10 vendors by spend                                                  | `[ { "vendor": "ABC Ltd", "spend": 12000, "invoice_count": 4 } ]`   |
| `/api/category-spend` | `GET`  | Spend grouped by category                                                | `[ { "category": "Software", "spend": 45000 } ]`                    |
| `/api/cash-outflow`   | `GET`  | Expected payment obligations grouped by due range                        | `[ { "range": "0–30 days", "total": 12000 } ]`                      |
| `/api/invoices`       | `GET`  | Paginated list of invoices                                               | `{ "items": [ { "id": 1, "vendor": "XYZ", "total": 2000 } ] }`      |
| `/api/chat-with-data` | `POST` | Handles natural language queries via Vanna AI                            | `{ "sql": "SELECT ...", "results": [...], "chart": "https://..." }` |

---

## 💬 "Chat With Data" Workflow

### 🔹 1. User Query (Frontend)

User types a natural question such as:

```
List top 5 vendors by spend
```

Frontend sends a POST request to `/api/chat-with-data`:

```json
{ "query": "List top 5 vendors by spend" }
```

---

### 🔹 2. Backend API Proxy

`/api/chat-with-data` receives the query and forwards it to the self-hosted Vanna endpoint:

```
https://bigquery.vanna.ai/api/v0/chat_sse
```

With headers:

```json
{
  "VANNA-API-KEY": "<your_key>",
  "Content-Type": "application/json"
}
```

---

### 🔹 3. Vanna AI (Python + Groq)

Vanna interprets the query using the Groq LLM model and generates an SQL query, e.g.:

```sql
SELECT "Vendor"."name", SUM("Invoice"."total") AS total_spent
FROM "Vendor"
JOIN "Invoice" ON "Vendor"."id" = "Invoice"."vendorId"
GROUP BY "Vendor"."name"
ORDER BY total_spent DESC
LIMIT 5;
```

It executes the query on the PostgreSQL database and streams the output as JSON events (`text`, `sql`, `dataframe`, `image`).

---

### 🔹 4. Frontend Response Rendering

The React client listens to the streamed response in real-time and dynamically updates:

* ✅ Generated SQL
* ✅ Data Table (JSON dataframe)
* ✅ Chart (image URL)
* ✅ Streaming text messages

Example event:

```json
{
  "type": "dataframe",
  "json_table": {
    "fields": ["name", "total_spent"],
    "data": [
      { "name": "ABC Seller", "total_spent": 28202.88 },
      { "name": "XYZ Corp", "total_spent": 11360.00 }
    ]
  }
}
```

---

### 🔹 5. Display Output

Frontend renders:

* 💬 Chat bubble with AI explanation
* 🧠 Code block showing SQL query
* 📊 Interactive results table
* 🖼️ Chart image fetched from Vanna’s `/img/<id>_chart.png` endpoint

---

## 🧠 Summary

      ✅ Production-ready Next.js Dashboard
      ✅ PostgreSQL + Prisma backend
      ✅ AI-powered query system using Vanna AI
      ✅ Real-time streaming responses
      ✅ Fully responsive & deployed on Vercel

---

### 👨‍💻 Built With

* **Next.js 15 (App Router)**
* **TypeScript**
* **TailwindCSS + shadcn/ui**
* **Prisma ORM**
* **PostgreSQL (Neon)**
* **Chart.js**
* **Vanna AI**
* **Vercel Deployment**

---
