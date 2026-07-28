"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import bg_image from "@/assets/home/hero_bg.png"
import ButtonPrimary from "@/components/shared/ButtonPrimary";


const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen pt-20 overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src={bg_image}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

       

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full pt-32 px-4 sm:px-6 lg:px-8">
          <div className=" -mt-20 lg:-mt-40 text-center max-w-5xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-normal font-bold font-heading text-white tracking-tight">
              THE TOP FOOTBALL TALENTS  <br/><span className="text-3xl sm:text-4xl lg:text-6xl font-bold text-primary animate-pulse">
              ARE HERE
            </span>
            </h1>
           
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Connect with elite players, coaches, and clubs in the most advanced football networking platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <ButtonPrimary text="Join Now" className="px-8 py-6 text-base font-semibold border-2 border-primary" />
              <Button className="bg-transparent cursor-pointer border-2 border-white text-white hover:bg-white hover:text-black rounded-lg px-8 py-6 text-base font-semibold transition">
                Watch Demo
              </Button>
            </div>
          </div>

        
        </div>
      </section>
  )
}

export default HeroSection