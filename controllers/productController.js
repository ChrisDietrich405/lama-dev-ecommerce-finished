const Product = require("../models/Product");
const User = require("../models/User");

const createProduct = async (req, res) => {
  const { id } = req.user;

  const findUser = await User.findById(id);
  //the id here is a string but the id in mongoose is an objectId?

  if (!findUser.isAdmin) {
    res.status(401).json("unauthorized");
  }

  try {
    const newProduct = new Product({
      title: req.body.title,
      desc: req.body.desc,
      img: req.body.img,
      categories: req.body.categories,
      size: req.body.size,
      color: req.body.color,
      price: req.body.price,
    });

    await newProduct.save();
    res.status(201).json("Product created");
  } catch (error) {
    res.status(500).json("Internal error" + error);
  }
};

module.exports = { createProduct };
