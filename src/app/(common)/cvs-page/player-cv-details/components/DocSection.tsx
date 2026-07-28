"use client";
import { Dock } from "lucide-react";
import React, { useState } from "react";
import { usePlayerStats } from "./FullEditablePage";
import { useUpdatePlayerProfileMutation } from "@/lib/features/cv/cvApi";
import { CMSField } from "@/components/shared/CMSField";

const DocSection = ({ editable = false }: { editable?: boolean }) => {
  const { role } = usePlayerStats();
  const [updatePlayer] = useUpdatePlayerProfileMutation();
  const [docs, setDocs] = useState([
    { id: 1, title: "GAMES-REPORTS-16276JPG" },
    { id: 2, title: "GAMES-REPORTS-16276JPG" },
    { id: 3, title: "GAMES-REPORTS-16276JPG" },
  ]);

  const handleUpdate = async (id: number, value: string) => {
    setDocs((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, title: value } : doc)),
    );

    try {
      await updatePlayer({
        id: "current-player",
        data: { [`documents.${id}.title`]: value }
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="py-20">
      <div className="container">
        <h3 className="text-center font-heading text-wrap text-xl sm:text-4xl mb-10">
          Docs / Certificate
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="border p-5 rounded-xl flex bg-cardBg items-center gap-3 justify-center"
            >
              <Dock />
              <CMSField
                value={doc.title}
                onUpdate={(val) => handleUpdate(doc.id, String(val))}
                canEdit={editable}
                className="text-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocSection;
