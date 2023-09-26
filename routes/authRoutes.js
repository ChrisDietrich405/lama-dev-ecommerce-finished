const router = require("express").Router();
const { registerUser, login, thing } = require("../controllers/authController");

router.post("/", registerUser);
router.post("/login", login);

module.exports = router;
