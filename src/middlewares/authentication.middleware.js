import jwt from "jsonwebtoken";

import { User } from "../models/user.models.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

export const authenticationMiddleware = async (req, res, next) => {
  try {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) return next();

    if (!tokenHeader.startsWith("Bearer")) {
      return res.status(400).json({ error: "Token must start with Bearer" });
    }

    const token = tokenHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user id to property req.user, to Get user id from token
    //TODO: extra db query
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }
};
