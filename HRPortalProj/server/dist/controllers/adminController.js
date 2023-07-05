"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
exports.getUsers = (req, res) => {
    User_1.default.find({ isAdmin: false })
        .then((users) => {
        res.json(users);
    })
        .catch((err) => {
        console.log(err);
    });
};
