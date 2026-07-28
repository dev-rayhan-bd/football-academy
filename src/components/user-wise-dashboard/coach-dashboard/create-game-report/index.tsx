"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePlayer } from "@/lib/hooks/usePlayer";
import { addReport, completeReportRequest, addReportRequest, REPORT_REQUESTS_DATA, SHARED_REPORTS_DATA, updateReport } from "@/lib/constants/reports";
import { ReportDetailsForm } from "./ReportDetailsForm";
import { StripePaymentModal } from "./StripePaymentModal";
import { MatchStatisticsForm, PitchLine } from "./MatchStatisticsForm";
import { ReportPdfPreview } from "./ReportPdfPreview";
import { PlayerRequestWizard } from "./PlayerRequestWizard";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/reduxHooks";
import { addGameReport, updateGameReport, completeGameReportRequest, addGameReportRequest } from "@/lib/features/reports/reportsSlice";
import { IconCircleCheck } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface CreateGameReportWizardProps {
  onCancel: () => void;
  onContinue?: (data: any) => void;
}

export const CreateGameReportWizard = ({
  onCancel,
  onContinue
}: CreateGameReportWizardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { players } = usePlayer();

  const reports = useAppSelector(state => state.reports.reports);
  const requests = useAppSelector(state => state.reports.requests);

  const playerId = searchParams.get("playerId");
  const requestId = searchParams.get("requestId");

  const [userRole, setUserRole] = useState<string>("player");
  const [step, setStep] = useState(1);
  const [characteristics, setCharacteristics] = useState<string[]>(["FAST", "SKILLFUL", "FINISHER"]);
  const [formData, setFormData] = useState({
    playerName: "EDEGELSON RICCI",
    dob: "27-03-2014",
    clubName: "INTER MIAMI",
    position: "STRIKER",
    foot: "RIGHT",
    weight: "45",
    height: "1.20",
    matchesPlayed: "1",
    minutesPlayed: "90",
    manOfTheMatch: "1",
    scoutName: "MARIO LOPEZ",
    gameType: "FRIENDLY CHAMPIONSHIP CATARINESE",
    gameDate: "2021-02-22",
    gameLocation: "LONDON",
    matchResult: "INTER MIAMI 2 x 0 LA FC",
    weather: "RAINY",
    temperature: "19"
  });

  const [stats, setStats] = useState<Record<string, number>>({});
  const [goalMarkers, setGoalMarkers] = useState<{ x: number; y: number }[]>([]);
  const [pitchMarkers, setPitchMarkers] = useState<PitchLine[]>([]);

  // Detect user role
  useEffect(() => {
    const role = localStorage.getItem("userRole") || "player";
    setUserRole(role);
  }, []);

  // Pre-fill from Redux player list and request data
  useEffect(() => {
    let pName = "EDEGELSON RICCI";
    let pDob = "27-03-2014";
    let pClub = "INTER MIAMI";
    let pPos = "STRIKER";
    let pFoot = "RIGHT";
    let pWeight = "45";
    let pHeight = "1.20";
    let pMatches = "1";
    let pMinutes = "90";
    let pScout = "MARIO LOPEZ";

    // check if viewOnly
    const viewOnly = searchParams.get("viewOnly") === "true";
    const savedReport = viewOnly ? reports.find(r => r.playerId === Number(playerId)) : null;

    if (savedReport) {
      // Find player dob from player list if available
      let foundDob = pDob;
      if (playerId) {
        const player = players.find(p => p.id === Number(playerId));
        if (player) {
          foundDob = player.dob || "15-03-1996";
        }
      }

      setFormData({
        playerName: savedReport.playerName || pName,
        dob: foundDob,
        clubName: savedReport.team1 || pClub,
        position: savedReport.playerPosition.toUpperCase() || pPos,
        foot: savedReport.foot.toUpperCase() || pFoot,
        weight: savedReport.weight.replace("kg", "") || pWeight,
        height: savedReport.height.replace("m", "") || pHeight,
        matchesPlayed: "1",
        minutesPlayed: savedReport.timePlayedMinutes.toString() || pMinutes,
        manOfTheMatch: "1",
        scoutName: savedReport.scoutName || pScout,
        gameType: savedReport.league || "COMPETITIVE MATCH",
        gameDate: savedReport.date || "2021-02-22",
        gameLocation: savedReport.stadium || "LONDON",
        matchResult: `${savedReport.team1} ${savedReport.score} ${savedReport.team2}`,
        weather: savedReport.weather.toUpperCase() || "SUNNY",
        temperature: savedReport.temperature || "22"
      });
      if (savedReport.characteristics) {
        setCharacteristics(savedReport.characteristics.map(c => c.toUpperCase()));
      }
      
      // Load saved markers if available, otherwise fallback to defaults
      if (savedReport.goalMarkers && savedReport.goalMarkers.length > 0) {
        setGoalMarkers(savedReport.goalMarkers);
      } else {
        setGoalMarkers([{ x: 15, y: 25 }, { x: 85, y: 25 }, { x: 50, y: 50 }]);
      }

      if (savedReport.pitchMarkers && savedReport.pitchMarkers.length > 0) {
        setPitchMarkers(savedReport.pitchMarkers);
      } else {
        const isGK = savedReport.playerPosition.toUpperCase() === "GOALKEEPER";
        if (isGK) {
          setPitchMarkers([{ x1: 35, y1: 50, x2: 12, y2: 50 }]);
        } else {
          setPitchMarkers([{ x1: 50, y1: 50, x2: 88, y2: 50 }]);
        }
      }

      // Default mock 24 stats for viewOnly
      const isGK = savedReport.playerPosition.toUpperCase() === "GOALKEEPER";
      if (isGK) {
        setStats({
          shotsOnGoal: 0, goalScored: savedReport.goals, assists: savedReport.assists, passAccurate: savedReport.passes, wrongPass: 2, penaltiesTaken: 0,
          standTackle: 0, slidingTackle: 0, interception: 0, savesAccurate: 10, freeKick: 0, cornerKick: 0,
          goalUnsave: 1, penaltiesSaves: 1, appearances: savedReport.timePlayedMinutes ? 1 : 15, fault: 1, redCard: savedReport.redCards, yellowCard: savedReport.yellowCards,
          punching: 5, handling: 10, reflex: 1, aerialAbility: 5, throwing: 8, reactions: 1
        });
      } else {
        setStats({
          shotsOnGoal: 8, goalScored: savedReport.goals, assists: savedReport.assists, passAccurate: savedReport.passes, wrongPass: 2, penaltiesTaken: 4,
          standTackle: 12, slidingTackle: 12, interception: 2, savesAccurate: 10, freeKick: 12, cornerKick: 4,
          goalUnsave: 1, penaltiesSaves: 1, appearances: savedReport.timePlayedMinutes ? 1 : 15, fault: 1, redCard: savedReport.redCards, yellowCard: savedReport.yellowCards,
          punching: 5, handling: 10, reflex: 1, aerialAbility: 5, throwing: 8, reactions: 1
        });
      }
    } else {
      // 1. Fill player details
      if (playerId) {
        const player = players.find(p => p.id === Number(playerId));
        if (player) {
          pName = player.fullName;
          pDob = player.dob || "15-03-1996";
          pClub = player.academyName && player.academyName !== "N/A" ? player.academyName : "INTER MIAMI";
          pFoot = player.rightLegUsage > player.leftLegUsage ? "RIGHT" : "LEFT";
          pWeight = player.weight || "45";
          pHeight = player.height || "1.20";
          pMatches = player.seasonStats?.matches ? player.seasonStats.matches.toString() : "1";
          pMinutes = player.seasonStats?.matches ? (player.seasonStats.matches * 90).toString() : "90";
          pScout = player.coachName && player.coachName !== "N/A" ? player.coachName : "MARIO LOPEZ";

          const posUpper = player.position.toUpperCase();
          if (posUpper.includes("GOALKEEPER")) pPos = "GOALKEEPER";
          else if (posUpper.includes("MIDFIELDER")) pPos = "MIDFIELDER";
          else if (posUpper.includes("WINGER")) pPos = "WINGER";
          else if (posUpper.includes("DEFENDER") || posUpper.includes("BACK")) pPos = "DEFENDER";

          if (player.selectedStyleIds && player.selectedStyleIds.length > 0) {
            setCharacteristics(player.selectedStyleIds.map(s => s.toUpperCase()));
          } else {
            setCharacteristics(["FAST", "SKILLFUL"]);
          }
        }
      }

      // 2. Fill request match details
      let mDate = "2021-02-22";
      let mLocation = "LONDON";
      let mType = "FRIENDLY CHAMPIONSHIP CATARINESE";
      let mResult = `${pName.toUpperCase()} 2 x 0 OPPONENT`;
      let mWeather = "RAINY";
      let mTemp = "19";

      if (requestId) {
        const request = requests.find(r => r.id === Number(requestId));
        if (request) {
          mDate = request.date;
          mLocation = request.location || "LONDON";
          mType = request.league || "COMPETITIVE MATCH";
          mResult = `${pName.toUpperCase()} vs ${request.opponent || "OPPONENT"}`;
          mWeather = request.weather || "SUNNY";
          mTemp = request.temperature || "22";

          // If the player filled the full form, load their data
          if (request.formData) {
            setFormData(request.formData);
            if (request.statsData) setStats(request.statsData);
            if (request.goalMarkers) setGoalMarkers(request.goalMarkers);
            if (request.pitchMarkers) setPitchMarkers(request.pitchMarkers);
            if (request.characteristics) setCharacteristics(request.characteristics);
            return; // Skip setting default formData below
          }
        }
      }

      setFormData({
        playerName: pName,
        dob: pDob,
        clubName: pClub,
        position: pPos,
        foot: pFoot,
        weight: pWeight,
        height: pHeight,
        matchesPlayed: pMatches,
        minutesPlayed: pMinutes,
        manOfTheMatch: "1",
        scoutName: pScout,
        gameType: mType,
        gameDate: mDate,
        gameLocation: mLocation,
        matchResult: mResult,
        weather: mWeather,
        temperature: mTemp
      });
    }
  }, [playerId, requestId, players, searchParams, requests]);

  const handlePay = () => {
    setStep(3);
  };

  const handleStatsSubmit = () => {
    setStep(4);
  };

  const handleSave = (overallRating: number) => {
    const viewOnly = searchParams.get("viewOnly") === "true";
    const existingReport = viewOnly ? reports.find(r => r.playerId === Number(playerId)) : null;

    const finalReport = {
      id: existingReport ? existingReport.id : Math.floor(Math.random() * 10000),
      date: formData.gameDate,
      league: formData.gameType,
      team1: formData.clubName,
      team2: formData.matchResult.includes(" vs ") ? formData.matchResult.split(" vs ")[1] : (formData.matchResult.split(" x ")[1] || "OPPONENT"),
      score: formData.matchResult.includes(" x ") ? formData.matchResult.split(" ").slice(-3).join(" ") : "2-1",
      result: "W" as const,
      stadium: formData.gameLocation,
      goals: stats.goalScored || 0,
      assists: stats.assists || 0,
      passes: stats.passAccurate || 50,
      timePlayedMinutes: Number(formData.minutesPlayed),
      yellowCards: stats.yellowCard || 0,
      redCards: stats.redCard || 0,
      passAccuracy: Math.round(((stats.passAccurate || 1) / ((stats.passAccurate || 1) + (stats.wrongPass || 0))) * 100) || 85,
      rating: overallRating / 10,
      scoutName: formData.scoutName,
      gameType: formData.gameType,
      weather: formData.weather,
      temperature: formData.temperature,
      playerPosition: formData.position,
      foot: formData.foot,
      characteristics,
      weight: `${formData.weight}kg`,
      height: `${formData.height}m`,
      status: "Paid" as const,
      amount: "$ 6.99",
      playerId: playerId ? Number(playerId) : undefined,
      playerName: formData.playerName,
      pitchMarkers,
      goalMarkers
    };

    if (existingReport) {
      dispatch(updateGameReport(finalReport));
      updateReport(finalReport);
    } else {
      dispatch(addGameReport(finalReport));
      addReport(finalReport);
    }

    if (requestId) {
      dispatch(completeGameReportRequest(Number(requestId)));
      completeReportRequest(Number(requestId));
    }

    toast.success("Game Report saved successfully!");

    if (onContinue) {
      onContinue(finalReport);
    } else {
      router.push("/dashboard/coach/game-reports");
    }
  };

  // Delete PlayerRequestWizard import if not used, but I'll just skip the early return
  const handlePlayerPaySuccess = () => {
    // Add request to REPORT_REQUESTS_DATA
    const newReq = addReportRequest({
      playerName: formData.playerName,
      playerPosition: formData.position,
      date: formData.gameDate,
      status: "Pending",
      coachName: formData.scoutName || "Pep Guardiola",
      playerId: playerId ? Number(playerId) : (players[0]?.id || 1),
      opponent: formData.clubName,
      location: formData.gameLocation,
      league: formData.gameType,
      weather: formData.weather,
      temperature: formData.temperature,
      message: "Please review my game report.",
      statsData: stats,
      pitchMarkers: pitchMarkers,
      goalMarkers: goalMarkers,
      characteristics: characteristics,
      formData: formData
    });

    dispatch(addGameReportRequest(newReq));
    toast.success("Payment successful! Request submitted to Coach.");
    setStep(5);
  };

  return (
    <div className="w-full">
      {step === 1 && (
        <ReportDetailsForm 
          formData={formData} 
          setFormData={setFormData}
          characteristics={characteristics}
          setCharacteristics={setCharacteristics}
          onCancel={onCancel}
          onContinue={() => setStep(2)} 
        />
      )}
      
      {step === 2 && (
        <MatchStatisticsForm 
          position={formData.position}
          stats={stats}
          setStats={setStats}
          goalMarkers={goalMarkers}
          setGoalMarkers={setGoalMarkers}
          pitchMarkers={pitchMarkers}
          setPitchMarkers={setPitchMarkers}
          onCancel={() => setStep(1)}
          onSubmit={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <ReportPdfPreview 
          formData={formData}
          characteristics={characteristics}
          stats={stats}
          goalMarkers={goalMarkers}
          pitchMarkers={pitchMarkers}
          onSave={(overallRating) => {
            if (userRole === "coach") {
              handleSave(overallRating);
            } else {
              setStep(4);
            }
          }}
          onBack={() => setStep(2)}
          isPlayer={userRole !== "coach"}
        />
      )}

      {step === 4 && userRole !== "coach" && (
        <StripePaymentModal 
          onPay={handlePlayerPaySuccess}
          onBack={() => setStep(3)}
        />
      )}

      {step === 5 && userRole !== "coach" && (
        <div className="space-y-8 max-w-lg mx-auto text-center py-12 animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6 text-green-500">
            <IconCircleCheck size={48} stroke={1.5} />
          </div>
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter font-orbitron">Request Submitted</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your payment of **$6.99** was processed successfully. We have notified your coach of your analysis request. Once complete, the verified report will appear on your CV.
          </p>

          <Button 
            onClick={() => router.push("/dashboard/player/game-reports")}
            className="w-full h-14 rounded-xl bg-[#00FF62] hover:bg-[#00D150] text-black font-bold uppercase tracking-widest transition-all font-orbitron"
          >
            Back to Reports
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateGameReportWizard;
