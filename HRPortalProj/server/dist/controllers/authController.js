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
exports.logout = exports.login = void 0;
const express_async_handler_1 = __importDefault(
  require("express-async-handler")
);
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
// @Desc Login user
// @Route /auth/login
// @Method POST
exports.login = (0, express_async_handler_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    const user = yield User_1.default.findOne({ name: name });
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    const correct = yield bcryptjs_1.default.compare(password, user.password);
    if (correct) {
      const data = { id: user._id };
      const signed_jwt = jsonwebtoken_1.default.sign(
        data,
        process.env.JWT_KEY,
        {
          expiresIn: "60m",
        }
      );
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
  })
);
exports.logout = (0, express_async_handler_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let user = yield User_1.default.findById(req.params.id);
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    yield User_1.default.findByIdAndDelete(req.params.id);
    res.status(201).json({});
  })
);
