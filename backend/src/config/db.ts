import mongoose from 'mongoose';

import dotenv from 'dotenv'

dotenv.config()
const connect = async():Promise<void>=>{
    try {
        // await mongoose.connect('mongodb://localhost:27017/userManagement-react')
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log('mongoDB connected ')
    } catch (error : any) {
        console.log('mongoDB error:-',error.message)
        process.exit(1) // exit the process  if DB connection fails
    }
}

export default connect