const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.verifyToken = async function (req, res, next) {
  try {
    console.log("Verifying token");
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    let user = await User.findOne({ email: decoded.email });

    if (!user) {
      user = new User({ email: decoded.email, name: decoded.name });
      await user.save();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.isAdmin = function (req, res, next) {
  try {
    console.log("Checking if user is admin");
    if (!req.user || !req.user.role.includes("admin")) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
