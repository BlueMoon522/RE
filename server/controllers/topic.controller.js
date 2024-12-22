import Topic from "../models/topic.model.js";

//post the topics
//also kind of a signin
export const topicCreate = async (req, res) => {
  console.log("Inside the topicCreate function");
  const { title, content, visibility } = req.body;
  // Hash a password
  try {
    const newTopic = new Topic({
      title,
      content,
      visibility,
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
