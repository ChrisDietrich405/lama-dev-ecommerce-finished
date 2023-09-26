const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    res.status(401).json("not authenticated");
  }

  console.log(token)
  token = token.split(" ")[1];

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedToken;

  next();
};

module.exports = auth;
