import mongoose,{Schema} from "mongoose";
import Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchma = new Schema({
    name:{
        type: String,
        required:true,
        index: true,
        lowercase:true
    },
    password:{
        type: String,
        required :true,
    
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
        

    },
    engpoint:{
        type:Number,
        default:0,

    },
    englevel:{
        type:Number,
        default:0,

    },
    hindipoint:{
        type:Number,
        default:0,

    },
    hindilevel:{
        type:Number,
        default:0,
    },
    total:{
        type:Number,
        default:0,
    },
    refreshtoken:{
        type:String
    }
},{
timestamps:true
})
userSchma.pre("save",async function (next){
    if(!this.isModified("password"))return next()
    this.password= await bcrypt.hash(this.password,10)
    next();
})

userSchma.methods.ispasswordCorrect = async function(password){
  return await bcrypt.compare(password,this.password)
}



userSchma.methods.generateAccesstoken = async function (){
return  await Jwt.sign({
    _id:this._id,
    email:this.email,
    name:this.name,

  },
  process.env.ACCESS_TOKEN,
  {
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
  })
}
userSchma.methods.generateRefresstoken = async function (){
    return  await Jwt.sign({
        _id:this._id,
        
    
      },
      process.env.REFRESS_TOKEN,
      {
        expiresIn:process.env.REFRESS_TOKEN_EXPIRY
      })
    }
export const User = mongoose.model("User", userSchma)

