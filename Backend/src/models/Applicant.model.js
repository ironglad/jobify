import mongoose from "mongoose";

const ApplicantSchema=new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true,
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        enum:['Pending', 'accepted', 'rejected'],
        default:"Pending"
    }
    
},{timestamps:true})

export const Applicant=mongoose.model("Applicant",ApplicantSchema)