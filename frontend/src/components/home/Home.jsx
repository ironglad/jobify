import React from 'react'
import Navbar from '../shared/Navbar'
import HeroSection from '../HeroSection'
import Category from '../Category'
import LastesJob from '../LastesJob'
import Footer from '../shared/Footer'


function Home() {
  return (
    <div>
        <HeroSection/>
        <Category/>
        <LastesJob/>
        <Footer/>
    </div>
  )
}

export default Home