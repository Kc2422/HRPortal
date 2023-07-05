"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
const userController = require("../controllers/userController");
const registerController = require("../controllers/registerController");
router.get("/profile/:_id", userController.getUserInfo);
router.post('/signup', registerController.registerPost);
router.put("/submitApplication/:_id", userController.submitApplication);
router.put("/updateInfo/:_id", userController.updateInfo);
router.put("/hr/updateVisaStatus/:id", userController.updateVisaStatusUser);
// router.put("/updateVisaStatus/:id", userController)
module.exports = router;
