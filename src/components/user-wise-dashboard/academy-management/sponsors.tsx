"use client";

import React, { useState } from "react";
import { DashboardModal } from "@/components/dashboard/dashboard-modal";
import { 
  IconSearch, 
  IconPlus, 
  IconFilter, 
  IconChevronDown,
  IconEye,
  IconEdit,
  IconTrash,
  IconCurrencyDollar,
  IconFileText,
  IconCalendar,
  IconClock,
  IconMail,
  IconPhone,
  IconUser,
  IconMapPin,
  IconArrowLeft
} from "@tabler/icons-react";

const sponsors = [
  {
    id: 1,
    companyName: "Nike Sports",
    subName: "John Anderson",
    contactEmail: "john.anderson@nike.com",
    contactPhone: "+1 555-0123",
    type: "Equipment",
    value: "$50,000",
    period: "Jan 1, 2026 to Dec 31, 2026",
    status: "Active",
    payment: "Paid"
  },
  {
    id: 2,
    companyName: "Adidas Football",
    subName: "Sarah Martinez",
    contactEmail: "sarah.m@adidas.com",
    contactPhone: "+1 555-0124",
    type: "Apparel",
    value: "$75,000",
    period: "Jan 1, 2026 to Dec 31, 2027",
    status: "Active",
    payment: "Paid"
  },
  {
    id: 3,
    companyName: "Local Sports Cafe",
    subName: "Michael Chen",
    contactEmail: "michael@sportscafe.com",
    contactPhone: "+1 555-0125",
    type: "Financial",
    value: "$15,000",
    period: "Mar 1, 2026 to Feb 28, 2027",
    status: "Active",
    payment: "Pending"
  },
  {
    id: 4,
    companyName: "Tech Solutions Inc",
    subName: "Emily Rodriguez",
    contactEmail: "emily@techsolutions.com",
    contactPhone: "+1 555-0126",
    type: "Technology",
    value: "$25,000",
    period: "Jan 15, 2026 to Jan 14, 2027",
    status: "Active",
    payment: "Paid"
  },
  {
    id: 5,
    companyName: "Healthy Drinks Co",
    subName: "David Wilson",
    contactEmail: "david@healthydrinks.com",
    contactPhone: "+1 555-0127",
    type: "Beverage",
    value: "$20,000",
    period: "Feb 1, 2026 to Jan 31, 2027",
    status: "Pending",
    payment: "Pending"
  }
];

