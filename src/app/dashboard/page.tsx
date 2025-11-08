// 'use client';
// import { useState, useEffect } from 'react';
//  import Header from '@/components/common/Header';
//  import Sidebar from'@/components/common/Sidebar';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// interface MetricData {
//   totalSpend: string;
//   totalInvoices: number;
//   documentsUploaded: number;
//   averageInvoiceValue: string;
//   spendChange: string;
//   invoicesChange: string;
//   documentsChange: string;
//   averageChange: string;
// }

// interface VendorData {
//   vendor: string;
//   invoiceDate: string;
//   netValue: string;
// }

// interface CategoryData {
//   name: string;
//   value: number;
//   color: string;
// }

// interface TrendData {
//   month: string;
//   invoiceCount: number;
//   totalSpend: number;
// }

// interface OutflowData {
//   range: string;
//   amount: number;
// }

// export default function DashboardPage() {
//   const [metricsData, setMetricsData] = useState<MetricData>({
//     totalSpend: '€ 12.679,25',
//     totalInvoices: 64,
//     documentsUploaded: 17,
//     averageInvoiceValue: '€ 2.455,00',
//     spendChange: '+8.2%',
//     invoicesChange: '+8.2%',
//     documentsChange: '-8',
//     averageChange: '+8.2%'
//   })

//   const [vendorData, setVendorData] = useState<VendorData[]>([])
//   const [categoryData, setCategoryData] = useState<CategoryData[]>([])
//   const [trendData, setTrendData] = useState<TrendData[]>([])
//   const [outflowData, setOutflowData] = useState<OutflowData[]>([])
//   const [loading, setLoading] = useState<boolean>(true)

//   useEffect(() => {
//     loadDashboardData()
//   }, [])

//   const loadDashboardData = async (): Promise<void> => {
//     try {
//       // Simulate API call with setTimeout
//       setTimeout(() => {
//         setVendorData([
//           { vendor: 'Phunix GmbH', invoiceDate: '19.08.2025', netValue: '€ 736.78.44,00' },
//           { vendor: 'Phunix GmbH', invoiceDate: '19.08.2025', netValue: '€ 736.78.44,00' },
//           { vendor: 'Phunix GmbH', invoiceDate: '19.08.2025', netValue: '€ 736.78.44,00' },
//           { vendor: 'Phunix GmbH', invoiceDate: '19.08.2025', netValue: '€ 736.78.44,00' },
//           { vendor: 'Phunix GmbH', invoiceDate: '19.08.2025', netValue: '€ 736.78.44,00' },
//           { vendor: 'Phunix GmbH', invoiceDate: '19.08.2025', netValue: '€ 736.78.44,00' },
//           { vendor: 'Phunix GmbH', invoiceDate: '19.08.2025', netValue: '€ 736.78.44,00' },
//           { vendor: 'Phunix GmbH', invoiceDate: '19.08.2025', netValue: '€ 736.78.44,00' }
//         ])

//         setCategoryData([
//           { name: 'Operations', value: 1000, color: '#2b4ded' },
//           { name: 'Marketing', value: 7250, color: '#f79661' },
//           { name: 'Facilities', value: 1000, color: '#ffd1a7' }
//         ])

//         setTrendData([
//           { month: 'Jan', invoiceCount: 45, totalSpend: 8500 },
//           { month: 'Feb', invoiceCount: 52, totalSpend: 9200 },
//           { month: 'Mar', invoiceCount: 48, totalSpend: 8800 },
//           { month: 'Apr', invoiceCount: 55, totalSpend: 10100 },
//           { month: 'May', invoiceCount: 61, totalSpend: 11200 },
//           { month: 'Jun', invoiceCount: 58, totalSpend: 10500 },
//           { month: 'Jul', invoiceCount: 64, totalSpend: 12679 },
//           { month: 'Aug', invoiceCount: 59, totalSpend: 11800 },
//           { month: 'Sep', invoiceCount: 63, totalSpend: 12200 },
//           { month: 'Oct', invoiceCount: 67, totalSpend: 13100 },
//           { month: 'Nov', invoiceCount: 71, totalSpend: 14200 },
//           { month: 'Dec', invoiceCount: 69, totalSpend: 13800 }
//         ])

//         setOutflowData([
//           { range: '0-7 days', amount: 15000 },
//           { range: '8-30 days', amount: 25000 },
//           { range: '31-60 days', amount: 18000 },
//           { range: '60+ days', amount: 32000 }
//         ])

//         setLoading(false)
//       }, 1000)
//     } catch (error) {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="flex flex-row justify-start items-center w-full bg-[#ffffff]">
//       {/* Sidebar */}
//       <Sidebar />
      
