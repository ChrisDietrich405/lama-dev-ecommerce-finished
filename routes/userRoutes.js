const router = require("express").Router();
const updateUserFunc = require("../controllers/userController");
const auth = require("../middleware/auth");

router.put("/:id", updateUserFunc);

module.exports = router;
