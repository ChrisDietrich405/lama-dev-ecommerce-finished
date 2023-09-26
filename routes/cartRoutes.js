const router = require("express").Router();
const {
  updateCart,
  addToCart,
  deleteProductFromCart,
} = require("../controllers/cartController");
const auth = require("../middleware/auth");

router.post("/", auth, addToCart);
router.put("/:id", auth, updateCart);
router.delete("/:cartId/product/:productId", auth, deleteProductFromCart);

module.exports = router;
