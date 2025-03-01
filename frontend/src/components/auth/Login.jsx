import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";


function Login() {
    const [input, setInput] = useState({
      email: "",
      password: "",
      role: "",
    });
  const changeEventHander = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const navigate=useNavigate()
    const SubmitHandler = async (e) => {
      e.preventDefault();
      try {
        const res= await axios.post(`${USER_API_ENDPOINT}/login`,input,{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true
        })
        if(res.data.success){
          navigate("/")
          Toaster.success(res.data.message)
        }
      } catch (error) {
        console.log(error);
        
      }
  };
  return (
    <div>
      <div className=" flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={SubmitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">LogIn</h1>
  
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" name="email" placeholder="email" value={input.email} onChange={changeEventHander} />
          </div>
 
          <div className="my-2">
            <Label>Password</Label>
            <Input type="password" placeholder="password" value={input.password} name="password" onChange={changeEventHander}/>
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                type="radio"
                value="student"
                checked={input.role==="student"}
                name="role"
                className="cursor-pointer"
                onChange={changeEventHander}
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role==="recruiter"}
                onChange={changeEventHander}
                className="cursor-pointer" />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full my-4 bg-[#C5BAFF] hover:bg-[#aea2ec]">LogIn</Button>
        <div>
        <span className="text-sm">Don't have an account? <Link to="/signup" className="text-blue-600">SignUp</Link></span>
        </div>
        </form>

      </div>
    </div>
  )
}

export default Login