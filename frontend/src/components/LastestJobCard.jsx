import React from "react";
import { Badge } from "./ui/badge";


function LastestJobCard() {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div>
        <h1 className="font-medium text-lg">Company Name</h1>
        <p className="text-sm text-gray-500">India</p>
        <div>
            <h1 className=" font-bold text-lg my-2">Job Title</h1>
            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing </p>
        </div>
        <div className="flex items-center gap-2 mt-4">
            <Badge className="text-[#6a38c2]  font-Bold" variant="ghost">12 Postions</Badge>
            <Badge className="text-[#e63737]  font-Bold" variant="ghost">Part Time</Badge>
            <Badge className="text-[#5ae630]  font-Bold" variant="ghost">12 LPA</Badge>
        </div>
      </div>
    </div>
  );
}

export default LastestJobCard;
