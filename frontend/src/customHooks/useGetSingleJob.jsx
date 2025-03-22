import { setAllJobs, setSingleJob } from '@/redux/jobSlice'
import { JOB_API_ENDPOINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetSingleJobs() {
 const dispatch=useDispatch()

}

export default useGetSingleJobs