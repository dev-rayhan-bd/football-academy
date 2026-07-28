export interface Coach {
  id: string;
  name: string;
  role: string;
  teams: string;
  players: number;
  cvType: "Gold" | "Silver" | "Bronze";
  status: "Active" | "Vacation";
  avatar: string;
  academy: string; // "Santos FC Academy", "Real Madrid", "Available", etc.
}

export interface Player {
  id: string;
  name: string;
  role: string;
  rating: number;
  matches: number;
  goals: number;
  assists: number;
  cvType: "Gold" | "Silver" | "Bronze";
  status: "Active" | "Injured";
  avatar: string;
  academy: string; // "Santos FC Academy", "Chelsea FC", "Available", etc.
}

export interface Team {
  id: string;
  name: string;
  coaches: string[]; // coach IDs
  players: string[]; // player IDs
  status: "Active" | "Inactive";
}

// Full system pools
export const COACH_POOL: Coach[] = [
  { id: "c1", name: "Carlos Silva", role: "Assistant Coach", teams: "Santos U17", players: 16, cvType: "Silver", status: "Active", avatar: "https://i.pravatar.cc/100?u=carlos", academy: "Santos FC Academy" },
  { id: "c2", name: "Maria Santos", role: "Head Coach", teams: "Santos U17", players: 14, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=maria", academy: "Santos FC Academy" },
  { id: "c3", name: "João Pedro", role: "Assistant Coach", teams: "Available", players: 0, cvType: "Silver", status: "Vacation", avatar: "https://i.pravatar.cc/100?u=joao", academy: "Available" },
  { id: "c4", name: "Roberto Lima", role: "Head Coach", teams: "Available", players: 0, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=roberto", academy: "Available" },
  { id: "c5", name: "Carlo Ancelotti", role: "Manager", teams: "Real Madrid U19", players: 25, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=ancelotti", academy: "Real Madrid" },
  { id: "c6", name: "Pep Guardiola", role: "Head Coach", teams: "Available", players: 0, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=pep", academy: "Available" },
  { id: "c7", name: "Jürgen Klopp", role: "Advisor", teams: "Available", players: 0, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=klopp", academy: "Available" },
  { id: "c8", name: "Jose Mourinho", role: "Head Coach", teams: "Fenerbahce U19", players: 22, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=mourinho", academy: "Fenerbahce" },
  { id: "c9", name: "Zinedine Zidane", role: "Manager", teams: "Available", players: 0, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=zidane", academy: "Available" }
];

export const PLAYER_POOL: Player[] = [
  { id: "p1", name: "Marcus Silva", role: "Forward", rating: 9.2, matches: 28, goals: 15, assists: 8, cvType: "Silver", status: "Active", avatar: "https://i.pravatar.cc/100?u=marcus", academy: "Santos FC Academy" },
  { id: "p2", name: "David Chen", role: "Midfielder", rating: 8.8, matches: 30, goals: 5, assists: 12, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=david", academy: "Santos FC Academy" },
  { id: "p3", name: "Alex Jonson", role: "Defender", rating: 8.5, matches: 29, goals: 2, assists: 3, cvType: "Silver", status: "Injured", avatar: "https://i.pravatar.cc/100?u=alex", academy: "Santos FC Academy" },
  { id: "p4", name: "James Brown", role: "Goalkeeper", rating: 9.0, matches: 30, goals: 0, assists: 0, cvType: "Bronze", status: "Active", avatar: "https://i.pravatar.cc/100?u=james", academy: "Santos FC Academy" },
  { id: "p5", name: "Lionel Messi", role: "Forward", rating: 9.9, matches: 35, goals: 28, assists: 18, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=messi", academy: "Available" },
  { id: "p6", name: "Cristiano Ronaldo", role: "Forward", rating: 9.7, matches: 34, goals: 30, assists: 5, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=ronaldo", academy: "Available" },
  { id: "p7", name: "Kylian Mbappé", role: "Forward", rating: 9.6, matches: 32, goals: 24, assists: 8, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=mbappe", academy: "Real Madrid" },
  { id: "p8", name: "Erling Haaland", role: "Forward", rating: 9.5, matches: 30, goals: 32, assists: 3, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=haaland", academy: "Manchester City" },
  { id: "p9", name: "Neymar Jr", role: "Forward", rating: 9.3, matches: 20, goals: 12, assists: 10, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=neymar", academy: "Available" },
  { id: "p10", name: "Jude Bellingham", role: "Midfielder", rating: 9.4, matches: 33, goals: 16, assists: 11, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=jude", academy: "Real Madrid" },
  { id: "p11", name: "Cole Palmer", role: "Midfielder", rating: 9.1, matches: 28, goals: 14, assists: 9, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=palmer", academy: "Available" },
  { id: "p12", name: "Bukayo Saka", role: "Forward", rating: 9.0, matches: 31, goals: 12, assists: 11, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=saka", academy: "Arsenal" },
  { id: "p13", name: "Lamine Yamal", role: "Forward", rating: 9.3, matches: 27, goals: 8, assists: 14, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=yamal", academy: "Available" },
  { id: "p14", name: "Pedri", role: "Midfielder", rating: 8.9, matches: 24, goals: 4, assists: 7, cvType: "Silver", status: "Active", avatar: "https://i.pravatar.cc/100?u=pedri", academy: "Available" },
  { id: "p15", name: "Gavi", role: "Midfielder", rating: 8.8, matches: 20, goals: 3, assists: 5, cvType: "Silver", status: "Active", avatar: "https://i.pravatar.cc/100?u=gavi", academy: "Available" },
  { id: "p16", name: "Jamal Musiala", role: "Midfielder", rating: 9.2, matches: 29, goals: 10, assists: 8, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=musiala", academy: "Available" },
  { id: "p17", name: "Florian Wirtz", role: "Midfielder", rating: 9.1, matches: 30, goals: 11, assists: 12, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=wirtz", academy: "Available" },
  { id: "p18", name: "Endrick", role: "Forward", rating: 8.7, matches: 22, goals: 8, assists: 3, cvType: "Gold", status: "Active", avatar: "https://i.pravatar.cc/100?u=endrick", academy: "Available" }
];

// Initial seeded team
const INITIAL_TEAMS: Team[] = [
  {
    id: "santos-u17",
    name: "Santos U17",
    coaches: ["c1", "c2"],
    players: ["p1", "p2", "p3", "p4"],
    status: "Active"
  }
];

export const getTeams = (): Team[] => {
  if (typeof window === "undefined") return INITIAL_TEAMS;
  const stored = localStorage.getItem("academy_teams");
  if (!stored) {
    localStorage.setItem("academy_teams", JSON.stringify(INITIAL_TEAMS));
    return INITIAL_TEAMS;
  }
  return JSON.parse(stored);
};

export const saveTeams = (teams: Team[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("academy_teams", JSON.stringify(teams));
  }
};

export const getPlan = (): "Free" | "Premium" => {
  if (typeof window === "undefined") return "Free";
  const plan = localStorage.getItem("academy_current_plan");
  if (!plan) {
    localStorage.setItem("academy_current_plan", "Free");
    return "Free";
  }
  return plan as "Free" | "Premium";
};

export const savePlan = (plan: "Free" | "Premium") => {
  if (typeof window !== "undefined") {
    localStorage.setItem("academy_current_plan", plan);
  }
};
