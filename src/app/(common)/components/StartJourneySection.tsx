import Image from "next/image";
import image from "@/assets/home/startJourneyImage.png";
import { Button } from "@/components/ui/button";
import GradientButton from "@/components/shared/GradientButton";

const StartJourneySection = () => {
  return (
    <div className="relative overflow-hidden bg-black">
      <div className="absolute">
        <Image src={image} alt="Start Journey" />
      </div>
      <div className="container py-32 flex items-center justify-center relative z-10 w-full h-full">
        <div className="space-y-4 flex flex-col items-center text-center">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-white">Ready to Start Your Journey?</h3>
          <p className="text-gray-100 sm:text-[16px]">Join thousands of players, coaches, and clubs who are already <br/> building their future on K10 Football</p>
          <GradientButton text="Get Started Today" className="px-8 py-6 mt-8" />
        </div>
      </div>
    </div>
  );
};

export default StartJourneySection;
