const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/user");
// Signup
router.get("/signup",userController.renderSignupForm)
router.post("/signup",wrapAsync(userController.signup));

// Login
router.get("/login",userController.renderLoginForm)
router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect: "/login",
        failureFlash: true
    }),
    userController.login)

// Logout 
router.get("/logout",userController.logout)
module.exports = router;    