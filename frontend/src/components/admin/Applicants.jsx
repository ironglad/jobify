import React, { useEffect } from 'react'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationslice'
import store from '@/redux/store'

function Applicants() {
  const params=useParams()
  const dispatch=useDispatch()
  const {applicants}=useSelector(store=>store.application)
  
  useEffect(()=>{
    const fetchAllAplicants= async()=>{
      try {
        const res= await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,{withCredentials:true})
        console.log("API",res.data);
        
        if(res.data.success){
            dispatch(setAllApplicants(res.data.job))
        }
      } catch (error) {
        console.log("not able to fetch Applicants",error);
        
      }
    }
    fetchAllAplicants()
  },[])
  return (
    <div>
      <div>Applicants {applicants.applications.length}</div>
      <ApplicantsTable/>
    </div>


  )
}

export default Applicants

// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { APPLICATION_API_ENDPOINT } from '@/utils/constant';
// import { useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setAllApplicants } from '@/redux/applicationslice';
// import ApplicantsTable from './ApplicantsTable';

// function Applicants() {
//   const params = useParams();
//   console.log(params.id);
  
//   const dispatch = useDispatch(); 
//   useEffect(() => {
//     const fetchAllApplicants = async () => {
//       console.log("Applicants component rendered");
//       try {
//         const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`, {
//           withCredentials: true,
//         });
//       console.log("APi",res);
      

//         if (res.data.success) {
//           dispatch(setAllApplicants(res.data.job)); 
//           console.log(res.data);
//         }
//       } catch (error) {
//         console.error("Unable to fetch applicants:", error);
//       }
//     };

//     fetchAllApplicants();
//   }, [params.id, dispatch]); 
//   console.log("useEfect finised");
  

//   return (
//     <div>
//       <div>Applicants (3)</div>
//       <ApplicantsTable />
//     </div>
//   );
// }

// export default Applicants;