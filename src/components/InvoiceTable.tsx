"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";

export default function InvoiceTable() {
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/invoices?page=${page}&pageSize=10`)
      .then((r) => r.json())
      .then((d) => setRows(d.items || []))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="border border-[#e4e4e7] max-h-[437px] h-full rounded-[8px] bg-white shadow-sm flex flex-col">
      <div className="flex flex-col gap-[2px] mb-3  p-4">
        <h3 className="text-sm font-semibold text-[#1b1b1b]">
          Invoices by Vendor
        </h3>
        <p className="text-xs font-medium text-[#64748b]">
          Top vendors by invoice count and net value.
        </p>
      </div>

      {loading ? (
        <InvoiceTableSkeleton />
      ) : (
        <div className="flex flex-col overflow-hidden rounded-[6px] border border-[#e4e4e7]">
          <div className="flex justify-between items-center bg-[#f6f6f7] border-b border-[#e4e4e7] px-3 py-2 text-xs font-medium text-[#1b1b1b]">
            <div className="w-[35%]">Vendor</div>
            <div className="w-[25%]"># Invoices</div>
            <div className="w-[30%] text-right pr-2">Net Value</div>
          </div>

          <div
            className="max-h-[360px] overflow-y-auto overflow-x-hidden"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {rows.length === 0 ? (
              <div className="text-sm text-gray-500 p-4 text-center">
                No invoices found.
              </div>
            ) : (
              rows.map((r: any, index) => (
                <div
                  key={r.id || index}
                  className="flex justify-between items-center border-b border-[#e4e4e7] px-3 py-2 hover:bg-[#f9fafb] transition-all duration-150"
                >
                  <div className="w-[35%] text-xs text-[#1b1b1b] font-medium truncate">
                    {r.vendor?.name ?? "—"}
                  </div>
                  <div className="w-[25%] text-xs text-[#1b1b1b] font-normal">
                    {new Date(r.invoiceDate).toLocaleDateString()}
                  </div>
                  <div className="w-[30%] text-right text-xs text-[#1b1b1b] font-normal pr-2">
                    <Badge
                      variant={"default"}
                      className="w-full rounded bg-white text-black border border-[#E4E4E7] text-start"
                    >
                      € {Number(r.total ?? 0).toLocaleString()}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Pagination Buttons */}
      {/* <div className="flex justify-end items-center gap-2 mt-3">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1.5 text-xs border border-[#e4e4e7] rounded hover:bg-gray-50 transition-all"
        >
          Prev
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1.5 text-xs border border-[#e4e4e7] rounded hover:bg-gray-50 transition-all"
        >
          Next
        </button>
      </div> */}
    </div>
  );
}

export function InvoiceTableSkeleton() {
  return (
    <div className="border border-[#e4e4e7] max-h-[437px] h-full rounded-[8px] bg-white shadow-sm flex flex-col">
      <div className="flex flex-col overflow-hidden rounded-[6px] border border-[#e4e4e7]">
        <div className="flex justify-between items-center bg-[#f6f6f7] border-b border-[#e4e4e7] px-3 py-2 text-xs font-medium text-[#1b1b1b]">
          <Skeleton className="h-3 w-[35%]" />
          <Skeleton className="h-3 w-[25%]" />
          <Skeleton className="h-3 w-[30%]" />
        </div>

        <div className="max-h-[360px] overflow-y-auto px-3 py-2 space-y-2">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b border-[#e4e4e7] py-2"
            >
              <Skeleton className="h-3 w-[35%]" />
              <Skeleton className="h-3 w-[25%]" />
              <Skeleton className="h-3 w-[30%]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
