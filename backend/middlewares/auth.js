import User from "../models/userModel";
import jwt from "jsonwebtoken";

export async function verifyToken(req, res, next) {
  try {
    console.log("Verifying token");
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
}

export function isAdmin(req, res, next) {
  try {
    console.log("Checking if user is admin");
    const { role } = req.user;
    if (role.includes("admin")) {
      next();
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
