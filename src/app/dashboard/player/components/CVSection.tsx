'use client'

import { CheckCircle2, Download, Share2 } from 'lucide-react'

export default function CVSection() {
  const sections = [
    { name: 'Personal Info', completed: true },
    { name: 'Physical Stats', completed: true },
    { name: 'Skills & Attributes', completed: true },
    { name: 'Match History', completed: true },
    { name: 'References', completed: false }
  ]

  return (
    <div className="">
      <div className=" mx-auto">
        {/* Main Card */}
        <div className="border  rounded-2xl p-8  bg-opacity-50">
          {/* Title */}
          <h1 className="text-3xl font-heading text-white mb-8">My CV</h1>

          {/* Tabs/Sections */}
          <div className="flex items-center gap-8 mb-8 pb-8 border-b ">
            {sections.map((section) => (
              <div key={section.name} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-gray-300 text-sm">{section.name}</span>
              </div>
            ))}
          </div>

          {/* Content Section */}
          <div className="flex items-center gap-8">
            {/* Left - Profile Completion */}
            <div className="border rounded-lg p-6  min-w-fit">
              <p className="text-gray-400 text-sm mb-4">Profile Completion</p>
              <p className="text-red-600 text-3xl font-bold mb-4">85%</p>
              <div className="w-48 rounded-full h-2 overflow-hidden" style={{ backgroundColor: '#d1d5db' }}>
                <div className="bg-red-600 h-full rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            {/* Middle - Gold Ready Badge */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="text-yellow-500 font-bold text-sm tracking-widest">GOLD READY</span>
              </div>
              <p className="text-gray-300 text-sm">
                Your CV meets Gold tier standards and is ready to share with top clubs and agents.
              </p>
            </div>

            {/* Right - Action Buttons */}
            <div className="flex flex-col gap-4 min-w-fit">
              <button className="px-6 py-2 border border-gray-600 text-white rounded-lg hover:border-gray-400 transition flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button className="px-6 py-2 border border-gray-600 text-white rounded-lg hover:border-gray-400 transition flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share with Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
