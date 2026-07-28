"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { CreateGameReport } from "@/components/user-wise-dashboard/coach-dashboard/create-game-report";
import { addReport } from "@/lib/constants/reports";

const CoachCreateGameReportPage = () => {
  const router = useRouter();

  const handleContinue = (data: any) => {
    addReport(data);
    router.push("/dashboard/coach/game-reports");
  };

  return (
    <div className="container py-10">
      <CreateGameReport 
        onCancel={() => router.back()} 
        onContinue={handleContinue} 
      />
    </div>
  );
};

export default CoachCreateGameReportPage;
