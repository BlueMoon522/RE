import Content from "../models/content.model.js";
import Topic from "../models/topic.model.js";

//post method
export const postContent = async (req, res) => {
  console.log("Inside the postContent function");
  const { title, description, questions } = req.body;
  // Hash a password
  try {
    const topicId = req.params.id;
    const existingTopic = Topic.findById(topicId);
    if (!existingTopic || !topicId) {
      return res.status(404).json({ message: "Topic not found" });
    }
    const newTopic = new Content({
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

//get content based on content id
export const getContent = async (req, res) => {
  console.log("Inside the getContent function");
  try {
    const ID = req.params.id;
    const contents = await Content.findById(ID);
    if (!contents || !ID) {
      return res.status(404).json({ message: "No content found" });
    }
    console.log(contents);
    return res.status(201).json(contents);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

//update the content
export const updateContent = async (req, res) => {
  console.log("In update content function");
  try {
    let { title, description, questions } = req.body;
    const ID = req.params.id;
    console.log("ID:", ID);
    //finding content by id
    let content = await Content.findById(ID);
    const contents = await Content.findById(ID);
    console.log("Contents:", contents);
    if (!content || !ID)
      return res.status(404).json({ message: "Content not found" });

    content.title = title || content.title;
    content.description = description || content.description;
    content.questions = questions || content.questions;

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
