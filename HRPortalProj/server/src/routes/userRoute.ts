import express from "express";
let router = express.Router();
const userController = require("../controllers/userController");
const registerController = require("../controllers/registerController")
const applicationController = require("../controllers/applicationController")


router.get("/profile/:_id", userController.getUserInfo)
router.post('/signup', registerController.registerPost);
router.get("/getAllApplication", userController.getAllApplication);
router.post("/hr/sendEmail", userController.sendRegLink)
router.post('/applicationApprove', applicationController.updateApplicationApprove);
router.post('/applicationReject', applicationController.updateApplicationReject);
router.put("/submitApplication/:_id", userController.submitApplication)
router.put("/updateInfo/:_id", userController.updateInfo)
router.put("/hr/updateVisaStatus/:_id", userController.updateVisaStatusUser)

router.get("/getToken/:id", registerController.checkRegToken)




router.post("/hr/sendReminderEmail", userController.sendReminderEmail)
router.get("/hr/getVisaEmployees", userController.getVisaEmployees)


module.exports = router;
