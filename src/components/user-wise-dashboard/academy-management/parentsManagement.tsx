"use client";

import React, { useState } from "react";
import { DashboardModal } from "@/components/dashboard/dashboard-modal";
import { 
  IconSearch, 
  IconPlus, 
  IconFilter, 
  IconChevronDown,
  IconMessage,
  IconUser,
  IconMail,
  IconPhone,
  IconBriefcase,
  IconMapPin,
  IconNote,
  IconTrash,
  IconLoader2
} from "@tabler/icons-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/reduxHooks";
import { addParent, deleteParent } from "@/lib/features/parent/parentSlice";

export const ParentsManagement = () => {
  const dispatch = useAppDispatch();
  const parents = useAppSelector((state) => state.parent.parents);
  const players = useAppSelector((state) => state.player.players);

  // Component States
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<number[]>([]);

  // Form input bindings state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    relationship: "Select an option",
    occupation: "",
    email: "",
    phone: "",
    alternatePhone: "",
    streetAddress: "",
    city: "",
    zipCode: "",
    notes: ""
  });

  // Toggle players checkboxes selection
  const handlePlayerCheckboxChange = (playerId: number) => {
    setSelectedPlayerIds((prev) =>
      prev.includes(playerId) ? prev.filter((id) => id !== playerId) : [...prev, playerId]
    );
  };

  // Submit Handler
  const handleFormSubmit = async () => {
    // Validations
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error("First Name and Last Name are required");
      return;
    }
    if (formData.relationship === "Select an option") {
      toast.error("Please select a relationship type");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email Address is required");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Primary Phone is required");
      return;
    }
    if (!formData.streetAddress.trim() || !formData.city.trim() || !formData.zipCode.trim()) {
      toast.error("Address details are required");
      return;
    }
    if (selectedPlayerIds.length === 0) {
      toast.error("Please select at least one linked player");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Saving parent registration in academy database...");

    try {
      // Simulate registering database
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate sending email
      toast.loading(`Sending verification and validation email to ${formData.email}...`, { id: toastId });
      await new Promise((resolve) => setTimeout(resolve, 1800));

      // Concatenate linked player names
      const linkedNames = selectedPlayerIds
        .map((pid) => {
          const p = players.find((pl) => pl.id === pid);
          return p ? p.fullName : "";
        })
        .filter(Boolean)
        .join(", ");

      const newParent = {
        id: Date.now(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        relationship: formData.relationship,
        occupation: formData.occupation.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        alternatePhone: formData.alternatePhone.trim(),
        streetAddress: formData.streetAddress.trim(),
        city: formData.city.trim(),
        zipCode: formData.zipCode.trim(),
        linkedPlayerIds: selectedPlayerIds,
        linkedPlayers: linkedNames || "Unknown Player",
        paymentStatus: "Paid" as const,
        lastContact: "Just now",
        notes: formData.notes.trim(),
        avatar: `https://i.pravatar.cc/100?u=${formData.firstName.toLowerCase()}`,
        status: "Active" as const,
        createdAt: new Date().toISOString().split("T")[0]
      };

      dispatch(addParent(newParent));
      toast.success(`Success! Parent linked to ${linkedNames} and invitation email sent to ${formData.email}.`, { id: toastId });
      
      setShowAddModal(false);
      
      // Reset State
      setFormData({
        firstName: "",
        lastName: "",
        relationship: "Select an option",
        occupation: "",
        email: "",
        phone: "",
        alternatePhone: "",
        streetAddress: "",
        city: "",
        zipCode: "",
        notes: ""
      });
      setSelectedPlayerIds([]);
    } catch (err) {
      toast.error("Failed to complete parent registration.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Handler
  const handleDeleteClick = (id: number, name: string) => {
    if (confirm(`Are you sure you want to remove parent "${name}"?`)) {
      dispatch(deleteParent(id));
      toast.success(`Parent "${name}" deleted successfully.`);
    }
  };

  // Filter parents search
  const filteredParents = parents.filter((p) => {
    const fullName = p.fullName || "";
    const email = p.email || "";
    const phone = p.phone || "";
    const linkedPlayers = p.linkedPlayers || "";

    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm) ||
      linkedPlayers.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black uppercase text-white font-orbitron tracking-tight leading-none">Parents</h1>
          <p className="text-white/60 font-bold uppercase tracking-widest text-[11px] mt-2">Manage parent information and communication</p>
        </div>
        <button 
          onClick={() => {
            if (!isSubmitting) {
              setShowAddModal(true);
            }
          }}
          disabled={isSubmitting}
          className="bg-[#E31B23] hover:bg-[#C2181F] text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-[#E31B23]/20 cursor-pointer font-bold disabled:opacity-50"
        >
          <IconPlus size={20} />
          <span className="text-sm font-bold uppercase tracking-widest font-orbitron">Add New Parent</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-[#111111] rounded-3xl border border-white/15 p-4 flex gap-4 shadow-xl">
        <div className="relative flex-1">
          <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
          <input 
            type="text" 
            placeholder="Search parents by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/[0.02] border border-white/15 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25 transition-all"
          />
        </div>
        <button className="bg-white/5 hover:bg-white/10 border border-white/15 text-white/60 hover:text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all font-bold">
          <IconFilter size={20} />
          <span className="text-sm">Filters</span>
        </button>
      </div>

      {/* Main Content Card */}
      <div className="bg-[#111111] rounded-[32px] border border-white/15 p-8 flex flex-col gap-8 shadow-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black uppercase text-white font-orbitron">All Parents ({filteredParents.length})</h2>
          <button className="bg-white/5 border border-white/15 px-4 py-2 rounded-xl text-[11px] font-bold text-white/60 hover:text-white flex items-center gap-2 transition-all">
            Status
            <IconChevronDown size={14} />
          </button>
        </div>

        {/* Parents Table */}
        <div className="rounded-2xl border border-white/15 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/15 bg-white/[0.01]">
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15">Parent Name</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Email</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Phone</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 border-r border-white/15 text-center">Linked Players</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/80 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredParents.map((p, index) => (
                <tr key={p.id} className={`hover:bg-white/[0.02] transition-colors group ${index !== filteredParents.length - 1 ? 'border-b border-white/15' : ''}`}>
                  <td className="py-5 px-6 border-r border-white/15">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-white/15 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.avatar} alt={p.fullName} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-sm font-bold text-white whitespace-nowrap">{p.fullName}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6 border-r border-white/15 text-sm font-medium text-white/60 text-center">{p.email}</td>
                  <td className="py-5 px-6 border-r border-white/15 text-sm font-medium text-white/60 text-center">{p.phone}</td>
                  <td className="py-5 px-6 border-r border-white/15 text-sm font-medium text-white/60 text-center">{p.linkedPlayers}</td>
                  <td className="py-5 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => toast.info(`Chat with ${p.fullName} is opened.`)}
                        className="h-9 px-4 flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer font-bold"
                      >
                        <IconMessage size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Message</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(p.id, p.fullName)}
                        className="h-9 w-9 flex items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer font-bold"
                        title="Remove Parent"
                      >
                        <IconTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredParents.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-white/40 text-sm font-medium">
                    No parent records found matching.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Parent Modal */}
      <DashboardModal
        isOpen={showAddModal}
        onClose={() => {
          if (!isSubmitting) {
            setShowAddModal(false);
          }
        }}
        title="Add New Parent/Guardian"
        subtitle="Register a new parent or guardian account"
        showBackButton
        footer={
          <div className="flex justify-end gap-4">
            <button 
              onClick={() => setShowAddModal(false)}
              disabled={isSubmitting}
              className="px-8 py-3.5 rounded-xl border border-white/30 text-[11px] font-black uppercase tracking-widest text-white hover:bg-white/5 transition-all cursor-pointer font-bold disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleFormSubmit}
              disabled={isSubmitting}
              className="px-8 py-3.5 rounded-xl bg-[#E31B23] hover:bg-[#C2181F] text-[11px] font-black uppercase tracking-widest text-white flex items-center gap-2 transition-all shadow-lg shadow-[#E31B23]/20 cursor-pointer font-bold disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <IconLoader2 size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <IconPlus size={18} />
                  Add Parent
                </>
              )}
            </button>
          </div>
        }
      >
        <div className="space-y-10">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  First Name <span className="text-[#E31B23]">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter first name" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Last Name <span className="text-[#E31B23]">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter last name" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Relationship <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <select 
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white/60 appearance-none focus:outline-none focus:border-white/25 transition-all cursor-pointer"
                  >
                    <option>Select an option</option>
                    <option>Father</option>
                    <option>Mother</option>
                    <option>Guardian</option>
                  </select>
                  <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Occupation
                </label>
                <input 
                  type="text" 
                  placeholder="Occupation" 
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" 
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Email Address <span className="text-[#E31B23]">*</span>
                </label>
                <input 
                  type="email" 
                  placeholder="parent@example.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Primary Phone <span className="text-[#E31B23]">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="+1 (555) 000-0000" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Alternate Phone</label>
                <input 
                  type="text" 
                  placeholder="+1 (555) 000-0000" 
                  value={formData.alternatePhone}
                  onChange={(e) => setFormData({ ...formData, alternatePhone: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" 
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Street Address <span className="text-[#E31B23]">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Street address" 
                  value={formData.streetAddress}
                  onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  City <span className="text-[#E31B23]">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="City" 
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  ZIP Code <span className="text-[#E31B23]">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="ZIP Code" 
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" 
                />
              </div>
            </div>
          </div>

          {/* Linked Players */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Linked Players</h3>
            <p className="text-[11px] text-white/40 font-bold uppercase tracking-widest -mt-4">Select the player(s) this parent/guardian is responsible for</p>
            <div className="space-y-3">
              {players.map((player) => (
                <div 
                  key={player.id} 
                  onClick={() => {
                    if (!isSubmitting) {
                      handlePlayerCheckboxChange(player.id);
                    }
                  }}
                  className="bg-[#111111] border border-white/15 rounded-2xl p-4 flex items-center gap-4 hover:border-white/30 transition-all group cursor-pointer"
                >
                  <input 
                    type="checkbox" 
                    checked={selectedPlayerIds.includes(player.id)}
                    onChange={() => {}} // toggled by parent onClick
                    disabled={isSubmitting}
                    className="w-5 h-5 rounded border-white/20 bg-white/5 text-[#E31B23] focus:ring-[#E31B23] cursor-pointer" 
                  />
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/15 shrink-0">
                    <img 
                      src={typeof player.playerImage === 'string' ? player.playerImage : (player.playerImage?.src || "/ronaldo.png")} 
                      alt={player.fullName} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white">{player.fullName}</p>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{player.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Additional Notes</h3>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Notes</label>
              <textarea 
                placeholder="Any additional information or special requirements..." 
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                disabled={isSubmitting}
                className="w-full h-32 bg-[#111111] border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all resize-none"
              />
            </div>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default ParentsManagement;