//       {/* Main Content */}
//       <div className="flex flex-col gap-[24px] justify-start items-center w-full lg:w-[86%]">
//         {/* Header */}
//         <Header />
        
//         {/* Dashboard Content */}
//         <main className="flex flex-col gap-[16px] justify-start items-center w-full px-4 lg:px-7 pb-8">
//           {/* Metrics Cards Section */}
//           <section className="flex flex-col lg:flex-row gap-[16px] w-full">
//             {/* Total Spend Card */}
//             <div className="relative flex flex-col justify-start items-center w-full lg:w-[278px] h-auto lg:h-[120px] border border-solid border-[#e4e4e7] rounded-[8px] p-4 bg-white">
//               {/* Green indicator */}
//               <div className="absolute top-4 right-4 w-[4px] h-[4px] bg-[#43b077] border border-solid border-[#43b077] rounded-[2px]"></div>
              
//               <div className="flex flex-col gap-[26px] justify-start items-center w-full">
//                 <div className="flex justify-between items-center w-full">
//                   <span className="text-xs font-medium leading-tight text-left text-[#000000]">Total Spend</span>
//                   <span className="text-xs font-medium leading-tight text-left text-[#64748b]">(YTD)</span>
//                 </div>
                
//                 <div className="flex justify-center items-center w-full">
//                   <div className="flex flex-col justify-start items-start flex-1">
//                     <span className="text-lg lg:text-[20px] font-semibold leading-xl text-left text-[#000000]">
//                       {metricsData.totalSpend}
//                     </span>
//                     <div className="flex justify-start items-center w-full">
//                       <span className="text-xs font-semibold leading-tight text-left text-[#2f9f02]">
//                         {metricsData.spendChange}
//                       </span>
//                       <span className="text-xs font-medium leading-tight text-left text-[#8497b2] ml-2">
//                         from last month
//                       </span>
//                     </div>
//                   </div>
//                   <img src="/images/img_group_68.png" alt="Trend Chart" className="w-[44px] h-[26px]" />
//                 </div>
//               </div>
//             </div>

//             {/* Total Invoices Processed Card */}
//             <div className="flex flex-col gap-[26px] justify-start items-start w-full lg:w-[278px] h-auto border border-solid border-[#e4e4e7] rounded-[8px] p-4 bg-white">
//               <span className="text-xs font-medium leading-tight text-left text-[#000000]">
//                 Total Invoices Processed
//               </span>
              
//               <div className="flex justify-start items-center w-full">
//                 <div className="flex flex-col justify-center items-start flex-1">
//                   <span className="text-lg lg:text-[20px] font-semibold leading-xl text-left text-[#000000]">
//                     {metricsData.totalInvoices}
//                   </span>
//                   <div className="flex justify-start items-center w-full">
//                     <span className="text-xs font-semibold leading-tight text-left text-[#2e9f02]">
//                       {metricsData.invoicesChange}
//                     </span>
//                     <span className="text-xs font-medium leading-tight text-left text-[#8497b2] ml-2">
//                       from last month
//                     </span>
//                   </div>
//                 </div>
//                 <img src="/images/img_group_68_teal_400.png" alt="Trend Chart" className="w-[44px] h-[24px]" />
//               </div>
//             </div>

//             {/* Documents Uploaded Card */}
//             <div className="flex flex-col gap-[26px] justify-start items-center w-full lg:w-[278px] h-auto border border-solid border-[#e4e4e7] rounded-[8px] p-4 bg-white">
//               <div className="flex justify-between items-center w-full">
//                 <span className="text-xs font-medium leading-tight text-left text-[#000000]">Documents Uploaded</span>
//                 <span className="text-xs font-medium leading-tight text-left text-[#64748b]">This Month</span>
//               </div>
              
//               <div className="flex justify-start items-center w-full">
//                 <div className="flex justify-center items-center w-full">
//                   <div className="flex flex-col justify-center items-start flex-1">
//                     <span className="text-lg lg:text-[20px] font-semibold leading-xl text-left text-[#000000]">
//                       {metricsData.documentsUploaded}
//                     </span>
//                     <div className="flex justify-start items-center w-full">
//                       <span className="text-xs font-semibold leading-tight text-left text-[#ed1c24]">
//                         {metricsData.documentsChange}
//                       </span>
//                       <span className="text-xs font-medium leading-tight text-left text-[#8497b2] ml-2">
//                         less from last month
//                       </span>
//                     </div>
//                   </div>
//                   <img src="/images/img_group_68_red_700.png" alt="Trend Chart" className="w-[40px] h-[22px]" />
//                 </div>
//               </div>
//             </div>

//             {/* Average Invoice Value Card */}
//             <div className="flex flex-col gap-[26px] justify-start items-start w-full lg:w-[278px] h-auto border border-solid border-[#e4e4e7] rounded-[8px] p-4 bg-white">
//               <span className="text-xs font-medium leading-tight text-left text-[#000000]">
//                 Average Invoice Value
//               </span>
              
