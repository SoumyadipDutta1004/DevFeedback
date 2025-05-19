import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";


declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
        email: string;
      }; 
    }
  }
}


async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const verify = jwt.verify(token, JWT_SECRET as string);
    if (!verify) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = {
      id: (verify as any).id,
      username: (verify as any).username,
      email: (verify as any).email,
    };

    req.user = user;
    next();
  } catch (error) {
    console.error(`Error in auth middleware:`, error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export default authMiddleware;
