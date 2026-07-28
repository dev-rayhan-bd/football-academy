import { BarChart3, Database, Target, TrendingUp, Users, Video } from "lucide-react";

const ServiceSection = () => {
  return (
    <section className="w-full bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="bg-primary text-black px-4 py-2 rounded-full font-semibold text-sm">
            Our Services
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading">
            Comprehensive Football{" "}
            <span className="text-primary">Analytics</span>
          </h2>
          <p className="mt-8 text-lg max-w-2xl mx-auto">
            Professional performance tracking and career development tools
            designed for modern football players, scouts, and clubs.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Performance Analytics Card */}
          <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary p-2 rounded-sm">
                <BarChart3 className="w-4 h-4 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white lg:text-2xl">
                Performance Analytics
              </h3>
            </div>
            <p className="text-gray-400 mb-6">
              Comprehensive player performance tracking with real-time
              statistics, advanced metrics, and AI-powered insights.
            </p>
            <ul className="space-y-3">
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Real-time match statistics</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Advanced performance metrics</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>AI-powered trend analysis</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Custom report generation</span>
              </li>
            </ul>
          </div>

          {/* Scouting Network Card */}
          <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary p-2 rounded-sm">
                <Users className="w-4 h-4 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white lg:text-2xl">
                Scouting Network
              </h3>
            </div>
            <p className="text-gray-400 mb-6">
              Connect with scouts, agents, and clubs worldwide. Access our
              extensive database of verified player profiles.
            </p>
            <ul className="space-y-3">
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Global scouting network</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Verified player profiles</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Direct agent connections</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Club recruitment tools</span>
              </li>
            </ul>
          </div>

          {/* Video Analysis Card */}
          <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary p-2 rounded-sm">
                <Video className="w-4 h-4 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white lg:text-2xl">
                Video Analysis
              </h3>
            </div>
            <p className="text-gray-400 mb-6">
              Professional video analysis tools with highlight reels, match
              breakdowns, and tactical insights.
            </p>
            <ul className="space-y-3">
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Automated highlight reels</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Tactical match analysis</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Video comparison tools</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Cloud storage & sharing</span>
              </li>
            </ul>
          </div>
          {/* Career Development Card */}
          <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary p-2 rounded-sm">
                <TrendingUp className="w-4 h-4 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white lg:text-2xl">
                Career Development
              </h3>
            </div>
            <p className="text-gray-400 mb-6">
              Personalized career planning, training recommendations, and market
              value tracking for player growth.
            </p>
            <ul className="space-y-3">
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Personalized training plans</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Market value tracking</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Career milestone tracking</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Growth predictions</span>
              </li>
            </ul>
          </div>
          {/* Skill Assessment Card */}
          <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary p-2 rounded-sm">
                <Target className="w-4 h-4 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white lg:text-2xl">
                Skill Assessment
              </h3>
            </div>
            <p className="text-gray-400 mb-6">
              Detailed skill assessments across technical, tactical, physical,
              and mental attributes.
            </p>
            <ul className="space-y-3">
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Multi-dimensional assessment</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Benchmarking tools</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Progress tracking</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Strength/weakness analysis</span>
              </li>
            </ul>
          </div>
          {/* Data Management Card */}
          <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary p-2 rounded-sm">
                <Database className="w-4 h-4 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white lg:text-2xl">
                Data Management
              </h3>
            </div>
            <p className="text-gray-400 mb-6">
              Secure cloud-based data management system for all player
              information, documents, and media.
            </p>
            <ul className="space-y-3">
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Secure cloud storage</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Document management</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Media library</span>
              </li>
              <li className="text-gray-300 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Export capabilities</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
