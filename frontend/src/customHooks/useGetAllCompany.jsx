// import { setCompanies} from '@/redux/companySlice'

// import { COMPANY_API_ENDPOINT,  } from '@/utils/constant'
// import axios from 'axios'
// import React, { useEffect } from 'react'
// import { useDispatch } from 'react-redux'

// function useGetAllCompany() {
//  const dispatch=useDispatch()
//  useEffect(()=>{
//     const fetchAllCompany=async()=>{
//         try {
//             const res= await axios.get(`${COMPANY_API_ENDPOINT}/getCompanies`,{withCredentials:true});
//             console.log(res)
//             if(res.data.success){
//                 dispatch(setCompanies(res.data.companies))
//                 console.log(res.data);
                
                
//             }   
//         } catch (error) {
//             console.log("Something went wrong while getting jobs",error);
//         }
//     }
//     fetchAllCompany()
//  },[])
// }

// export default useGetAllCompany
import { setCompanies } from '@/redux/companySlice'
import { COMPANY_API_ENDPOINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function useGetAllCompany() {
    const dispatch = useDispatch()
    const { companies } = useSelector(store => store.company) // Get companies from Redux

    useEffect(() => {
        const fetchAllCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/getCompanies`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies || [])) // Ensures it's always an array
                }
            } catch (error) {
                console.log("Something went wrong while getting companies", error)
            }
        }
        fetchAllCompany()
    }, [dispatch]) 
    
}

export default useGetAllCompany