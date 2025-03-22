import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, SearchCheck, SearchCheckIcon, SearchIcon } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

function HeroSection() {
  const[query,setQuery]=useState("")
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const searchJobHandler=()=>{
    dispatch(setSearchedQuery(query))
    // console.log("Dispatched query:", query);  
    navigate("/browse")
  }
  
  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 '>
        <span className=' my-7 mx-auto bg-[#E8F9FF] px-4 py-2 rounded-full text-[#f83002]'>No. 1 job hunt website</span>
        <h1 className='text-5xl font-bold '>Search,Apply & <br />Get <span className='text-[#6a38c2]'>Your Dream Jobs</span></h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga commodi voluptas dolorem, corporis cumque quod voluptate </p>
        <div className='flex w-[40%] shadow-lg border border-green-200 pl-3 rounded-full items-center gap-4 mx-auto'>
          <input
            type="text"
            placeholder='Find your dream Jobs'
            onChange={(e)=>setQuery(e.target.value)}
            className='outline-none border-none w-full' />

          <Button  onClick={searchJobHandler} className="bg-[#6a38c2] hover:bg-[#6a38c2] rounded-r-full"><Search className='h-5 w-5 text-white' />   </Button>
        </div>
      </div>
    </div>

  )
}

export default HeroSection