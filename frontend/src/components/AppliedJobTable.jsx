import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'

function AppliedJobTable() {
  return (
    <div><Table>
            <TableCaption>List of your applied jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    [1,2,3,4].map((item,index)=>
                    <TableRow key={index}>
                        <TableCell>3-05-2025</TableCell>
                        <TableCell>Frontend Engineer</TableCell>
                        <TableCell>Google</TableCell>
                        <TableCell><Badge className="text-right bg-green-500 " variant="ghost" >Selected</Badge></TableCell>

                    </TableRow>
                    )
                }
            </TableBody>
        </Table></div>
  )
}

export default AppliedJobTable