const User = require("../models/User");

const updateUserFunc = async (req, res) => {
  const { username, email, password } = req.body;

  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        username,
        email, 
        password    
      });

      if (!updatedUser) {
        return res.status(404).json("User not found");
      }

      res.status(200).json("User updated successfully");
    } catch (error) {
      console.error(error);
      res.status(500).json("Internal server error");
    }
  } else {
    res.status(403).json("Not allowed");
  }
};

module.exports = updateUserFunc;
