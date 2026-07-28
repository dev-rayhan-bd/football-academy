import Image from 'next/image'
import React from 'react'

const TeamSection = () => {
    const teamMembers = [
  {
    name: 'Marco Rodriguez',
    title: 'CEO & Founder',
    description: 'Former professional footballer with 15 years of experience',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    name: 'Sarah Chen',
    title: 'CTO',
    description: 'AI & Machine Learning expert, Stanford PhD',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    name: 'David Thompson',
    title: 'Head of Scouting',
    description: '20+ years experience in professional football scouting',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
  {
    name: 'Elena Martinez',
    title: 'Head of Product',
    description: 'Product design specialist, former sports analyst',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
]
  return (
    <div><div className="container mx-auto px-6 py-20">
        {/* Title */}
        <h1 className="text-5xl font-bold font-heading text-center mb-16">
          Meet Our <span className="text-primary">Team</span>
        </h1>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex bg-cardBg p-6 rounded-xl flex-col items-center">
              {/* Circular Image Container */}
              <div className="relative w-40 h-40 mb-6 rounded-full border-2 border-primary overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-semibold mb-3">
                  {member.title}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div></div>
  )
}

export default TeamSection