//               <div className="flex flex-col justify-start items-start w-full">
//                 <span className="text-lg lg:text-[20px] font-semibold leading-xl text-left text-[#000000]">
//                   {metricsData.averageInvoiceValue}
//                 </span>
//                 <div className="flex justify-start items-center w-full">
//                   <span className="text-xs font-semibold leading-tight text-left text-[#2f9f02]">
//                     {metricsData.averageChange}
//                   </span>
//                   <span className="text-xs font-medium leading-tight text-left text-[#8497b2] ml-2">
//                     from last month
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Charts Section */}
//           <section className="flex flex-col lg:flex-row gap-[16px] w-full">
//             {/* Invoice Volume + Value Trend Chart */}
//             <div className="flex flex-col gap-[18px] justify-start items-center w-full lg:w-[60%] h-auto border border-solid border-[#e4e4e7] rounded-[8px] p-4 bg-white">
//               <div className="flex flex-col gap-[4px] justify-start items-start w-full">
//                 <h2 className="text-base font-semibold leading-loose text-left text-[#1b1b1b]">
//                   Invoice Volume + Value Trend
//                 </h2>
//                 <p className="text-xs font-medium leading-tight text-left text-[#64748b]">
//                   Invoice count and total spend over 12 months.
//                 </p>
//               </div>
              
