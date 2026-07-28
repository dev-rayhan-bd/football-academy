import ImageCarousel from "../../components/ImageCarousel";
import StartJourneySection from "../../components/StartJourneySection";
import FullEditableCv from "./components/FullEditableCv";

const CoachCVPage = () => {
  return (
    <div>
      <FullEditableCv editable={true} />
      <ImageCarousel />
      <StartJourneySection />
    </div>
  );
};

export default CoachCVPage;
