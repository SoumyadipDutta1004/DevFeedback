import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

async function register(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(`error in register controller ${error}`);
    next(error);
  }
}

async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: isUserExist._id,
        email: isUserExist.email,
        username: isUserExist.username,
      },
      JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .json({ message: "User created successfully" });
  } catch (error) {
    console.log(`error in login controller ${error}`);
    next(error);
  }
}

export { register, login };
