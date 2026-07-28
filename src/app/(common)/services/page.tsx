import React from 'react'
import ServiceSection from './components/ServiceSection'
import AdditionalServices from './components/AdditionalServices'
import ImageCarousel from '../components/ImageCarousel'
import StartJourneySection from '../components/StartJourneySection'

const ServicePage = () => {
  return (
    <div>
      <ServiceSection/>
      <AdditionalServices/>
      <ImageCarousel/>
      <StartJourneySection/>
    </div>
  )
}

export default ServicePage