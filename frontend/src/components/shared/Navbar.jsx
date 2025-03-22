import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import React from "react";
import { PopoverContent } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlicer";
import { toast } from "sonner";

function Navbar() {
  const { user } = useSelector(store => store.auth);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const LogOutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true })
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/")
        toast.success(res.data.message)
      }

    } catch (error) {
      console.log("error in logout", error);
      toast.error(error.response?.data?.message || "Something went wrong");

    }
  }
  return (
    <div className="bg-[#FBFBFB]">
      <div className=" flex items-center justify-between mx-auto max-w-7xl h-16 ">
        <div>
          <NavLink to="/">
            <h1 className="text-2xl font-bold"><span className="text-[#6a38c2]">Job</span>ify</h1>
          </NavLink>
        </div>
        <div className="flex items-start gap-12">
          <ul className=" flex font-medium items-center gap-4">

            {
              user && user.role == 'recruiter' ? (
                <>
                  <li><Link to="/admin/companies">Companies</Link></li>
                  <li><Link to="/admin/jobs">Job</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/jobs">Job</Link></li>
                  <li><Link to='/browse'>Browse</Link></li>
                  <li><Link to='/about'>About Us</Link></li>
                </>
              )
            }


          </ul>
          {!user ? (
            <div className="flex items-center gap-2 ">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#aea2ec] hover:bg-[#a596f3] rounded-md">
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.Profile?.profilePhote}
                    alt="shadn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-2 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.Profile?.profilePhote}
                      alt="shadn"
                    />
                  </Avatar>
                  <div>
                    <h1 className="font-medium">{user?.fullName}</h1>
                    <p className="text-sm text-muted-foreground">
                      {user?.Profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-600">

                  {
                    user && user.role == "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link"><Link to='/profile'>View Profile</Link></Button>
                      </div>
                    )
                  }


                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    {" "}
                    <LogOut />
                    <Button onClick={LogOutHandler} variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
