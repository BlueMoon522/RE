import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import user from "../models/user.model.js";
import * as argon2 from "argon2";
//generate a token and JWT tokens
//also kind of a signin
export const userCreate = async (req, res) => {
  console.log("Inside the signin/userCreate function");
  const { username, password } = req.body;
  const existingUser = await user.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: "username Taken" });
  }
  // Hash a password
  const hashedPassword = await argon2.hash(password);
  try {
    const newUser = new user({
      username,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      return res.status(201).json({ newUser: newUser.username });
    } else {
      return res.status(400).json({ error: "invalid data" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

//login function
export const loginUser = async (req, res) => {
  console.log("Inside the login function");
  const { username, password } = req.body;
  const existingUser = await user.findOne({ username });
  try {
    if (existingUser) {
      console.log("user exists");
      if (await argon2.verify(existingUser.password, password)) {
        console.log("password exists");
        generateTokenAndSetCookie(existingUser._id, res);
        return res.status(201).json({ loggedInUser: existingUser.username });
      } else {
        return res.status(400).json({ error: "Wrong Password" });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};
//get user info
////yet to be made
export const getInfo = async (req, res) => {
  console.log("Inside the getInfo function");
  try {
    const userId = req.user.userId; //access the Id
    user.findById(userId).then((userData) => {
      return res.json(userData, --password);
    });
  } catch (error) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};
