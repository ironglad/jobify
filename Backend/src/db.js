import mongoose from "mongoose"

const ConnectDB= async()=>{
    try {
     const response=await mongoose.connect(process.env.MONGOOSE_URL)   
     console.log(`MongoDB Connected successfully`);
    } catch (error) {
        console.log(`DB not connected ${error}`);
    }
}

export default  ConnectDB