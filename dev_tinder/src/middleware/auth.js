const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  // ✅ allow preflight
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).send("Please Login");
    }

    const decoded = jwt.verify(token, "DEV@Tinder$500");
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).send("User Not Found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("Auth Error: " + err.message);
  }
};

module.exports = { userAuth };