const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/users");

// router.route
// for signup
router
  .route("/signup")
  // render route
  .get(userController.renderSignup)
  // signup route
  .post(wrapAsync(userController.signUp));

// for login
router
  .route("/login")
  // router --> /login to render
  .get(userController.renderLogin)
  // router --> /login data check/authenticate
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.logIn
  );

// for logout
router.get("/logout", userController.logOut);

module.exports = router;
