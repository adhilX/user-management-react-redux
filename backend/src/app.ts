import express, { Application } from 'express';
import dotenv from 'dotenv'
import connect from './config/db';
import cors from 'cors'
import userRoute from './routes/userRoutes'
 
dotenv.config()
const app: Application = express();
app.use(express.json())
app.use(cors())
app.use('/',userRoute)
const port = process.env.PORT 
const startServer = async ():Promise<void> => {
    try {
      await connect();
      app.listen(port, () => {
        console.log(`server is running on ${port}`);
      });
    } catch (error :any) {
      console.log('Failed to connect to MongoDB:', error.message);
      process.exit(1); 
    }
  };
  
  startServer();