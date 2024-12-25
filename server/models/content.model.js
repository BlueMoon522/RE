import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: false,
  },
  answer: {
    type: String,
    validate: {
      validator: function (value) {
        //if part 1 is provided ,part 2 must be provided
        return !this.part1 || (this.part1 && value);
      },
    },
  },
});

const contentSchema = new mongoose.Schema(
  {
    topicId: {
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
    tips: {
      type: String,
    },
    questions: {
      type: [questionSchema],
    },
    // question: {
    //   type: String,
    // },
    // answer: [
    //   {
    //     type: String,
    //   },
    // ],
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
