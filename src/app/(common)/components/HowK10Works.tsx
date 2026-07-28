import { Card } from "@/components/ui/card"

const HowK10Works = () => {
  return (
    <section className="bg-black py-12 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading">How <span className="text-primary">K10</span> Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Join us on your professional journey with our seamless onboarding process.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Create Your Profile', description: 'Build a comprehensive profile showcasing your talent and achievements.' },
              { step: '02', title: 'Connect & Network', description: 'Expand your network with coaches, scouts, and fellow players.' },
              { step: '03', title: 'Showcase Skills', description: 'Upload videos and performance data for professional review.' },
              { step: '04', title: 'Get Discovered', description: 'Receive opportunities from top clubs and organizations.' },
            ].map((item, i) => (
             <Card key={i} className="bg-[#1a1a1a] border border-[#333333] p-6 hover:border-primary transition">
                <h4 className="text-lg font-semibold text-white text-center ">{item.title}</h4>
                <p className="text-sm text-gray-400 text-center -mt-3">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
  )
}

export default HowK10Works