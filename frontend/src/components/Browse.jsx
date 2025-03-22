import React, { useEffect } from 'react'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/customHooks/useGetAllJobs'

const randomJobs=[1,2,3,4,5,6,7,8]

function Browse() {
    useGetAllJobs()
    const{allJobs}=useSelector(store=>store.job)
    const dispatch=useDispatch()
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""))
        }
    },[])
  return (
    <div>
        <div className='max-w-7xl mx-auto my-6'>
            <h1 className='font-bold text-lg my-6'>Search Result ({allJobs.length})</h1>
            <div className='grid grid-cols-3 gap-4'>
                {
                 allJobs.map((job)=>
                    <div >
                        <Job key={job._id} job={job}/>
                    </div>)
                }
            </div>
        </div>
    </div>
  )
}

export default Browse