import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import user from "../models/user.model.js";
//generate a token and JWT tokens
//also kind of a signin
export const userCreate = async (req, res) => {
  const { authToken } = req.body;
  const existingToken = await user.findOne({ authToken });
  if (existingToken) {
    return res.status(400).json({ error: "Token Taken" });
  }
  try {
    const newUser = new user({
      authToken,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({ authToken: newUser.authToken });
    } else {
      res.status(400).json({ error: "invalid data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

//get user info
export const getInfo = async (req, res) => {
  const userId = req.user.userId; //access the Id
  user
    .findById(userId)
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      res.status(500).json({ message: "internal server error" });
      console.log(err);
    });
};
