import { setAllJobs } from '@/redux/jobSlice'
import store from '@/redux/store'
import { JOB_API_ENDPOINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function useGetAllJobs() {
 const dispatch=useDispatch()
 const {searchedQuery}=useSelector(store=>store.job)
 useEffect(()=>{
    const fetchAllJobs=async()=>{
        try {
            const res= await axios.get(`${JOB_API_ENDPOINT}/getJobs?keyword=${searchedQuery}`,{withCredentials:true});
         
            if(res.data.success){
                dispatch(setAllJobs(res.data.jobs))
                
            }   
        } catch (error) {
            console.log("Something went wrong while getting jobs",error);
        }
    }
    fetchAllJobs()
 },[])
}

export default useGetAllJobs
// import { setAllJobs } from '@/redux/jobSlice';
// import { JOB_API_ENDPOINT } from '@/utils/constant';
// import axios from 'axios';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// function useGetAllJobs() {
//     const dispatch = useDispatch();
//     const { searchedQuery } = useSelector(store => store.job);

//     useEffect(() => {
//         const fetchAllJobs = async () => {
//             try {
//                 const res = await axios.get(`${JOB_API_ENDPOINT}/getJobs/get?keyword=${searchedQuery}`, { withCredentials: true });
//                 console.log("API Response:", res);

//                 if (res.data.success) {
//                     dispatch(setAllJobs(res.data.jobs));
//                 }
//             } catch (error) {
//                 console.log("Something went wrong while getting jobs", error);
//             }
//         };

//         fetchAllJobs();
//     }, [searchedQuery, dispatch]);  // ✅ Ensures re-fetch on `searchedQuery` change

// }

// export default useGetAllJobs;
