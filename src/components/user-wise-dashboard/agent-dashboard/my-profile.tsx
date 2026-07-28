"use client";

import React, { useState, useEffect } from "react";
import { 
  IconCircleCheck, 
  IconEdit, 
  IconCloudUpload,
  IconShieldCheck,
  IconCertificate,
  IconPhone,
  IconMail,
  IconAlertCircle
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Reusable Card header component
const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex justify-between items-center mb-6">
    <div className="flex items-center gap-2 text-white">
      <IconCircleCheck className="text-green-500 w-5 h-5" />
      <h2 className="text-lg font-bold font-orbitron">{title}</h2>
    </div>
    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-colors">
      <IconEdit className="w-4 h-4" />
    </div>
  </div>
);

interface ProfileHeroProps {
  completion: number;
  verificationStatus: string;
  fullName: string;
  nationality: string;
  licenseId: string;
  certifications: string;
  contact: string;
  email: string;
  coverPhoto: string;
  onSimulateApprove: () => void;
  onSimulateReset: () => void;
}

const ProfileHero = ({
  completion,
  verificationStatus,
  fullName,
  nationality,
  licenseId,
  certifications,
  contact,
  email,
  coverPhoto,
  onSimulateApprove,
  onSimulateReset
}: ProfileHeroProps) => {
  return (
    <div className="relative rounded-2xl overflow-hidden min-h-[300px] border border-white/15 group flex flex-col mb-8">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 animate-fade-in"
        style={{ backgroundImage: `url(${coverPhoto || "/707964211aa29e42aa7d522475b870cad9c4ad92.png"})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
      
      <div className="relative p-6 w-full flex flex-col h-full justify-between z-10">
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
            {/* Progress Circle SVG */}
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/10" />
                <circle 
                  cx="48" 
                  cy="48" 
                  r="44" 
                  stroke="currentColor" 
                  strokeWidth="6" 
                  fill="transparent" 
                  className="text-[#E31B23] transition-all duration-500 ease-out" 
                  strokeDasharray={276} 
                  strokeDashoffset={276 * (1 - completion / 100)} 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <span className="text-lg font-black italic">{completion}%</span>
                <span className="text-[8px] text-white/60 uppercase font-bold tracking-widest">Profile</span>
              </div>
            </div>

            {/* Simulation controls for demo purposes */}
            <div className="bg-black/60 backdrop-blur-sm border border-white/10 p-2.5 rounded-xl flex flex-col gap-1.5 self-stretch sm:self-auto sm:max-w-[200px] hover:border-white/20 transition-all">
              <span className="text-[8px] text-white/40 font-black uppercase tracking-widest text-center">Admin Simulation controls</span>
              <div className="flex gap-1.5">
                <button 
                  onClick={onSimulateApprove} 
                  className="flex-1 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[9px] font-black uppercase tracking-wider transition-all"
                >
                  Verify
                </button>
                <button 
                  onClick={onSimulateReset} 
                  className="py-1.5 px-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[9px] font-black uppercase tracking-wider transition-all"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="bg-black/80 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[8px] font-bold text-white uppercase w-fit tracking-[0.2em]">
              ACTIVE AGENT
            </div>

            {verificationStatus === "Approved" && (
              <span className="inline-flex items-center gap-1.5 bg-[#00FF62]/10 border border-[#00FF62]/20 text-[#00FF62] text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-lg shadow-[#00FF62]/5">
                <IconShieldCheck size={12} className="animate-pulse" />
                VERIFIED BY ADMIN
              </span>
            )}

            {verificationStatus === "Pending" && (
              <span className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full">
                VERIFICATION PENDING
              </span>
            )}

            {verificationStatus === "Rejected" && (
              <span className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full">
                VERIFICATION REJECTED
              </span>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase leading-none font-orbitron mb-2">
            {fullName || "John Doe"}
          </h1>
          
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            <span className="text-[#E31B23]">Premium Agent</span>
            <span>•</span>
            <span>58 Years Old</span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-2 bg-green-600 border border-white/10 rounded-sm"></span> 
              {nationality || "Brazil"}
            </span>
          </div>
        </div>
        
        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 pt-6 mt-6 border-t border-white/15">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-xl border border-white/15 text-white/40">
              <IconShieldCheck size={18} />
            </div>
            <div className="space-y-0.5">
              <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">License ID</p>
              <p className="text-white text-sm font-bold font-heading">{licenseId || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-xl border border-white/15 text-white/40">
              <IconCertificate size={18} />
            </div>
            <div className="space-y-0.5">
              <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Certifications</p>
              <p className="text-[#E31B23] text-sm font-bold font-heading">{certifications || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-xl border border-white/15 text-white/40">
              <IconPhone size={18} />
            </div>
            <div className="space-y-0.5">
              <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Contact</p>
              <p className="text-white text-sm font-bold font-heading">{contact || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-xl border border-white/15 text-white/40">
              <IconMail size={18} />
            </div>
            <div className="space-y-0.5">
              <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Email</p>
              <p className="text-white text-sm font-bold font-heading">{email || "—"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AgentProfile = () => {
  // Input fields state variables
  const [fullName, setFullName] = useState("John Doe");
  const [nationality, setNationality] = useState("Brazil");
  const [licenseId, setLicenseId] = useState("UK-AG-2024-001");
  const [dob, setDob] = useState("1975-01-01");
  const [contact, setContact] = useState("+55 11 9999-8888");
  const [email, setEmail] = useState("john.doe@example.com");
  const [experience, setExperience] = useState("");
  const [certifications, setCertifications] = useState("FIFA Licensed Agent");
  const [achievements, setAchievements] = useState("");
  const [bio, setBio] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");

  const [verificationStatus, setVerificationStatus] = useState("None");

  // Load configuration and data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("agent_fullName");
      const storedNationality = localStorage.getItem("agent_nationality");
      const storedLicenseId = localStorage.getItem("agent_licenseId");
      const storedDob = localStorage.getItem("agent_dob");
      const storedContact = localStorage.getItem("agent_contact");
      const storedEmail = localStorage.getItem("agent_email");
      const storedExperience = localStorage.getItem("agent_experience");
      const storedCertifications = localStorage.getItem("agent_certifications");
      const storedAchievements = localStorage.getItem("agent_achievements");
      const storedBio = localStorage.getItem("agent_bio");
      const storedCoverPhoto = localStorage.getItem("agent_coverPhoto");
      
      const storedStatus = localStorage.getItem("agent_profile_verification_status");

      if (storedName !== null) setFullName(storedName);
      if (storedNationality !== null) setNationality(storedNationality);
      if (storedLicenseId !== null) setLicenseId(storedLicenseId);
      if (storedDob !== null) setDob(storedDob);
      if (storedContact !== null) setContact(storedContact);
      if (storedEmail !== null) setEmail(storedEmail);
      if (storedExperience !== null) setExperience(storedExperience);
      if (storedCertifications !== null) setCertifications(storedCertifications);
      if (storedAchievements !== null) setAchievements(storedAchievements);
      if (storedBio !== null) setBio(storedBio);
      if (storedCoverPhoto !== null) setCoverPhoto(storedCoverPhoto);

      if (storedStatus !== null) setVerificationStatus(storedStatus);
    }
  }, []);

  // Compute profile completion percentage dynamically (11 fields total)
  const fields = [
    fullName,
    nationality,
    licenseId,
    dob,
    contact,
    email,
    experience,
    certifications,
    achievements,
    bio,
    coverPhoto
  ];
  const filledCount = fields.filter(
    (val) => val !== undefined && val !== null && val.toString().trim() !== ""
  ).length;
  const completion = Math.round((filledCount / 11) * 100);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File is too large. Max size is 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setCoverPhoto(base64);
        localStorage.setItem("agent_coverPhoto", base64);
        toast.success("Cover photo uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("agent_fullName", fullName);
    localStorage.setItem("agent_nationality", nationality);
    localStorage.setItem("agent_licenseId", licenseId);
    localStorage.setItem("agent_dob", dob);
    localStorage.setItem("agent_contact", contact);
    localStorage.setItem("agent_email", email);
    localStorage.setItem("agent_experience", experience);
    localStorage.setItem("agent_certifications", certifications);
    localStorage.setItem("agent_achievements", achievements);
    localStorage.setItem("agent_bio", bio);
    localStorage.setItem("agent_coverPhoto", coverPhoto);

    localStorage.setItem("agent_profile_completion", completion.toString());

    if (completion < 100) {
      localStorage.setItem("agent_profile_verification_status", "None");
      setVerificationStatus("None");
      toast.success("Profile draft saved successfully!");
      toast.warning("Please fill out all fields and upload a cover photo to request Admin verification.");
    } else {
      localStorage.setItem("agent_profile_verification_status", "Pending");
      setVerificationStatus("Pending");
      toast.success("Profile saved and completed at 100%!");
      toast.info("Verification request has been sent to the Admin.");
    }
  };

  const handleSimulateApprove = () => {
    localStorage.setItem("agent_profile_verification_status", "Approved");
    setVerificationStatus("Approved");
    toast.success("Simulation: Profile approved by admin!");
  };

  const handleSimulateReset = () => {
    localStorage.removeItem("agent_fullName");
    localStorage.removeItem("agent_nationality");
    localStorage.removeItem("agent_licenseId");
    localStorage.removeItem("agent_dob");
    localStorage.removeItem("agent_contact");
    localStorage.removeItem("agent_email");
    localStorage.removeItem("agent_experience");
    localStorage.removeItem("agent_certifications");
    localStorage.removeItem("agent_achievements");
    localStorage.removeItem("agent_bio");
    localStorage.removeItem("agent_coverPhoto");
    localStorage.setItem("agent_profile_verification_status", "None");
    localStorage.setItem("agent_profile_completion", "63");

    setFullName("John Doe");
    setNationality("Brazil");
    setLicenseId("UK-AG-2024-001");
    setDob("1975-01-01");
    setContact("+55 11 9999-8888");
    setEmail("john.doe@example.com");
    setExperience("");
    setCertifications("FIFA Licensed Agent");
    setAchievements("");
    setBio("");
    setCoverPhoto("");
    setVerificationStatus("None");
    toast.info("Simulation: Agent profile reset to default!");
  };

  return (
    <div className="p-2 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white font-orbitron tracking-wide mb-1">My Profile</h1>
          <p className="text-gray-400 text-sm font-medium">Manage your professional information</p>
        </div>
      </div>

      {verificationStatus === "Approved" && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-6 py-4 rounded-2xl flex items-center gap-3">
          <IconShieldCheck size={24} className="shrink-0" />
          <div>
            <p className="font-bold text-sm">Verified Account Status</p>
            <p className="text-xs text-emerald-400/80">Your profile has been fully verified and approved by the administrator.</p>
          </div>
        </div>
      )}

      {verificationStatus === "Pending" && (
        <div className="bg-orange-500/10 border border-orange-500/20 text-orange-400 px-6 py-4 rounded-2xl flex items-center gap-3">
          <IconAlertCircle size={24} className="shrink-0" />
          <div>
            <p className="font-bold text-sm">Verification Pending</p>
            <p className="text-xs text-orange-400/80">Your profile updates are currently being reviewed by the administrator.</p>
          </div>
        </div>
      )}

      {/* Personal Information */}
      <div className="bg-[#111111] border border-white/15 rounded-3xl p-6 md:p-8">
        <SectionHeader title="Personal Information" />
        
        <ProfileHero 
          completion={completion}
          verificationStatus={verificationStatus}
          fullName={fullName}
          nationality={nationality}
          licenseId={licenseId}
          certifications={certifications}
          contact={contact}
          email={email}
          coverPhoto={coverPhoto}
          onSimulateApprove={handleSimulateApprove}
          onSimulateReset={handleSimulateReset}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Form Fields */}
          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label className="text-gray-300 text-xs ml-1 font-medium">Full Name</Label>
              <Input 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="bg-[#0a0a0a] border-white/20 text-white rounded-xl h-11 focus:border-white/40 focus:ring-1 focus:ring-white/40" 
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300 text-xs ml-1 font-medium">Nationality</Label>
              <Input 
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                placeholder="Nationality"
                className="bg-[#0a0a0a] border-white/20 text-white rounded-xl h-11 focus:border-white/40 focus:ring-1 focus:ring-white/40" 
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300 text-xs ml-1 font-medium">License ID</Label>
              <Input 
                value={licenseId}
                onChange={(e) => setLicenseId(e.target.value)}
                placeholder="License ID"
                className="bg-[#0a0a0a] border-white/20 text-white rounded-xl h-11 focus:border-white/40 focus:ring-1 focus:ring-white/40" 
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300 text-xs ml-1 font-medium">Date of Birth</Label>
              <Input 
                type="date" 
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="bg-[#0a0a0a] border-white/20 text-white rounded-xl h-11 [color-scheme:dark] focus:border-white/40 focus:ring-1 focus:ring-white/40" 
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300 text-xs ml-1 font-medium">Contact</Label>
              <Input 
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Contact Number"
                className="bg-[#0a0a0a] border-white/20 text-white rounded-xl h-11 focus:border-white/40 focus:ring-1 focus:ring-white/40" 
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-300 text-xs ml-1 font-medium">Email</Label>
              <Input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="bg-[#0a0a0a] border-white/20 text-white rounded-xl h-11 focus:border-white/40 focus:ring-1 focus:ring-white/40" 
              />
            </div>
          </div>

          {/* Right Column: Upload Cover Photo */}
          <div className="space-y-1.5 flex flex-col">
            <Label className="text-gray-300 text-xs ml-1 font-medium">Upload Cover Photo</Label>
            <input 
              type="file" 
              id="cover-upload-input" 
              accept="image/*" 
              onChange={handlePhotoUpload} 
              className="hidden" 
            />
            <div 
              onClick={() => document.getElementById("cover-upload-input")?.click()}
              className="flex-1 min-h-[300px] border border-dashed border-white/15 rounded-2xl flex flex-col items-center justify-center text-gray-500 hover:border-white/30 hover:text-white transition-colors cursor-pointer bg-white/[0.01] relative overflow-hidden group/upload"
            >
              {coverPhoto ? (
                <>
                  <img 
                    src={coverPhoto} 
                    alt="Cover Preview" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/upload:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/upload:opacity-100 transition-opacity flex flex-col items-center justify-center text-white z-10">
                    <IconCloudUpload className="w-8 h-8 mb-2" stroke={1.5} />
                    <p className="text-[11px] font-black uppercase tracking-widest">Change Cover Photo</p>
                  </div>
                </>
              ) : (
                <>
                  <IconCloudUpload className="w-8 h-8 mb-3 opacity-50" stroke={1.5} />
                  <p className="text-[11px] font-medium opacity-50 uppercase tracking-widest">Upload Image</p>
                  <p className="text-[9px] text-gray-600 mt-1 uppercase tracking-wider">Click to browse files</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Professional Details */}
      <div className="bg-[#111111] border border-white/15 rounded-3xl p-6 md:p-8">
        <SectionHeader title="Professional Details" />
        <div className="space-y-5">
          <div className="space-y-1.5">
            <Label className="text-gray-300 text-xs ml-1 font-medium">Years of Experience</Label>
            <Input 
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="e.g. 5"
              className="bg-[#0a0a0a] border-white/20 text-white rounded-xl h-11 focus:border-white/40 focus:ring-1 focus:ring-white/40" 
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-gray-300 text-xs ml-1 font-medium">Certifications</Label>
            <Input 
              value={certifications}
              onChange={(e) => setCertifications(e.target.value)}
              placeholder="e.g. FIFA Licensed Agent, UEFA B License"
              className="bg-[#0a0a0a] border-white/20 text-white rounded-xl h-11 focus:border-white/40 focus:ring-1 focus:ring-white/40" 
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-gray-300 text-xs ml-1 font-medium">Achievements</Label>
            <Input 
              value={achievements}
              onChange={(e) => setAchievements(e.target.value)}
              placeholder="e.g. Represented 10+ professional players"
              className="bg-[#0a0a0a] border-white/20 text-white rounded-xl h-11 focus:border-white/40 focus:ring-1 focus:ring-white/40" 
            />
          </div>
        </div>
      </div>

      {/* Biography */}
      <div className="bg-[#111111] border border-white/15 rounded-3xl p-6 md:p-8">
        <SectionHeader title="Biography" />
        <div className="space-y-1.5">
          <Label className="text-gray-300 text-xs ml-1 font-medium">Professional Bio</Label>
          <Textarea 
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Introduce yourself and your sports agency work..."
            className="min-h-[120px] bg-[#0a0a0a] border-white/20 text-white rounded-xl resize-none p-4 text-sm focus:border-white/40 focus:ring-1 focus:ring-white/40" 
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button 
          onClick={handleSave}
          className="bg-[#E31B23] hover:bg-[#C2181F] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-[#E31B23]/20 hover:scale-[1.02] active:scale-[0.98]"
        >
          Save Profile & Request Verification
        </button>
      </div>
    </div>
  );
};

export default AgentProfile;
