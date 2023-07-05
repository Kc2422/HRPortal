import { Request, Response } from "express";
import User, { IUser } from "../models/User";

exports.getUsers = (req: Request, res: Response) => {
  User.find({isAdmin:{$ne: true }})
  
    .then((users) => {
      console.log(users)
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
};
