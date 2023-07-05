"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPost = exports.registerKey = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
require("dotenv").config();
// const userModel = model('employee', UserSchema);
const registerKey = (request, response) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var jwtToken = request.params.key;
    const key = "privateKey";
    var decodeToken = jsonwebtoken_1.default.verify(jwtToken, key);
    response.redirect("http:localhost:3000/register");
  });
exports.registerKey = registerKey;
const registerPost = (request, response) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var userInfo = request.body.user;
    var userEmail = userInfo["email"];
    // check if the user exist checking the email
    var existUser = yield User_1.default.find({ email: userEmail });
    console.log("email is", userEmail);
    if (existUser.length > 0) {
      console.log("user is existed", existUser);
      response.json({ result: false });
    } else {
      // encode the password
      // hashing code salt could be store in .env
      var userPwd = userInfo["password"];
      console.log("check the information", userInfo);
      //console.log('encode the password');
      var encodePwd = yield bcryptjs_1.default.hash(userPwd, 10);
      //console.log('encode finished');
      userInfo["password"] = encodePwd;
      const newUser = yield User_1.default.create(userInfo);
      console.log("new user is added to the database");
      response.status(201).send({ result: true });
    }
  });
exports.registerPost = registerPost;
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
