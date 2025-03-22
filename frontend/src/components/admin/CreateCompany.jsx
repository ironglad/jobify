import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

function CreateCompany() {
    const navigate=useNavigate()
    const [companyName,setCompanyName]=useState()
    const dispatch=useDispatch()

    const registerCompany=async()=>{
        try {
            const res= await axios.post(`${COMPANY_API_ENDPOINT}/register`,{companyName},{
                headers:{"Content-Type":"application/json"},
                withCredentials:true
            })
            console.log("api",res.data);
            
            if(res?.data.success){
                dispatch(setSingleCompany(res.data.company))
                console.log(res.data.company);
                
                toast.success(res.data.message)
                const companyId=res?.data?.company?._id
                console.log(companyId);
                
                navigate(`/admin/Companies/${companyId}`)
            }
        } catch (error) {
            console.log("error while creating company",error);
            
        }
    }
  return (
    <div>
        <div className='max-w-4xl mx-auto'>
            <div className='my-10'>
            <h1 className='font-bold text-2xl'>Your Company Name</h1>
            <p className='text-gray-500'>What name would you like for your company? You can change this later </p>
            </div>
         
            <Label>Company Name</Label>
            <Input
            type="text"
            className="my-2"
            placeholder="Microsoft,Google etc."
            onChange={(e) => setCompanyName(e.target.value)}/>
            
              <div className='flex items-center gap-2 my-10'>
        <Button onClick={()=>navigate("/admin/companies")}variant="outline">Cancel</Button>
        <Button onClick={registerCompany}className="bg-[#6a38c2] hover:bg-[#8767be]">Continue</Button>

        </div>
        </div>
      

    </div>
  )
}

export default CreateCompany