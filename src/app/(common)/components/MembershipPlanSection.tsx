"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const PLAYER_PLANS = [
  {
    name: "Player – Free Basic Plan",
    price: "Free",
    features: [
      "Creation of CV analysis",
      "Upload of up to 5 matches",
      "Upload of up to 5 pictures"
    ]
  },
  {
    name: "Player – Platinum Plan",
    price: "$9.99",
    features: [
      "Creation of CV analysis",
      "Upload of up to 10 matches",
      "Upload of up to 10 pictures",
      "CV validation and official stamp",
      "Up to 3 game reports",
      "Transfer profile to other club"
    ]
  },
  {
    name: "Player – Elite Plan",
    price: "$19.99",
    features: [
      "Creation of CV analysis",
      "Unlimited matches uploads",
      "Unlimited picture uploads",
      "CV validation and official stamp",
      "Unlimited game reports",
      "Increased visibility",
      "Transfer profile to other club"
    ]
  }
];

const COACH_PLANS = [
  {
    name: "Coaches – Free Basic Plan",
    price: "Free",
    features: [
      "Creation of CV analysis",
      "Upload of up to 5 Videos",
      "Upload of up to 5 pictures"
    ]
  },
  {
    name: "Coaches – Platinum Plan",
    price: "$9.99",
    features: [
      "Creation of CV analysis",
      "Upload of up to 10 Videos",
      "Upload of up to 10 pictures",
      "CV validation and official stamp",
      "Transfer profile to other club",
      "Increased visibility",
      "Private Coach Profile",
      "Club Coach Profile"
    ]
  }
];

const MembershipPlanSection = () => {
  const [modalType, setModalType] = useState<"player" | "coach" | null>(null);

  const handleChoosePlan = (planName: string) => {
    if (planName === "Player") {
      setModalType("player");
    } else if (planName === "Coaches") {
      setModalType("coach");
    } else {
      toast.success(`Selected ${planName} Plan!`);
    }
  };

  return (
    <section className="bg-black py-12 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 ">
      <div className="container space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white">
            Membership <span className="text-primary">Plans</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              name: "Player",
              price: "$19.99",
              features: [
                "Production of analysis materials",
                "Upload videos, photos, and game reports",
                "Exposure of your profile to licensed agents and professional clubs",
                "Transfer of your analysis materials to other clubs",
              ],
            },
            {
              name: "Coaches",
              price: "$39.99",
              features: [
                "Production of analysis materials",
                "Upload videos, photos, courses and certificates",
                "Exposure of your profile to licensed agents and professional clubs",
                "Transfer of your analysis materials to other clubs",
              ],
            },
            {
              name: "Football Agent",
              price: "$89.99",
              features: [
                "Access to all athlete and coach profiles on the platform",
                "Detailed analysis of athletes' materials",
                "Direct contact wth athletes' parents",
                "Faster and Moro objective pre-field analysis",
                "-Promotion of tryouts and events on the platform"
              ],
            },
            {
              name: "Professional Club",
              price: "$159.00",
              features: [
                "Access to all athlete and coach profiles on the platform",
                "Detailed analysis of athletes' materials",
                "Direct contact wth athletes' parents",
                "Faster and Moro objective analysis boforo sonding scouts to the field",
                "Display or club’s trials on the platform"
              ],
            },
            {
              name: "Grassroot Clubs",
              price: "$300.00",
              features: [
                "Production of analysis materials for up to 3 coaches and 30 players",
                "Upload videos, photos, and game reports",
                "Exposure of your club profile to licensed agents and professional clubs",
                "Display of your club’s trials of the platform",
                "Commission for each game report submitted by an athlete"
              ],
            },
          ].map((plan, i) => (
            <Card
              key={i}
              className="bg-cardBg border border-border cursor-pointer p-6 space-y-6 flex flex-col hover:border-primary transition h-fit"
            >
              <div>
                <h4 className="text-xl lg:text-2xl text-center font-bold text-white">{plan.name}</h4>
                <div className="text-2xl lg:text-3xl font-bold text-white text-center mt-2">
                  {plan.price} <span className="text-gray-400 text-xl">/month</span>
                </div>
              </div>
              <ul className="space-y-2 flex-grow">
                {plan.features.map((feature, j) => (
                  <li
                    key={j}
                    className="text-sm text-gray-400 flex items-start"
                  >
                    <span className="text-primary mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => handleChoosePlan(plan.name)}
                variant={"outline"} 
                className="w-full bg-primary text-black rounded-full bg-transparent text-white cursor-pointer hover:bg-[#00dd00]"
              >
                Choose Plan
              </Button>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={modalType !== null} onOpenChange={(open) => !open && setModalType(null)}>
        <DialogContent className="bg-[#0c0c0e] border border-white/10 text-white w-full max-w-[800px] sm:max-w-[800px] p-8 md:p-10 rounded-[32px] overflow-y-auto max-h-[90vh] [&>button]:text-white">
          <DialogHeader className="text-center space-y-2 mb-8">
            <DialogTitle className="text-3xl font-black font-heading text-white text-center uppercase tracking-tight font-orbitron">
              {modalType === "player" ? "Player Plans" : "Coach Plans"}
            </DialogTitle>
            <p className="text-white/60 text-sm max-w-lg mx-auto font-medium">
              Select the best tier to boost your career and stand out.
            </p>
          </DialogHeader>

          <div className={cn(
            "grid gap-6 mt-4",
            modalType === "player" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2"
          )}>
            {(modalType === "player" ? PLAYER_PLANS : COACH_PLANS).map((plan, index) => (
              <Card
                key={index}
                className="bg-black/40 border border-white/10 p-6 flex flex-col gap-6 hover:border-primary transition-all h-full rounded-2xl relative overflow-hidden group shadow-lg"
              >
                <div>
                  <h4 className="text-xl font-bold text-white tracking-tight leading-tight">{plan.name}</h4>
                  <div className="text-3xl font-bold text-white mt-2">
                    {plan.price}
                    {plan.price !== "Free" && <span className="text-white/40 text-sm ml-1 font-medium font-sans">/month</span>}
                  </div>
                </div>
                
                <ul className="space-y-3 flex-grow mt-2">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="text-xs text-white/70 flex items-start gap-2 leading-relaxed">
                      <span className="text-primary font-bold select-none">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => {
                    toast.success(`Subscribed to ${plan.name}!`);
                    setModalType(null);
                  }}
                  className="w-full h-12 bg-primary text-black font-black uppercase tracking-widest text-[10px] rounded-xl transition-all font-orbitron cursor-pointer mt-4 hover:bg-[#00dd00]"
                >
                  Choose Plan
                </Button>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MembershipPlanSection;
