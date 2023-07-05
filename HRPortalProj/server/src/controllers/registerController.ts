 import {connect, Schema, model} from 'mongoose';
import User from '../models/User';
import House from '../models/House';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
import bcrypt from 'bcryptjs';
import RegToken from "../models/RegToken"
require('dotenv').config();

// const userModel = model('employee', UserSchema);

export const registerKey = async (request: any, response: any) => {
  var jwtToken = request.params.key;
  const key = "privateKey";
  var decodeToken = jwt.verify(jwtToken, key);
  response.redirect("http:localhost:3000/register");
};

export const registerPost = async (request:any, response:any) =>{
  var userInfo = request.body;
  var userEmail = userInfo['email'];
  
  // check if the user exist checking the email
  var existUser = await User.find({email:userEmail});
  console.log('email is', userEmail);
  if (existUser.length > 0){
      console.log('user is existed',existUser);
      response.json({result: false});
  }else{
      // encode the password
      // hashing code salt could be store in .env
      var userPwd = userInfo.user['password'];
      console.log('check the information', userInfo);
      //console.log('encode the password');
      var encodePwd = await bcrypt.hash(userPwd, 10)
      console.log(encodePwd)
      //console.log('encode finished');
      userInfo.user['password'] = encodePwd;
      userInfo.user['currentAddress'] = '';
      const newUser = await User.create(userInfo.user);  
      console.log('new user is added to the database');      
      response.status(201).send({result: true});
  }
  
}

// export const houseAssign = async (request:any, response:any) =>{
//     var requestBody = request.body;
//     var isRandom = requestBody['isRandom'];
//     var userInfo = requestBody['user'];
//     if (isRandom){
//         // find all house and pick one that is not reach the limit
//         // var allHouse = await House.find({});
//         // for (let house of allHouse){
//         //     if (house['employeeList'].length < 2) {
//                 // var tempResident = {
//                 //     fullName : userInfo['name'],
//                 //     phoneNumber: '',
//                 //     email: userInfo['email'],
//                 // };
//                 // var address = house['address'];
//                 // var tempResidentList = house['employeeList'];
//                 // tempResidentList.push(tempResident);
//                 // await House.updateOne({address: address}, {employeeList: tempResidentList});
//                 await User.updateOne({email: userInfo['email']}, {currentAddress: address});
//                 break;
//             }
//         }
//     }
// }

export const houseAssign = async (request:any, response:any) =>{
  var requestBody = request.body;
  var isRandom = requestBody['isRandom'];
  var userInfo = requestBody['user'];
  if (isRandom){
      // find all house and pick one that is not reach the limit
      var allHouse = await House.find({});
      for (let house of allHouse){
          if (house['employeeList'].length < 2) {
              var tempResident = {
                  fullName : userInfo['username'],
                  phoneNumber: '',
                  email: userInfo['email'],
              };
              var address = house['address'];
              var tempResidentList = house['employeeList'];
              tempResidentList.push(tempResident);
              await House.updateOne({address: address}, {employeeList: tempResidentList});
              //console.log({email: userInfo['email']},{currentAddress: address});
              var result = await User.updateOne({email: userInfo['email']}, {currentAddress: address});
              //console.log('result' , result);
              var test = await User.find({email: userInfo['email']});
              //console.log('test' , test);
              break;
          }
      }
  }
  response.json({result:true});
}

export const checkRegToken =async (req:any, res: any) => {
    const token: any = await RegToken.find({_id: req.params._id})
    let expirationDate = new Date(token.expiration)
    if(expirationDate>new Date()){
        res.status(400).json({message: "token has expired"})
        
    }else{
        res.status(200).json({message: "token is valid"})
    }
}