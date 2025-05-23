import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import StatusCode from "../config/statusCode";

export const tokenChecker = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["x-access-token"] as string;
  if (!token) {
    res.status(StatusCode.UNAUTHORIZED).json({ error: "Access token missing" });
    return 
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = decoded.id;

    console.log("Authorized:", decoded);
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ error: "Invalid or expired token" });
    return
  }
};
