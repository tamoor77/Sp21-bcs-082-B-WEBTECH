import { response } from 'express';
import userModel from '../models/userModel.js'
import { getDataUri } from '../utils/features.js';
import cloudinary from 'cloudinary'
export const registerController= async (req,res)=>{

    try{
        const {name,email,password/*,address,city,country,phone*/}=req.body;

        if(!name || !email || !password /*|| !address || !city || !country || !phone*/){
            res.status(500).send({
                success:false,
                message:"please fill in all the fields"
            })
        }

        const existingUser = await userModel.findOne({ email });

    if (existingUser) {
    return res.status(400).send({
        success: false,
        message: "User already exists"
    });
    }
        const user =await userModel.create({
        name,
        email,
        password

        /*,
        city,
        address,
        country,
        phone,*/
        

    });
    res.status(201).send({
        success:true,
        message:"User Registered succesfully",
        user,
    })
    


    }
    
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Register Api",
            error

        })



    }
}

export const loginController = async (req,res) =>{

    try{
        const {email,password}=req.body;

        if(!email || !password){
            console.log('Input all the fields')
            res.status(500).send({
                success:false,
                message:'Input all the fields'
            })
        }

        //check user
        const user = await userModel.findOne({email});
        //check user validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not Found'
            })
        }
        //check pass
        const isMatch=await user.comparePassword(password);
        //valodate password

        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:'Invalid Credentials'
            })
        }
        //token
        const token=user.generateToken();

        res.status(200).cookie('token',token,{
            expires: new Date(Date.now() + 15 *24*60*60*1000 ) ,            secure: process.env.NODE_ENV === "development" ? true:false,
            httpOnly: process.env.NODE_ENV === "development" ? true:false,
            sameSite: process.env.NODE_ENV === "development" ? true:false
        }).send({
            success:true,
            message:'Logged in successfully ',
            token,
            user,
            token: user.generateToken()
        })



    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Login Api"
        })

    }


}

export const profileController = async(req,res)=>{

    try{
        const user=await userModel.findById(req.user._id);
        user.password=undefined;
        res.status(200).send({
            
            success:true,
            message:'User profile fetched succesfully',
            user,
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Profile api',
            error
        })
        
    }

}

export const logoutController = async (req, res) => {
    try {
        res.cookie("token", "", {
            expires: new Date(0),
            httpOnly: true,
            sameSite: "Lax",
            secure: process.env.NODE_ENV !== "development"
        }).status(200).send({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Logout API',
            error
        });
    }
};
export const updateProfileController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        const { name, email, address, city, country, phone } = req.body;

        if (name) user.name = name;
        if (address) user.address = address;
        if (city) user.city = city;
        if (country) user.country = country;
        if (phone) user.phone = phone;

        if (email && email !== user.email) {
            const existingEmailUser = await userModel.findOne({ email });
            if (existingEmailUser) {
                return res.status(400).send({
                    success: false,
                    message: "Email already in use"
                });
            }
            user.email = email;
        }

        await user.save();

        res.status(200).send({
            success: true,
            message: 'Updated successfully',
        
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Update Profile API',
            error
        });
    }
};


export const updatePassword = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        const { oldPassword, newPassword } = req.body;

        // Validation
        if (!oldPassword || !newPassword) {
            return res.status(400).send({
                success: false,
                message: 'Please provide both old and new password'
            });
        }

        // Compare old password
        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Incorrect old password'
            });
        }

        // Update password and ensure it triggers the hashing hook
        user.password = newPassword;
        user.markModified('password'); // 🔥 Force Mongoose to re-hash
        await user.save();

        res.status(200).send({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        console.error("Update Password Error:", error);
        res.status(500).send({
            success: false,
            message: 'Error in Update Password API',
            error: error.message
        });
    }
};

export const updateProfilePic = async (req, res) => {
    try {
        // 1. Get user from database
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        // 2. Check if file exists in request
        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: 'No file uploaded'
            });
        }

        // 3. Convert file to data URI
        const file = getDataUri(req.file);
        if (!file || !file.content) {
            return res.status(400).send({
                success: false,
                message: 'Invalid file format'
            });
        }

        // 4. Delete previous image if it exists
        if (user.profilePic && user.profilePic.public_id) {
            await cloudinary.v2.uploader.destroy(user.profilePic.public_id);
        }

        // 5. Upload new image to Cloudinary
        const result = await cloudinary.v2.uploader.upload(file.content, {
            folder: 'profile_pictures' // Optional: organize images in folders
        });

        // 6. Update user profile picture
        user.profilePic = {
            public_id: result.public_id,
            url: result.secure_url
        };

        await user.save();

        res.status(200).send({
            success: true,
            message: 'Profile picture updated successfully',
            imageUrl: result.secure_url
        });

    } catch (error) {
        console.error('Error in updateProfilePic:', error);
        res.status(500).send({
            success: false,
            message: 'Error updating profile picture',
            error: error.message // Send only error message in production
        });
    }
};