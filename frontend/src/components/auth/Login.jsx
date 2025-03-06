import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlicer";
import store from "@/redux/store";
import { Loader2 } from "lucide-react";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const changeEventHander = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const dispatch=useDispatch()
  const {loading}=useSelector(store=>store.auth)
  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.createduser))
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    finally{
      dispatch(setLoading(false))
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
            <Input
              type="email"
              name="email"
              placeholder="email"
              value={input.email}
              onChange={changeEventHander}
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="password"
              value={input.password}
              name="password"
              onChange={changeEventHander}
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="student"
                  checked={input.role === "student"}
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
                  checked={input.role === "recruiter"}
                  onChange={changeEventHander}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className="w-full"><Loader2 className="mr-2 h-4 w-4  animate-spin"/>Please wait</Button>:<Button
            type="submit"
            className="w-full my-4 bg-[#C5BAFF] hover:bg-[#aea2ec]"
          >
            LogIn
          </Button>
          }
          
          <div>
            <span className="text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600">
                SignUp
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
