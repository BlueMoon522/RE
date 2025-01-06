import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bookmarks: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "topics",
      },
    ],
  },

  { timestamps: true },
);

const user = mongoose.model("Re-User", userSchema);
export default user;
