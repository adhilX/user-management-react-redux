import { Request, Response } from "express";
import User from "../../models/UserSchema";
import StatusCode from "../../config/statusCode";


export const getUser = async (req: Request, res: Response): Promise<void> => {
     try {
            const Users = await User.find({ isAdmin: { $ne: true } })

          res.status(StatusCode.OK).json({message: 'success',Users})
     } catch (error) {
          if (error instanceof Error) {
               console.log("loginUser ERROR:", error);
               res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
               return
          }
          res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "Unknown error occurred" });
          return
     
     }
}