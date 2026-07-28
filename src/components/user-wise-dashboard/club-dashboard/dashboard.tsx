"use client";
import React from "react";
import {
  IconSchool,
  IconAffiliate,
  IconUsers,
  IconTrophy,
  IconHeart,
  IconShare,
  IconEye,
  IconBell,
  IconPlayerPlay,
  IconUpload
} from "@tabler/icons-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { DashboardTable, Column } from "@/components/dashboard/dashboard-table";
import { TableActionButtons } from "@/components/dashboard/table-action-buttons";
import {
  DashboardStatCard,
  DashboardSection
} from "@/components/dashboard/dashboard-elements";

const stats = [
  { label: "Players", value: "156", icon: IconUsers },
  { label: "Coaches", value: "12", icon: IconTrophy },
  { label: "Liked CVs", value: "42", icon: IconHeart },
  { label: "Profile share", value: "18", icon: IconShare },
];

const timelineData = [
  { name: 'Jan-Feb', players: 45, coaches: 12 },
  { name: 'Mar-Apr', players: 62, coaches: 15 },
  { name: 'May-Jun', players: 75, coaches: 18 },
  { name: 'Jul-Aug', players: 70, coaches: 16 },
  { name: 'Sept-Oct', players: 85, coaches: 22 },
  { name: 'Nov-Dec', players: 98, coaches: 25 },
];

const distributionData = [
  { name: 'Midfielder', value: 80 },
  { name: 'Striker', value: 65 },
  { name: 'Defender', value: 92, highlight: true },
  { name: 'Goalkeeper', value: 75 },
  { name: 'Winger', value: 58 },
];

const staffData = [
  { id: 1, teamName: "Santos U17", ageGroup: "Under 17", scout: "Carlos Silva", players: 22, status: "Active" },
  { id: 2, teamName: "Santos U19", ageGroup: "Under 19", scout: "Roberto Lima", players: 18, status: "Active" },
  { id: 3, teamName: "Santos U16", ageGroup: "Under 16", scout: "Alex Jonson", players: 16, status: "Pending" },
  { id: 4, teamName: "Santos U18", ageGroup: "Under 18", scout: "James Brown", players: 20, status: "Active" },
];

const coachData = [
  { id: 1, name: "Eduardo Ricci", role: "Head Coach", team: "Santos U19", experience: "12 yrs", status: "Active" },
  { id: 2, name: "Marco Fernandez", role: "Assistant Coach", team: "Santos U17", experience: "8 yrs", status: "Active" },
  { id: 3, name: "Lucas Oliveira", role: "Fitness Coach", team: "Santos U18", experience: "5 yrs", status: "Active" },
  { id: 4, name: "Rafael Costa", role: "Goalkeeping Coach", team: "Santos U16", experience: "10 yrs", status: "Pending" },
];

