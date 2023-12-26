import { User } from "../models/user.models.js";
import  Jwt  from "jsonwebtoken";


export  const verifyjwt = async(req,res,next)=>{
try {
    // const token = req.cookie.accesstoken || req.header("Authorization")?.replace("Bearer ","");
    const token = req.header("Authorization")?.replace("Bearer ","");
    if(!token){
        return res.status(400).json({
            success:false,
            message:"UnAuthorized token"
        })
    }
    
    const decoded =  await Jwt.verify(token,process.env.ACCESS_TOKEN)

    const user = await User.findById(decoded?._id).select("-password, -refreshtoken")

    if(!user){
        return res.status(400).json({
            success:false,
            message:"Invalid Access token"
        })
    }

    req.user = user
    next()
} catch (error) {
    throw new Error(error)
}
}

export default verifyjwt