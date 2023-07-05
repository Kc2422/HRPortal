import User, {IUser} from "../models/User"

import express, { Express, Request, Response, NextFunction } from 'express';
import SMTPTransport from "nodemailer"
import RegToken from "../models/RegToken"
import Application from "../models/Application"
interface Transporter{
  [key: string]: any
}

exports.getAllApplication = async(req: Request, res:Response) => {
  // 
  const applications = await Application.find({})

  res.json( applications)

//npm i --save-dev @types/nodemailer
}

exports.getUserInfo = async(req: Request, res:Response) => {
    // 
    const user = await User.findOne({_id: req.params._id})

    res.json( user)


}

exports.submitApplication = async(req: Request, res:Response) => {
    console.log(req.body.profilePic)
    
    const user = await User.findOneAndUpdate({_id: req.params._id},req.body, {returnOriginal: false})
    console.log(user)

    res.json({user: user})


}

exports.updateInfo = async(req: Request, res:Response) => {
    
    const user = await User.findOneAndUpdate({_id: req.params._id},req.body)
    console.log(user)
    res.status(200).json({message: "sucessfully Updated"})
}

exports.updateVisaStatusUser = async(req: Request, res:Response) => {
    console.log(req.body)
  const user = await User.findOneAndUpdate({_id: req.params._id},req.body, {returnOriginal: false})
  console.log(user)

  res.json({user: user})
    

}


exports.sendRegLink = async(req: Request, res: Response) => {
    console.log("hello", req.body)
    let currTime = new Date()
    currTime.setHours(currTime.getHours()+3)
    const token = await RegToken.create({email: req.body.email, 
        expiration: currTime})
    let transporter = SMTPTransport.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN
        }
      } as Transporter );

      let mailOptions: any = {
        from: "beaconfireproj4@gmail.com",
        to: req.body.email,
        subject: 'Nodemailer Project',
        text: '',
        html: `<a href='http://localhost:3000/register/${token._id}'>Link to registration page</a>`
      }

      transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
      });

res.status(200).json({message: "hello"})

}

exports.getVisaEmployees =async (req:Request, res: Response) => {
  const employees = await User.find({$or: [{applicationStatus: "Not submitted"},{citizenOrPermResident: "no"}]})
  res.status(200).json({employees: employees})

}


exports.sendReminderEmail =async (req:Request, res: Response) => {
  let transporter = SMTPTransport.
  createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN
    }
  } as Transporter );

  let mailOptions: any = {
    from: "beaconfireproj4@gmail.com",
    to: req.body.email,
    subject: 'Nodemailer Project',
    text: 'You have unsubmitted documents',

  }

  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });

}
