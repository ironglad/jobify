import React from 'react'
import LastestJobCard from './LastestJobCard'
import { useSelector } from 'react-redux'
import store from '@/redux/store'


const randomJob=[1,2,3,4,5,6,7,8]

function LastesJob() {
  const{allJobs}=useSelector(store=>store.job)

  return (
    <div className='max-w-7xl mx-auto my-26'>
    <div className='text-4xl font-bold  '><span className='text-[#6a38c2]'>Lasted & Top </span>Job Opening</div>
    <div className='grid grid-cols-3 gap-4 my-5'>
        {
            allJobs.length <=0 ?<span>No Job Avaiable</span>: allJobs.slice(0,6).map((job)=><LastestJobCard key={job._id} job={job} />)
        }
    </div>
    </div>
  )
}

export default LastesJob