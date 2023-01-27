const express = require("express");
const router = express.Router();
const authHandlers = require("../service/auth");
const setTimestamp = require("../middleware/setTimestamp");

router.route("/login").post(setTimestamp, authHandlers.tryHandler);
router.route("/logout").get(authHandlers.logoutHandler);
router.route("/loginInfo").get(authHandlers.logininfoHandler);

module.exports = router;
