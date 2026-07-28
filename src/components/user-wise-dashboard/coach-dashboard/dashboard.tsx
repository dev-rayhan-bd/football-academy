"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks/reduxHooks";
import { CoachContext } from "@/app/dashboard/coach/layout";
import {
  IconUser,
  IconBallFootball,
  IconUsers,
  IconChartBar,
  IconSettings,
  IconDownload,
  IconShare,
  IconEye,
  IconHeart,
  IconPlayerPlay,
  IconPlus,
  IconExternalLink,
  IconCircleCheck
} from "@tabler/icons-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";
import { DashboardTable, Column } from "@/components/dashboard/dashboard-table";
import { TableActionButtons } from "@/components/dashboard/table-action-buttons";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";

// Mock Data
const profileAnalysisData = [
  { subject: 'Tactics', A: 97, fullMark: 100 },
  { subject: 'Leadership', A: 88, fullMark: 100 },
  { subject: 'Communication', A: 92, fullMark: 100 },
  { subject: 'Adaptability', A: 98, fullMark: 100 },
  { subject: 'Discipline', A: 87, fullMark: 100 },
  { subject: 'Development', A: 96, fullMark: 100 },
];

const tournamentStatsData = [
  { name: 'Win', value: 38, color: '#A80000' },
  { name: 'Los', value: 25, color: '#FF1A1A' },
  { name: 'Draw', value: 21, color: '#FF9999' },
  { name: 'Runner Up', value: 9, color: '#FF4D4D' },
  { name: 'Champion', value: 7, color: '#FFEBEB' },
];

