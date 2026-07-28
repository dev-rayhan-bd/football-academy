import React from "react";
import ServiceSection from "./components/ServiceSection";
import OutStorySection from "./components/OutStorySection";
import OutValueSection from "./components/OutValueSection";
import TimelineSection from "./components/TimelineSection";
import TeamSection from "./components/TeamSection";
import ImageCarousel from "../components/ImageCarousel";
import StartJourneySection from "../components/StartJourneySection";

const AboutPage = () => {
  return (
    <div>
      <ServiceSection />
      <OutStorySection/>
      <OutValueSection/>
      <TimelineSection/>
      <TeamSection/>
      <ImageCarousel/>
      <StartJourneySection/>
    </div>
  );
};

export default AboutPage;
