import User from "../models/user.model";

import jwt from "jsonwebtoken";

export const protectedRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; //mention the name of cookie,i.e jwt in this case
    if (!token) {
      return res.status(401).json({ error: "Token not found" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({
        error: "Invalid token",
      });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ mesasge: "Internal server error" });
  }
};
