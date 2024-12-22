import User from "../models/user.model.js";

import jwt from "jsonwebtoken";

//what this file does is just check for token named given(while signing or logging in!!)
//then it docodes it to find the id ,then it does findbyid ,if id is found on db it returns true
//or error is returned

export const protectedRoutes = async (req, res, next) => {
  try {
    console.log("inside protected routes");
    const token = req.cookies.jwt; //mention the name of cookie,i.e jwt in this case
    console.log("Token found");
    console.log(token);
    if (!token) {
      console.log("cookie Token not found");
      return res.status(401).json({ error: "Token not found" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("decoded:", decoded);

    if (!decoded) {
      console.log("couldnot decode cookie");
      return res.status(401).json({
        error: "Invalid token",
      });
    }
    console.log("Token decoded!!");
    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log("user not found from cookie");
      return res.status(401).json({
        error: "User not found",
      });
    }
    console.log("User found!!");
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ mesasge: "Internal server error" });
  }
};
