"use client";

import DocSection from "../../player-cv-details/components/DocSection";
import CoachBioSection from "./CoachBioSection";
import CoachClubsSection from "./CoachClubsSection";
import ComplementaryCoursesSection from "./ComplementaryCoursesSection";
import TestimonialSection from "./TestimonialSection";
import Top3Formation from "./Top3Formation";
import MyImagesSection from "../../player-cv-details/components/MyImageSection";
import MyVideosSection from "../../player-cv-details/components/MyVideoSection";
import AdditionalNotesSection from "../../player-cv-details/components/AdditionalNotesSection";
import {
  PlayerStatsProvider,
  usePlayerStats,
} from "../../player-cv-details/components/FullEditablePage";
import { useAppSelector } from "@/lib/hooks/reduxHooks";
import { AuthState } from "@/redux/features/auth";

const FullEditableCv = ({ editable = true }: { editable?: boolean }) => {
  const { role } = usePlayerStats() || { role: "player" };
  const { accessToken } = useAppSelector((state) => state.auth as AuthState);

  const isActuallyEditable = editable && !!accessToken;
  const canEdit = isActuallyEditable && role === "coach";

  return (
    <>
      <CoachBioSection editable={canEdit} />
      <CoachClubsSection editable={canEdit} />
      <ComplementaryCoursesSection editable={canEdit} />
      <Top3Formation editable={canEdit} />
      <TestimonialSection editable={canEdit} />
      <DocSection editable={canEdit} />
      <MyImagesSection editable={canEdit} />
      <MyVideosSection editable={canEdit} />
      <AdditionalNotesSection editable={canEdit} />
    </>
  );
};

const FullEditableCvWrapper = ({ editable = true }: { editable?: boolean }) => (
  <PlayerStatsProvider>
    <FullEditableCv editable={editable} />
  </PlayerStatsProvider>
);

export default FullEditableCvWrapper;