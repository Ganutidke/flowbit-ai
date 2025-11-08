"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function VendorBar() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/vendors/top10");
        const json = await res.json();
        // normalize values (in case backend returns BigInt)
        const safe = json.map((r: any) => ({
          vendor: r.vendor ?? "Unknown",
          spend: Number(r.spend ?? 0),
          invoice_count: Number(r.invoice_count ?? 0),
        }));
        setData(safe);
      } catch (err) {
        console.error("Failed to fetch vendors", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="card p-4 h-64 ">Loading...</div>;
  if (!data.length) return <div className="card p-4 h-64">No vendor data</div>;

  const labels = data.map((v) => v.vendor);
  const spends = data.map((v) => v.spend);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Vendor Spend",
        data: spends,
        borderRadius: 6,
        backgroundColor: "rgba(27, 20, 100, 0.26)",
        hoverBackgroundColor: "#1B1464",
        barThickness: 18,
      },
    ],
  };

  const options: any = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#ffffff",
        titleColor: "#1C1C1C",
        bodyColor: "#1C1C1C",
        padding: 10,
        displayColors: false,
        callbacks: {
          title: (ctx: any) => `${ctx[0].label}`,
          label: (ctx: any) => `Vendor Spend: ${ctx.parsed.x.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#6B7280",
          font: { size: 12 },
          callback: (value: any) => `${value}`,
        },
      },
      y: {
        grid: { display: false },
        ticks: {
          color: "#666666",
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <div className="border border-[#e4e4e7]  rounded-[8px] bg-white shadow-sm hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center p-4 pb-2">
        <div>
          <h3 className="text-base font-semibold text-[#1B1464]">
            Spend by Vendor (Top 10)
          </h3>
          <p className="text-xs font-medium text-[#64748b]">
            Vendor spend with cumulative percentage distribution.{" "}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 px-3 pb-4">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
