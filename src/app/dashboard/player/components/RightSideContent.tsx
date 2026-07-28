'use client'

import { FileText, Heart } from 'lucide-react'
import Image from 'next/image'
import clubLogo from "@/assets/cvs-page/club1.png"

import { useAppSelector } from "@/lib/hooks/reduxHooks";

export default function RightSideContent() {
  const reports = useAppSelector(state => state.reports.reports);
  const gameReports = reports
    .filter(r => r.status === "Paid")
    .slice(0, 3)
    .map(r => ({
      id: r.id,
      opponent: `vs ${r.team2}`,
      rating: r.rating
    }));

  const clubsInterested = [
    {
      id: 1,
      name: 'Manchester City',
      subtitle: 'Viewed your profile',
      logo: clubLogo
    },
    {
      id: 2,
      name: 'Liverpool FC',
      subtitle: 'Viewed your profile',
      logo: clubLogo
    },
    {
      id: 3,
      name: 'Chelsea FC',
      subtitle: 'Viewed your profile',
      logo: clubLogo
    }
  ]

  const stats = [
    { label: 'Profile Views', value: '127', color: 'text-gray-400' },
    { label: 'Total Likes', value: '8', color: 'text-red-500' },
    { label: 'Reports', value: '12', color: 'text-green-500' }
  ]

  return (
      <div className=" space-y-6">
        {/* New Game Reports */}
        <div className="border rounded-2xl p-6 ">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-white font-heading text-lg">New Game Reports</h2>
          </div>

          <div className="space-y-3">
            {gameReports.map((report) => (
              <div key={report.id} className="border  rounded-lg p-4 flex items-center justify-between hover:bg-gray-700 transition">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300 text-sm">{report.opponent}</span>
                </div>
                <span className="text-white font-bold text-lg">{report.rating}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Clubs Interested */}
        <div className="border rounded-2xl p-6 ">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <h2 className="text-white font-heading text-lg">Clubs Interested</h2>
          </div>

          <div className="space-y-3">
            {clubsInterested.map((club) => (
              <div key={club.id} className="border rounded-lg p-4 flex items-center gap-4 hover:bg-gray-700 transition">
                <Image
                  src={club.logo}
                  alt={club.name}
                  width={200}
                  height={200}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{club.name}</p>
                  <p className="text-gray-400 text-xs">{club.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="border rounded-2xl p-6 ">
          <h2 className="text-white font-heading text-lg mb-6">Quick Stats</h2>

          <div className="space-y-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">{stat.label}</span>
                <span className={`font-bold text-lg ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}
