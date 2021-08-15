const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { fetchController } = require("../controllers/text.controller");

router.post("/", authMiddleware, fetchController.spellCheckText);

module.exports = router;
