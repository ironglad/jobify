import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

function JobDescription() {
  const isApplied = false;
  return (
    <div className="max-w-7xl mx-auto my-10 ">
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="font-bold text-lg ">Title</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-[#6a38c2]  font-Bold" variant="ghost">
              12 Postions
            </Badge>
            <Badge className="text-[#e63737]  font-Bold" variant="ghost">
              Part Time
            </Badge>
            <Badge className="text-[#5ae630]  font-Bold" variant="ghost">
              12 LPA
            </Badge>
          </div>
        </div>
        <Button
          className={`rounded-lg ${
            isApplied
              ? " bg-gray-600 cursor-not-allowed hover:bg-gray-600"
              : "bg-[#6a38c2] hover:bg-[#8345ee]"
          } `}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <div>
        <h1 className=" border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
        <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-600">Frontend Developer</span></h1>
        <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span></h1>
        <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-600">3-years</span></h1>
        <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-600">Delhi</span></h1>
        <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-600">2.9lakhs</span></h1>
        <h1 className="font-bold my-1">Total applicant: <span className="pl-4 font-normal text-gray-600">4</span></h1>
        <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-600">6-03-2025</span></h1>
      </div>
    </div>
  );
}

export default JobDescription;
