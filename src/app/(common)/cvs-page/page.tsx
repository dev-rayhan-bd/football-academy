import React from 'react'
import SearchBar from './components/SearchBar'
import AnalyciesSection from './components/AnalyciesSection'
import ImageCarousel from '../components/ImageCarousel'
import StartJourneySection from '../components/StartJourneySection'
import Players from './components/PlayerSection'
import Coaches from './components/CoatchesSection'

const CVSPage = () => {
  return (
    <div>
      <SearchBar />
      <AnalyciesSection />
      <Players />
      <Coaches />
      <ImageCarousel />
      <StartJourneySection />
    </div>
  )
}

export default CVSPage