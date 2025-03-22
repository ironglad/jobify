import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { toast } from "sonner";

function JobDescription() {

  const params = useParams()
  const { user } = useSelector(store => store.auth)
  const jobId = params.id
  const { singleJob } = useSelector(store => store.job)
  console.log(singleJob);
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;

  const [isApplied, setApplied] = useState(isInitiallyApplied)

  const dispatch = useDispatch()

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, { withCredentials: true })
      if (res.data.success) {
        setApplied(true)
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }]
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }

    } catch (error) {
      console.log("something went while applying for job", error);
      toast.error(error.response?.data?.message || "Something went wrong");

    }
  }
  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/getJobs/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          console.log(res);
          
          dispatch(setSingleJob(res.data.job))
          setApplied(res.data.job.applications.some(application => application.applicant === user?._id))
        }

      } catch (error) {
        console.log("Something went wrong while getting jobs", error);
      }
    }
    fetchSingleJobs()
  }, [jobId, dispatch, user?._id])


  return (
    <div className="max-w-7xl mx-auto my-10 ">
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="font-bold text-lg ">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-[#6a38c2]  font-Bold" variant="ghost">
              {singleJob?.position} Postions
            </Badge>
            <Badge className="text-[#e63737]  font-Bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#5ae630]  font-Bold" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${isApplied ? " bg-gray-600 cursor-not-allowed hover:bg-gray-600" : "bg-[#6a38c2] hover:bg-[#8345ee]"
            }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <div>
        <h1 className=" border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
        <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-600">Frontend Developer</span></h1>
        <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-600">{singleJob?.description}</span></h1>
        <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-600">{singleJob?.experienceLevel}</span></h1>
        <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-600">{singleJob?.location}</span></h1>
        <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-600">{singleJob?.salary} LPA</span></h1>
        <h1 className="font-bold my-1">Total applicant: <span className="pl-4 font-normal text-gray-600">{singleJob?.applications?.length}</span></h1>
        <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-600">{singleJob?.createdAt.split("T")[0]}</span></h1>
      </div>
    </div>
  );
}

export default JobDescription;

