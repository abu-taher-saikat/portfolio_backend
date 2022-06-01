const express = require("express");

const UserController = require("../controllers/UserController");
const checkAuth = require("../middlewares/check-auth");

const router = express.Router();
 
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/:userId", checkAuth, UserController.getOneUser);
router.get("/forgetPassword", UserController.forgetPassword);

module.exports = router;
