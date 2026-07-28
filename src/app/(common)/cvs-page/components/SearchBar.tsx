"use client"
import { ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  return (
    <section className=" mb-10 bg-background text-foreground">
      {/* Header */}
      <div className="pt-16 pb-8 text-center">
        <h1 className="text-5xl font-bold font-heading tracking-tight">
          Analysis{' '}
          <span className="text-primary font-bold">CVs</span>
        </h1>
      </div>

      {/* Search and Filters Container */}
      <div className="container mx-auto px-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-border">
          {/* Search Bar */}
          <div className="flex flex-wrap gap-3 mb-6">
            <input
              type="text"
              placeholder="Search players, coaches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-input border border-border rounded-md px-4 py-3 text-foreground placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent transition"
            />
            <button className="bg-input border border-border hover:bg-white/10 rounded-md px-6 py-3 text-foreground font-medium transition flex items-center gap-2">
              <Search size={18} />
              Search
            </button>
          </div>

          {/* Advanced Filters */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-5 h-5 rounded-full border border-border flex items-center justify-center">
                <ChevronDown size={14} />
              </div>
              <span>Advanced Filters</span>
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex gap-3 flex-wrap">
            {/* Genre Dropdown */}
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="flex-1 bg-input border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent transition appearance-none cursor-pointer"
            >
              <option value="">Select a genre</option>
              <option value="pop">Pop</option>
              <option value="rock">Rock</option>
              <option value="hiphop">Hip Hop</option>
              <option value="jazz">Jazz</option>
            </select>

            {/* Age Groups Dropdown */}
            <select
              value={selectedAgeGroup}
              onChange={(e) => setSelectedAgeGroup(e.target.value)}
              className="flex-1 bg-input border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent transition appearance-none cursor-pointer"
            >
              <option value="">Select age groups</option>
              <option value="18-25">18-25</option>
              <option value="26-35">26-35</option>
              <option value="36-45">36-45</option>
              <option value="46+">46+</option>
            </select>

            {/* Position Dropdown */}
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="flex-1 bg-input border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent transition appearance-none cursor-pointer"
            >
              <option value="">Select position</option>
              <option value="vocalist">Vocalist</option>
              <option value="guitarist">Guitarist</option>
              <option value="drummer">Drummer</option>
              <option value="bassist">Bassist</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchBar