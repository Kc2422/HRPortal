"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// const routes = require('./routes');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
app.use(cookieParser());
app.use(cors());
app.use("/", express_1.default.json());
app.use("/admin", require("./routes/adminRouter"));
app.use("/uploadFile", require("./routes/uploadRoute"));
app.use("/auth", require("./routes/authRoute"));
app.use("/user", require("./routes/userRoute"));
// x-www-form-urlencoded
app.use(express_1.default.urlencoded({ extended: false }));
// body parser
app.use(express_1.default.json());
require("dotenv").config();
const connection = require("./config/db");
// app.use(
//   session({
//     name: "SESSIONID",
//     secret: process.env.SESSION_KEY,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: true, httpOnly: true, sameSite: "strict" },
//     genid: () => uuidv4(),
//   })
// );
module.exports = { app, connection };
