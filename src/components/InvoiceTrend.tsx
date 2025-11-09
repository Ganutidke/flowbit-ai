"use client";

import { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Filler);

export default function InvoiceTrend() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/invoice-trends");
        const json = await res.json();

        const safe = json.map((r: any) => ({
          month: r.label ?? "Unknown",
          totalSpend: Number(r.totalSpend ?? 0),
          invoiceCount: Number(r.invoiceCount ?? 0),
        }));

        setData(safe);
      } catch (err) {
        console.error("Error fetching invoice trends:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <InvoiceTrendSkeleton/>;
  if (!data.length) return <div className="card p-4 h-64 text-center text-black">No trend data</div>;

  const labels = data.map((r) => r.month);
  const spend = data.map((r) => r.totalSpend);
  const count = data.map((r) => r.invoiceCount);

  const totalSpend = spend.reduce((a, b) => a + b, 0);
  const totalInvoices = count.reduce((a, b) => a + b, 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Spend (€)",
        data: spend,
        fill: true,
        borderColor: "#1B1464",
        backgroundColor: (ctx: any) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;
          if (!chartArea) return "rgba(79, 70, 229, 0.2)";
          const gradient = canvasCtx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "rgba(79, 70, 229, 0)");
          gradient.addColorStop(1, "rgba(79, 70, 229, 0.25)");
          return gradient;
        },
        tension: 0.5,
      },
      {
        label: "Invoice Count",
        data: count,
        borderColor: "#9896B1",
        borderDash: [4, 4],
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        yAxisID: "y2",
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#FFFFFF",
        titleColor: "#1C1C1C",
        bodyColor: "#1C1C1C",
        borderColor: "#E4E4E9",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (ctx: any) => `Month: ${ctx[0].label}`,
          label: (ctx: any) =>
            ctx.dataset.label.includes("Spend")
              ? `Total Spend: €${ctx.parsed.y.toLocaleString()}`
              : `Invoices: ${ctx.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#9CA3AF", font: { size: 12 } },
      },
      y: {
        type: "linear",
        position: "left",
        grid: { color: "rgba(255,255,255,0.05)", drawBorder: false },
        ticks: {
          color: "#9CA3AF",
          callback: (tickValue: string | number) => `€${Number(tickValue).toLocaleString()}`,
        },
      },
      y2: {
        type: "linear",
        position: "right",
        grid: { drawOnChartArea: false },
        ticks: { color: "#22C55E", callback: (tickValue: string | number) => `${tickValue}` },
      },
    },
  };

  return (
    <div className="border border-[#e4e4e7] rounded-[8px] bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-center p-4 pb-2">
        <div>
          <h3 className="text-base font-semibold text-[#1b1b1b]">
            Invoice Volume + Value Trend
          </h3>
          <p className="text-xs font-medium text-[#64748b]">
            Invoice count and total spend over 12 months.
          </p>
        </div>

        
      </div>

      <div className="h-[320px] p-2">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
}


import { Skeleton } from "@/components/ui/skeleton";

export function InvoiceTrendSkeleton() {
  return (
    <div className="border border-[#e4e4e7] rounded-[8px] bg-white shadow-sm">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center p-4 pb-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-48 bg-gray-300/60" /> {/* Title */}
          <Skeleton className="h-3 w-32 bg-gray-300/60" /> {/* Subtitle */}
        </div>
      </div>

      {/* Chart Skeleton */}
      <div className="p-2">
        <Skeleton className="h-[320px] w-full rounded-md bg-gray-300/60" />
      </div>
    </div>
  );
}
