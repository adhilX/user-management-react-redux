import { model, Schema, Document } from "mongoose";

// Define an interface for the User document
export interface IUser extends Document {
  name: string;
  email: string;
  phone?:string
  password: string;
  isAdmin: boolean; 
  profilePic?:string
}

// Define the schema
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone:{type:String},
    isAdmin: { type: Boolean, default: false },
    profilePic:{type: String},
  },
  { timestamps: true }
);

// Create the model
const User = model<IUser>("User", userSchema);
 
export default User;