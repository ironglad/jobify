import mongoose from "mongoose";
import { Company } from "./Company.model.js";

const JobSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    descriptions:{
        type:String,
        required:true,
    },
    salary:{
        type:Number,
        required:true,
    },
    requirments:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    jobType:{
        type:String,
        required:true
    },
    jobPostions:{
        type:Number,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company"
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Applicant"
    }
    
    
    

    

},{timestamps:true})

export const Job=mongoose.model("Job",JobSchema)