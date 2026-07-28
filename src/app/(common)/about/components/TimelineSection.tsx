import React from 'react'

const TimelineSection = () => {
  return (
    <div className="container py-20">
        {/* Heading */}
        <h2 className="text-4xl font-heading font-bold mb-12 text-center">
          Our <span style={{ color: '#00FF62' }}>Timeline</span>
        </h2>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto">
          {[
            { year: '2018', description: 'K10 Football founded with a vision to democratize player analytics' },
            { year: '2019', description: 'Launched beta platform with 500 early adopters' },
            { year: '2020', description: 'Reached 10,000 registered players and introduced AI-powered insights' },
            { year: '2021', description: 'Expanded to 50 countries and partnered with major football academies' },
            { year: '2022', description: 'Introduced professional scouting network and video analysis tools' },
            { year: '2023', description: 'Expanded global reach to 150+ countries with 1M+ match reports' },
          ].map((milestone, index) => (
            <div key={index} className="flex gap-6 mb-8 relative">
              {/* Timeline line */}
              {index < 5 && (
                <div
                  className="absolute left-6 top-16 w-0.5 h-12"
                  style={{ backgroundColor: '#00FF62' }}
                />
              )}
              
              {/* Year circle */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm"
                style={{
                  backgroundColor: '#00FF62',
                  color: '#000000',
                }}
              >
                {milestone.year}
              </div>

              {/* Description */}
              <div className="flex items-center pt-1">
                <p className="text-gray-400">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default TimelineSection