import React from 'react'
import Navbar from '../shared/Navbar'
import HeroSection from '../HeroSection'
import Category from '../Category'
import LastesJob from '../LastesJob'


function Home() {
  return (
    <div>
        <HeroSection/>
        <Category/>
        <LastesJob/>
    </div>
  )
}

export default Home