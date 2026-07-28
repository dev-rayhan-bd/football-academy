import ImageCarousel from "../../components/ImageCarousel";
import StartJourneySection from "../../components/StartJourneySection";
import FullEditablePage from "./components/FullEditablePage";

const PlayerCvDetailsPage = () => {
  return (
    <>
      <FullEditablePage editable={true} />
      <ImageCarousel />
      <StartJourneySection />
    </>
  );
};

export default PlayerCvDetailsPage;
