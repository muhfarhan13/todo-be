const express = require("express");
const AuthController = require("../controllers/authController");

const router = express.Router();

router.post("/register", AuthController.register); // Rute untuk register
router.post("/login", AuthController.login); // Rute untuk login

module.exports = router;
