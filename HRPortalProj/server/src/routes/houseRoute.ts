import express from "express";
let router = express.Router();

const registerController = require("../controllers/registerController");
const houseController = require("../controllers/houseController")



router.post('/assign', registerController.houseAssign);
router.post('/update', houseController.houseUpdate);
router.post('/create', houseController.createHouse);
router.get('/findUser/:user', houseController.findUserInfo);
router.get('/findHouse/:address', houseController.findUHouseInfo);
router.get('/findAllHouse', houseController.findAllHouseInfo);
router.get('/findAllUser', houseController.findAllUserInfo);

module.exports = router;
