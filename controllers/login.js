import { User } from "../models/user.models.js";


const generateAccessandRefressToken = async(userid)=>{
    try {
        const user = await User.findById(userid)
        const accesstoken = await user.generateAccesstoken()
        const refreshtoken =await user.generateRefresstoken()
    
        user.refreshtoken = refreshtoken
       await user.save({validateBeforeSave:false})
        return {accesstoken, refreshtoken}
    } catch (error) {

        throw new Error(error)
        
    }



}


const login = async (req,res)=>{
const {email, password} = req.body
if(!email){
    return res.status(400).json({
        success:false,
        message: "Email is mandatory"
    })
}

const existuser = await User.findOne({
    email
})
if(!existuser){
    return res.status(404).json({
        success: false,
        message:"User not Found"
    })
}
const isvalid=await existuser.ispasswordCorrect(password);
if(!isvalid){
    return res.status(404).json({
        success:false,
        message:"Password is wrong"
    })
}

const {accesstoken,refreshtoken} = await generateAccessandRefressToken(existuser._id);
const loginuser = await User.findById(existuser._id).select("-password, -refreshtoken")

const options = {
    httpOnly:true,
    secure:true,
}

return res.status(200).cookie("accesstoken",accesstoken,options).
cookie("refreshtoken", refreshtoken,options).json({
    loginuser,
    accesstoken, refreshtoken,
    message: "User Login successfully"
})
}

export default login