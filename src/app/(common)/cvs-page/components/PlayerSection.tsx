"use client";

import club1 from "@/assets/cvs-page/club1.png";
import flag1 from "@/assets/cvs-page/flag1.png";
import goldCard from "@/assets/cvs-page/gold-card.png";
import playerImage from "@/assets/cvs-page/id/player-short-image.png";
import pinkCard from "@/assets/cvs-page/pink-card.png";
import whiteCard from "@/assets/cvs-page/white-card.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePlayer } from "@/lib/hooks/usePlayer";
import { getShortForm } from "@/lib/utils";

const COUNTRY_CODES: Record<string, string> = {
  "france": "fr",
  "china": "cn",
  "united kingdom": "gb",
  "united states": "us",
  "spain": "es",
  "japan": "jp",
  "brazil": "br",
  "croatia": "hr",
  "ghana": "gh",
  "ireland": "ie",
  "serbia": "rs",
  "argentina": "ar"
};

const getFlagUrl = (countryName: string) => {
  if (!countryName) return "";
  const code = COUNTRY_CODES[countryName.toLowerCase()];
  return code ? `https://flagcdn.com/w40/${code}.png` : "";
};

export default function Players() {
  const router = useRouter();
  const { players, selectPlayer } = usePlayer();

  return (
    <div className="container mt-20 bg-black p-8">
      <h1
        className="text-4xl text-center font-heading mb-12 animate-pulse"
        style={{ color: "#00FF62" }}
      >
        PLAYERS
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {players.map((player) => {
          // avg under 60 -> pink, gte 60 and less 80 -> white/silver, gte 80 -> gold
          const cardType = player.rating >= 80 ? "gold" : player.rating >= 60 ? "white" : "pink";
          const shortPos = getShortForm(player.position) || "ST";
          const flagSrc = getFlagUrl(player.birthCountry) || flag1.src;
          const displayLastName = player.fullName.split(" ").pop()?.toUpperCase() || player.fullName.toUpperCase();

          const stats = {
            pac: player.strengths.pace,
            sho: player.strengths.shooting,
            pas: player.strengths.passing,
            dri: player.strengths.dribbling,
            def: player.strengths.defending,
            phy: player.strengths.physical,
          };

          return (
            <div
              onClick={() => {
                selectPlayer(player.id);
                router.push("/cvs-page/player-cv-details");
              }}
              key={player.id}
              className="flex min-w-60 justify-center cursor-pointer"
            >
              <div className="relative min-h-50 hover:scale-110 duration-300">
                <Image
                  className="h-full w-full min-w-60 z-10"
                  src={
                    cardType === "pink"
                      ? pinkCard
                      : cardType === "gold"
                        ? goldCard
                        : whiteCard
                  }
                  alt="card background"
                />
                {/* top values */}
                <div className="absolute top-[15%] left-7 text-black flex flex-col items-center">
                  <h2 className="text-3xl font-semibold leading-none">{player.rating}</h2>
                  <h2 className="text-xs font-bold leading-none mt-1">{shortPos}</h2>
                  <img src={flagSrc} className="w-6 h-4 object-cover mt-2 rounded-xs shadow-sm" alt="flag" />
                  <Image src={club1} className="w-6 mt-1.5" alt="club image" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-[90%] h-[90%]">
                    {/* Render custom card image if uploaded, otherwise keep default short image */}
                    <div className="w-[80%] h-[200px] pt-5 pr-3 flex items-center justify-center ml-auto">
                      <img
                        className="w-full h-full  object-cover rounded-t-3xl"
                        src={player.cardImage || playerImage.src}
                        alt="player Image"
                      />
                    </div>

                    {/* shadow */}
                    <div
                      className={`w-full h-40 absolute top-[35%] left-0 ${cardType === "gold"
                        ? "bg-linear-to-t from-transparent via-[#F9E07F] to-transparent"
                        : cardType === "white"
                          ? "bg-linear-to-t from-transparent via-[#E5E5E7] to-transparent"
                          : "bg-linear-to-t from-transparent via-[#F5DCCE] to-transparent"
                        }`}
                    ></div>
                    {/* name */}
                    <div
                      className="absolute text-black font-heading text-2xl text-center border-b pb-2 w-[80%] top-[49%] left-1/2 -translate-x-1/2 z-10"
                    >
                      {displayLastName}
                    </div>

                    <div className="text-black relative z-10 mt-4">
                      <div className="flex items-center justify-between gap-4 p-3 pb-1">
                        {/* left */}
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-bold text-gray-900">{stats.pac}</span>
                            <span className="font-semibold text-gray-700">PAC</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-bold text-gray-900">{stats.sho}</span>
                            <span className="font-semibold text-gray-700">SHO</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-bold text-gray-900">{stats.pas}</span>
                            <span className="font-semibold text-gray-700">PAS</span>
                          </div>
                        </div>
                        <div className="h-16 border-r border-border"></div>
                        {/* right */}
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-bold text-gray-900">{stats.dri}</span>
                            <span className="font-semibold text-gray-700">DRI</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-bold text-gray-900">{stats.def}</span>
                            <span className="font-semibold text-gray-700">DEF</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-bold text-gray-900">{stats.phy}</span>
                            <span className="font-semibold text-gray-700">PHY</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-[30%] border-b border-black/10 mx-auto my-1"></div>
                      <div className="flex flex-col items-center justify-center text-[8px] font-bold text-gray-700 space-y-0.5 pb-2">
                        <div className="truncate max-w-[170px] uppercase tracking-wider">
                          ACADEMY: <span className="font-black text-black">{player.academyName || "N/A"}</span>
                        </div>
                        <div className="truncate max-w-[170px] uppercase tracking-wider">
                          COACH: <span className="font-black text-black">{player.coachName || "N/A"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

