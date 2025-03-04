import React from 'react'
import LastestJobCard from './LastestJobCard'

const randomJob=[1,2,3,4,5,6,7,8]

function LastesJob() {
  return (
    <div className='max-w-7xl mx-auto my-26'>
    <div className='text-4xl font-bold  '><span className='text-[#6a38c2]'>Lasted & Top </span>Job Opening</div>
    <div className='grid grid-cols-3 gap-4 my-5'>
        {
            randomJob.slice(0,6).map((items,index)=><LastestJobCard/>)
        }
    </div>
    </div>
  )
}

export default LastesJob