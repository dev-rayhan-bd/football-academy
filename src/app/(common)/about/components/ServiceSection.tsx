import React from 'react'

const ServiceSection = () => {
  return (
    <div className="container py-20">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="px-4 py-1.5 rounded-full text-sm font-medium" style={{ backgroundColor: '#00FF62', color: '#000000' }}>
            Our Services
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold font-heading mb-4">
            Transforming Football <span style={{ color: '#00FF62' }}>Analytics</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional performance tracking and career development tools designed for modern football players, scouts, and clubs.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { number: '50K+', label: 'Active Players' },
            { number: '2,000+', label: 'Professional Scouts' },
            { number: '150+', label: 'Countries' },
            { number: '1M+', label: 'Match Reports' },
          ].map((stat, index) => (
            <div
              key={index}
              className="rounded-lg p-8 border bg-cardBg "
              
            >
              <div className="text-3xl font-bold mb-2" style={{ color: '#00FF62' }}>
                {stat.number}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default ServiceSection