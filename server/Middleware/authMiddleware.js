import jwt from "jsonwebtoken";
import User from "../Models/User.js";

const jwt_secret = process.env.JWT_SECRET;
// console.log(jwt_secret)

export const protect = async (req, res, next) => {
  const token =  req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, jwt_secret);
    req.user = await User.findById(decoded.id).select("-password");
    next(); 
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed", error: error.message });
  }
};