//               <div className="w-full h-[280px]">
//                 {loading ? (
//                   <div className="w-full h-full bg-gray-200 animate-pulse rounded"></div>
//                 ) : (
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart data={trendData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="month" />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Line type="monotone" dataKey="invoiceCount" stroke="#2b4ded" name="Invoice Count" />
//                       <Line type="monotone" dataKey="totalSpend" stroke="#f79661" name="Total Spend (€)" />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 )}
//               </div>
//             </div>

//             {/* Spend by Vendor Chart */}
//             <div className="flex flex-col gap-[18px] justify-start items-center w-full lg:w-[40%] h-auto border border-solid border-[#e4e4e7] rounded-[8px] p-4 bg-white">
//               <div className="flex flex-col gap-[4px] justify-start items-start w-full">
//                 <h2 className="text-base font-semibold leading-loose text-left text-[#1b1b1b]">
//                   Spend by Vendor (Top 10)
//                 </h2>
//                 <p className="text-xs font-medium leading-tight text-left text-[#64748b]">
//                   Vendor spend with cumulative percentage distribution.
//                 </p>
//               </div>
              
//               <div className="w-full h-[280px]">
//                 {loading ? (
//                   <div className="w-full h-full bg-gray-200 animate-pulse rounded"></div>
//                 ) : (
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={[
//                       { vendor: 'Vendor A', amount: 15000 },
//                       { vendor: 'Vendor B', amount: 12000 },
//                       { vendor: 'Vendor C', amount: 8000 },
//                       { vendor: 'Vendor D', amount: 6000 },
//                       { vendor: 'Vendor E', amount: 4000 }
//                     ]}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="vendor" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="amount" fill="#2b4ded" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 )}
//               </div>
//             </div>
//           </section>

//           {/* Bottom Section */}
//           <section className="flex flex-col lg:flex-row gap-[16px] w-full">
//             {/* Spend by Category - Pie Chart */}
//             <div className="flex flex-col justify-start items-center w-full lg:w-[30%] h-auto border border-solid border-[#e4e4e7] rounded-[8px] p-4 bg-white">
//               <div className="flex flex-col justify-start items-center w-full mb-2">
//                 <div className="flex flex-col gap-[4px] justify-start items-start w-full mb-3">
//                   <h2 className="text-base font-semibold leading-loose text-left text-[#1b1b1b]">
//                     Spend by Category
//                   </h2>
//                   <p className="text-xs font-medium leading-tight text-left text-[#64748b]">
//                     Distribution of spending across different categories.
//                   </p>
//                 </div>
                
//                 {loading ? (
//                   <div className="w-[314px] h-[314px] bg-gray-200 animate-pulse rounded-full"></div>
//                 ) : (
//                   <div className="relative w-[314px] h-[314px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie
//                           data={categoryData}
//                           cx="50%"
//                           cy="50%"
//                           innerRadius={60}
//                           outerRadius={120}
//                           paddingAngle={5}
//                           dataKey="value"
//                         >
//                           {categoryData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={entry.color} />
//                           ))}
//                         </Pie>
//                         <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                 )}
                
//                 {/* Legend */}
//                 <div className="flex flex-col gap-[10px] w-full px-5">
//                   {categoryData.map((category, index) => (
//                     <div key={index} className="flex justify-center items-center w-full">
//                       <div className="flex justify-start items-center flex-1">
//                         <div 
//                           className="w-[10px] h-[10px] rounded-[5px]"
//                           style={{ backgroundColor: category.color }}
//                         ></div>
//                         <span className="text-sm font-medium leading-relaxed text-left text-[#0000007f] ml-2">
//                           {category.name}
//                         </span>
//                       </div>
//                       <span className="text-sm font-medium leading-relaxed text-left text-[#000000e5]">
//                         ${category.value}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Cash Outflow Forecast */}
//             <div className="flex flex-col gap-[28px] justify-center items-center w-full lg:w-[30%] h-auto border border-solid border-[#e4e4e7] rounded-[8px] p-4 bg-white">
//               <div className="flex flex-col gap-[4px] justify-start items-start w-full ml-3">
//                 <h2 className="text-base font-semibold leading-loose text-left text-[#1b1b1b]">
//                   Cash Outflow Forecast
//                 </h2>
//                 <p className="text-xs font-medium leading-base text-left text-[#64748b] w-full">
//                   Expected payment obligations grouped by due date ranges.
//                 </p>
//               </div>
              
//               <div className="w-full h-[200px] px-3">
//                 {loading ? (
//                   <div className="w-full h-full bg-gray-200 animate-pulse rounded"></div>
//                 ) : (
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={outflowData} layout="horizontal">
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis type="number" />
//                       <YAxis dataKey="range" type="category" width={80} />
//                       <Tooltip formatter={(value) => [`€${value}`, 'Amount']} />
//                       <Bar dataKey="amount" fill="#2b4ded" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 )}
//               </div>
//             </div>

//             {/* Invoices by Vendor Table */}
//             <div className="flex flex-col gap-[18px] justify-start items-center w-full lg:flex-1 h-auto border border-solid border-[#e4e4e7] rounded-[8px] bg-white">
//               <div className="flex flex-col gap-[4px] justify-start items-start w-full p-4 pb-0">
//                 <h2 className="text-base font-semibold leading-loose text-left text-[#1b1b1b]">
//                   Invoices by Vendor
//                 </h2>
//                 <p className="text-xs font-medium leading-tight text-left text-[#64748b]">
//                   Top vendors by invoice count and net value.
//                 </p>
//               </div>
              
//               <div className="flex flex-col justify-start items-center w-full">
//                 {/* Table Header */}
//                 <div className="flex justify-start items-center w-full bg-[#f6f6f7] border-b border-solid border-[#e4e4e7]">
//                   <div className="flex justify-start items-center w-[34%] py-2 px-3">
//                     <span className="text-xs font-medium leading-tight text-left text-[#1b1b1b]">
//                       Vendor
//                     </span>
//                   </div>
//                   <div className="flex justify-start items-center flex-1 py-2 px-3 border-b border-solid border-[#e4e4e7]">
//                     <span className="text-xs font-medium leading-tight text-left text-[#1b1b1b]">
//                       # Invoices
//                     </span>
//                   </div>
//                   <div className="flex justify-end items-center w-[26%] py-2 px-3 border-b border-solid border-[#e4e4e7]">
//                     <span className="text-xs font-medium leading-tight text-left text-[#1b1b1b]">
//                       Net Value
//                     </span>
//                   </div>
//                 </div>
                
//                 {/* Table Body */}
//                 <div className="flex flex-col justify-start items-center w-full max-h-[308px] overflow-y-auto">
//                   {loading ? (
//                     Array.from({ length: 6 }).map((_, index) => (
//                       <div key={index} className="flex justify-center items-center w-full border-b border-solid border-[#e4e4e7] bg-white animate-pulse">
//                         <div className="w-full h-12 bg-gray-200"></div>
//                       </div>
//                     ))
//                   ) : (
//                     vendorData.map((vendor, index) => (
//                       <div key={index} className="flex justify-center items-center w-full border-b border-solid border-[#e4e4e7] bg-white">
//                         <div className="text-xs font-normal leading-tight text-left text-[#1b1b1b] w-[18%] py-3 px-3">
//                           {vendor.vendor}
//                         </div>
//                         <div className="flex justify-start items-center flex-1 py-3 px-3 border-b border-solid border-[#e4e4e7] ml-9">
//                           <span className="text-sm font-normal leading-relaxed text-left text-[#1b1b1b]">
//                             {vendor.invoiceDate}
//                           </span>
//                         </div>
//                         <div className="flex justify-center items-center w-auto py-2 px-2">
//                           <div className="flex justify-center items-center w-auto border border-solid border-[#e4e4e7] rounded-[8px] py-2 px-2">
//                             <span className="text-sm font-normal leading-relaxed text-left text-[#1b1b1b]">
//                               {vendor.netValue}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   )
// }

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
