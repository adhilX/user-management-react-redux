export default interface User {
    _id: string;
    name: string;
    email: string;
    password : string
    phone?: string
    profilePic?: string; 
  }