import { User } from "../models/user.models.js";


const logout = async (req,res)=>{
  
  await User.findByIdAndUpdate(
    req.user._id,
    {
        $set:{refreshtoken:undefined}
    },
    {
        new:true
    }
  )
//   const options ={
//     httpOnly:true,
//     secure:true,
// }

return res.status(200).json({
    success:true,
    message: "User Logout Successfully"
})

// return res.status(200).clearCookie("accesstoken",accesstoken,options).
// clearCookie("refreshtoken", refreshtoken,options).json({
//     success:true,
//     message: "User Logout Successfully"
// })
}

export default logout