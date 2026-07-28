"use client";
import React from "react";
import { 
  IconCurrencyDollar, 
  IconCreditCard,
  IconFileText,
  IconReportAnalytics
} from "@tabler/icons-react";
import { DashboardTable, Column } from "@/components/dashboard/dashboard-table";

const SummaryStatCard = ({ icon: Icon, value, label }: { icon: any, value: string | number, label: string }) => (
  <div className="bg-[#111111] border border-white/20 rounded-2xl p-6 flex flex-col gap-4 flex-1">
    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60">
       <Icon size={20} />
    </div>
    <div>
      <p className="text-white text-3xl font-black font-orbitron">{value}</p>
      <p className="text-white/40 text-[11px] font-bold uppercase tracking-wider">{label}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => (
  <span className="px-4 py-1 rounded-full text-[10px] font-black uppercase border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
    {status}
  </span>
);

interface PaymentRow {
  id: string;
  type: string;
  user: string;
  amount: string;
  spend: string;
  date: string;
  status: string;
}

export const SuperAdminPayments = () => {
  const columns: Column<PaymentRow>[] = [
    { header: "Payment ID", key: "id", align: "center", cellClassName: "text-white/60 text-sm font-medium" },
    { header: "Type", key: "type", align: "center", cellClassName: "text-white/60 text-sm font-medium" },
    { header: "User/Entity", key: "user", align: "center", cellClassName: "text-white/60 text-sm font-medium" },
    { header: "Amount", key: "amount", align: "center", cellClassName: "text-white text-sm font-black font-orbitron" },
    { header: "Spend", key: "spend", align: "center", cellClassName: "text-white text-sm font-black font-orbitron" },
    { header: "Date", key: "date", align: "center", cellClassName: "text-white/60 text-sm font-medium" },
    { 
      header: "Status", 
      key: "status", 
      align: "center", 
      render: (row) => <StatusBadge status={row.status} /> 
    }
  ];

  const data: PaymentRow[] = [
    { id: "PAY-001", type: "Subscription", user: "Elite FC Academy", amount: "$ 89.00", spend: "$ 25.00", date: "2024-01-15", status: "Completed" },
    { id: "PAY-002", type: "Game Report", user: "John Smith", amount: "$ 9.99", spend: "$ 3.99", date: "2024-02-01", status: "Completed" },
    { id: "PAY-003", type: "Subscription", user: "Michael Brown", amount: "$ 99.00", spend: "$ 15.00", date: "2023-12-01", status: "Completed" },
  ];

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-black text-white font-orbitron tracking-tight">Payments</h1>
        <p className="text-white/60 font-medium mt-2 text-lg">Platform revenue</p>
      </div>

      {/* Stats Section */}
      <div className="flex gap-4">
        <SummaryStatCard icon={IconCurrencyDollar} value="$ 197,400" label="Total Revenue" />
        <SummaryStatCard icon={IconCreditCard} value="$ 188,000" label="Subscription" />
        <SummaryStatCard icon={IconFileText} value="$ 2,000" label="Game Reports" />
        <SummaryStatCard icon={IconReportAnalytics} value="$ 800" label="Total Spend" />
      </div>

      {/* Main Container */}
      <div className="bg-[#111111] border border-white/20 rounded-[40px] p-10 flex flex-col gap-8">
        <DashboardTable columns={columns} data={data} />
      </div>
    </div>
  );
};
