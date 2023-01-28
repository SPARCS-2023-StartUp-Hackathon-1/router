const express = require("express");
const router = express.Router();
const authHandlers = require("../service/auth");
const setTimestamp = require("../middleware/setTimestamp");

router.route("/login").post(setTimestamp, authHandlers.tryHandler);

// TODO : authUser 미들웨어 사용하기
router.route("/logout").get(authHandlers.logoutHandler);

// TODO : authUser 미들웨어 사용하기
router.route("/loginInfo").get(authHandlers.logininfoHandler);

module.exports = router;
