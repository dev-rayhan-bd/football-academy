"use client";
import React from "react";
import { 
  IconDownload, 
  IconCircleCheck, 
  IconPencil, 
  IconPlus,
  IconCalendar,
  IconTrophy,
  IconCertificate,
  IconBriefcase
} from "@tabler/icons-react";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";

export const MyCV = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">My CV</h1>
          <p className="text-gray-500 text-sm mt-2">Your professional football profile</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
          <IconDownload size={18} /> Download PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Status & Career */}
        <div className="lg:col-span-4 space-y-6">
          {/* Completion Status */}
          <div className="p-6 rounded-2xl border border-white/20 bg-[#0D0D0D]">
            <h3 className="text-sm font-black text-white uppercase tracking-widest italic mb-6">Completion Status</h3>
            <div className="text-4xl font-black text-[#E31B23] italic mb-4">59%</div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-[#E31B23] rounded-full" style={{ width: '59%' }} />
            </div>
            <p className="text-[10px] text-gray-500 uppercase font-bold leading-relaxed">
              Complete all sections to unlock Gold tier status
            </p>
          </div>

          {/* Tier Badge */}
          <div className="p-6 rounded-2xl border border-white/20 bg-[#0D0D0D]">
            <div className="flex gap-4">
              <div className="w-1.5 h-10 bg-white/40 rounded-full" />
              <div>
                <h4 className="text-base font-black text-white italic uppercase tracking-tight">Silver</h4>
                <p className="text-[10px] text-gray-500 uppercase font-bold mt-1 leading-relaxed">
                  Your CV meets Silver standards and is ready to share with top clubs and agents.
                </p>
              </div>
            </div>
          </div>

          {/* Career Journey */}
          <div className="p-6 rounded-2xl border border-white/20 bg-[#0D0D0D]">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-[#E31B23]/10 text-[#E31B23]">
                <IconBriefcase size={20} />
              </div>
              <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Career Journey</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { name: "Manchester City", role: "U6-U8", years: "2005-2008", type: "FREE TRANSFER", logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" },
                { name: "Liverpool FC", role: "U9-U12", years: "2007-2010", type: "LOAN TRANSFER", logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" },
                { name: "Chelsea FC", role: "U12-U16", years: "2012-2015", type: "$ 250000.00", logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg" },
              ].map((club, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex items-start gap-4 group hover:border-[#E31B23]/30 transition-all">
                  <img src={club.logo} className="w-10 h-10 object-contain" alt={club.name} />
                  <div>
                    <div className="text-sm font-bold text-white">{club.name}</div>
                    <div className="text-[10px] text-gray-500 uppercase font-bold mt-0.5">{club.role}</div>
                    <div className="text-[10px] text-gray-500 uppercase font-bold">{club.years}</div>
                    <div className="text-[10px] text-[#E31B23] font-black uppercase mt-1">{club.type}</div>
                  </div>
                </div>
              ))}
              
              <button className="w-full py-3 rounded-xl border border-white/10 bg-white/5 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <IconPlus size={16} /> Add
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Form Sections */}
        <div className="lg:col-span-8 space-y-8">
          {/* Personal Information */}
          <Section title="Personal Information">
            <div className="space-y-8">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <DashboardHero 
                  backgroundImage="/stadium-night.jpg"
                  rating={74}
                  badgeText="Active Coach"
                  title="John Doe"
                  subtitle="Premier League Academy"
                  details={[
                    { text: "58 Years Old" },
                    { text: "Brazil" }
                  ]}
                  contacts={[
                    { type: "club", label: "Current Club", value: "Santos FC Academy" },
                    { type: "phone", label: "Contact", value: "+44 7700 900000" },
                    { type: "license", label: "Validation Status", value: "UEFA A License" },
                    { type: "email", label: "Email", value: "john.doe@k10football.com" },
                  ]}
                  characterImage="/coach-image.png"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <InputField label="Full Name" value="John Doe" />
                  <InputField label="Nationality" value="Brazil" />
                  <InputField label="Email" value="john.doe@k10football.com" />
                  <InputField label="Date of Birth" value="01/01/1975" isDate />
                  <InputField label="Contact" value="+44 7700 900000" />
                  <InputField label="Languages" value="SPANISH, PORTUGUESE, ENGLISH" />
                </div>
                
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Upload image</span>
                  <div className="flex-1 rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center p-8 group hover:border-[#E31B23]/30 transition-all">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 mb-4 group-hover:bg-[#E31B23]/10 group-hover:text-[#E31B23] transition-all">
                      <IconPlus size={24} />
                    </div>
                    <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Upload Image</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] italic mb-6">Transfer Info</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InputField label="Football Agent Contract" value="+44 7700 900000" />
                  <InputField label="Transfer Fees" value="$ 50000.00" />
                  <InputField label="Salary" value="$ 20000.00" />
                </div>
              </div>
            </div>
          </Section>

          {/* Cup Played */}
          <Section title="Cup played">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="2021 K10 football League" value="K10 football FC" />
              <InputField label="2019 K10 football Cup" value="K10 football FC" />
              <InputField label="2018 K10 football Cup" value="K10 football FC" />
              <InputField label="2017 K10 football Championship" value="K10 football FC" />
              <InputField label="2016 K10 football Championship" value="K10 football FC" />
              <InputField label="2015 K10 football Cup" value="K10 football FC" />
            </div>
          </Section>

          {/* Key Accomplishments */}
          <Section title="Key Accomplishments">
            <div className="h-24 rounded-xl border border-white/5 bg-white/[0.02]" />
          </Section>

          {/* Major Trophies */}
          <Section title="Major Trophies">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="K10 football Championship" value="3" />
              <InputField label="K10 football Cup" value="7" />
              <InputField label="K10 football League" value="12" />
              <InputField label="K10 football Youth Cup" value="5" />
              <InputField label="Gbn Cfn B: Fgngn Vg Vn" value="1" />
              <InputField label="Gbn Cfn B: 10ngn Vg Vn" value="12" />
            </div>
          </Section>

          {/* Key Skills */}
          <Section title="Key Skills">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="" value="Youth Development" />
              <InputField label="" value="leadership" />
              <InputField label="" value="Attacking" />
              <InputField label="" value="Positivity" />
            </div>
          </Section>

          {/* Courses & Certifications */}
          <Section title="Courses & Certifications">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="UEFA Pro" value="UEFA- 2023" />
              <InputField label="AFC A License" value="AFC- 2022" />
              <InputField label="FA Level 3" value="The FA- 2021" />
              <InputField label="Sport Psychology" value="IOC- 2020" />
              <InputField label="Strength & Conditioning" value="NSCA- 2019" />
              <InputField label="Youth Development" value="FIFA- 2018" />
            </div>
          </Section>

          {/* Formation Section */}
          <div className="p-8 rounded-2xl border border-white/20 bg-[#0D0D0D]">
            <h3 className="text-xl font-black text-white italic uppercase tracking-tight mb-8">Formation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormationCard title="2-2-3-3" subtitle="High Press" wins="45 Wins" usage="60%Usage" image="/formation-field.png" />
              <FormationCard title="2-2-3-3" subtitle="Possession" wins="45 Wins" usage="60%Usage" image="/formation-field.png" />
              <FormationCard title="3-2-2-3" subtitle="Counter-Attack" wins="45 Wins" usage="60%Usage" image="/formation-field.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="p-8 rounded-2xl border border-white/20 bg-[#0D0D0D]">
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <IconCircleCheck className="text-green-500" size={24} />
        <h3 className="text-xl font-black text-white italic uppercase tracking-tight">{title}</h3>
      </div>
      <button className="p-2 rounded-lg border border-white/10 bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all">
        <IconPencil size={18} />
      </button>
    </div>
    {children}
  </div>
);

const InputField = ({ label, value, isDate }: { label: string, value: string, isDate?: boolean }) => (
  <div className="space-y-2">
    {label && <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{label}</label>}
    <div className="relative">
      <input 
        type="text" 
        readOnly 
        value={value} 
        className="w-full h-12 bg-white/[0.02] border border-white/10 rounded-xl px-4 text-sm font-bold text-white focus:outline-none focus:border-[#E31B23]/50 transition-all" 
      />
      {isDate && <IconCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />}
    </div>
  </div>
);

const FormationCard = ({ title, subtitle, wins, usage, image }: { title: string, subtitle: string, wins: string, usage: string, image: string }) => (
  <div className="rounded-[32px] border border-white/10 bg-[#050505] overflow-hidden group hover:border-[#E31B23]/30 transition-all flex flex-col h-full">
    <div className="relative aspect-[4/3] w-full overflow-hidden">
      <img 
        src={image} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        alt="Formation" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-20" />
    </div>
    <div className="p-8 text-center flex-1 flex flex-col justify-center bg-[#080808]">
      <div className="text-4xl font-bold text-white mb-2 tracking-tight">{title}</div>
      <div className="text-sm text-gray-500 font-medium mb-6">{subtitle}</div>
      <div className="flex items-center justify-center gap-4 text-lg font-bold text-white">
        <span>{wins}</span>
        <span>{usage}</span>
      </div>
    </div>
  </div>
);
