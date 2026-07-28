import React from "react";
import { IconEye } from "@tabler/icons-react";

interface Transaction {
  id: string;
  athlete: {
    name: string;
    role: string;
    avatar: string;
  };
  report: string;
  amount: string;
  myAmount: string;
  date: string;
  status: "Completed" | "Pending" | "Rejected";
}

interface FinancialsTableProps {
  transactions: Transaction[];
}

export const FinancialsTable = ({ transactions }: FinancialsTableProps) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="py-5 px-6 text-sm font-bold text-white border-r border-white/10">Name</th>
            <th className="py-5 px-6 text-sm font-bold text-white border-r border-white/10 text-center">Report</th>
            <th className="py-5 px-6 text-sm font-bold text-white border-r border-white/10 text-center">Amount</th>
            <th className="py-5 px-6 text-sm font-bold text-white border-r border-white/10 text-center">My Amount</th>
            <th className="py-5 px-6 text-sm font-bold text-white border-r border-white/10 text-center">Date</th>
            <th className="py-5 px-6 text-sm font-bold text-white border-r border-white/10 text-center">Status</th>
            <th className="py-5 px-6 text-sm font-bold text-white text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={tx.id} className={`hover:bg-white/[0.02] transition-colors group ${index !== transactions.length - 1 ? 'border-b border-white/10' : ''}`}>
              <td className="py-5 px-6 border-r border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                    <img src={tx.athlete.avatar} alt={tx.athlete.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-bold text-white truncate">{tx.athlete.name}</p>
                    <p className="text-xs font-bold text-[#E31B23] uppercase">{tx.athlete.role}</p>
                  </div>
                </div>
              </td>
              <td className="py-5 px-6 border-r border-white/10 text-sm font-medium text-white/80">
                {tx.report}
              </td>
              <td className="py-5 px-6 border-r border-white/10 text-sm font-black text-white font-orbitron text-center">
                {tx.amount}
              </td>
              <td className="py-5 px-6 border-r border-white/10 text-sm font-black text-white font-orbitron text-center">
                {tx.myAmount}
              </td>
              <td className="py-5 px-6 border-r border-white/10 text-sm font-medium text-white/80 text-center">
                {tx.date}
              </td>
              <td className="py-5 px-6 border-r border-white/10 text-center">
                <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest inline-block ${
                  tx.status === "Completed" ? "bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20" :
                  tx.status === "Pending" ? "bg-[#FBBF24]/10 text-[#FBBF24] border border-[#FBBF24]/20" :
                  "bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20"
                }`}>
                  {tx.status}
                </span>
              </td>
              <td className="py-5 px-6 text-center">
                <button className="text-red-600 hover:text-red-500 transition-colors">
                  <IconEye size={22} stroke={2} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
