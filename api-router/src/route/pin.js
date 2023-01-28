const express = require("express");
const router = express.Router();

const pinHandler = require("../service/pin");

router.use(require("../middleware/auth"));

// router.post("/create", pinHandler.pincreateHandler);
router.get("/info/:pinId", pinHandler.infoHandler);
// router.get("/elementlist", pinHandler.elementlistHandler);

module.exports = router;
