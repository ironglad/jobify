import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/customHooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'


function AdminJobs() {
  useGetAllAdminJobs()
  const navigate = useNavigate()
  const [input, setInput] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
 

    const a = dispatch(setSearchJobByText(input))


  }, [input])

  return (
    <div>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className="w-full"
            placeholder="filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/jobs/create")} className="bg-black text-white hover:bg-black">New Jobs</Button>

        </div>
        <AdminJobsTable />
      </div>

    </div>
  )
}

export default AdminJobs