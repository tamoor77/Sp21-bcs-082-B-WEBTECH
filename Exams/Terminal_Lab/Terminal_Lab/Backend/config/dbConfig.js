import mongoose from "mongoose";
import colors from 'colors'


const connectDb= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log(`Mongo Db  connected ${mongoose.connection.host}`)

    }catch(error){
        console.log(`MongoDb error ${error}`.bgRed.white);
    }
}

export default connectDb;