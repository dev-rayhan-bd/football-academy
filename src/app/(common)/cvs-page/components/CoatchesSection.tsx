"use client";
import club1 from "@/assets/cvs-page/club1.png";
import playerImage from "@/assets/cvs-page/coach-image2.png";
import flag1 from "@/assets/cvs-page/flag1.png";
import goldCard from "@/assets/cvs-page/gold-card.png";
import pinkCard from "@/assets/cvs-page/pink-card.png";
import whiteCard from "@/assets/cvs-page/white-card.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCoach } from "@/lib/hooks/useCoach";

interface Coach {
  id: number;
  name: string;
  rating: number;
  position: string;
  country: string;
  image: string;
  stats: {
    att: number;
    tac: number;
    def: number;
    imp: number;
    exp: number;
    lea: number;
  };
  cardType: "gold" | "white" | "pink";
}

const coaches: Coach[] = [
  {
    id: 1,
    name: "SAM KERR",
    rating: 74,
    position: "MAN",
    country: "🇦🇺",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    stats: { att: 93, tac: 85, def: 75, imp: 78, exp: 78, lea: 82 },
    cardType: "gold",
  },
  {
    id: 2,
    name: "ALVAREZ",
    rating: 74,
    position: "MAN",
    country: "🇦🇷",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    stats: { att: 93, tac: 85, def: 75, imp: 78, exp: 78, lea: 82 },
    cardType: "white",
  },
  {
    id: 3,
    name: "ANCELOTTI",
    rating: 74,
    position: "MAN",
    country: "🇮🇹",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    stats: { att: 93, tac: 85, def: 75, imp: 78, exp: 78, lea: 82 },
    cardType: "gold",
  },
  {
    id: 4,
    name: "MOURINHO",
    rating: 74,
    position: "MAN",
    country: "🇵🇹",
    image: "https://images.unsplash.com/photo-1507919886487-4fed9a8a5e0c?w=400&h=400&fit=crop",
    stats: { att: 93, tac: 85, def: 75, imp: 78, exp: 78, lea: 82 },
    cardType: "white",
  },
  {
    id: 5,
    name: "TEN HAG",
    rating: 74,
    position: "MAN",
    country: "🇳🇱",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    stats: { att: 93, tac: 85, def: 75, imp: 78, exp: 78, lea: 82 },
    cardType: "gold",
  },
  {
    id: 6,
    name: "ALVAREZ",
    rating: 74,
    position: "MAN",
    country: "🇦🇷",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    stats: { att: 93, tac: 85, def: 75, imp: 78, exp: 78, lea: 82 },
    cardType: "white",
  },
  {
    id: 7,
    name: "ZIDANE",
    rating: 74,
    position: "MAN",
    country: "🇫🇷",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    stats: { att: 93, tac: 85, def: 75, imp: 78, exp: 78, lea: 82 },
    cardType: "gold",
  },
  {
    id: 8,
    name: "ALONSO",
    rating: 74,
    position: "MAN",
    country: "🇪🇸",
    image: "https://images.unsplash.com/photo-1507919886487-4fed9a8a5e0c?w=400&h=400&fit=crop",
    stats: { att: 93, tac: 85, def: 75, imp: 78, exp: 78, lea: 82 },
    cardType: "white",
  },
  {
    id: 9,
    name: "EDDIE HOWE",
    rating: 74,
    position: "MAN",
    country: "🇬🇧",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    stats: { att: 93, tac: 85, def: 75, imp: 78, exp: 78, lea: 82 },
    cardType: "gold",
  },
  {
    id: 10,
    name: "MARTINEZ",
    rating: 74,
    position: "MAN",
    country: "🇪🇸",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    stats: { att: 93, tac: 85, def: 75, imp: 78, exp: 78, lea: 82 },
    cardType: "white",
  },
  {
    id: 11,
    name: "NAYMAR",
    rating: 74,
    position: "MAN",
    country: "🇧🇷",
    image: "https://images.unsplash.com/photo-1507919886487-4fed9a8a5e0c?w=400&h=400&fit=crop",
    stats: { att: 93, tac: 85, def: 75, imp: 78, exp: 78, lea: 82 },
    cardType: "gold",
  },
  {
    id: 12,
    name: "KAMAL",
    rating: 74,
    position: "MAN",
    country: "🇪🇬",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    stats: { att: 93, tac: 85, def: 75, imp: 78, exp: 78, lea: 82 },
    cardType: "white",
  },
  {
    id: 13,
    name: "K. BENZAMA",
    rating: 74,
    position: "MAN",
    country: "🇫🇷",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    stats: { att: 93, tac: 85, def: 75, imp: 78, exp: 78, lea: 82 },
    cardType: "gold",
  },
  {
    id: 14,
    name: "FODEN",
    rating: 74,
    position: "MAN",
    country: "🇬🇧",
    image: "https://images.unsplash.com/photo-1507919886487-4fed9a8a5e0c?w=400&h=400&fit=crop",
    stats: { att: 93, tac: 85, def: 75, imp: 78, exp: 78, lea: 82 },
    cardType: "white",
  },
  {
    id: 15,
    name: "HARI CANE",
    rating: 74,
    position: "MAN",
    country: "🇦🇺",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    stats: { att: 93, tac: 85, def: 75, imp: 78, exp: 78, lea: 82 },
    cardType: "gold",
  },
];

