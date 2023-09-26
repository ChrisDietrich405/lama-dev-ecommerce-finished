//103

const express = require("express");
const cors = require("cors");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const cartRouter = require("./routes/cartRoutes");
const auth = require("./middleware/auth");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const db = require("./config/db");

dotenv.config();

app.use(cors());
app.use(express.json());

const initializeDB = () => {
  try {
    db();
  } catch (error) {
    console.log(error);
  }
};

initializeDB();

app.use("/api/products", productRouter);
app.use("/api/users", auth, userRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
