"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
const registerController = require("../controllers/registerController");
const houseController = require("../controllers/houseController");
router.post('/assign', registerController.houseAssign);
router.post('/update', houseController.houseUpdate);
router.get('/findUser/:user', houseController.findUserInfo);
router.get('/findHouse/:address', houseController.findUHouseInfo);
module.exports = router;
