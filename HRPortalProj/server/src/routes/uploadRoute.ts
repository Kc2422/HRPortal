import express from "express";
import { Request, Response } from "express";
import multer from "multer";
import { createFile, getFile } from "../controllers/uploadController";

const router = express.Router();

const upload = multer({ dest: "uploads/" });
router.route("/").post(upload.single("imageFile"), createFile);
router.route("/").get(getFile);

module.exports = router;
