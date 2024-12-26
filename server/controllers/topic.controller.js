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
//update the topic
export const updateTopic = async (req, res) => {
  console.log("In update Topic function");
  try {
    let { title, content, visibility } = req.body;
    const ID = req.params.id;
    //finding content by id
    let topic = await Topic.findById(ID);
    if (!topic || !ID)
      return res.status(404).json({ message: "Content not found" });

    topic.user = topic.user;
    topic.title = title || topic.title;
    topic.content = content || topic.description;
    topic.visibility = visibility || topic.visibility;

    topic = await topic.save();

    return res.status(200).json(topic);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ServerSide error" });
  }
};

//delete the topic
export const deleteTopic = async (req, res) => {
  console.log("In delete topic function");
  try {
    const ID = req.params.id;
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.staus(404).json({ error: "Post not found" });
    }
    await Topic.findByIdAndDelete(ID);
    res.status(200).json({ message: "Deletion successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
