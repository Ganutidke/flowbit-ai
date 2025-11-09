"use client";

import { Indicator } from "@radix-ui/react-checkbox";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatsCards({ data }: any) {
  const metrics = [
    {
      title: "Total Spend",
      subtitle: "(YTD)",
      value: `€ ${Number(data.totalSpend || 0).toLocaleString()}`,
      change: data.spendChange || 0,
      positive: true,
      color: "#43b077",
      indicator: "/images/img_group_68.svg",
    },
    {
      title: "Total Invoices Processed",
      subtitle: "All Time",
      value: data.totalInvoices || 0,
      change: data.invoicesChange || 0,
      positive: true,
      color: "#2e9f02",
      indicator: "/images/img_group_68.svg",
    },
    {
      title: "Documents Uploaded",
      subtitle: "This Month",
      value: data.documentsUploaded || 0,
      change: data.documentsChange || 0,
      positive: data.documentsChange >= 0 ? true : false,
      color: data.documentsChange >= 0 ? "#2e9f02" : "#ed1c24",
      indicator: "/images/img_group_68_red_700.svg",
    },
    {
      title: "Average Invoice Value",
      subtitle: "Per Invoice",
      value: `€ ${Number(data.averageInvoiceValue || 0).toLocaleString()}`,
      change: data.averageChange || 0,
      positive: true,
      color: "#2f9f02",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="relative flex flex-col justify-between border border-[#e4e4e7] rounded-[8px] bg-white p-4 transition-all hover:shadow-md"
        >
          {/* Title + Subtitle */}
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-[#000000]">
              {metric.title}
            </span>
            {metric.subtitle && (
              <span className="text-xs font-medium text-[#64748b]">
                {metric.subtitle}
              </span>
            )}
          </div>

          {/* Value */}
          <div className="mt-6 flex items-end justify-between w-full ">
            <div>
              <div className="text-[20px] font-semibold text-[#000000]">
                {metric.value}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`text-xs font-semibold ${
                    metric.positive ? "text-[#2f9f02]" : "text-[#ed1c24]"
                  }`}
                >
                  {metric.positive ? "+" : "-"}
                  {Math.abs(metric.change).toFixed(1)}%
                </span>
                <span className="text-xs text-[#8497b2]">from last month</span>
              </div>
            </div>

            {/* Mini Graph Placeholder (can replace later) */}
            {metric.indicator && (
              <img src={metric.indicator} alt="Mini Graph Placeholder" className="" />            
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
