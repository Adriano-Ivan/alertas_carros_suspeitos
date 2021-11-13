const controllerAuth = require("../controllers/auth");
const passport = require("passport");
const express = require("express");
const router = express.Router();
router.get("/", controllerAuth.getLogin);
router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login?fail=true",
  })
);
module.exports = router;
