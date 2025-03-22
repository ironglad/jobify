import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow } from '../ui/table'
import { Popover, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { PopoverContent } from '@radix-ui/react-popover'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import { Item } from '@radix-ui/react-radio-group'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '@/utils/constant'

const ShortListingStatus = ["Accepted", "Rejected"]

function ApplicantsTable() {
    const { applicants } = useSelector(store => store.application)

    const statusHandler=async(status,id)=>{
        console.log("Called");
        
        try {
            axios.defaults.withCredentials=true
            const res= await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`,{status},{withCredentials:true})
            console.log(res);
            
            if(res.data.success){
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message|| "not able to update status")
            
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableRow>
                    <TableHead>FullName</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((Item) => (
                            <tr key={Item._id}>
                                <TableCell>{Item?.applicant?.fullName}</TableCell>
                                <TableCell>{Item?.applicant?.email}</TableCell>
                                <TableCell>{Item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {Item?.applicant?.Profile?.resume ? (
                                        <a
                                            className="text-blue-600 cursor-pointer"
                                            href={Item?.applicant?.Profile?.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {Item?.applicant?.Profile?.resumeOriginalName || "Download Resume"}
                                        </a>
                                    ) : (
                                        <span className="text-gray-500">No Resume</span>
                                    )}
                                </TableCell>
                                <TableCell>{Item?.applicant?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-32 bg-white shadow-lg rounded-md'>
                                            {ShortListingStatus.map((status, index) => (
                                                <div onClick={()=>statusHandler(status,Item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                    {status}
                                                </div>
                                            ))}
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>
                            </tr>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable