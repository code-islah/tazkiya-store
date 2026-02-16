import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // Check if authorization header exists and has Bearer format
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Check if JWT_SECRET exists
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined in environment variables");
        return res.status(500).json({ message: "Server configuration error" });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user and attach to request
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      // Handle specific JWT errors
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      } else if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }

      console.error("Auth middleware error:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // No token case
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
