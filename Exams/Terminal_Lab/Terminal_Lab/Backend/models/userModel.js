import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email is already taken']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [6, 'Password should be minimum of 6 characters']
  },
  isAdmin: {
    type: Boolean,
    default: false // ✅ Admin flag
  },
  profilePic: {
    public_id: String,
    url: String
  }
}, { timestamps: true });
    /*
    address:{
        type:String,
        required:[true,'address is required']

    },
    city:{
        type:String,
        required:[true,'city is required']

    },
    country:{
        type:String,
        required:[true,'country is required']

    },
    phone:{
        type:String,
        required:[true,'Phone number is required']
        

    },*/
   






//hashfunction
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10);
})

//compare function
userSchema.methods.comparePassword=async function(plainPassword){
    return await bcrypt.compare(plainPassword,this.password)
};

//jwt token
userSchema.methods.generateToken=function(){
    return JWT.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"7d"});
}


export const userModel=mongoose.model("Users",userSchema)
export default userModel;