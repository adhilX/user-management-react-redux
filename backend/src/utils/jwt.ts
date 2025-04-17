import { sign } from "jsonwebtoken"

 export const accessToken  = (payload:object):string=>{
    return sign(payload ,process.env.JWT_SECRET as string,
   {expiresIn: "15m",

   })
 } 

 