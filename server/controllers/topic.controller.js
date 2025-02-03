import Content from "../models/content.model.js";
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
    const userId = req.user._id.toString();
    let { title, content, visibility } = req.body;
    const ID = req.params.id;
    //finding content by id
    let topic = await Topic.findById(ID);
    console.log("topic id", topic.user);
    if (userId != topic.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
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
    //to find all the contents with this as topic ID
    const contents = await Content.find({ topicId: ID });
    console.log("content", contents);
    //deleting these contents

    const contentIds = contents.map((content) => content._id);
    console.log("contentIds", contentIds);
    console.log(contentIds.length);
    console.log(contentIds[1]);

    for (let i = 0; i <= contentIds.length - 1; i++) {
      console.log("inside the loop");
      await Content.findByIdAndDelete(contentIds[i]);
      console.log(`Deleted the content with id${contentIds[i]}`);
    }
    if (!topic) {
      return res.status(404).json({ error: "Post not found" });
    }
    await Topic.findByIdAndDelete(ID);
    console.log("deleted");
    res.status(200).json({ message: "Deletion successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//to get all the post of the users that are public excluding yours
export const userPublicTopics = async (req, res) => {
  console.log("in function of topic.userPublicTopics");
  try {
    const user = req.user._id;
    console.log(user);
    const topic = await Topic.find({
      visibility: "public",
      user: { $ne: user }, // Exclude topics where the user ID matches the current user's ID
    });
    if (topic.length === 0 || !topic) {
      return res.status(200).json({
        message: "No topics posted yet",
      });
    }
    console.log(" post", topic);
    return res.status(200).json(topic);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};
//route to bookmark the topics
export const bookmarkTopics = async (req, res) => {
  console.log("In topic bookmark route");
  try {
    const id = req.params.id; // The topic ID to bookmark
    const userId = req.user._id.toString(); // The user ID from the request

    // Find the user by ID
    let existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the topic is already bookmarked
    const bookmarkExists = existingUser.bookmarks.some(
      (bookmark) => bookmark && bookmark.toString() === id,
    );

    if (bookmarkExists) {
      console.log("Bookmark exists, removing it...");
      // Remove the bookmark
      existingUser.bookmarks = existingUser.bookmarks.filter(
        (bookmark) => bookmark && bookmark.toString() !== id,
      );
      await existingUser.save();
      return res.status(200).json({ message: "Bookmark removed" });
    } else {
      console.log("Bookmark does not exist, adding it...");
      // Add the new bookmark
      existingUser.bookmarks.push(id);
      await existingUser.save();
      return res.status(200).json({ message: "Bookmark added" });
    }
  } catch (error) {
    console.error("Error in bookmarkTopics:", error);
    return res.status(500).json({ error: "Server Error" });
  }
};
//to get all the question of all the topics of the current user
export const getQuestions = async (req, res) => {
  console.log("Inside the getQuestions function");
  try {
    const user = req.user._id;

    //finding all the topics with the userId
    const topics = await Topic.find({ user: user });
    const topicIds = topics.map((topic) => {
      return topic.id;
    });
    console.log(topicIds);
    console.log(topicIds.length);
    let question = [];
    for (let i = 0; i <= topicIds.length - 1; i++) {
      console.log("inside the loop");
      let content = await Content.findOne({ topicId: topicIds[i] });
      console.log("here is the content");
      console.log(content);
      console.log("here  content ends");
      if (content) {
        question = question.concat(content.questions); // Use concat to merge arrays
      }
    }
    if (!topics) {
      return res.status(404).json({ message: "No topics found" });
    }
    return res.status(201).json(question);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

export const searchTopics = async (req, res) => {
  console.log("inside searchTopics");
  try {
    const title = req.params.name;
    console.log(title);
    //using regex to search for all the cases.I.e regardless of uppercase and lowercase and such
    const topics = await Topic.find({
      title: { $regex: new RegExp(title, "i") },
    }).lean(); //lean to convert to plain js objects
    if (!topics || topics.length === 0) {
      return res.status(404).json({ message: "No topics found" });
    }
    console.log(topics);
    return res.status(200).json(topics);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
