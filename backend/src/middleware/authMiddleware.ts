import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

export const tokenChecker = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["x-access-token"] as string;
  if (!token) {
    return res.status(401).json({ error: "Access token missing" });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    
    req.user = decoded;

    console.log("Authorized:", decoded);
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
