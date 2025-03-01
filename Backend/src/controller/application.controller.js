import { Job } from "../models/Job.models.js";
import { Applicant } from "../models/Applicant.model.js";

const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "job doest not  exist",
        success: false,
      });
    }
    // checking if user alread applied for job

    const existingApplication = await Applicant.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "you have already applied for this job",
        success: false,
      });
    }
    const job = await Job.findById(jobId);
    if (!jobId) {
      return res.status(400).json({
        message: "job doest not  exist",
        success: false,
      });
    }

    const newapplications = await Applicant.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newapplications._id);
    await job.save();
    return res.status(201).json({
      message: "job applied successfully",
      success: true,
    });
  } catch (error) {
    console.log("something went wrong while creating job");
  }
};

const getAppliedJob=async(req,res)=>{
    try {
        userId=req.id
        const applications = await Applicant.findOne({applicant:userId}).sort({createdAt:-1}).populate({
            path:"Job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}},
            }

        })
        if(!applications){
            return res.status(400).json({
                message:"no Applications",
                success:false
            })
        }

        return res.status(200).json({
            applications,
            succuss:true
        })
        
    } catch (error) {
        console.log("cant get applied job",error);
        
    }

}

const getApplicants= async(req,res)=>{
    try {
        const jobID=req.params.id
        const job= await Job.findById(jobID).populate({
            path:"Applicant",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant",
                options:{sort:{createdAt:-1}}
            }
        })
        if(!job){
            return res.status(400).json({
                message:"job not found",
                success:true    
            })
        }

        return res.status(200).json({
            job,
            success:true
        })

    } catch (error) {
        
    }
}

const updateStatus=async(req,res)=>{
    try {
        const {status}=req.body
        const applicationId=req.params.id
        if(!status){
            return res.status(400).json({
                message:"status is required",
                success:false
            })
        }


        const application=await Applicant.findOne({_id:applicationId})
        if(!application){
            return res.status(400).json({
                message:"application not found",
                success:false
            })
        }

        application.status=status.toLowerCase()
        await application.save()

        return res.status(200).json({
            message:"status upadted successfully",
            success:true
        })
    } catch (error) {
        console.log();
        
    }
}



export{
    applyJob,
    getAppliedJob,
    getApplicants,
    updateStatus
}