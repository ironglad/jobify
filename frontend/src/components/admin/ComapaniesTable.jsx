

import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar } from '../ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ComapaniesTable() {
    const { companies, searchCompanyByText } = useSelector(store => store.company)
    const [filteredCompanies, setFilteredCompanies] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!companies || companies.length === 0) {
            setFilteredCompanies([])
            return
        }
        const filtered = companies.filter(company =>
            company?.name?.toLowerCase().includes(searchCompanyByText?.toLowerCase())
        )
        setFilteredCompanies(filtered)
    }, [companies, searchCompanyByText])

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent Companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredCompanies.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                No companies found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredCompanies.map((company) => (
                            <TableRow key={company._id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company?.logo || "https://via.placeholder.com/50"} />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company?.name}</TableCell>
                                <TableCell>{company?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent>
                                           
 {/* <div onClick={() =>  
    navigate(`/admin/companies/${company?._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'> */}
    <div onClick={() => {
    console.log("Navigating to:", `/admin/companies/${company?._id}`);
    navigate(`/admin/companies/${company?._id}`);
}} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default ComapaniesTable
