import { Request, Response } from "express";
import User from "../../models/UserSchema";
import StatusCode from "../../config/statusCode";
import { hashPassword } from "../../utils/passwordHash";
import { compare } from "bcrypt";

export const registerUser = async (req: Request,res: Response): Promise<void> => {

  const { name, email, password } = req.body;
  try {

    // console.log('heeeeee')
    const existEmail = await User.findOne({ email });

    // console.log(existEmail)
    if (existEmail) {
      res
        .status(StatusCode.BAD_REQUEST)
        .json({ message: "User  already exists" });
      return;
    }
    const HashedPass  = await hashPassword(password)
    console.log(HashedPass)
    const user = new User({ name, email, password:HashedPass });
    await user.save();
    res
      .status(StatusCode.CREATED)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    if (error instanceof Error) {
      console.log("registerUser ERROR :", error);
      res.status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
        return
    }
    res.status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: "Unknown error occurred" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
         const existUser = await User.findOne({email})
         if(!existUser){
            res.status(StatusCode.NOT_FOUND)
            return
         }
         const passCompare = await compare(password,existUser.password)
        console.log(passCompare)
        if(!passCompare){
            res.status(StatusCode.UNAUTHORIZED).json({message:'Password not match'})
            return
        }
        res.status(StatusCode.OK).json({message:'user login successfullyyy'})

    } catch (error) {
     console.log(error)   
    }
};