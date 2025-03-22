// import jwt from "jsonwebtoken"


// const isAuthenticated= async(req,res,next)=>{
//     try {
//         const token=req.cookies.token
//         if(!token){
//             return res.status(401).json({
//                 message:"User not authenticated",
//                 success:false
//             })
//         }

//         const decode= await jwt.verify(token,process.env.TOKEN_SECRET_KEY)
//         if(!decode){
//             return res.status(401).json({
//                 message:"Invalid Token",
//                 success:false
//             })
//         }
//         console.log("Decoded JWT:", decode)
//         req.id=decode.userId
//         next()
        
//     } catch (error) {
//         console.log("something went wrong in authentication",error);
        
//     }
// }

// export default isAuthenticated

import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    let token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid Token",
        success: false,
        
      });
    }

    

    req.id = decoded.UserID || decoded.userId || decoded.id;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      message: "Authentication failed",
      success: false,
    });
  }
};

export default isAuthenticated;
