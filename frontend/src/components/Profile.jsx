import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Edit, Mail, Pen, Phone, PhoneCall } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpadteProfileDialog from "./UpadteProfileDialog";
import { useSelector } from "react-redux";
import store from "@/redux/store";

function Profile() {
  const [open, setOpen] = useState(false);
  const isResume = true;
  // const Skills = ["javascripts", "Aws", "Docker", "Html", "css", "DBMS"];
  const user = useSelector((store) => store.auth.user);

  
  console.log("Profile Photo URL:", user?.Profile?.profilePhoto);
  
  return (
    <div>
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.Profile?.profilePhote } />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullName}</h1>
              <p>
               {user?.Profile?.bio}
              </p>
            </div>
          </div>

          <Button onClick={()=>setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>

          <div className="flex items-center gap-3 my-2">
            <Phone />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex gap-2">
            {user?.Profile?.skills.length != 0 ? (
              user?.Profile?.skills.map((item, index) => (
                <Badge className="text-[#6a38c2]  font-Bold " variant="ghost">
                  {item}
                </Badge>
              ))
            ) : (
              <span>Add your Skills</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="font-medium text-md">Resume </Label>
          {isResume ? (
            <a
            href={user?.Profile?.resume}
            target="_blank"
             rel="noopener noreferrer"
              className="w-full text-blue-600 hover:underline cursor-pointer"
            >
             {user?.Profile?.resumeOriginalName}
            </a>
          ) : (
            <span>Add your Resume</span>
          )}
        </div>
      </div>
      <div className=" max-w-4xl mx-auto bg-white rounded-2xl">
        <h1>Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpadteProfileDialog open={open} setOpen={setOpen}/>
    </div>
  );
}

export default Profile;
