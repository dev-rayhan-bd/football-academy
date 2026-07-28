"use client";

import React from "react";
import { 
  IconCurrencyDollar, 
  IconDownload,
  IconArrowUpRight,
  IconClock,
  IconCheck,
  IconX
} from "@tabler/icons-react";

const recentPayments = [
  {
    id: 1,
    player: "Marcus Silva",
    type: "Monthly Fee",
    amount: "$150",
    date: "Jan 20, 2026",
    status: "Paid"
  },
  {
    id: 2,
    player: "David Chen",
    type: "Training Session Fee",
    amount: "$50",
    date: "Jan 19, 2026",
    status: "Paid"
  },
  {
    id: 3,
    player: "Alex Jordan",
    type: "Monthly Fee",
    amount: "$150",
    date: "Jan 15, 2026",
    status: "Unpaid"
  },
  {
    id: 4,
    player: "Lucas Santos",
    type: "Validation Fee",
    amount: "$30",
    date: "Jan 18, 2026",
    status: "Paid"
  },
  {
    id: 5,
    player: "Gabriel Barbosa",
    type: "Weekly Fee",
    amount: "$40",
    date: "Jan 17, 2026",
    status: "Paid"
  },
  {
    id: 6,
    player: "Felipe Melo",
    type: "Uniform Kit Fee",
    amount: "$85",
    date: "Jan 14, 2026",
    status: "Paid"
  },
  {
    id: 7,
    player: "Rodrigo Silva",
    type: "Registration Fee",
    amount: "$120",
    date: "Jan 12, 2026",
    status: "Paid"
  },
  {
    id: 8,
    player: "Enzo Fernandez",
    type: "Tournament Entrance Fee",
    amount: "$65",
    date: "Jan 10, 2026",
    status: "Unpaid"
  },
  {
    id: 9,
    player: "Alex Jordan",
    type: "Late Payment Fine",
    amount: "$20",
    date: "Jan 21, 2026",
    status: "Unpaid"
  }
];

export const FeesPayments = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black uppercase text-white font-orbitron tracking-tight leading-none">Fees & Payments</h1>
        <p className="text-white/60 font-bold uppercase tracking-widest text-[11px] mt-2">Track and manage fee payments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex items-center gap-6 shadow-xl">
          <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
            <IconCurrencyDollar size={32} className="text-[#E31B23]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Total Collected</p>
            <p className="text-3xl font-black text-white font-orbitron">$45,280</p>
          </div>
        </div>
        
        <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex items-center gap-6 shadow-xl">
          <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
            <IconClock size={32} className="text-[#FBBF24]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Pending</p>
            <p className="text-3xl font-black text-white font-orbitron">$2,450</p>
          </div>
        </div>

        <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex items-center gap-6 shadow-xl">
          <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
            <IconArrowUpRight size={32} className="text-[#4ADE80]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">This Month</p>
            <p className="text-3xl font-black text-white font-orbitron">$8,920</p>
          </div>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex flex-col gap-8 shadow-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black uppercase text-white font-orbitron">Recent Payments</h2>
          <button className="bg-white/5 hover:bg-white/10 border border-white/15 text-white/60 hover:text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg">
            <IconDownload size={18} />
            <span className="text-[11px] font-black uppercase tracking-widest">Export</span>
          </button>
        </div>

        <div className="rounded-2xl border border-white/15 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/15 bg-white/[0.01]">
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Player</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Type</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Amount</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Date</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((payment, index) => (
                <tr key={payment.id} className={`hover:bg-white/[0.02] transition-colors group ${index !== recentPayments.length - 1 ? 'border-b border-white/15' : ''}`}>
                  <td className="py-6 px-6 border-r border-white/15 text-sm font-medium text-white/60 text-center">{payment.player}</td>
                  <td className="py-6 px-6 border-r border-white/15 text-sm font-medium text-white/60 text-center">{payment.type}</td>
                  <td className="py-6 px-6 border-r border-white/15 text-sm font-black text-white text-center">{payment.amount}</td>
                  <td className="py-6 px-6 border-r border-white/15 text-sm font-medium text-white/60 text-center">{payment.date}</td>
                  <td className="py-6 px-6 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      payment.status === "Paid" ? "bg-[#4ADE80]/10 text-[#4ADE80]" : "bg-[#EF4444]/10 text-[#EF4444]"
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeesPayments;
