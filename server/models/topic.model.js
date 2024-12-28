import mongoose from "mongoose";

const mainSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    // subtopics: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "content",
    //   },
    // ],
    title: {
      type: String,
    },
    content: { type: String },
    visibility: { type: String },
  },
  { timestamps: true },
);

const Topic = mongoose.model("topic", mainSchema);

export default Topic;
