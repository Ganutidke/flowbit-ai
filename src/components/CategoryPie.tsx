"use client";

import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryPie() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/category-spend");
        const json = await res.json();

        // Normalize and safely convert values
        const safe = json.map((r: any) => ({
          category: r.category ?? "Uncategorized",
          spend: Math.abs(Number(r.spend ?? 0)),
        }));

        setData(safe);
      } catch (err) {
        console.error("Error fetching category data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="card p-4 h-64">Loading...</div>;
  if (!data.length) return <div className="card p-4 h-64">No category data</div>;

  const labels = data.map((c) => c.category.slice(0, 20));
  const spends = data.map((c) => c.spend);

  // Brand palette colors
  const colors = [
    "#2B4DED",
    "#F79661",
    "#FFD1A7",
    "#9CA3AF",
    "#C4C6FA",
  ].slice(0, data.length);

  const chartData = {
    labels,
    datasets: [
      {
        data: spends,
        backgroundColor: colors,
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const options: any = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1B1464",
        titleColor: "#fff",
        bodyColor: "#f9fafb",
        displayColors: false,
        padding: 10,
        callbacks: {
          title: (ctx: any) => ctx[0].label,
          label: (ctx: any) => `Spend: $${ctx.parsed.toLocaleString()}`,
        },
      },
    },
  };

  // Data slicing logic for “View More”
  const visibleItems = expanded ? data : data.slice(0, 3);

  return (
    <div className="border border-[#e4e4e7] max-h-[440px]  rounded-[12px] bg-white p-4 flex flex-col items-center shadow-sm hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col justify-start items-start w-full mb-3">
        <h3 className="text-sm font-semibold text-[#1b1b1b]">
          Spend by Category
        </h3>
        <p className="text-xs font-medium text-[#64748b]">
          Distribution of spending across different categories.
        </p>
      </div>

      {/* Donut Chart */}
      <div className="relative w-[180px] h-[180px] my-4">
        <Doughnut data={chartData} options={options} />
      </div>

      {/* Scrollable Category List */}
      <div className="flex flex-col gap-3 w-full max-h-[160px] overflow-y-auto px-1 custom-scrollbar">
        {visibleItems.map((cat, i) => (
          <div
            key={i}
            className="flex justify-between items-center text-sm font-medium text-[#1b1b1b]"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[i % colors.length] }}
              ></div>
              <span>{cat.category}</span>
            </div>
            <span className="text-[#1b1b1b]">
              ${cat.spend.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* View More / View Less Button */}
      {data.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-xs font-medium text-[#2B4DED] hover:underline transition-all"
        >
          {expanded ? "View Less" : "View More"}
        </button>
      )}
    </div>
  );
}
