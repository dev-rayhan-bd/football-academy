"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  IconUsers,
  IconTrophy,
  IconBallFootball,
  IconPlus,
  IconCreditCard,
  IconCheck,
  IconDots
} from "@tabler/icons-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { TableActionButtons } from "@/components/dashboard/table-action-buttons";
import {
  getTeams,
  saveTeams,
  getPlan,
  savePlan,
  Team
} from "./team-data-store";

export const CoachAndPlayer = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Local State
  const [teams, setTeams] = useState<Team[]>([]);
  const [plan, setPlan] = useState<"Free" | "Premium">("Free");
  const [isClient, setIsClient] = useState(false);

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  
  // Forms state
  const [newTeamName, setNewTeamName] = useState("");
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [editingTeamName, setEditingTeamName] = useState("");

  // Payment form state
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setTeams(getTeams());
    setPlan(getPlan());
    setIsClient(true);
  }, []);

  // Compute stats
  const totalTeams = teams.length;
  const totalCoaches = teams.reduce((acc, t) => acc + t.coaches.length, 0);
  const totalPlayers = teams.reduce((acc, t) => acc + t.players.length, 0);
  const totalMembers = totalCoaches + totalPlayers;

  // Add Team Action Trigger
  const handleAddTeamClick = () => {
    if (teams.length >= 1 && plan === "Free") {
      setIsPaymentOpen(true);
    } else {
      setNewTeamName("");
      setIsAddOpen(true);
    }
  };

  // Submit payment form
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvc) {
      toast.error("Please fill in all payment details");
      return;
    }
    
    setIsProcessingPayment(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      savePlan("Premium");
      setPlan("Premium");
      setIsPaymentOpen(false);
      toast.success("Payment Successful! Premium Plan Activated.");
      
      // Proceed directly to Add Team Form
      setNewTeamName("");
      setIsAddOpen(true);
    }, 1500);
  };

  // Submit team creation form
  const handleCreateTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameTrimmed = newTeamName.trim();
    if (!nameTrimmed) {
      toast.error("Team name is required");
      return;
    }
    if (nameTrimmed.length < 3) {
      toast.error("Team name must be at least 3 characters");
      return;
    }

    const newTeam: Team = {
      id: "team-" + Date.now(),
      name: nameTrimmed,
      coaches: [],
      players: [],
      status: "Active"
    };

    const updatedTeams = [...teams, newTeam];
    saveTeams(updatedTeams);
    setTeams(updatedTeams);
    setIsAddOpen(false);
    setNewTeamName("");
    toast.success(`Team "${nameTrimmed}" added successfully!`);
  };

  // Edit action
  const handleEditClick = (team: Team) => {
    setEditingTeam(team);
    setEditingTeamName(team.name);
    setIsEditOpen(true);
  };

  // Submit team edit form
  const handleEditTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameTrimmed = editingTeamName.trim();
    if (!nameTrimmed) {
      toast.error("Team name is required");
      return;
    }
    if (nameTrimmed.length < 3) {
      toast.error("Team name must be at least 3 characters");
      return;
    }

    if (editingTeam) {
      const updatedTeams = teams.map((t) =>
        t.id === editingTeam.id ? { ...t, name: nameTrimmed } : t
      );
      saveTeams(updatedTeams);
      setTeams(updatedTeams);
      setIsEditOpen(false);
      setEditingTeam(null);
      toast.success("Team name updated successfully!");
    }
  };

  // Delete team
  const handleDeleteClick = (id: string) => {
    const teamToDelete = teams.find(t => t.id === id);
    if (!teamToDelete) return;
    
    if (confirm(`Are you sure you want to delete "${teamToDelete.name}"?`)) {
      const updatedTeams = teams.filter((t) => t.id !== id);
      saveTeams(updatedTeams);
      setTeams(updatedTeams);
      toast.success("Team deleted successfully!");
    }
  };

  if (!isClient) return null;

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
        <div>
          <h1 className="text-5xl font-black text-white font-orbitron uppercase tracking-tight">Coach and Players</h1>
          <p className="text-white/60 font-medium mt-2 text-lg">Manage your Teams, Coaches and Players</p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Current Plan:</span>
          <span className={`text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded ${
            plan === "Premium" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" : "bg-white/10 text-white/80"
          }`}>
            {plan}
          </span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <DashboardStatCard icon={<IconBallFootball size={24} />} label="Total Teams" value={String(totalTeams)} />
        <DashboardStatCard icon={<IconTrophy size={24} />} label="Total Coaches" value={String(totalCoaches)} />
        <DashboardStatCard icon={<IconUsers size={24} />} label="Total Players" value={String(totalPlayers)} />
        <DashboardStatCard icon={<IconUsers size={24} />} label="Total Roster Members" value={String(totalMembers)} />
      </div>

      {/* Team Capacity Section */}
      <div className="bg-[#111111] rounded-3xl border border-white/20 p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight">Team Capacity</h2>
          {plan === "Free" ? (
            <p className="text-white/60 font-medium text-xs">
              You are using {teams.length} out of 1 available team slot. You need to upgrade your plan to add more than one team.
            </p>
          ) : (
            <p className="text-[#00FF85] font-medium text-xs">
              Premium Plan Active: Unlimited team slots available.
            </p>
          )}
        </div>
        <div className="flex items-center gap-8 self-end sm:self-auto">
          <div className="text-right">
            <p className="text-2xl font-black text-[#E31B23] font-orbitron">
              {plan === "Free" ? `${teams.length}/1` : `${teams.length}/∞`}
            </p>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest font-orbitron">Teams Capacity</p>
          </div>
          {plan === "Free" && (
            <button 
              onClick={() => setIsPaymentOpen(true)}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] text-white px-8 py-4 rounded-xl transition-all cursor-pointer"
            >
              <IconPlus size={16} />
              Upgrade Plan
            </button>
          )}
        </div>
      </div>

      {/* Teams Table Section */}
      <div className="bg-[#111111] rounded-3xl border border-white/20 p-6 md:p-8 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight">My Teams</h2>
            <p className="text-white/60 font-medium text-xs uppercase tracking-widest mt-1">Academy Roster Groups</p>
          </div>
          <button 
            onClick={handleAddTeamClick}
            className="flex items-center gap-2 bg-[#E31B23] hover:bg-[#ff2d35] border border-transparent text-[10px] font-black uppercase tracking-[0.2em] text-white px-6 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(227,27,35,0.2)] cursor-pointer"
          >
            <IconPlus size={16} />
            Add Team
          </button>
        </div>

        <div className="w-full overflow-x-auto rounded-2xl border border-white/20">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20 bg-white/[0.02]">
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20">Team Name</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Coaches</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Players</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Total Members</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Status</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-white/40 text-sm font-medium">
                    No teams available. Click "Add Team" to get started.
                  </td>
                </tr>
              ) : (
                teams.map((team, index) => (
                  <tr key={team.id} className={`group hover:bg-white/[0.02] transition-colors ${index !== teams.length - 1 ? 'border-b border-white/20' : ''}`}>
                    <td className="py-6 px-6 border-r border-white/20">
                      <span className="text-base font-bold text-white group-hover:text-[#E31B23] transition-colors">{team.name}</span>
                    </td>
                    <td className="py-6 px-6 border-r border-white/20 text-center text-sm font-black text-white font-orbitron">
                      {team.coaches.length}
                    </td>
                    <td className="py-6 px-6 border-r border-white/20 text-center text-sm font-black text-white font-orbitron">
                      {team.players.length}
                    </td>
                    <td className="py-6 px-6 border-r border-white/20 text-center text-sm font-black text-[#00FF85] font-orbitron">
                      {team.coaches.length + team.players.length}
                    </td>
                    <td className="py-6 px-6 border-r border-white/20 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block border ${team.status === "Active"
                        ? "bg-[#00FF85]/10 text-[#00FF85] border-[#00FF85]/20 shadow-[0_0_15px_rgba(0,255,133,0.1)]"
                        : "bg-[#FF3B30]/10 text-[#FF3B30] border border-[#FF3B30]/20"
                        }`}>
                        {team.status}
                      </span>
                    </td>
                    <td className="py-6 px-6 text-center">
                      <TableActionButtons
                        onView={() => {
                          const basePath = pathname.includes("/management")
                            ? `/dashboard/academy/management/coach-players`
                            : `/dashboard/academy/analysis/coach-players`;
                          router.push(`${basePath}/${team.id}`);
                        }}
                        onEdit={() => handleEditClick(team)}
                        onDelete={() => handleDeleteClick(team.id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Team Modal */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="bg-[#111111] border border-white/10 text-white rounded-3xl max-w-md p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase text-white font-orbitron tracking-tight">
              Create New Team
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateTeamSubmit} className="space-y-6 mt-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/60 uppercase tracking-widest block">Team Name</label>
              <input
                type="text"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                placeholder="Enter team name (e.g. Santos U19)"
                className="w-full h-12 bg-white/[0.02] border border-white/10 rounded-xl px-4 text-sm font-bold text-white focus:outline-none focus:border-[#E31B23]/50 transition-all placeholder:text-gray-600"
                required
              />
            </div>
            <div className="flex gap-4 pt-4 border-t border-white/5 justify-end">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="px-6 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#E31B23] hover:bg-[#ff2d35] text-white text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_15px_rgba(227,27,35,0.3)]"
              >
                Create Team
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Team Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-[#111111] border border-white/10 text-white rounded-3xl max-w-md p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase text-white font-orbitron tracking-tight">
              Rename Team
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditTeamSubmit} className="space-y-6 mt-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/60 uppercase tracking-widest block">Team Name</label>
              <input
                type="text"
                value={editingTeamName}
                onChange={(e) => setEditingTeamName(e.target.value)}
                placeholder="Enter team name"
                className="w-full h-12 bg-white/[0.02] border border-white/10 rounded-xl px-4 text-sm font-bold text-white focus:outline-none focus:border-[#E31B23]/50 transition-all placeholder:text-gray-600"
                required
              />
            </div>
            <div className="flex gap-4 pt-4 border-t border-white/5 justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsEditOpen(false);
                  setEditingTeam(null);
                }}
                className="px-6 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#E31B23] hover:bg-[#ff2d35] text-white text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_15px_rgba(227,27,35,0.3)]"
              >
                Save Rename
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Payment / Plan Upgrade Dialog */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="bg-[#111111] border border-white/10 text-white rounded-3xl max-w-md p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase text-white font-orbitron tracking-tight flex items-center gap-2">
              <IconCreditCard className="text-amber-500 animate-pulse" />
              Upgrade Plan Required
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2 space-y-4">
            <p className="text-sm text-white/70 leading-relaxed">
              Your free plan includes **1 Active Team** slot. To create more teams and manage additional rosters, upgrade to the Premium Plan.
            </p>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-amber-500 uppercase tracking-wider">Premium Access</p>
                <p className="text-[10px] text-white/50">Unlimited Teams, Coaches & Players</p>
              </div>
              <p className="text-2xl font-black text-white font-orbitron">$49.00</p>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block">Card Number</label>
                <input
                  type="text"
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim())}
                  placeholder="4111 2222 3333 4444"
                  className="w-full h-11 bg-white/[0.02] border border-white/10 rounded-xl px-4 text-xs font-bold text-white focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-gray-700 font-mono"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block">Expiry Date</label>
                  <input
                    type="text"
                    maxLength={5}
                    value={expiry}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "");
                      if (val.length > 2) val = val.substring(0, 2) + "/" + val.substring(2, 4);
                      setExpiry(val);
                    }}
                    placeholder="MM/YY"
                    className="w-full h-11 bg-white/[0.02] border border-white/10 rounded-xl px-4 text-xs font-bold text-white focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-gray-700 font-mono"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block">CVC</label>
                  <input
                    type="password"
                    maxLength={3}
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
                    placeholder="***"
                    className="w-full h-11 bg-white/[0.02] border border-white/10 rounded-xl px-4 text-xs font-bold text-white focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-gray-700 font-mono"
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-4 pt-4 border-t border-white/5 justify-end">
                <button
                  type="button"
                  onClick={() => setIsPaymentOpen(false)}
                  className="px-6 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-black text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.3)] disabled:opacity-50 flex items-center gap-2"
                >
                  {isProcessingPayment ? "Processing..." : "Upgrade Now"}
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoachAndPlayer;