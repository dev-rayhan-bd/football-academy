import MyImagesSection from "@/app/(common)/cvs-page/player-cv-details/components/MyImageSection";
import PerformanceChart from "./components/PerformanceChart";
import PlayerBioSection from "./components/PlayerBioSection";
import RightSideContent from "./components/RightSideContent";
import MyVideosSection from "@/app/(common)/cvs-page/player-cv-details/components/MyVideoSection";
import CVSection from "./components/CVSection";
import GameReportSection from "./components/GaMeReportSection";

import { PlayerStatsProvider } from "@/app/(common)/cvs-page/player-cv-details/components/FullEditablePage";

const PlayerDashboard = () => {
  return (
    <PlayerStatsProvider>
      <div className="grid grid-cols-1 xl:grid-cols-7 gap-8 h-full min-h-[87vh] text-white">
        {/* left  */}
        <div className="xl:col-span-5 h-full">
          <PlayerBioSection />
          <PerformanceChart />
          <CVSection />
          <MyImagesSection />
          <MyVideosSection />
          <GameReportSection />
        </div>
        {/* right */}
        <div className="xl:col-span-2 h-full">
          <RightSideContent />
        </div>
      </div>
    </PlayerStatsProvider>
  );
};

export default PlayerDashboard;