const favPlayerData = [
  { id: 1, name: "Marcus Silva", position: "Forward", rating: 9.2, club: "Manchester Academy", country: "Brazil", age: 19, avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "David Chen", position: "Midfielder", rating: 8.8, club: "Chelsea Youth", country: "England", age: 18, avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Alex Jonson", position: "Defender", rating: 8.5, club: "Barcelona B", country: "Spain", age: 20, avatar: "https://i.pravatar.cc/150?u=3" },
];

const favCoachData = [
  { id: 1, name: "Eduardo Ricci", role: "Head Coach", speciality: "Attacking", experience: "12 yrs", club: "Santos FC", country: "Brazil", avatar: "https://i.pravatar.cc/150?u=10" },
  { id: 2, name: "Marco Fernandez", role: "Assistant Coach", speciality: "Defending", experience: "8 yrs", club: "Real Madrid B", country: "Spain", avatar: "https://i.pravatar.cc/150?u=11" },
  { id: 3, name: "Lucas Oliveira", role: "Fitness Coach", speciality: "Physical", experience: "5 yrs", club: "PSG Academy", country: "France", avatar: "https://i.pravatar.cc/150?u=12" },
];

const mediaData = [
  { id: 1, title: "vs Chelsea U19", date: "Mar 10, 2024", views: 189, likes: 45, image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400" },
  { id: 2, title: "Training Highlights", date: "Feb 28, 2024", views: 156, likes: 62, image: "https://images.unsplash.com/photo-1526232759583-26f1dd3f7af3?q=80&w=400" },
  { id: 3, title: "vs Liverpool U19", date: "Mar 5, 2024", views: 312, likes: 227, image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=400" },
  { id: 4, title: "vs Liverpool U19", date: "Mar 5, 2024", views: 312, likes: 227, image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=400" },
];

export const ClubDashboard = () => {
  const staffColumns: Column<typeof staffData[0]>[] = [
    { header: "Team Name", key: "teamName", cellClassName: "text-sm text-gray-400" },
    { header: "Age Group", key: "ageGroup", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Scout", key: "scout", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Players", key: "players", align: "center", cellClassName: "text-sm text-gray-400" },
    {
      header: "Status",
      key: "status",
      align: "center",
      render: (item) => (
        <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${item.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
          }`}>
          {item.status}
        </span>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      align: "right",
      render: () => <TableActionButtons onView={() => { }} />
    },
  ];

  const coachColumns: Column<typeof coachData[0]>[] = [
    { header: "Name", key: "name", cellClassName: "text-sm text-white font-semibold" },
    { header: "Role", key: "role", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Team", key: "team", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Experience", key: "experience", align: "center", cellClassName: "text-sm text-gray-400" },
    {
      header: "Status",
      key: "status",
      align: "center",
      render: (item) => (
        <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${item.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
          }`}>
          {item.status}
        </span>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      align: "right",
      render: () => <TableActionButtons onView={() => { }} />
    },
  ];

  const favPlayerColumns: Column<typeof favPlayerData[0]>[] = [
    {
      header: "Name",
      key: "name",
      render: (p) => (
        <div className="flex items-center gap-3">
          <img src={p.avatar} className="w-10 h-10 rounded-full object-cover" alt="avatar" />
          <div>
            <div className="text-sm font-bold text-white">{p.name}</div>
            <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{p.position}</div>
          </div>
        </div>
      ),
    },
    { header: "Rating", key: "rating", align: "center", render: (p) => <span className="text-sm font-black text-red-600 italic">{p.rating}</span> },
    { header: "Club", key: "club", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Country", key: "country", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Age", key: "age", align: "center", cellClassName: "text-sm text-gray-400" },
    {
      header: "Actions",
      key: "actions",
      align: "right",
      render: () => <TableActionButtons onView={() => {}} onHeart={() => {}} onShare={() => {}} />,
    },
  ];

  const favCoachColumns: Column<typeof favCoachData[0]>[] = [
    {
      header: "Name",
      key: "name",
      render: (c) => (
        <div className="flex items-center gap-3">
          <img src={c.avatar} className="w-10 h-10 rounded-full object-cover" alt="avatar" />
          <div>
            <div className="text-sm font-bold text-white">{c.name}</div>
            <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{c.role}</div>
          </div>
        </div>
      ),
    },
    { header: "Speciality", key: "speciality", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Club", key: "club", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Country", key: "country", align: "center", cellClassName: "text-sm text-gray-400" },
    { header: "Experience", key: "experience", align: "center", cellClassName: "text-sm text-gray-400" },
    {
      header: "Actions",
      key: "actions",
      align: "right",
      render: () => <TableActionButtons onView={() => {}} onHeart={() => {}} onShare={() => {}} />,
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Section - Main Content */}
        <div className="lg:col-span-9 space-y-8">
          {/* Hero Section */}
          <div className="rounded-3xl overflow-hidden border border-white/10">
            <DashboardHero
              backgroundImage="/barcelona-la-liga-champions.avif"
              badgeText="Active Club"
              title="FC Barcelona"
              subtitle="Premium Club"
              details={[
                { text: "Est. 1899" },
                { text: "Spain" }
              ]}
              contacts={[
                { type: "phone", label: "Contact", value: "+34 902 1899 00" },
                { type: "email", label: "Email", value: "oab@fcbarcelona.cat" },
              ]}
              logoImage="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_(crest).svg"
            />
          </div>

          {/* Stat Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <DashboardStatCard key={idx} {...stat} icon={<stat.icon size={20} />} />
            ))}
          </div>

          {/* Analytics */}
          <DashboardSection
            title="Analytics"
            action={<button className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Full Analytics</button>}
          >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-4">
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 italic">Players & Coaches Monitored</h4>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#444', fontSize: 10 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#444', fontSize: 10 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '12px' }} />
                      <Line type="monotone" name="Players Monitored" dataKey="players" stroke="#E31B23" strokeWidth={3} dot={{ r: 4, fill: '#E31B23' }} />
                      <Line type="monotone" name="Coaches Monitored" dataKey="coaches" stroke="#444" strokeWidth={2} dot={{ r: 3, fill: '#444' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 italic">Position Interest Distribution</h4>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={distributionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#444', fontSize: 10 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#444', fontSize: 10 }} />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {distributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.highlight ? "#fff" : "#333"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </DashboardSection>

          {/* Coaches & Players */}
          <DashboardSection title="Coaches & Players">
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-6">Players</p>
            <DashboardTable columns={staffColumns} data={staffData} className="border-white/10" />
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-10 mb-6">Coaches</p>
            <DashboardTable columns={coachColumns} data={coachData} className="border-white/10" />
          </DashboardSection>

          {/* Favourites */}
          <DashboardSection title="Favourites">
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-6">Favourite Players</p>
            <DashboardTable columns={favPlayerColumns} data={favPlayerData} className="border-white/10" />
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-10 mb-6">Favourite Coaches</p>
            <DashboardTable columns={favCoachColumns} data={favCoachData} className="border-white/10" />
          </DashboardSection>

          {/* Images */}
          <DashboardSection
            title="Images"
            action={<button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"><IconUpload size={16} /> Upload Image</button>}
          >
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-8">Match highlights & training</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mediaData.map((item) => (
                <MediaCard key={item.id} {...item} />
              ))}
            </div>
          </DashboardSection>

          {/* Videos */}
          <DashboardSection
            title="Videos"
            action={<button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"><IconUpload size={16} /> Upload Video</button>}
          >
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-8">Match highlights & training</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mediaData.map((item) => (
                <MediaCard key={item.id} {...item} isVideo />
              ))}
            </div>
          </DashboardSection>
        </div>

        {/* Right Section - Recent Activity */}
        <div className="hidden lg:block lg:col-span-3 sticky top-8 h-fit">
          <div className="p-8 rounded-2xl border border-white/20 bg-[#0D0D0D]">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                <IconBell size={24} />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight italic">Recent Activity</h3>
            </div>

            <div className="space-y-6">
              <ActivityItem
                icon={<IconHeart size={18} />}
                text="John Smith viewed CV for Marcus Johnson"
                time="2 hours ago"
              />
              <ActivityItem
                icon={<IconShare size={18} />}
                text="Profile shared: David Martinez"
                time="5 hours ago"
              />
              <ActivityItem
                icon={<IconEye size={18} />}
                text="New scout view from Manchester United"
                time="8 hours ago"
              />
              <ActivityItem
                icon={<IconUsers size={18} />}
                text="Team Santos U17 updated roster"
                time="1 day ago"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityItem = ({ icon, text, time }: { icon: React.ReactNode, text: string, time: string }) => (
  <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] flex gap-4 hover:border-red-500/30 transition-all group">
    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-red-500/10 group-hover:text-red-500 transition-colors">
      {icon}
    </div>
    <div>
      <div className="text-xs font-bold text-white leading-tight mb-1">{text}</div>
      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{time}</div>
    </div>
  </div>
);

const MediaCard = ({ title, date, views, likes, image, isVideo }: { title: string, date: string, views: number, likes: number, image: string, isVideo?: boolean }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden group hover:border-[#E31B23]/30 transition-all">
    <div className="relative aspect-video overflow-hidden">
      <img src={image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={title} />
      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#E31B23] group-hover:scale-110 transition-all">
            <IconPlayerPlay size={20} fill="currentColor" />
          </div>
        </div>
      )}
    </div>
    <div className="p-5">
      <div className="text-sm font-bold text-white mb-1">{title}</div>
      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">{date}</div>
      <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
        <span className="flex items-center gap-1.5"><IconEye size={14} className="text-gray-600" /> {views}</span>
        <span className="flex items-center gap-1.5"><IconHeart size={14} className="text-gray-600" /> {likes}</span>
      </div>
    </div>
  </div>
);
