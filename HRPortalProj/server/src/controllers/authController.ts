import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

// @Desc Login user
// @Route /auth/login
// @Method POST
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name: name });
  console.log(user)
  console.log(name, password)

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const correct = await bcrypt.compare(password, user.password);

  if (correct) {
    const data = { id: user._id };
    const signed_jwt = jwt.sign(data, process.env.JWT_KEY as string, {
      expiresIn: "60m",
    });
    console.log(signed_jwt);

    res.cookie("access_token", signed_jwt).status(201).json(user);

    // res.cookie("access_token", signed_jwt).status(201).json({
    //   id: user._id,
    //   name: user.name,
    //   isAdmin: user.isAdmin,
    //   applicationStatus: user.applicationStatus
    // });
  } else {
    res.status(401);
    throw new Error("name or password incorrect");
  }
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  await User.findByIdAndDelete(req.params.id);

  res.status(201).json({});
});
