import mongoose from "mongoose";
import { DB_NAME } from "../src/constants.js";

const connectDB = async ()=>{
    try {
     const mongoconct=    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
     console.log(`\n mongodb connected !! DB Host : ${ mongoconct.connection.host}`)
        
    } catch (error) {
        console.log("MongoDb connection Error")
        process.exit(1)
        
    }
}

export default connectDB;