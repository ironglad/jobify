import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import HeroSection from '../HeroSection'
import Category from '../Category'
import LastesJob from '../LastesJob'
import Footer from '../shared/Footer'
import useGetAllJobs from '@/customHooks/useGetAllJobs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import store from '@/redux/store'


function Home() {
  useGetAllJobs()
  const navigate=useNavigate()
  const {user}=useSelector(store=>store.auth)
  useEffect( ()=>{
    if(user?.role=="recruiter"){
      navigate("/admin/companies")
    }
  },[])
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