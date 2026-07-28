"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  IconArrowLeft,
  IconPlus,
  IconSearch,
  IconTrash,
  IconCheck,
  IconUsers,
  IconTrophy,
  IconBallFootball
} from "@tabler/icons-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import {
  getTeams,
  saveTeams,
  COACH_POOL,
  PLAYER_POOL,
  Team,
  Coach,
  Player
} from "./team-data-store";

interface TeamDetailsProps {
  teamId: string;
}

export const TeamDetails = ({ teamId }: TeamDetailsProps) => {
  const router = useRouter();
  const pathname = usePathname();

  // Component States
  const [team, setTeam] = useState<Team | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Search Modals state
  const [isAddCoachOpen, setIsAddCoachOpen] = useState(false);
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);
  const [coachSearch, setCoachSearch] = useState("");
  const [playerSearch, setPlayerSearch] = useState("");

  // Initialize
  useEffect(() => {
    const allTeams = getTeams();
    setTeams(allTeams);
    const currentTeam = allTeams.find((t) => t.id === teamId);
    if (currentTeam) {
      setTeam(currentTeam);
    }
    setIsClient(true);
  }, [teamId]);

  if (!isClient) return null;

  if (!team) {
    return (
      <div className="flex flex-col gap-6 items-center justify-center py-20 bg-[#111111] rounded-3xl border border-white/20">
        <h3 className="text-2xl font-black text-white font-orbitron uppercase">Team Not Found</h3>
        <p className="text-white/60 text-sm">The team with ID "{teamId}" does not exist.</p>
        <button
          onClick={() => {
            const basePath = pathname.includes("/management")
              ? `/dashboard/academy/management/coach-players`
              : `/dashboard/academy/analysis/coach-players`;
            router.push(basePath);
          }}
          className="flex items-center gap-2 bg-[#E31B23] hover:bg-[#ff2d35] text-[10px] font-black uppercase tracking-wider text-white px-6 py-3 rounded-xl transition-all cursor-pointer"
        >
          <IconArrowLeft size={16} /> Back to Teams
        </button>
      </div>
    );
  }

  // Get details of coaches in this team
  const teamCoaches: Coach[] = team.coaches
    .map((cid) => COACH_POOL.find((c) => c.id === cid))
    .filter(Boolean) as Coach[];

  // Get details of players in this team
  const teamPlayers: Player[] = team.players
    .map((pid) => PLAYER_POOL.find((p) => p.id === pid))
    .filter(Boolean) as Player[];

  // Fixed size arrays for 2 coaches and 18 players
  const coachRows = Array.from({ length: 2 }).map((_, i) => teamCoaches[i] || null);
  const playerRows = Array.from({ length: 18 }).map((_, i) => teamPlayers[i] || null);

  // Search filter for available coaches
  const filteredCoaches = COACH_POOL.filter((coach) =>
    coach.name.toLowerCase().includes(coachSearch.toLowerCase()) ||
    coach.role.toLowerCase().includes(coachSearch.toLowerCase())
  );

  // Search filter for available players
  const filteredPlayers = PLAYER_POOL.filter((player) =>
    player.name.toLowerCase().includes(playerSearch.toLowerCase()) ||
    player.role.toLowerCase().includes(playerSearch.toLowerCase())
  );

  // Add Coach to Team
  const handleAddCoach = (coachId: string) => {
    if (team.coaches.includes(coachId)) {
      toast.info("This coach is already in the team.");
      return;
    }
    if (team.coaches.length >= 2) {
      toast.error("Maximum coach limit (2) reached for this team!");
      return;
    }

    const updatedTeam = {
      ...team,
      coaches: [...team.coaches, coachId]
    };

    // Update localStorage
    const updatedTeams = teams.map((t) => (t.id === team.id ? updatedTeam : t));
    saveTeams(updatedTeams);
    setTeams(updatedTeams);
    setTeam(updatedTeam);

    // Update coach pool status
    const coach = COACH_POOL.find((c) => c.id === coachId);
    if (coach) {
      coach.academy = "Santos FC Academy";
      coach.teams = team.name;
    }

    toast.success(`Coach "${coach?.name}" added to "${team.name}"`);
  };

  // Remove Coach from Team
  const handleRemoveCoach = (coachId: string) => {
    const updatedTeam = {
      ...team,
      coaches: team.coaches.filter((id) => id !== coachId)
    };

    const updatedTeams = teams.map((t) => (t.id === team.id ? updatedTeam : t));
    saveTeams(updatedTeams);
    setTeams(updatedTeams);
    setTeam(updatedTeam);

    // Update coach pool status to available
    const coach = COACH_POOL.find((c) => c.id === coachId);
    if (coach) {
      coach.academy = "Available";
      coach.teams = "Available";
    }

    toast.success(`Coach "${coach?.name}" removed from "${team.name}"`);
  };

  // Add Player to Team
  const handleAddPlayer = (playerId: string) => {
    if (team.players.includes(playerId)) {
      toast.info("This player is already in the team.");
      return;
    }
    if (team.players.length >= 18) {
      toast.error("Maximum player limit (18) reached for this team!");
      return;
    }

    const updatedTeam = {
      ...team,
      players: [...team.players, playerId]
    };

    // Update localStorage
    const updatedTeams = teams.map((t) => (t.id === team.id ? updatedTeam : t));
    saveTeams(updatedTeams);
    setTeams(updatedTeams);
    setTeam(updatedTeam);

    // Update player pool status
    const player = PLAYER_POOL.find((p) => p.id === playerId);
    if (player) {
      player.academy = "Santos FC Academy";
    }

    toast.success(`Player "${player?.name}" added to "${team.name}"`);
  };

  // Remove Player from Team
  const handleRemovePlayer = (playerId: string) => {
    const updatedTeam = {
      ...team,
      players: team.players.filter((id) => id !== playerId)
    };

    const updatedTeams = teams.map((t) => (t.id === team.id ? updatedTeam : t));
    saveTeams(updatedTeams);
    setTeams(updatedTeams);
    setTeam(updatedTeam);

    // Update player pool status to available
    const player = PLAYER_POOL.find((p) => p.id === playerId);
    if (player) {
      player.academy = "Available";
    }

    toast.success(`Player "${player?.name}" removed from "${team.name}"`);
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Back Button & Title */}
      <div className="flex flex-col gap-4">
        <button
          onClick={() => {
            const basePath = pathname.includes("/management")
              ? `/dashboard/academy/management/coach-players`
              : `/dashboard/academy/analysis/coach-players`;
            router.push(basePath);
          }}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest self-start cursor-pointer"
        >
          <IconArrowLeft size={16} /> Back to Teams
        </button>
        <div>
          <h1 className="text-5xl font-black text-white font-orbitron uppercase tracking-tight">
            {team.name} Roster
          </h1>
          <p className="text-white/60 font-medium mt-2 text-lg">Manage roster coaches and players</p>
        </div>
      </div>

      {/* Roster Capacity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardStatCard
          icon={<IconTrophy size={24} />}
          label="Coaches (Max 2)"
          value={`${team.coaches.length} / 2`}
        />
        <DashboardStatCard
          icon={<IconUsers size={24} />}
          label="Players (Max 18)"
          value={`${team.players.length} / 18`}
        />
        <DashboardStatCard
          icon={<IconBallFootball size={24} />}
          label="Total Team Roster"
          value={String(team.coaches.length + team.players.length)}
        />
      </div>

      {/* Coaches Section */}
      <div className="bg-[#111111] rounded-3xl border border-white/20 p-6 md:p-8 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight">Coaches</h2>
            <p className="text-white/60 font-medium text-xs uppercase tracking-widest mt-1">
              Roster Leaders ({team.coaches.length} of 2)
            </p>
          </div>
          <button
            onClick={() => {
              setCoachSearch("");
              setIsAddCoachOpen(true);
            }}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] text-white px-6 py-3 rounded-xl transition-all cursor-pointer"
          >
            <IconPlus size={16} />
            Add Coach
          </button>
        </div>

        <div className="w-full overflow-x-auto rounded-2xl border border-white/20">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20 bg-white/[0.02]">
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20">Name</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">CV Type</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Status</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coachRows.map((coach, index) => {
                if (coach) {
                  return (
                    <tr key={coach.id} className="group hover:bg-white/[0.02] transition-colors border-b border-white/20 last:border-b-0">
                      <td className="py-6 px-6 border-r border-white/20">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                            <img src={coach.avatar} alt={coach.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-base font-bold text-white truncate">{coach.name}</p>
                            <p className="text-[10px] font-bold text-[#E31B23] uppercase tracking-wider">{coach.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6 border-r border-white/20 text-center">
                        <span className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block border ${
                          coach.cvType === "Gold" ? "bg-[#FBBF24] text-black border-[#FBBF24]" : "bg-white text-black border-white"
                        }`}>
                          {coach.cvType}
                        </span>
                      </td>
                      <td className="py-6 px-6 border-r border-white/20 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block border ${
                          coach.status === "Active"
                            ? "text-[#00FF85] border-[#00FF85]/20 bg-[#00FF85]/5"
                            : "text-[#FF3B30] border-[#FF3B30]/20 bg-[#FF3B30]/5"
                        }`}>
                          {coach.status}
                        </span>
                      </td>
                      <td className="py-6 px-6 text-center">
                        <button
                          onClick={() => handleRemoveCoach(coach.id)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-500 transition-all hover:scale-105 cursor-pointer mx-auto"
                          title="Remove Coach"
                        >
                          <IconTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={`empty-coach-${index}`} className="group hover:bg-white/[0.01] transition-colors border-b border-white/20 last:border-b-0">
                      <td className="py-6 px-6 border-r border-white/20">
                        <div className="flex items-center gap-4 text-white/20">
                          <div className="w-12 h-12 rounded-full border border-dashed border-white/20 flex items-center justify-center shrink-0">
                            <IconPlus size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold italic text-white/30">Empty Coach Slot</p>
                            <p className="text-[9px] font-bold uppercase tracking-wider text-white/20">Slot {index + 1} of 2 available</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6 border-r border-white/20 text-center text-xs text-white/20">-</td>
                      <td className="py-6 px-6 border-r border-white/20 text-center text-xs text-white/20">-</td>
                      <td className="py-6 px-6 text-center">
                        <button
                          onClick={() => {
                            setCoachSearch("");
                            setIsAddCoachOpen(true);
                          }}
                          className="px-4 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest cursor-pointer mx-auto flex items-center justify-center gap-1.5"
                        >
                          <IconPlus size={12} /> Assign Coach
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Players Section */}
      <div className="bg-[#111111] rounded-3xl border border-white/20 p-6 md:p-8 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-white font-orbitron uppercase tracking-tight">Players</h2>
            <p className="text-white/60 font-medium text-xs uppercase tracking-widest mt-1">
              Roster Athletes ({team.players.length} of 18)
            </p>
          </div>
          <button
            onClick={() => {
              setPlayerSearch("");
              setIsAddPlayerOpen(true);
            }}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] text-white px-6 py-3 rounded-xl transition-all cursor-pointer"
          >
            <IconPlus size={16} />
            Add Player
          </button>
        </div>

        <div className="w-full overflow-x-auto rounded-2xl border border-white/20">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20 bg-white/[0.02]">
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20">Name</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Rating</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Matches</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Goals</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Assists</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">CV Type</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 border-r border-white/20 text-center">Status</th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-white/40 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {playerRows.map((player, index) => {
                if (player) {
                  return (
                    <tr key={player.id} className="group hover:bg-white/[0.02] transition-colors border-b border-white/20 last:border-b-0">
                      <td className="py-6 px-6 border-r border-white/20">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                            <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-base font-bold text-white truncate">{player.name}</p>
                            <p className="text-[10px] font-bold text-[#E31B23] uppercase tracking-wider">{player.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6 border-r border-white/20 text-center text-sm font-black text-[#E31B23] font-orbitron">
                        {player.rating}
                      </td>
                      <td className="py-6 px-6 border-r border-white/20 text-center text-sm font-black text-white font-orbitron">
                        {player.matches}
                      </td>
                      <td className="py-6 px-6 border-r border-white/20 text-center text-sm font-black text-white font-orbitron">
                        {player.goals}
                      </td>
                      <td className="py-6 px-6 border-r border-white/20 text-center text-sm font-black text-white font-orbitron">
                        {player.assists}
                      </td>
                      <td className="py-6 px-6 border-r border-white/20 text-center">
                        <span className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block border ${
                          player.cvType === "Gold" ? "bg-[#FBBF24] text-black border-[#FBBF24]" :
                          player.cvType === "Silver" ? "bg-white text-black border-white" :
                          "bg-[#E8C5AF] text-black border-[#E8C5AF]"
                        }`}>
                          {player.cvType}
                        </span>
                      </td>
                      <td className="py-6 px-6 border-r border-white/20 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block border ${
                          player.status === "Active"
                            ? "text-[#00FF85] border-[#00FF85]/20 bg-[#00FF85]/5"
                            : "text-[#FF3B30] border-[#FF3B30]/20 bg-[#FF3B30]/5"
                        }`}>
                          {player.status}
                        </span>
                      </td>
                      <td className="py-6 px-6 text-center">
                        <button
                          onClick={() => handleRemovePlayer(player.id)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-500 transition-all hover:scale-105 cursor-pointer mx-auto"
                          title="Remove Player"
                        >
                          <IconTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={`empty-player-${index}`} className="group hover:bg-white/[0.01] transition-colors border-b border-white/20 last:border-b-0">
                      <td className="py-6 px-6 border-r border-white/20">
                        <div className="flex items-center gap-4 text-white/20">
                          <div className="w-12 h-12 rounded-full border border-dashed border-white/20 flex items-center justify-center shrink-0">
                            <IconPlus size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold italic text-white/30">Empty Player Slot</p>
                            <p className="text-[9px] font-bold uppercase tracking-wider text-white/20">Slot {index + 1} of 18 available</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6 border-r border-white/20 text-center text-xs text-white/20">-</td>
                      <td className="py-6 px-6 border-r border-white/20 text-center text-xs text-white/20">-</td>
                      <td className="py-6 px-6 border-r border-white/20 text-center text-xs text-white/20">-</td>
                      <td className="py-6 px-6 border-r border-white/20 text-center text-xs text-white/20">-</td>
                      <td className="py-6 px-6 border-r border-white/20 text-center text-xs text-white/20">-</td>
                      <td className="py-6 px-6 border-r border-white/20 text-center text-xs text-white/20">-</td>
                      <td className="py-6 px-6 text-center">
                        <button
                          onClick={() => {
                            setPlayerSearch("");
                            setIsAddPlayerOpen(true);
                          }}
                          className="px-4 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest cursor-pointer mx-auto flex items-center justify-center gap-1.5"
                        >
                          <IconPlus size={12} /> Assign Player
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Coach Dialog */}
      <Dialog open={isAddCoachOpen} onOpenChange={setIsAddCoachOpen}>
        <DialogContent className="bg-[#111111] border border-white/10 text-white rounded-3xl max-w-lg p-8 flex flex-col max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase text-white font-orbitron tracking-tight">
              Add Coach to {team.name}
            </DialogTitle>
          </DialogHeader>

          {/* Search Box */}
          <div className="relative mt-4 shrink-0">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-white/40 pointer-events-none">
              <IconSearch size={18} />
            </span>
            <input
              type="text"
              value={coachSearch}
              onChange={(e) => setCoachSearch(e.target.value)}
              placeholder="Search coach by name or role..."
              className="w-full h-12 bg-white/[0.02] border border-white/10 rounded-xl pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:border-[#E31B23]/50 transition-all placeholder:text-gray-600"
            />
          </div>

          {/* Coaches List */}
          <div className="flex-1 overflow-y-auto mt-6 pr-2 space-y-4 max-h-[45vh] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {filteredCoaches.length === 0 ? (
              <p className="text-center text-white/40 text-xs py-4">No coaches match search query.</p>
            ) : (
              filteredCoaches.map((coach) => {
                const isAlreadyInTeam = team.coaches.includes(coach.id);
                // "if a player/coach not in another academy then can add here"
                // Available academies are "Santos FC Academy" or "Available"
                const isBelongsToOtherAcademy = coach.academy !== "Santos FC Academy" && coach.academy !== "Available";

                return (
                  <div
                    key={coach.id}
                    className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between gap-4 hover:border-white/10 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                        <img src={coach.avatar} alt={coach.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{coach.name}</p>
                        <p className="text-[9px] font-bold text-[#E31B23] uppercase tracking-wider">{coach.role}</p>
                        <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">
                          Academy: {coach.academy}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isAlreadyInTeam ? (
                        <span className="flex items-center gap-1 text-[9px] font-black uppercase text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                          <IconCheck size={12} /> Assigned
                        </span>
                      ) : isBelongsToOtherAcademy ? (
                        <span className="text-[8px] font-black uppercase text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full">
                          In {coach.academy}
                        </span>
                      ) : (
                        <button
                          onClick={() => handleAddCoach(coach.id)}
                          className="bg-[#E31B23] hover:bg-[#ff2d35] text-[9px] font-black uppercase tracking-widest text-white px-4 py-1.5 rounded-full cursor-pointer transition-all"
                        >
                          Assign Coach
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="flex justify-end pt-4 border-t border-white/5 shrink-0 mt-4">
            <button
              onClick={() => setIsAddCoachOpen(false)}
              className="px-6 py-2 rounded-xl border border-white/10 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Player Dialog */}
      <Dialog open={isAddPlayerOpen} onOpenChange={setIsAddPlayerOpen}>
        <DialogContent className="bg-[#111111] border border-white/10 text-white rounded-3xl max-w-lg p-8 flex flex-col max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase text-white font-orbitron tracking-tight">
              Add Player to {team.name}
            </DialogTitle>
          </DialogHeader>

          {/* Search Box */}
          <div className="relative mt-4 shrink-0">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-white/40 pointer-events-none">
              <IconSearch size={18} />
            </span>
            <input
              type="text"
              value={playerSearch}
              onChange={(e) => setPlayerSearch(e.target.value)}
              placeholder="Search player by name or position..."
              className="w-full h-12 bg-white/[0.02] border border-white/10 rounded-xl pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:border-[#E31B23]/50 transition-all placeholder:text-gray-600"
            />
          </div>

          {/* Players List */}
          <div className="flex-1 overflow-y-auto mt-6 pr-2 space-y-4 max-h-[45vh] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {filteredPlayers.length === 0 ? (
              <p className="text-center text-white/40 text-xs py-4">No players match search query.</p>
            ) : (
              filteredPlayers.map((player) => {
                const isAlreadyInTeam = team.players.includes(player.id);
                // "if a player/coach not in another academy then can add here"
                // Available academies are "Santos FC Academy" or "Available"
                const isBelongsToOtherAcademy = player.academy !== "Santos FC Academy" && player.academy !== "Available";

                return (
                  <div
                    key={player.id}
                    className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between gap-4 hover:border-white/10 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                        <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{player.name}</p>
                        <p className="text-[9px] font-bold text-[#E31B23] uppercase tracking-wider">{player.role}</p>
                        <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">
                          Academy: {player.academy}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isAlreadyInTeam ? (
                        <span className="flex items-center gap-1 text-[9px] font-black uppercase text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                          <IconCheck size={12} /> Assigned
                        </span>
                      ) : isBelongsToOtherAcademy ? (
                        <span className="text-[8px] font-black uppercase text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full">
                          In {player.academy}
                        </span>
                      ) : (
                        <button
                          onClick={() => handleAddPlayer(player.id)}
                          className="bg-[#E31B23] hover:bg-[#ff2d35] text-[9px] font-black uppercase tracking-widest text-white px-4 py-1.5 rounded-full cursor-pointer transition-all"
                        >
                          Add Player
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="flex justify-end pt-4 border-t border-white/5 shrink-0 mt-4">
            <button
              onClick={() => setIsAddPlayerOpen(false)}
              className="px-6 py-2 rounded-xl border border-white/10 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamDetails;
