const { Router } = require("express");
const router = Router();
const { usersController } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", usersController.registerUser);
router.post("/login", usersController.login);
router.post("/uploadFile", authMiddleware, usersController.uploadFile);

module.exports = router;
