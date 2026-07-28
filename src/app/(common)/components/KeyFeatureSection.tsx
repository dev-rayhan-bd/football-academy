import { Card } from "@/components/ui/card";
import Image from "next/image";
import image1 from "@/assets/home/keyFeatureImage1.png";
import image2 from "@/assets/home/key_feature_grid_1.png";
import image3 from "@/assets/home/key_feature_grid_2.png";
import image4 from "@/assets/home/key_feature_grid_3.png";

const KeyFeatureSection = () => {
  return (
    <section className="bg-black py-12 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl  font-heading font-bold text-white">
            Key <span className="text-primary">Features</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore what makes K10 the premier platform for football talent
            management and networking.
          </p>
        </div>

        {/* Feature 1 - Performance Analytics */}
        <div className="relative">
          <div className="relative h-[600px] sm:h-[400px] lg:h-[500px] bg-[#1a1a1a] rounded-lg border-transparent overflow-hidden">
            <Image
              src={image1}
              alt="Performance analytics"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full flex items-center justify-center flex-col bg-black/50 p-8 backdrop-blur-xs">
            <h4 className="text-3xl mb-5 font-bold text-white text-center">
              Performance Analytics
            </h4>
            <p className="text-sm text-gray-400 text-center max-w-4xl">
              Track player stats, match performance, and skill growth with
              detailed visual dashboards. Coaches and scouts can instantly
              compare players through dynamic metrics like speed, accuracy,
              stamina, and success rate, all powered by real-time data.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 - Performance Analytics */}
          <div className="relative">
            <div className="relative h-[400px] sm:h-[400px] lg:h-[500px] bg-[#1a1a1a] rounded-lg border-transparent overflow-hidden">
              <Image
                src={image2}
                alt="Smart Search"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-full flex items-center justify-center flex-col bg-black/50 p-8 backdrop-blur-xs">
              <h4 className="text-3xl mb-5 font-bold text-white  ">
                Smart Search
              </h4>
              <p className="text-sm text-gray-400 text-center max-w-4xl">
                Find top talent or the perfect club with K10’s Smart Search
                filter by skills, stats, and achievements for instant, accurate
                results.
              </p>
            </div>
          </div>
          {/* Feature 1 - Performance Analytics */}
          <div className="relative">
            <div className="relative h-[400px] sm:h-[400px] lg:h-[500px] bg-[#1a1a1a] rounded-lg border-transparent overflow-hidden">
              <Image
                src={image3}
                alt="Role-Based Access"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-full flex items-center justify-center flex-col bg-black/50 p-8 backdrop-blur-xs">
              <h4 className="text-3xl mb-5 font-bold text-white ">
                Role-Based Access
              </h4>
              <p className="text-sm text-gray-400 text-center max-w-4xl">
                K10 tailors experiences for every role players track
                performance, coaches gain insights, scouts discover talent, and
                clubs access recruitment analytics.
              </p>
            </div>
          </div>
          {/* Feature 1 - Performance Analytics */}
          <div className="relative">
            <div className="relative h-[400px] sm:h-[400px] lg:h-[500px] bg-[#1a1a1a] rounded-lg border-transparent overflow-hidden">
              <Image
                src={image4}
                alt="Verified Profiles"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-full flex items-center justify-center flex-col bg-black/50 p-8 backdrop-blur-xs">
              <h4 className="text-3xl mb-5 font-bold text-white ">
                Verified Profiles
              </h4>
              <p className="text-sm text-gray-400 text-center max-w-4xl">
                Every K10 profile is verified for credibility real stats, match
                records, and achievements that build trust and authenticity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatureSection;
