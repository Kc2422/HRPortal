import express from "express";

const adminController = require("../controllers/adminController");
const router = express.Router();

router.get("/profiles", adminController.getUsers);

module.exports = router;
