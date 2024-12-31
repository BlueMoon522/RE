import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";
import * as argon2 from "argon2";
//generate a token and JWT tokens
//also kind of a signin
export const userCreate = async (req, res) => {
  console.log("Inside the signin/userCreate function");
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: "username Taken" });
  }
  // Hash a password
  const hashedPassword = await argon2.hash(password);
  try {
    const newUser = new User({
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
  const existingUser = await User.findOne({ username });
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
    const userId = req.user._id; //access the Id
    console.log(userId);
    const user = await User.findById(userId).lean(); //lean to get the plain object as response
    console.log("user", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Remove the password field from the user object
    const { password, ...userWithoutPassword } = user;
    return res.json(userWithoutPassword);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

//logout the user

export const logout = async (req, res) => {
  console.log("In logout function");
  try {
    //setting cookie jwt to maxage of 0 on press and value to null
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
