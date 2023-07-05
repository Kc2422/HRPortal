"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const uploadController_1 = require("../controllers/uploadController");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: "uploads/" });
router.route("/").post(upload.single("imageFile"), uploadController_1.createFile);
router.route("/").get(uploadController_1.getFile);
module.exports = router;
