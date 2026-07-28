"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { NavUser } from "./nav-user";
import { ReactNode } from "react";

export function SiteHeader({ showToggle = false, customToggle }: { showToggle?: boolean, customToggle?: ReactNode }) {
  const pathName = usePathname();
  const isAnalysis = pathName.includes("/analysis");
  const router = useRouter();

  const handleToggle = () => {
    if (isAnalysis) {
      router.push("/dashboard/academy/management");
    } else {
      router.push("/dashboard/academy/analysis");
    }
  };

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar:
        "https://i.ibb.co.com/VWkMFBWM/pngtree-user-icon-png-image-1796659.jpg",
    },
  };
  return (
    <header className="flex h-(--header-height) shrink-0 items-center justify-between gap-4 px-4 lg:px-8 border-b border-white/5 bg-[#0A0A0A]/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex flex-1 items-center gap-4">
        <SidebarTrigger className="text-white" />

        <div className="hidden sm:relative sm:block w-full max-w-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search By Age Range, Country, Gender And Positions..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#E31B23]"
          />
        </div>

        {customToggle && (
          <div className="hidden lg:flex">
            {customToggle}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 text-gray-300">
        {showToggle && (
          <div className="flex items-center bg-[#5a0000] rounded-lg p-1.5 gap-1.5 mr-2 scale-90 lg:scale-100 border border-white/5">
            <button
              onClick={() => router.push("/dashboard/academy/management")}
              className={`px-4 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all ${!isAnalysis ? 'bg-[#E31B23] text-white' : 'text-white/40 hover:text-white/60'}`}
            >
              Management
            </button>
            <div
              onClick={handleToggle}
              className="w-10 h-5 bg-white/10 rounded-full relative cursor-pointer group border border-white/5"
            >
              <div className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full transition-all duration-300 shadow-sm ${isAnalysis ? 'right-0.5' : 'left-0.5'}`}></div>
            </div>
            <button
              onClick={() => router.push("/dashboard/academy/analysis")}
              className={`px-4 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all ${isAnalysis ? 'bg-[#E31B23] text-white' : 'text-white/40 hover:text-white/60'}`}
            >
              Analysis
            </button>
          </div>
        )}

        <div className="hidden xs:flex items-center gap-1 cursor-pointer bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-sm font-medium">
          <span>EN</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
        </div>

        <div className="hidden xs:block relative cursor-pointer hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#E31B23] rounded-full border border-[#0A0A0A]"></span>
        </div>
      </div>
    </header>
  );
}
