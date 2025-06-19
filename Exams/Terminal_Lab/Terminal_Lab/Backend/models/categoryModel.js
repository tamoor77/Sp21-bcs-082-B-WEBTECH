import mongoose from 'mongoose'

const categorySchema=mongoose.Schema({
    category:{
        type:String,
        required:[true,'category is required']
    }


},{timeStamp:true})

export const categoryModel=mongoose.model("Category",categorySchema);
export default userModel
