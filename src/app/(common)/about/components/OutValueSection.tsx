import { Globe, Shield, Star, Target, TrendingUp, Users } from "lucide-react";
import React from "react";

const OutValueSection = () => {
  return (
    <div className="container py-20">
      {/* Heading */}
      <h2 className="text-4xl font-bold mb-12 text-center font-heading">
        Our <span style={{ color: "#00FF62" }}>Values</span>
      </h2>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            icon: Target,
            title: "Our Mission",
            description:
              "To revolutionize football performance tracking and provide every player with professional-grade analytics tools.",
          },
          {
            icon: Users,
            title: "Our Team",
            description:
              "A passionate group of football experts, data scientists, and developers dedicated to advancing the sport.",
          },
          {
            icon: Globe,
            title: "Global Reach",
            description:
              "Operating in over 150 countries, connecting players, scouts, and clubs across the football ecosystem.",
          },
          {
            icon: TrendingUp,
            title: "Innovation",
            description:
              "Continuously developing cutting-edge AI and analytics tools to provide deeper performance insights.",
          },
          {
            icon: Star,
            title: "Excellence",
            description:
              "Committed to delivering the highest quality platform with accurate data and actionable insights.",
          },
          {
            icon: Shield,
            title: "Trust & Security",
            description:
              "Your data security and privacy are our top priorities, with enterprise-grade protection.",
          },
        ].map((value, index) => {
          const IconComponent = value.icon;
          return (
            <div
              key={index}
              className="rounded-lg p-6 border"
              style={{
                borderColor: "#262626",
                backgroundColor: "#0a0a0a",
              }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "#00FF62" }}
              >
                <IconComponent
                  size={24}
                  style={{ color: "#000000" }}
                  strokeWidth={2.5}
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {value.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OutValueSection;
