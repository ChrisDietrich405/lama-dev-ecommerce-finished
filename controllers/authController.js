const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const registerUser = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);

    newUser.password = hashedPassword;

    const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!newUser.email.match(emailFormat)) {
      res.status(400).json("Invalid email format.");
      return;
    }

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });

  const matchedPassword = await bcrypt.compare(password, findUser.password);

  if (!findUser || !matchedPassword) {
    return res.status(401).json("incorrect credentials");
  }

  const userNoPassword = {
    username: findUser.username,
    email: findUser.email,
    isAdmin: findUser.isAdmin,
  };

  return res.status(200).json({
    userNoPassword,
    token: jwt.sign({ id: findUser.id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    }),
  });
};

module.exports = {
  registerUser,
  login,
};
