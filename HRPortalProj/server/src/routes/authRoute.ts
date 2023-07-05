import express from "express";
import { login, logout } from "../controllers/authController";

const router = express.Router();

router.route("/login").post(login);
router.route("/:id").delete(logout);
module.exports = router;
