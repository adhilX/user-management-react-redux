import { Request, Response } from "express";
import User from "../../models/UserSchema";
import StatusCode from "../../config/statusCode";

export const updateprofile = async(req:Request,res:Response)=>{
    try {
       const user = req.body
    //    console.log(user)
    //    console.log(user._id)

     const existEmail = await User.findOne({email:user.email})
        // console.log(user)
        // console.log(existEmail)
     if (existEmail && (existEmail._id as string).toString() !== user._id) {
        res.status(StatusCode.CONFLICT).json({message:'this email already used'})
        return
     }

    const updatedUser = await User.findByIdAndUpdate(user._id,{$set:{...user}},{new:true})
    //  console.log(updatedUser)

     res.status(StatusCode.OK).json({message: 'profile updated',updatedUser})
     return
    } catch (error) {
        if (error instanceof Error) {
            console.log("registerUser ERROR :", error);
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
            return
       }
       res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "Unknown error occurred" });
       return
    }
}