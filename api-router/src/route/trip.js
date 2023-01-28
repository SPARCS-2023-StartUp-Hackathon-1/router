const express = require("express");
const router = express.Router();
const tripHandlers = require("../service/trip");

router.use(require("../middleware/auth"));

router.post("/create", tripHandlers.createHandler);
router.get("/pinlist", tripHandlers.pinlistHandler);
// router.get("/info", tripHandlers.InfoHandler);
// router.post("edit ~")
// router.post("remove ~")

module.exports = router;
