const express = require("express");
const router = express.Router();
const userHandlers = require("../service/user");

router.use(require("../middleware/auth"));

router.get("/triplist", userHandlers.triplistHandler);

module.exports = router;
