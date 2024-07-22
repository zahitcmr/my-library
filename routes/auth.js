const express = require("express")
const router = express.Router()
const authController = require("../controllers/AuthController")
const {loginValidate, registerValidate} = require("../utils/validate")

router.post("/login", loginValidate, authController.login)
router.post("/register", registerValidate, authController.register)

module.exports = router;
