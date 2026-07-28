"use client";
import React, { useState } from "react";
import { usePlayerStats } from "./FullEditablePage";
import { useUpdatePlayerProfileMutation } from "@/lib/features/cv/cvApi";
import { CMSField } from "@/components/shared/CMSField";

const AdditionalNotesSection = ({
  editable = false,
}: {
  editable?: boolean;
}) => {
  const { role } = usePlayerStats();
  const [updatePlayer] = useUpdatePlayerProfileMutation();
  const [notes, setNotes] =
    useState(`Marcus Silva is a highly skilled attacking midfielder ⚽ with exceptional vision 👀, precise passing 🎯, and strong tactical intelligence 🧠.

Versatile across multiple midfield positions, he remains a reliable asset to any squad.

Calm under pressure and consistent in chance creation, he has maintained top-level performance throughout his career.

Currently open to transfer opportunities with top European clubs 🌍 and available for immediate first-team integration.

Medical reports indicate excellent physical condition 💪 with no recurring injuries.`);

  const handleUpdate = async (val: string) => {
    setNotes(val);
    try {
      await updatePlayer({
        id: "current-player",
        data: { additionalNotes: val }
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-20">
      <div className="container bg-cardBg p-8 rounded-xl ">
        <div className="flex items-center justify-between">
          <h4 className="text-xl text-primary lg:text-2xl mb-5">
            Additional Notes
          </h4>
        </div>
        <div className="space-y-5">
          <CMSField
            value={notes}
            onUpdate={(val) => handleUpdate(String(val))}
            canEdit={editable}
            type="textarea"
            showEmojis={true}
            className="whitespace-pre-wrap leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalNotesSection;
