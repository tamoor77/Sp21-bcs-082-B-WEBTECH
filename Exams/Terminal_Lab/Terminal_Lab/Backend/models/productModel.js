import mongoose from 'mongoose'

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']

    },
    description:{
        type:String,
        required:[true,'description is required']

    },
    price:{
        type:Number,
        required:[true,'price is required']

    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'

    },
    stock:{
        type:Number,
        required:[true,'stock is required']

    },
    image:[
        {
            public_id:String,
            url:String

        }
    ]


},{timeStamp:true})

export const productModel=mongoose.model("Products",productSchema);
export default productModel
