import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

function Job() {
  const navigate=useNavigate()
  const jobId="aklfdamasdasdfd"
  return (
    <div className=" p-5  rounded-md shadow-xl bg-white border border-gray-100">
      <div>
        <div className="flex items-center  justify-between">
          <p className="text-sm  text-gray-500">2 days ago </p>
          <Button variant="outline" classname="rounded-full " size="icon">
            <Bookmark />
          </Button>
        </div>
        <div className="flex items-center gap-2 my-2">
          <Button className="p-6 border border-gray-100"  variant="outline" size="icon">
            <Avatar>
              <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXZlaUXIWozu3xqknYB3S9nknCPGFPAEVZLA&s" />
            </Avatar>
          </Button>
          <div>
            <h1 className="font-medium text-lg">Company name</h1>
            <p className="text-sm text-gray-500"> india</p>
          </div>
        </div>
         
        <div>
            <h1 className=" font-bold text-lg my-2">Title</h1>
            <p className="text-sm text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit totam atque non repudiandae .</p>
        </div>

        <div className="flex items-center gap-2 mt-4">
            <Badge className="text-[#6a38c2]  font-Bold" variant="ghost">12 Postions</Badge>
            <Badge className="text-[#e63737]  font-Bold" variant="ghost">Part Time</Badge>
            <Badge className="text-[#5ae630]  font-Bold" variant="ghost">12 LPA</Badge>
        </div>

        <div className="flex items-center gap-4 mt-4">
            <Button onClick={()=>navigate(`/jobDescription/${jobId}`)} variant="outline">Details</Button>
            <Button className="bg-[#6a38c2] hover:bg-[#a596f3]">Save For Later</Button>

        </div>
      </div>
    </div>
  );
}

export default Job;
