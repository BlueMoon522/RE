import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "topic",
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    tips: {
      type: String,
    },
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
    subtopic: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "content",
      },
    ],
  },
  { timestamps: true },
);

const Content = mongoose.model("content", contentSchema);

export default Content;