const pendingReports = [
  { id: 1, name: "Marcus Silva", position: "Forward", rating: 92, avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "David Chen", position: "Midfielder", rating: 88, avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Alex Jonson", position: "Defender", rating: 85, avatar: "https://i.pravatar.cc/150?u=3" },
];

const clubsInterested = [
  { id: 1, name: "Manchester City", logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg", action: "Viewed your profile" },
  { id: 2, name: "Liverpool FC", logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg", action: "Viewed your profile" },
  { id: 3, name: "Chelsea FC", logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg", action: "Viewed your profile" },
];

const teamData = [
  { id: 1, name: "Marcus Silva", position: "Forward", rating: 9.2, matches: 28, goals: 15, assists: 8, status: "Active", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "David Chen", position: "Midfielder", rating: 8.8, matches: 30, goals: 5, assists: 12, status: "Active", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Alex Jonson", position: "Defender", rating: 8.5, matches: 29, goals: 2, assists: 3, status: "Injured", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "James Brown", position: "Goalkeeper", rating: 9.0, matches: 30, goals: 0, assists: 0, status: "Active", avatar: "https://i.pravatar.cc/150?u=4" },
];

import { useCoach } from "@/lib/hooks/useCoach";

export const CoachDashboard = () => {
  const { hasAcademy } = useContext(CoachContext);
  const { coachData } = useCoach();
  const router = useRouter();
  const requests = useAppSelector(state => state.reports.requests);

  const teamColumns: Column<typeof teamData[0]>[] = [
    {
      header: "Name",
      key: "name",
      render: (player) => (
        <div className="flex items-center gap-3">
          <img src={player.avatar} className="w-10 h-10 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={player.name} />
          <div>
            <div className="text-sm font-bold text-white">{player.name}</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest">{player.position}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Rating",
      key: "rating",
      align: "center",
      render: (player) => <span className="text-sm font-black text-[#E31B23] italic">{player.rating}</span>,
    },
    {
      header: "Matches",
      key: "matches",
      align: "center",
      cellClassName: "text-sm text-gray-300",
    },
    {
      header: "Goals",
      key: "goals",
      align: "center",
      cellClassName: "text-sm text-gray-300",
    },
    {
      header: "Assists",
      key: "assists",
      align: "center",
      cellClassName: "text-sm text-gray-300",
    },
    {
      header: "Status",
      key: "status",
      render: (player) => (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${player.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          {player.status}
        </span>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      align: "right",
      render: (player) => (
        <TableActionButtons
          onView={() => router.push(`/dashboard/coach/game-reports?playerId=${player.id}`)}
          viewColor="text-[#E31B23] hover:text-white border-[#E31B23]/20 hover:border-[#E31B23] bg-[#E31B23]/5 hover:bg-[#E31B23]"
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-9 space-y-6">
          {/* Hero Section */}
          <DashboardHero
            backgroundImage="/stadium-night.jpg"
            rating={58} // In CoachBioSection it was [58]
            badgeText={`${coachData.transferStatus} Coach`}
            title={coachData.fullName}
            subtitle={coachData.coachType}
            details={[
              { text: coachData.age ? coachData.age.replace(/\D/g, "") : "" },
              { text: coachData.birthCountry }
            ]}
            contacts={[
              { type: "club", label: "Current Club", value: coachData.agency },
              { type: "phone", label: "Contact", value: coachData.phone },
              { type: "license", label: "Validation Status", value: "UEFA A License" },
              { type: "email", label: "Email", value: coachData.email },
            ]}
            characterImage={coachData.coachImage}
          />

          {/* Analytics Section */}
          <div className="p-6 rounded-2xl border border-white/20 bg-[#0D0D0D]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-white">Analytics</h2>
                <p className="text-sm text-gray-500">Deep insights into coaching performance and leadership</p>
              </div>
              <button className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-xs font-bold text-white hover:bg-white/20 transition-colors">
                Full Analytics
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-[300px]">
                <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Coach Profile Analysis</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                    { subject: 'Tactics', A: 97, fullMark: 100 },
                    { subject: 'Leadership', A: 88, fullMark: 100 },
                    { subject: 'Communication', A: 92, fullMark: 100 },
                    { subject: 'Adaptability', A: 98, fullMark: 100 },
                    { subject: 'Discipline', A: 87, fullMark: 100 },
                    { subject: 'Development', A: 96, fullMark: 100 },
                  ]}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10 }} />
                    <Radar
                      name="Coach"
                      dataKey="A"
                      stroke="#E31B23"
                      fill="#E31B23"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="h-[350px] pb-6">
                <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Tournament Stats</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Win', value: coachData.seasonStats.wins, color: '#A80000' },
                        { name: 'Matches', value: coachData.seasonStats.matches, color: '#FF1A1A' },
                        { name: 'Clean Sheets', value: coachData.seasonStats.cleanSheets, color: '#FF9999' },
                        { name: 'Loss', value: coachData.seasonStats.losses, color: '#FF4D4D' },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      labelLine={false}
                      label={({
                        cx,
                        cy,
                        midAngle,
                        innerRadius,
                        outerRadius,
                        percent,
                        index,
                      }) => {
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
                        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                        return (
                          <text
                            x={x}
                            y={y}
                            fill={index === 4 ? "#000" : "#fff"}
                            textAnchor="middle"
                            dominantBaseline="central"
                            className="text-[10px] font-black italic"
                          >
                            {`${(percent * 100).toFixed(0)}%`}
                          </text>
                        );
                      }}
                    >
                      {tournamentStatsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#111', border: '1px solid #333', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      align="center"
                      iconType="square"
                      iconSize={8}
                      wrapperStyle={{
                        paddingTop: '20px',
                        paddingBottom: '10px'
                      }}
                      formatter={(value) => <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* My CV Section */}
          <div className="p-8 rounded-2xl border border-white/20 bg-[#0D0D0D]">
            <h2 className="text-xl font-bold text-white mb-6">My CV</h2>
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
              {/* Progress Card */}
              <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] w-full lg:w-auto min-w-[200px]">
                <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Profile Completion</span>
                <div className="text-4xl font-black text-[#E31B23] italic mt-1 mb-3">85%</div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#E31B23] rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              {/* Info and Checklist */}
              <div className="flex-1 space-y-6">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {[
                    { label: 'Personal Info', checked: true },
                    { label: 'Key Accomplishments', checked: true },
                    { label: 'Major Trophies', checked: true },
                    { label: 'Key Skills', checked: true },
                    { label: 'Courses', checked: true }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <IconCircleCheck size={18} className="text-green-500" />
                      <span className="text-sm font-bold text-white">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <div className="w-1 h-12 bg-white/40 rounded-full" />
                  <div>
                    <h4 className="text-base font-bold text-white mb-1 italic">Silver</h4>
                    <p className="text-xs text-gray-500 max-w-md leading-relaxed">
                      Your CV meets silver standards and is ready to share with top clubs and agents.
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-2 w-full lg:w-auto">
                <button className="px-6 py-2.5 rounded-lg border border-white/10 bg-white/10 text-xs font-bold text-white hover:bg-white/20 transition-all text-center">
                  Download PDF
                </button>
                <button className="px-6 py-2.5 rounded-lg border border-white/10 bg-white/10 text-xs font-bold text-white hover:bg-white/20 transition-all text-center">
                  Share Agent
                </button>
              </div>
            </div>
          </div>

          {/* Media Sections */}
          <div className="space-y-6">
            <MediaBlock title="My Images" type="image" items={[
              { title: "vs Arsenal U19", date: "Mar 15, 2024", views: 234, likes: 97, img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400" },
              { title: "vs Chelsea U19", date: "Mar 10, 2024", views: 189, likes: 45, img: "https://images.unsplash.com/photo-1526232762682-d2f5f7144f2a?q=80&w=400" },
              { title: "vs Liverpool U19", date: "Mar 5, 2024", views: 312, likes: 227, img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400" },
              { title: "Training Highlights", date: "Feb 28, 2024", views: 156, likes: 62, img: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=400" },
            ]} />

            <MediaBlock title="My Videos" type="video" items={[
              { title: "vs Arsenal U19", date: "Mar 15, 2024", views: 234, likes: 97, img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400" },
              { title: "vs Chelsea U19", date: "Mar 10, 2024", views: 189, likes: 45, img: "https://images.unsplash.com/photo-1526232762682-d2f5f7144f2a?q=80&w=400" },
              { title: "vs Liverpool U19", date: "Mar 5, 2024", views: 312, likes: 227, img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400" },
              { title: "Training Highlights", date: "Feb 28, 2024", views: 156, likes: 62, img: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=400" },
            ]} />
          </div>

          {/* Conditional My Teams Section */}
          {hasAcademy && (
            <div className="p-6 rounded-2xl border border-white/20 bg-[#0D0D0D]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-white">My Teams</h2>
                  <p className="text-sm text-gray-500">Professional players under your management</p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-xs font-bold text-white hover:bg-white/20 transition-colors flex items-center gap-2">
                  <IconPlus size={16} /> Add Player
                </button>
              </div>

              <DashboardTable 
                columns={teamColumns} 
                data={teamData} 
                className="border-white/20" 
                onRowClick={(player) => router.push(`/dashboard/coach/game-reports?playerId=${player.id}`)}
              />
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Pending Game Reports */}
          <section className="p-6 rounded-2xl border border-white/20 bg-[#0D0D0D]">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-[#E31B23]/10 text-[#E31B23]">
                <IconBallFootball size={20} />
              </div>
              <h2 className="text-sm font-bold text-white uppercase tracking-widest">Pending Game Reports</h2>
            </div>
            <div className="space-y-4">
              {requests.filter(req => req.status === 'Pending').map((req) => (
                <div 
                  key={req.id} 
                  onClick={() => router.push(`/dashboard/coach/game-reports/create?playerId=${req.playerId}&requestId=${req.id}`)}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/10 border border-white/20 group hover:border-[#E31B23]/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img src={teamData.find(p => p.id === req.playerId)?.avatar || "https://i.pravatar.cc/150?u=1"} className="w-10 h-10 rounded-full object-cover" alt={req.playerName} />
                    <div>
                      <div className="text-sm font-bold text-white">{req.playerName}</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest">{req.playerPosition}</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">CREATE</div>
                </div>
              ))}
            </div>
          </section>

          {/* Clubs Interested */}
          <section className="p-6 rounded-2xl border border-white/20 bg-[#0D0D0D]">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-[#E31B23]/10 text-[#E31B23]">
                <IconHeart size={20} />
              </div>
              <h2 className="text-sm font-bold text-white uppercase tracking-widest">Clubs Interested</h2>
            </div>
            <div className="space-y-4">
              {clubsInterested.map((club) => (
                <div key={club.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/10 border border-white/20 group hover:bg-white/[0.1] transition-colors">
                  <div className="w-10 h-10 p-1 rounded-lg bg-white/10 flex items-center justify-center">
                    <img src={club.logo} className="w-full h-full object-contain" alt={club.name} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{club.name}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest">{club.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Stats */}
          <section className="p-6 rounded-2xl border border-white/20 bg-[#0D0D0D]">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-6 italic">Quickk stats</h2>
            <div className="space-y-4">
              {[
                { label: "Matches Coached", value: (coachData.seasonStats.matches || 0).toString(), color: "text-white" },
                { label: "Total Wins", value: (coachData.seasonStats.wins || 0).toString(), color: "text-red-500" },
                { label: "Losses", value: Math.max(2, coachData.seasonStats.losses || 0).toString(), color: "text-red-500" },
                { label: "Draws", value: Math.max(2, coachData.seasonStats.draws || 0).toString(), color: "text-blue-500" },
                { label: "Clean Sheets", value: (coachData.seasonStats.cleanSheets || 0).toString(), color: "text-green-500" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</span>
                  <span className={`text-sm font-black italic ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const MediaBlock = ({ title, type, items }: { title: string, type: 'image' | 'video', items: any[] }) => (
  <div className="p-6 rounded-2xl border border-white/20 bg-[#0D0D0D]">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-sm text-gray-500">Match highlights & training</p>
      </div>
      <button className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-xs font-bold text-white hover:bg-white/20 transition-colors flex items-center gap-2">
        {type === 'image' ? <IconPlus size={16} /> : <IconPlayerPlay size={16} />}
        {type === 'image' ? 'Upload Image' : 'Upload Video'}
      </button>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, idx) => (
        <div key={idx} className="group relative rounded-xl overflow-hidden border border-white/20 bg-[#111]">
          <div className="relative aspect-video overflow-hidden">
            <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60" alt={item.title} />
            {type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#E31B23] flex items-center justify-center shadow-2xl">
                  <IconPlayerPlay size={20} className="text-white fill-current ml-0.5" />
                </div>
              </div>
            )}
          </div>
          <div className="p-3">
            <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
            <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest mt-1">{item.date}</p>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                <IconEye size={12} /> {item.views}
              </div>
              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                <IconHeart size={12} className="text-[#E31B23]" /> {item.likes}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
