
import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import { Select, SelectGroup, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel } from '../ui/select';
import axios from 'axios';
import { JOB_API_ENDPOINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';




const companyArray = []
function PostJob() {

  const { companies } = useSelector(store => store.company)
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: ""
  });
  const navigate=useNavigate()
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company?.name.toLowerCase() == value)
    setInput({ ...input, companyId: selectedCompany._id })
  }

  const [loading, setLoading] = useState(false)


  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const res = await axios.post(`${JOB_API_ENDPOINT}/CreateJob`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      })
      if(res.data.success){
        toast.success(res.data.message)
        navigate("/admin/jobs")
      }
    } catch (error) {
      console.log("error while creating job", error);
      toast.error(res.response.data.message||"job not Created  ")
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='flex items-center justify-center w-screen my-10'>
        <form onSubmit={submitHandler} className='p-8 max-w-4xl border-gray-800 shadow-lg rounded-md'>



          <div className='grid grid-cols-2 gap-2'>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                type="text"
                id="description"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            {/* Requirements */}
            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <Input
                type="text"
                id="requirements"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            {/* Salary */}
            <div>
              <Label htmlFor="salary">Salary</Label>
              <Input
                type="text"
                id="salary"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                type="text"
                id="location"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            {/* Job Type */}
            <div>
              <Label htmlFor="jobType">Job Type</Label>
              <Input
                type="text"
                id="jobType"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            {/* Experience */}
            <div>
              <Label htmlFor="experience">Experience Level</Label>
              <Input
                type="text"
                id="experience"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            {/* Position */}
            <div>
              <Label htmlFor="position">No. of position</Label>
              <Input
                type="number"
                id="position"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            {
              companies.length > 0 && (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent position="popper"
                    side="bottom" className="opaque-background bg-white bg-opacity-100 border border-gray-200 rounded-md shadow-lg">
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company?.name?.toLowerCase() || "Unnamed Company"}>
                          {company?.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )
            }



          </div>{
            loading ? <Button className="w-full"><Loader2 className="mr-2 h-4 w-4  animate-spin"/>Please wait</Button>:<Button className="bg-[#6a38c2] hover:bg-[#6a38c2] mt-5 w-full">Post New Pob</Button>
          }
         
          {

            companyArray.length == 0 && <p className='text-sm text-red-600  text-center'>*Please register a company first before posting a job</p>
          }
        </form>
      </div>
    </div>
  );
}

export default PostJob;
