"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
exports.getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 
    const user = yield User_1.default.findOne({ _id: req.params._id });
    res.json(user);
});
exports.submitApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.profilePic);
    const user = yield User_1.default.findOneAndUpdate({ _id: req.params._id }, req.body, { returnOriginal: false });
    console.log(user);
    res.json({ user: user });
});
exports.updateInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOneAndUpdate({ _id: req.params._id }, req.body);
});
exports.updateVisaStatusUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.find({ _id: req.params._id });
    // upload file to aws
});
