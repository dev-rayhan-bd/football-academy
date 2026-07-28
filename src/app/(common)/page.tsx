import React from "react";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import KeyFeatureSection from "./components/KeyFeatureSection";
import HowK10Works from "./components/HowK10Works";
import ChooseYourRoleSection from "./components/ChooseYourRoleSection";
import MembershipPlanSection from "./components/MembershipPlanSection";
import AdSection1 from "./components/AdSection1";
import AdSection2 from "./components/AdSection2";
import ImageCarousel from "./components/ImageCarousel";
import StartJourneySection from "./components/StartJourneySection";

const HomePage = () => {
  return (
    <>
      <HeroSection/>
      <StatsSection/>
      <KeyFeatureSection/>
      <StatsSection/>
      <HowK10Works/>
      <ChooseYourRoleSection/>
      <MembershipPlanSection/>
      <AdSection1/>
      <AdSection2/>
      <ImageCarousel/>
      <StartJourneySection/>
    </>
  );
};

export default HomePage;
