import { hash } from "bcrypt"


export const hashPassword = async(pass:string):Promise<string>=>{
    const hashedPassword = await hash(pass,10)
    return hashedPassword
}

