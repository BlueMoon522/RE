import Content from "../models/content.model.js";
import Topic from "../models/topic.model.js";
import mongoose from "mongoose";

//post method
export const postContent = async (req, res) => {
  console.log("Inside the postContent function");
  const { title, description, questions } = req.body;
  try {
    const topicId = req.params.id;
    const userId = req.user._id.toString();
    console.log("userID", userId);
    const existingTopic = await Topic.findById(topicId);
    console.log("topic userID", existingTopic.user.toString());
    if (existingTopic.user != userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!existingTopic || !topicId) {
      return res.status(404).json({ message: "Topic not found" });
    }
    const newTopic = new Content({
      user: userId,
      topicId: topicId,
      title,
      description,
      questions,
    });

    if (newTopic) {
      await newTopic.save();
      return res.status(201).json({ newTopic: newTopic.title });
    } else {
      return res.status(400).json({ error: "invalid data" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

//get  all the contentmethod
export const getAllContent = async (req, res) => {
  console.log("Inside the getContent function");
  try {
    const contents = await Content.find();
    if (!contents) {
      return res.status(404).json({ message: "No content found" });
    }
    console.log(contents);
    return res.status(201).json(contents);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

//get content based on topic id
export const getContent = async (req, res) => {
  console.log("Inside the getContent function");
  try {
    console.log("topicid params", req.params.id);
    const topicId = req.params.id;
    if (!topicId) {
      return res.status(404).json({ message: "No tokenId found" });
    }
    // const ID = req.params.id;
    // const contents = await Content.findById(ID);
    // If topicId should be an ObjectId, ensure it's valid
    if (!mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({ message: "Invalid topicId format" });
    }
    const contents = await Content.find({ topicId: topicId });
    if (!contents || contents.length === 0) {
      return res.status(404).json({ message: "No content found" });
    }

    console.log(contents);
    return res.status(201).json(contents);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

//get content based on content id
export const getCurrentContent = async (req, res) => {
  console.log("Inside the getContent function");
  try {
    console.log("topicid params", req.params.id);
    const contentID = req.params.id;
    if (!contentID) {
      return res.status(404).json({ message: "No tokenId found" });
    }
    // const ID = req.params.id;
    // const contents = await Content.findById(ID);
    // If topicId should be an ObjectId, ensure it's valid
    // if (!mongoose.Types.ObjectId.isValid(topicId)) {
    //   return res.status(400).json({ message: "Invalid topicId format" });
    // }
    const contents = await Content.findById(contentID);
    if (!contents || contents.length === 0) {
      return res.status(404).json({ message: "No content found" });
    }

    console.log(contents);
    return res.status(201).json(contents);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

//update the content also add the sub-content
export const updateContent = async (req, res) => {
  console.log("In update content function");
  try {
    const userId = req.user._id.toString();
    console.log("userId", userId);
    let { title, description, questions, subcontent } = req.body;
    const ID = req.params.id;
    //finding content by id
    let content = await Content.findById(ID);
    console.log("user from topic:", content.user);
    if (userId != content.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const contents = await Content.findById(ID);
    console.log("Contents:", contents);
    if (!content || !ID)
      return res.status(404).json({ message: "Content not found" });

    content.title = title || content.title;
    content.description = description || content.description;
    content.questions = questions || content.questions;
    //ensure subcontent is an array
    if (Array.isArray(subcontent)) {
      content.subcontent = [...new Set([...content.subcontent, ...subcontent])]; // Prevent duplicates
    }

    // content.subcontent = subcontent || content.subcontent;

    content = await content.save();

    return res.status(200).json(content);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ServerSide error" });
  }
};

//delete content
export const deleteContent = async (req, res) => {
  console.log("In delete content function");
  try {
    const ID = req.params.id;
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.staus(404).json({ error: "Post not found" });
    }
    await Content.findByIdAndDelete(ID);
    res.status(200).json({ message: "Deletion successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
