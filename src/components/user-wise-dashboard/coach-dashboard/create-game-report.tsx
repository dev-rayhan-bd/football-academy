"use client";
import React from "react";
import { CreateGameReportWizard } from "./create-game-report/index";

interface CreateGameReportProps {
  onCancel: () => void;
  onContinue: (data: any) => void;
}

export const CreateGameReport = ({ onCancel, onContinue }: CreateGameReportProps) => {
  return (
    <CreateGameReportWizard 
      onCancel={onCancel} 
      onContinue={onContinue} 
    />
  );
};
