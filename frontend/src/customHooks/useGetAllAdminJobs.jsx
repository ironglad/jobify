import { setAdminJobs } from '@/redux/jobSlice'
import { JOB_API_ENDPOINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetAllAdminJobs() {
 const dispatch=useDispatch()
 useEffect(()=>{
    const fetchAllAdminJobs=async()=>{
        try {
            const res= await axios.get(`${JOB_API_ENDPOINT}/getAdminJob`,{withCredentials:true});

            
            if(res.data.success){
                dispatch(setAdminJobs(res.data.jobs))
                
                
                
            }   
        } catch (error) {
            console.log("Something went wrong while getting jobs",error);
        }
    }
    fetchAllAdminJobs()
 },[])
}

export default useGetAllAdminJobs