import mongoose from "mongoose";

const CompanySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        
    },
    location:{
        type:String,
        
    },
    website:{
        type:String,
    },
    logo:{
        type:String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const Company=mongoose.model("Company",CompanySchema)