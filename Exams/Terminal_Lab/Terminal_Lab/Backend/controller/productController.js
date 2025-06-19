import { productModel } from "../models/productModel.js"

export const productController=async(req,res)=>{

    try{
        const products =await productModel.find({})

        res.status(200).send({
            success:true,
            message:'products fetched successfully',
            products
        })


    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'failed to fetch products'
        })
    }

}
export const singleProductController=async(req,res)=>{

    try{
        const products =await productModel.findById(req.params.id)

        if(!products){
            return res.status(404).send({
            success:false,
            message:'No product found'
        })

        }

        res.status(200).send({
            success:true,
            message:'Product fetched successfully',
            products,
        })


    }
    catch(error){
        console.log(error)
        if(error.name==='CastError'){
            return res.status(500).send({
            success:false,
            message:'Error in single product API'
        })

        }
        res.status(500).send({
            success:false,
            message:'cant find any products'
        })
    }

}