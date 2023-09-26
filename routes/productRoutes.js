const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productController");
const auth = require("../middleware/auth");

router.post("/", auth, createProduct);

module.exports = router;
