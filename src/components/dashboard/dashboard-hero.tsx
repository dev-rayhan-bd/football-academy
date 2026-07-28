import React from "react";
import { IconPhone, IconMail, IconShieldCheck, IconCertificate } from "@tabler/icons-react";

interface DashboardHeroProps {
  backgroundImage: string;
  rating?: number;
  badgeText?: string;
  title: string;
  subtitle?: string;
  details?: {
    icon?: React.ReactNode;
    text: string;
  }[];
  contacts?: {
    type: "phone" | "email" | "club" | "license";
    label: string;
    value: string;
  }[];
  characterImage?: any;
  logoImage?: string;
}

export const DashboardHero = ({
  backgroundImage,
  rating,
  badgeText,
  title,
  subtitle,
  details,
  contacts,
  characterImage,
  logoImage,
}: DashboardHeroProps) => {
  const characterImgSrc = characterImage
    ? (typeof characterImage === "string" ? characterImage : (characterImage.src || ""))
    : "";

  const getIcon = (type: string) => {
    switch (type) {
      case "phone": return <IconPhone size={22} />;
      case "email": return <IconMail size={22} />;
      case "club": return <IconShieldCheck size={22} />;
      case "license": return <IconCertificate size={22} />;
      default: return <IconMail size={22} />;
    }
  };

  return (
    <div className="relative rounded-3xl overflow-hidden min-h-[500px] border border-white/20 bg-[#0D0D0D] group flex flex-col justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-[length:100%_auto] bg-no-repeat bg-center opacity-50"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent w-2/3" />
      
      {/* Standing Character */}
      {characterImgSrc && (
        <img 
          src={characterImgSrc} 
          alt="Character" 
          className="absolute right-16 bottom-6 h-[88%] object-contain object-right z-10 hidden lg:block"
        />
      )}

      <div className="relative p-8 md:p-12 w-full flex flex-col gap-8 z-20">
        <div className="space-y-6">
          {/* Logo Image */}
          {logoImage && (
            <div className="mb-4">
              <img src={logoImage} alt="Club Logo" className="w-24 h-auto object-contain" />
            </div>
          )}
          
          {/* Rating Circle */}
          {rating && (
            <div className="w-24 h-24 rounded-full border-4 border-[#E31B23] flex items-center justify-center bg-black/50 backdrop-blur-md shadow-[0_0_30px_rgba(227,27,35,0.2)]">
              <span className="text-4xl font-black text-white italic">{rating}</span>
            </div>
          )}
          
          <div className="space-y-4">
            {badgeText && (
              <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase w-fit tracking-[0.2em]">
                {badgeText}
              </div>
            )}
            
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none italic">
                {title}
              </h1>
              <div className="flex items-center gap-4 text-white font-bold text-sm">
                <span className="text-[#E31B23]">{subtitle}</span>
                {details && details.map((detail, index) => (
                  <React.Fragment key={index}>
                    <span className="text-white/20">•</span>
                    <div className="flex items-center gap-2 text-white/60">
                      {detail.icon}
                      <span>{detail.text}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {contacts && contacts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-3xl pt-8 border-t border-white/10">
            {contacts.map((contact, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-white/40">
                  {getIcon(contact.type)}
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">
                    {contact.label}
                  </p>
                  <p className="text-white text-base font-bold">
                    {contact.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
