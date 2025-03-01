import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { data, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";

function Signup() {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  
  const navigate=useNavigate()

  const changeEventHander = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHander = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  // const SubmitHandler = async (e) => {
  //   e.preventDefault();
  //   const formData= new FormData
  //   formData.append("fullName",input.fullName)
  //   formData.append("email",input.email)
  //   formData.append("password",input.password)
  //   formData.append("phoneNumber",input.phoneNumber)
  //   formData.append("role",input.role)
  //   if(input.file){
  //     formData.append("file",input.file)
  //   }
  //   try {
  //     const res= await axios.post(`${USER_API_ENDPOINT}/register`,formData,{
  //       headers:{
  //         "Content-Type":"multipart/form-data"
  //       },
  //       withCredentials:true
  //     })
  //     if(res.data.success){
  //       navigate("/login")
  //       toast.success(res.data.message)
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.res.data.message)
      
  //   }
  // };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();    //formdata object
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
        formData.append("file", input.file);
    }

    try {
       
        const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
            headers: { 'Content-Type': "multipart/form-data" },
            withCredentials: true,
        });
        if (res.data.success) {
            navigate("/login");
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        // toast.error(error.response.data.message);
    }
  }
  return (
    <div>
      <div className=" flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">SignUp</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullName"
              value={input.fullName}
              onChange={changeEventHander}
              placeholder="Enter your full name"
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={input.email}
              onChange={changeEventHander}
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              placeholder="Enter your number"
              value={input.phoneNumber}
              onChange={changeEventHander}
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
               name="password"
              placeholder="Enter password"  
              value={input.password}
              onChange={changeEventHander}
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="student"
                  name="role"
                  className="cursor-pointer"
                  onChange={changeEventHander}
                  checked={input.role === "student"}
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHander}
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>

            <div>
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
                onChange={changeFileHander}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full my-4 bg-[#C5BAFF] hover:bg-[#aea2ec]"
          >
            SignUp
          </Button>
          <div>
            <span className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
