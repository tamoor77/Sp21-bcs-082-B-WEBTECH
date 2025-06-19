export const testController=(req,res)=>{
    res.status(200).send({
        "message": "Hello, World!",
        "data": "This is a test data",
        success:true


    })
}