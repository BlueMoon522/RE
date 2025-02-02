import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: false,
  },
  answer: {
    type: String,
    validate: {
      validator: function(value) {
        //if part 1 is provided ,part 2 must be provided
        return !this.question || (this.question && value);
        // return !this.part1 || (this.part1 && value);
      },
    },
  },
  tips: {
    type: String,
  },
});

const contentSchema = new mongoose.Schema(
  {
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "topic",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    questions: {
      type: [questionSchema],
    },
    subcontent: {
      type: [contentSchema], //to make it a subtopic
    },
    // question: {
    //   type: String,
    // },
    // answer: [
    //   {
    //     type: String,
    //   },
    // ],
    // maybe if i feel like it i will make this
    // subtopic: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "content",
    //   },
    // ],
  },
  { timestamps: true },
);

const Content = mongoose.model("content", contentSchema);

export default Content;
