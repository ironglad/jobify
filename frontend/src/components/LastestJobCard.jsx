import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";


function LastestJobCard({job}) {
  const navigate= useNavigate()
  return (
    <div onClick={()=>navigate(`/jobDescription/${job._id}`)}  className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
        <div>
            <h1 className=" font-bold text-lg my-2">{job?.title}</h1>
            <p className="text-sm text-gray-600">{job?.description} </p>
        </div>
        <div className="flex items-center gap-2 mt-4">
            <Badge className="text-[#6a38c2]  font-Bold" variant="ghost">{job?.position}</Badge>
            <Badge className="text-[#e63737]  font-Bold" variant="ghost">{job?.jobType}</Badge>
            <Badge className="text-[#5ae630]  font-Bold" variant="ghost">{job?.salary}</Badge>
        </div>
      </div>
    </div>
  );
}

export default LastestJobCard;
