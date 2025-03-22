    import React, { useEffect, useState } from 'react'
    import { Input } from '../ui/input'
    import { Button } from '../ui/button'
    import ComapaniesTable from './ComapaniesTable'
    import { useNavigate } from 'react-router-dom'
    import useGetAllCompany from '@/customHooks/useGetAllCompany'
    import { useDispatch } from 'react-redux'
    import { setSearchCompanyByText } from '@/redux/companySlice'


    function Companies() {
        useGetAllCompany()
        const navigate=useNavigate()    
        const[input,setInput]=useState("")
        const dispatch=useDispatch()

        useEffect(()=>{
            console.log("Search Input",input);
            
            const a= dispatch(setSearchCompanyByText(input))
            console.log(a);
            
        },[input])

        return (
            <div>
                <div className='max-w-6xl mx-auto my-10'>
                    <div className='flex items-center justify-between my-5'>
                        <Input
                            className="w-fit"
                            placeholder="filter by name"
                            onChange={(e)=>setInput(e.target.value)}
                        />
                        <Button onClick={()=>navigate("/admin/companies/create")} className="bg-black text-white hover:bg-black">New Company</Button>

                    </div>
                    <ComapaniesTable/>
                </div>

            </div>
        )
    }

    export default Companies