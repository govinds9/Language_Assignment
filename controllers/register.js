import { User } from "../models/user.models.js";


const registerUser = async(req,res)=>{
    const {name,email, password} = req.body
   
    if([name, email,password].some((f)=>f?.trim()==="")){
        return res.status(400).json({
            success:false,
            message: "all field are required"
        })
    }
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      }

      if(!validateEmail(email)){
        res.status(400).json({
            success:false,
            message:"Use valid Email"
        })
      }
      const exist = await User.findOne({email})
      if(exist){
      return  res.status(400).json({
            success: false,
            message:"User Already exist"
        })

      }
      console.log(exist)
    try {
       const newuser= await User.create({
            name:name.toLowerCase(), email,password
        })
        const created = await User.findById(newuser._id).select(
            "-password"
        )
        console.log(newuser)
      return  res.status(200).json({
            success:true,
            created,
            message:"User Registred Succesfully",

        })

        
    } catch (error) {
      return  res.status(500).json({
            success:false,
            error,
            message:"Internal Error occur"
        })
    }
      

}

export default registerUser