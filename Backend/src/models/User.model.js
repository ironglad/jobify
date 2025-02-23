import mongoose  from "mongoose";

const UserSchema =new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["student","recruiter"]
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    Profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,
            ref:"Company"
        },
        profilePhote:{
            type:String  //cloundiany
        }

    }

},{timestamps:true})

export const User= mongoose.model("User",UserSchema)