export default function Coaches() {
  const router = useRouter();
  const { coachData } = useCoach();

  // Map Redux data to the SILVA coach card (if it exists) or replace one
  const displayCoaches = coaches.map(c => {
    // Let's assume SILVA is the coach we want to sync
    if (c.name === "SAM KERR" || c.name === "SILVA") {
      return {
        ...c,
        name: coachData.fullName.split(" ")[1]?.toUpperCase() || coachData.fullName.toUpperCase(),
        rating: 58, // Fixed rating from bio
        stats: {
          att: coachData.seasonStats.wins,
          tac: coachData.seasonStats.matches,
          def: coachData.seasonStats.cleanSheets,
          imp: 85,
          exp: 90,
          lea: 95,
        }
      }
    }
    return c;
  });


  return (
    <div className="container mt=20 bg-black p-8">
      <h1
        className="text-4xl  text-center font-heading mb-12"
        style={{ color: "#00FF62" }}
      >
        Coaches
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {displayCoaches.map((coach) => (
          <div onClick={() => router.push("/cvs-page/coach-cv-details")} key={coach.id} className="flex justify-center">
            <div className="relative min-h-50 cursor-pointer hover:scale-110 min-w-60 duration-300">
              <Image
                className=" h-full w-full min-w-60 z-10"
                src={
                  coach.cardType === "pink"
                    ? pinkCard
                    : coach.cardType === "gold"
                      ? goldCard
                      : whiteCard
                }
                alt="card background"
              />
              {/* top values */}
              <div className="absolute top-[15%] left-7 text-black">
                <h2 className="text-3xl font-semibold">{coach.rating}</h2>
                <h2 className="text-lg">{coach.position}</h2>
                <Image src={flag1} className="w-6 mt-2" alt="flag image" />
                <Image src={club1} className="w-6 mt-2" alt="club image image" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className=" relative w-[90%] h-[90%] overflow-hidden">
                  {/* coach image */}
                  <Image
                    className="w-full h-48 ml-4 object-cover"
                    src={playerImage}
                    alt="coach Image"
                  />

                  {/* shadow */}
                  <div
                    className={`w-full h-40 absolute top-[35%] left-0 ${coach.cardType === "gold"
                        ? "bg-linear-to-t from-transparent via-[#F9E07F] to-transparent"
                        : coach.cardType === "white"
                          ? "bg-linear-to-t from-transparent via-[#E5E5E7] to-transparent"
                          : "bg-linear-to-t from-transparent via-[#F5DCCE] to-transparent"
                      }`}
                  ></div>
                  {/* name */}
                  <div
                    className={` absolute text-black text-2xl font-semibold text-center border-b pb-2 w-[80%]  top-[49%] left-1/2 -translate-x-1/2 z-10`}
                  >
                    {coach.name}
                  </div>

                  <div className="text-black relative z-10 mt-2">
                    {/*  */}
                    <div className="flex items-center justify-between gap-4 p-3">
                      {/* left */}
                      <div className="flex-1">
                        {/* 1 */}
                        <div className="flex justify-between">
                          <span className="font-bold text-gray-900">
                            {coach.stats.att}
                          </span>
                          <span className="font-semibold text-gray-700">
                            ATT
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-bold text-gray-900">
                            {coach.stats.def}
                          </span>
                          <span className="font-semibold text-gray-700">
                            DEF
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-bold text-gray-900">
                            {coach.stats.exp}
                          </span>
                          <span className="font-semibold text-gray-700">
                            EXP
                          </span>
                        </div>
                      </div>
                      <div className="h-16 border-r border-border"></div>
                      {/* right */}
                      <div className="flex-1">
                        {/* 1 */}
                        <div className="flex justify-between">
                          <span className="font-bold text-gray-900">
                            {coach.stats.tac}
                          </span>
                          <span className="font-semibold text-gray-700">
                            TAC
                          </span>
                        </div>
                        {/* 1 */}
                        <div className="flex justify-between">
                          <span className="font-bold text-gray-900">
                            {coach.stats.imp}
                          </span>
                          <span className="font-semibold text-gray-700">
                            IMP
                          </span>
                        </div>
                        {/* 1 */}
                        <div className="flex justify-between">
                          <span className="font-bold text-gray-900">
                            {coach.stats.lea}
                          </span>
                          <span className="font-semibold text-gray-700">
                            LEA
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[30%] border-b border-border mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
