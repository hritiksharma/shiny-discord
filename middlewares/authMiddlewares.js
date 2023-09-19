const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      req.user = await User.findOne({ _id: decoded._id }).select("-password");
      next();
    } catch (error) {
      console.log("error", error);
      res.status(404);
      throw new Error("Error in protect middlewares.");
    }
  }

  if (!token) {
    res.status(404);
    throw new Error("invalid token");
  }
};

module.exports = { protect };
