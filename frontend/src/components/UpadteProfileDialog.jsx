
import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import axios from "axios";
import {USER_API_ENDPOINT} from "../utils/constant"
import { setUser } from "@/redux/authSlicer";
import { toast } from "sonner";


function UpadteProfileDialog({ open, setOpen }) {
const [loading,setLoading]=useState(false)
const {user}=useSelector(store=>store.auth)
const [input,setInput]=useState({
  fullName:user?.fullName,
  email:user?.email,
  phoneNumber:user?.phoneNumber,
  bio:user?.Profile.bio,
  skills:user?.Profile.skills.map((item)=>item),
  file:user?.Profile.resume
})


const dispatch=useDispatch()
const  ChangeEventHandler=(e)=>{
  setInput({...input,[e.target.name]:e.target.value})

  
}
const changeFileHander = (e) => {
  setInput({ ...input, file: e.target.files?.[0] });
};
const SubmitHandler=async(e)=>{
  e.preventDefault()
  const formData=new FormData()
  formData.append("fullName",input.fullName)
  formData.append("email",input.email)
  formData.append("phoneNumber",input.phoneNumber)
  formData.append("bio",input.bio)
  formData.append("skills",input.skills)
  if(input.file){
    formData.append("file",input.file)
  } 

  try {
    const res= await axios.put(`${USER_API_ENDPOINT}/profile/update`,formData,{
      headers:{"Content-Type":"multipart/form-data"},
      withCredentials:true
      
      })

      if(res.data.success){
        dispatch(setUser(res.data.user))
        toast.success(res.data.message)
      }
  } catch (error) {
    console.log(error);
  }
  setOpen(false)

  console.log(input)

}
  return (
    <Dialog open={open}>
      <DialogContent className="  sm:max-w-[425px]  bg-white shadow-lg rounded-lg" onInteractOutside={()=>setOpen(false)}  >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={SubmitHandler}>
          <div className="grid gap-4 p-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName">Name</Label>
              <Input type="text" id="fullName" name="fullName" value={input.fullName} onChange={ChangeEventHandler} className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" value={input.email}  onChange={ChangeEventHandler} className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input type="text==" id="phoneNumber" name="phoneNumber" onChange={ChangeEventHandler}  value={input.phoneNumber} className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" name="bio" value={input.bio} onChange={ChangeEventHandler}  className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills">Skills</Label>
              <Input id="skills" name="skills" value={input.skills} onChange={ChangeEventHandler}  className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file">File</Label>
              <Input id="file" name="file" type="file"  accept="application/pdf" onChange={changeFileHander} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
          {
            loading ? <Button className="w-full"><Loader2 className="mr-2 h-4 w-4  animate-spin"/>Please wait</Button>:<Button
            type="submit"
            className="w-full my-4 bg-[#6a38c2] hover:bg-[#7b56bb]"
          >
            Update
          </Button>
          }
          
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpadteProfileDialog;
