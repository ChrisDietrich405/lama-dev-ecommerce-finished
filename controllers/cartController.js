const { appendFileSync } = require("fs");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");
const mongoose = require("mongoose");


const addToCart = async (req, res) => {
  const { id } = req.user;
  const productsArray = req.body.products;

  try {
    const findUser = await User.findById(id);
    if (findUser.isAdmin) {
      return res.status(401).json("unauthorized");
    }

    let currentCart = await Cart.findOne({
      userId: new mongoose.Types.ObjectId(id),
    });

    if (!currentCart) {
      currentCart = new Cart({
        userId: new mongoose.Types.ObjectId(req.user.id),
        products: productsArray,
      });
    } else {
      // Implemente a lógica para lidar com produtos existentes aqui
      // Exemplo: atualizar a quantidade de produtos
      for (const product of productsArray) {
        //we already have a cart and now we are finding an existing product on the cart
        const existingProduct = currentCart.products.find(
          (productFromDB) => productFromDB.productId === product.productId
        );

        if (existingProduct) {
          existingProduct.quantity += product.quantity;
        } else {
          currentCart.products.push(product);
        }
      }
    }

    // Salve o carrinho
    await currentCart.save();
    return res.status(200).json("added to cart");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server Error");
  }
};


const updateCart = async (req, res) => {
  //this might include adding more of one product or decreasing the amount of products

  const { id } = req.params;
  const { quantity, productId } = req.body;

  try {
    const findCart = await Cart.findOne({
      _id: new mongoose.Types.ObjectId(id.trim()),
    });

    let productsArray = findCart.products.map((product) => {
      if (product.productId.toString() == productId) {
        product.quantity = quantity;
      }
      return product;
    });
    //finding a specific product in the cart

    await Cart.updateOne({ products: productsArray }, { upsert: true });

    res.json(findCart);
  } catch (error) {
    throw error;
  }
};

const deleteProductFromCart = async (req, res) => {
  const { cartId, productId } = req.params;

  const findCart = await Cart.findOne({
    _id: new mongoose.Types.ObjectId(cartId.trim()),
  });

  //can the _id be id?

  const { products } = findCart;

  const updatedCart = products.filter(
    (product) => product.productId.toString() !== productId
  );

  await Cart.updateOne(
    { _id: findCart._id },
    //_id has to be _id or can it be id
    { $set: { products: updatedCart } }
  );

  res.json(updatedCart);
};

module.exports = { addToCart, updateCart, deleteProductFromCart };
