import Topic from "../models/topic.model.js";
import User from "../models/user.model.js";

//post the topics
export const topicCreate = async (req, res) => {
  console.log("Inside the topicCreate function");
  const { title, content, visibility } = req.body;
  // Hash a password
  try {
    const userId = req.user._id.toString();
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ message: "user not found" });
    }
    const newTopic = new Topic({
      user: userId,
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
//getAllusers topics
export const userTopics = async (req, res) => {
  console.log("in function of topic.userTopics");
  //req.user._id gives the userId that i have in a cookie
  try {
    const post = await Topic.find({
      user: req.user._id,
    });
    if (post.length === 0 || !post) {
      return res.status(200).json({
        message: "No topics posted yet",
      });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

//delete the topic
