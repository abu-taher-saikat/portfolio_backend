const express = require("express");

const UserController = require("../controllers/UserController");
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();
 
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/:userId", protect, UserController.getOneUser);
router.put("/updatepassword", protect, UserController.updatePassword);
router.post("/forgotPassword", UserController.forgotPassword);
router.put("/resetpassword/:resettoken", UserController.resetPassword);
router.post("/currentUser", protect, UserController.getMe);

module.exports = router;
