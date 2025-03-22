import { setAllAppliedJobs } from '@/redux/jobSlice'
import { APPLICATION_API_ENDPOINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetAppliedJob() {

const dispatch=useDispatch()
useEffect(()=>{
    const fetchAllAppliedJob=async()=>{
        try {
            const res= await axios.get(`${APPLICATION_API_ENDPOINT}/get`,{withCredentials:true})
            console.log("Api data:",res.data);
            
            if(res.data.success){
                dispatch(setAllAppliedJobs(res.data.application))
                console.log("DATA",res.data);
                
            }
        } catch (error) {
            console.log("not able to fetch applied jobs",error);
            
        }
    }
    fetchAllAppliedJob()
},[])
}
export default useGetAppliedJob