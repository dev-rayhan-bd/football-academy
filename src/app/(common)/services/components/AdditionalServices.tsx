import { Badge, CheckCircle2, Shield } from "lucide-react";

const AdditionalServices = () => {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12 border-b border-neutral-800 pb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading">
            Additional <span className="text-primary">Services</span>
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Contract Management Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-black" strokeWidth={3} />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg mb-2">
                Contract Management
              </h3>
              <p className="text-neutral-400 text-sm">
                Professional contract tracking and negotiation support services.
              </p>
            </div>
          </div>

          {/* Achievement Recognition Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Badge className="w-6 h-6 text-black" strokeWidth={3} />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg mb-2">
                Achievement Recognition
              </h3>
              <p className="text-neutral-400 text-sm">
                Automated tracking and certification of player achievements and
                milestones.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Core Services */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 text-center">
            <div className="text-4xl font-bold text-primary mb-2">6</div>
            <p className="text-neutral-400">Core Services</p>
          </div>

          {/* Platform Access */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 text-center">
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <p className="text-neutral-400">Platform Access</p>
          </div>

          {/* Countries Served */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 text-center">
            <div className="text-4xl font-bold text-primary mb-2">150+</div>
            <p className="text-neutral-400">Countries Served</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalServices;
