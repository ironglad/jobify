import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import React from "react";
import { PopoverContent } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const user = false;
  return (
    <div className="bg-[#FBFBFB]">
      <div className=" flex items-center justify-between mx-auto max-w-7xl h-16 ">
        <div>
          <NavLink to="/">
            <h1 className="text-2xl font-bold">Jobify</h1>
          </NavLink>
        </div>
        <div className="flex items-start gap-12">
          <ul className=" flex font-medium items-center gap-4">
            <li><Link  to="/">Home</Link></li>
            <li><Link to="/jobs">Job</Link></li>
            <li><Link to='/browse'>browse</Link></li>
            <li><Link to='/about'>About Us</Link></li>
          </ul>
          {!user ? (
            <div className="flex items-center gap-2 ">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#aea2ec] hover:bg-[#a596f3] rounded-md">
                  SingUp
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="shadn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-2 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="shadn"
                    />
                  </Avatar>
                  <div>
                    <h1 className="font-medium">Varun</h1>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-600">
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="link">View Profile</Button>
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    {" "}
                    <LogOut />
                    <Button variant="link">Logout</Button>
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
