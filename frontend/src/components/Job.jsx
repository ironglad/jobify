import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "@/redux/store";

function Job({job}) {

  const navigate=useNavigate()
  const jobId="aklfdamasdasdfd"

  const DaysAgoFunction=(mongodbTime)=>{
    const createdAt=new Date(mongodbTime)
    const currentTime=new Date()
    const timeDifference=currentTime-createdAt
    return Math.floor(timeDifference/(1000*25*60*60))
  }

  return (
    <div className=" p-5  rounded-md shadow-xl bg-white border border-gray-100">
      <div>
        <div className="flex items-center  justify-between">
          <p className="text-sm  text-gray-500">{DaysAgoFunction(job?.createdAt)==0?"Today":`${DaysAgoFunction(job?.createdAt)} days ago`} </p>
          <Button variant="outline" classname="rounded-full " size="icon">
            <Bookmark />
          </Button>
        </div>
        <div className="flex items-center gap-2 my-2">
          <Button className="p-6 border border-gray-100"  variant="outline" size="icon">
            <Avatar>
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
          </Button>
          <div>
            <h1 className="font-medium text-lg">{job?.company?.name}</h1>
            <p className="text-sm text-gray-500">{job?.location}</p>
          </div>
        </div>
         
        <div>
            <h1 className=" font-bold text-lg my-2">{job?.title}</h1>
            <p className="text-sm text-gray-600">{job?.description}</p>
        </div>

        <div className="flex items-center gap-2 mt-4">
            <Badge className="text-[#6a38c2]  font-Bold" variant="ghost">{job?.position} Postions</Badge>
            <Badge className="text-[#e63737]  font-Bold" variant="ghost">{job?.jobType}</Badge>
            <Badge className="text-[#5ae630]  font-Bold" variant="ghost">{job?.salary} LPA</Badge>
        </div>

        <div className="flex items-center gap-4 mt-4">
            <Button onClick={()=>navigate(`/jobDescription/${job?._id}`)} variant="outline">Details</Button>
            <Button className="bg-[#6a38c2] hover:bg-[#a596f3]">Save For Later</Button>

        </div>
      </div>
    </div>
  );
}

export default Job;
