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

//get method
export const getContent = async (req, res) => {
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
