const { Router } = require("express");
const router = Router();

router.use(require('./text.routes'));
router.use(require("./user.routes"));

module.exports = router


