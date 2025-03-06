import React from 'react'
import Job from './Job'

const randomJobs=[1,2,3,4,5,6,7,8]

function Browse() {
  return (
    <div>
        <div className='max-w-7xl mx-auto my-6'>
            <h1 className='font-bold text-lg my-6'>Search Result ({randomJobs.length})</h1>
            <div className='grid grid-cols-3 gap-4'>
                {
                    randomJobs.map((Item,index)=>
                    <div >
                        <Job/>
                    </div>)
                }
            </div>
        </div>
    </div>
  )
}

export default Browse