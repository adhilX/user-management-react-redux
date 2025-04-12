import { Request, Response } from "express";
import User from "../models/UserSchema";
import StatusCode from "../config/statusCode";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
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
    const user = new User({ name, email, password });
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