export const SponsorsManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black uppercase text-white font-orbitron tracking-tight leading-none">Sponsors</h1>
          <p className="text-white/60 font-bold uppercase tracking-widest text-[11px] mt-2">Manage academy sponsors and partnerships</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#E31B23] hover:bg-[#C2181F] text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-[#E31B23]/20"
        >
          <IconPlus size={20} />
          <span className="text-sm font-bold uppercase tracking-widest">Add New Sponsor</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#111111] rounded-[32px] border border-white/15 p-6 flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
            <IconCurrencyDollar size={24} className="text-[#4ADE80]" />
          </div>
          <div>
            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-0.5">Total Contract Value</p>
            <p className="text-2xl font-black text-white font-orbitron">$185K</p>
          </div>
        </div>
        <div className="bg-[#111111] rounded-[32px] border border-white/15 p-6 flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
            <IconFileText size={24} className="text-[#E31B23]" />
          </div>
          <div>
            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-0.5">Active Sponsors</p>
            <p className="text-2xl font-black text-white font-orbitron">12</p>
          </div>
        </div>
        <div className="bg-[#111111] rounded-[32px] border border-white/15 p-6 flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
            <IconCalendar size={24} className="text-[#FBBF24]" />
          </div>
          <div>
            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-0.5">Expiring Soon</p>
            <p className="text-2xl font-black text-white font-orbitron">3</p>
          </div>
        </div>
        <div className="bg-[#111111] rounded-[32px] border border-white/15 p-6 flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
            <IconCurrencyDollar size={24} className="text-[#3B82F6]" />
          </div>
          <div>
            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-0.5">Pending Payments</p>
            <p className="text-2xl font-black text-white font-orbitron">$35K</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#111111] rounded-[32px] border border-white/15 p-4 flex gap-4 shadow-xl">
        <div className="relative flex-1">
          <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
          <input 
            type="text" 
            placeholder="Search players by name, team, or position..."
            className="w-full bg-white/[0.02] border border-white/15 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 transition-all"
          />
        </div>
        <div className="flex gap-3">
          <button className="bg-white/5 border border-white/15 px-5 py-2.5 rounded-xl text-[11px] font-bold text-white/60 hover:text-white flex items-center gap-2 transition-all shrink-0">
            All Type
            <IconChevronDown size={14} />
          </button>
          <button className="bg-white/5 border border-white/15 px-5 py-2.5 rounded-xl text-[11px] font-bold text-white/60 hover:text-white flex items-center gap-2 transition-all shrink-0">
            All Type
            <IconChevronDown size={14} />
          </button>
          <button className="bg-white/5 hover:bg-white/10 border border-white/15 text-white/60 hover:text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shrink-0">
            <IconFilter size={18} />
            <span className="text-[11px] font-black uppercase tracking-widest">Filters</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex flex-col gap-8 shadow-2xl">
        <h2 className="text-xl font-black uppercase text-white font-orbitron">All Sponsors (5)</h2>

        <div className="rounded-2xl border border-white/15 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/15 bg-white/[0.01]">
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Company Name</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Contact</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Sponsorship Type</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Contract Value</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Contract Period</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Status</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Payment</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sponsors.map((s, index) => (
                <tr key={s.id} className={`hover:bg-white/[0.02] transition-colors group ${index !== sponsors.length - 1 ? 'border-b border-white/15' : ''}`}>
                  <td className="py-6 px-6 border-r border-white/15">
                    <div>
                      <p className="text-sm font-black text-white leading-none mb-1">{s.companyName}</p>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{s.subName}</p>
                    </div>
                  </td>
                  <td className="py-6 px-6 border-r border-white/15">
                    <div className="space-y-0.5">
                      <p className="text-[11px] font-medium text-white/60 text-center">{s.contactEmail}</p>
                      <p className="text-[10px] font-bold text-white/40 text-center">{s.contactPhone}</p>
                    </div>
                  </td>
                  <td className="py-6 px-6 border-r border-white/15 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      s.type === 'Equipment' ? 'bg-[#4ADE80]/10 text-[#4ADE80]' :
                      s.type === 'Apparel' ? 'bg-[#3B82F6]/10 text-[#3B82F6]' :
                      s.type === 'Financial' ? 'bg-[#FBBF24]/10 text-[#FBBF24]' :
                      s.type === 'Technology' ? 'bg-[#A855F7]/10 text-[#A855F7]' :
                      'bg-[#10B981]/10 text-[#10B981]'
                    }`}>
                      {s.type}
                    </span>
                  </td>
                  <td className="py-6 px-6 border-r border-white/15 text-center">
                    <span className="text-sm font-black text-[#4ADE80] flex items-center justify-center gap-1">
                      <IconCurrencyDollar size={14} />
                      {s.value.replace('$', '')}
                    </span>
                  </td>
                  <td className="py-6 px-6 border-r border-white/15">
                    <div className="text-[10px] font-bold text-white/60 text-center leading-relaxed">
                      {s.period.split(' to ').map((date, i) => (
                        <p key={i}>{i === 1 ? 'to ' : ''}{date}</p>
                      ))}
                    </div>
                  </td>
                  <td className="py-6 px-6 border-r border-white/15 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      s.status === 'Active' ? 'bg-[#4ADE80]/10 text-[#4ADE80]' : 'bg-[#FBBF24]/10 text-[#FBBF24]'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="py-6 px-6 border-r border-white/15 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      s.payment === 'Paid' ? 'bg-[#4ADE80]/10 text-[#4ADE80]' : 'bg-[#EF4444]/10 text-[#EF4444]'
                    }`}>
                      {s.payment}
                    </span>
                  </td>
                  <td className="py-6 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                        <IconEye size={18} />
                      </button>
                      <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                        <IconEdit size={18} />
                      </button>
                      <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#E31B23]/10 border border-[#E31B23]/20 text-[#E31B23] hover:bg-[#E31B23] hover:text-white transition-all shadow-lg shadow-[#E31B23]/5 hover:shadow-[#E31B23]/20">
                        <IconTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Sponsor Modal */}
      <DashboardModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Sponsor"
        subtitle="Enter sponsor and partnership details"
        showBackButton
        footer={
          <div className="flex justify-end gap-4">
            <button 
              onClick={() => setShowAddModal(false)}
              className="px-8 py-3.5 rounded-xl border border-white/30 text-[11px] font-black uppercase tracking-widest text-white hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button className="px-8 py-3.5 rounded-xl bg-[#E31B23] hover:bg-[#C2181F] text-[11px] font-black uppercase tracking-widest text-white flex items-center gap-2 transition-all shadow-lg shadow-[#E31B23]/20">
              Add Sponsor
            </button>
          </div>
        }
      >
        <div className="space-y-10">
          {/* Company Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Company Name <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="Enter company name..." className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Contact Person <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="Enter contact person name..." className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Email <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <IconMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input type="email" placeholder="sponsor@company.com" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Phone <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <IconPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input type="text" placeholder="+1 555-0123" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Full Address <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="Enter company address..." className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
              </div>
            </div>
          </div>

          {/* Sponsorship Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Sponsorship Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Sponsorship Type <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <select className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white/60 appearance-none focus:outline-none focus:border-white/25 transition-all cursor-pointer">
                    <option>Select</option>
                  </select>
                  <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Sponsorship Status <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <select className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white/60 appearance-none focus:outline-none focus:border-white/25 transition-all cursor-pointer">
                    <option>Select</option>
                  </select>
                  <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Contract Value <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <IconCurrencyDollar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input type="text" placeholder="01/01/2018" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Payment Status <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <select className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white/60 appearance-none focus:outline-none focus:border-white/25 transition-all cursor-pointer">
                    <option>Select</option>
                  </select>
                  <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Start Time <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <input type="date" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-white/25 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  End Time <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <input type="date" className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-white/25 transition-all" />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Sponsorship Description <span className="text-[#E31B23]">*</span>
                </label>
                <textarea 
                  placeholder="Describe the sponsorship agreement and terms..." 
                  className="w-full h-32 bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all resize-none"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Benefits & Deliverables</label>
                <textarea 
                  placeholder="List the benefits and what the academy will provide to the sponsor..." 
                  className="w-full h-32 bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default SponsorsManagement;
