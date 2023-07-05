import express, { Express, Request, Response, NextFunction } from "express";
const app: Express = express();
import path from "path";
// const routes = require('./routes');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

app.use(cookieParser());

app.use(cors());

app.use("/", express.json());
app.use("/admin", require("./routes/adminRouter"));
app.use("/uploadFile", require("./routes/uploadRoute"));
app.use("/auth", require("./routes/authRoute"));
app.use("/user", require("./routes/userRoute"));
app.use("/house", require("./routes/houseRoute"))
// x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// body parser
app.use(express.json());
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
