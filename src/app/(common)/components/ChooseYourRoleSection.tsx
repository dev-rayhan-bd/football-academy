import Image from "next/image";
import React from "react";
import playerImage from "@/assets/home/player_image.png";
import coatchImage from "@/assets/home/coatch_image.png";
import academyImge from "@/assets/home/academy_image.png";
import agentImage from "@/assets/home/footbal_agent_image.png";
import clubImage from "@/assets/home/professional_football_club.png";

const ChooseYourRoleSection = () => {
  const roles = [
    {
      title: "Players",
      description: "Showcase your skills and connect with scouts",
      image: playerImage,
    },
    {
      title: "Coaches",
      description: "Develop talent with advanced tools",
      image: coatchImage,
    },
    {
      title: "Grassroot Academy",
      description: "Manage careers and close deals",
      image: academyImge,
    },
    {
      title: "Football Agent",
      description: "Manage careers and close deals",
      image: agentImage,
    },
    {
      title: "Professional Club",
      description: "Scout and recruit the best talent",
      image: clubImage,
    },
  ];
  return (
    <section className="bg-black py-12  -28 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading">
            Choose <span className="text-primary">Your Role</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base">
            Select whether you&apos;re a Player, Coach, Agent, Academy, or Club
            and start connecting, scouting, or getting discovered through
            K10&apos;s global football network.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
          {roles.map((role, i) => (
            <div
              key={i}
              className={`flex flex-col cursor-pointer hover:scale-110 duration-300 items-center text-center mt-20 col-span-4 ${
                 i === 3
                  ? "lg:col-start-3"
                  : i===4
                    ? "lg:col-span-4"
                    : ""
              }`}
            >
              {/* Green Rectangle Background */}
              <div className="w-full h-48 sm:h-56 lg:h-64 bg-gradient-to-t from-[#001E0B] to-[#017A2F] rounded-lg mb-4 flex relative">
                {/* Circular Image with Black Border */}
                <div className="relative  w-32 h-32  mx-auto -mt-16 sm:-mt-20 sm:w-48 sm:h-48 rounded-full border-4 border-black overflow-hidden flex-shrink-0">
                  <Image
                    src={role.image}
                    alt={role.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-full p-6 absolute bottom-0 left-0">
                  <h4 className="font-bold text-white text-lg font-heading sm:text-[30px]">
                    {role.title}
                  </h4>
                  <p className="text-gray-400 text-sm mt-2">
                    {role.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChooseYourRoleSection;
