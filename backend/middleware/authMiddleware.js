import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;
  console.log(token);
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.userId).select("-password");

    next();
    try {
    } catch {
      res.status(401);
      throw new Error("Unauthorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized,no token");
  }
});
