import user from "../models/user.model.js";
export const userCreate = async (req, res) => {
  const { authToken } = req.body;
  try {
    console.log("trying");
    const newUser = new user({
      authToken,
    });
    console.log("here1");
    console.log(newUser);

    if (newUser) {
      await newUser.save();
      res.status(200).json({ authToken });
    } else {
      res.status(500);
    }
  } catch (error) {
    res.status(500);
  }
};
