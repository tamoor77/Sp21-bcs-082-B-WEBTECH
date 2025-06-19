import express from "express"
import morgan from "morgan";
import cors from "cors"
import dotenv from "dotenv"
//routes import
import testRoute from './routes/testRoute.js'
import userRoute from './routes/userRoute.js'
import productRoutes from './routes/productRoutes.js'

import orderRoutes from './routes/orderRoutes.js';
import vehicleRoutes from './routes/vehicles.js';

import connectDb from "./config/dbConfig.js";
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary'



//dotenv config
dotenv.config()


//database connection
connectDb();

//cloudinary config

cloudinary.v2.config({
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
    cloud_name:process.env.CLOUDINARY_NAME
})

// rest object
const app=express();

app.use(express.json());

//cookie
app.use(cookieParser());


//routes
app.use("/api/v1",testRoute);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/product",productRoutes)
app.use('/api/v1/orders', orderRoutes);
app.use('/vehicles', vehicleRoutes);
//app.use('/api/v1/items', products);


app.get("/",(req,res)=>{
    return res.status(200).send("<h1>Welcome to node server APP</h1>")
})

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//port
const PORT=process.env.PORT ;

//Listen
app.listen(PORT ,()=>{
    console.log(`server is running on port ${process.env.PORT} on ${process.env.NODE_ENV} MODE  `)
})

