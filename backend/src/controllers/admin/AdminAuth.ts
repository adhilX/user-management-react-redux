import User from "../../models/UserSchema"
import StatusCode from "../../config/statusCode"
import { compare } from "bcrypt"
import { Request, Response } from "express"
import { generateToken } from "../../utils/jwt"


export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password }: { email: string; password: string } = req.body
        const admin = await User.findOne({email,isAdmin:true})

        if(!admin){
            res.status(StatusCode.NOT_FOUND).json({message: 'Invalide credentials'})
            return 
        }
          const isMatch = await compare(password, admin.password);
    if (!isMatch) {
      res.status(StatusCode.UNAUTHORIZED).json({ message: 'Incorrect password' });
      return;
    }
              const token = generateToken({ id: admin._id })
    
        res.status(StatusCode.OK).json({message:'Login successful',admin:{
            id: admin._id,
            name:admin.name,
            email:admin.email
        },token})
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
      }
}