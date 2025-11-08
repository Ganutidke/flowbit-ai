
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';

import StatsCards from "@/components/StatsCards";
import InvoiceTrend from "@/components/InvoiceTrend";
import VendorBar from "@/components/VendorBar";
import CategoryPie from "@/components/CategoryPie";
import InvoiceTable from "@/components/InvoiceTable";
import CashOutflowForecast from "@/components/CashOutflowForecast";

export default async function DashboardPage() {
  const statsRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || ''}/api/stats`, { cache: 'no-store' });
  const stats = await statsRes.json();

  return (
    <div className="flex min-h-screen w-full bg-[#fafafa]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex flex-col flex-1 lg:ml-[15%] w-full min-h-screen">
        <Header />

        <main className="p-6 space-y-6">
          {/* Top Stats Cards */}
          <StatsCards data={stats} />

          {/* Row 1: Invoice Trend + Vendor Bar */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6">
              <InvoiceTrend />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <VendorBar />
            </div>
          </div>

          {/* Row 2: Spend by Category + Cash Outflow + Invoices by Vendor */}
          <div className="grid grid-cols-15 gap-6">
            <div className="col-span-15 lg:col-span-4">
              <CategoryPie />
            </div>
            <div className="col-span-15 lg:col-span-5">
              <CashOutflowForecast />
            </div>
            <div className="col-span-15 lg:col-span-6">
              <InvoiceTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
