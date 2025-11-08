"use client";

import { useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function CashOutflowForecast() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/cash-outflow");
        const json = await res.json();

        const formatted = json.map((item: any) => ({
          range: item.range,
          total: Number(item.total ?? 0),
        }));

        setData(formatted);
      } catch (err) {
        console.error("Error fetching outflow forecast:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="card p-4 h-64">Loading...</div>;
  if (!data.length) return <div className="card p-4 h-64">No forecast data</div>;

  const labels = data.map((r) => r.range);
  const totals = data.map((r) => r.total);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Expected Outflow (€)",
        data: totals,
        backgroundColor: "#1B1464",
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 10, right: 10, bottom: 10, left: 10 },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1B1464",
        titleColor: "#fff",
        bodyColor: "#f9fafb",
        displayColors: false,
        padding: 10,
        callbacks: {
          label: (ctx: any) => `€${ctx.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#64748B",
          font: { size: 12 },
          maxRotation: 40,
          minRotation: 40,
        },
      },
      y: {
        grid: {
          color: "#F3F4F6",
          drawBorder: false,
        },
        ticks: {
          color: "#64748B",
          font: { size: 12 },
          callback: (value: any) => `€${value.toLocaleString()}`,
        },
      },
    },
    elements: {
      bar: {
        borderSkipped: false,
      },
    },
  };

  return (
    <div className="border border-[#e4e4e7] max-h-[437px] h-full justify-between rounded-[12px] bg-white p-4 flex flex-col items-start shadow-sm hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col justify-start items-start w-full mb-3">
        <h3 className="text-sm font-semibold text-[#1b1b1b]">
          Cash Outflow Forecast
        </h3>
        <p className="text-xs font-medium text-[#64748b]">
          Expected payment obligations grouped by due date ranges.
        </p>
      </div>

      {/* Chart container */}
      <div className="relative w-full h-[280px] overflow-hidden">
        {/* ✅ Properly aligned background bars */}
        {/* <div
          className="absolute left-[76px]  inset-x-9 bottom-[38px] flex justify-between"
          style={{ top: "15px" }}
        >
          {data.map((_, i) => (
            <div
              key={i}
              className="flex-1 mx-2 bg-[#F3F4F6] rounded-t-[10px]"
              style={{
                height: "calc(100% - 40px)", // prevents overflow
                maxWidth: "40px",
              }}
            ></div>
          ))}
        </div> */}

        {/* Foreground Chart */}
        <div className="relative w-full h-full z-10">
          <Bar ref={chartRef} data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
}
