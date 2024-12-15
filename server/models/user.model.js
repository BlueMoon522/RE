import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    authToken: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const user = mongoose.model("User", userSchema);
export default user;
