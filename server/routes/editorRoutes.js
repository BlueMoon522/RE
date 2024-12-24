import express from "express";
const router = express.Router();
import mongoose from "mongoose";

// Schema to store the document content
const ContentSchema = new mongoose.Schema({
  content: { type: String, required: true }, // Store the rich-text HTML
});

const Content = mongoose.model("Content", ContentSchema);

// Save content
router.post("/save", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    const newContent = new Content({ content });
    await newContent.save();
    res
      .status(201)
      .json({ message: "Content saved successfully", id: newContent._id });
  } catch (error) {
    res.status(500).json({ error: "Failed to save content" });
  }
});

// Retrieve content by ID
router.get("/get", async (req, res) => {
  console.log("Inside get of editor");
  try {
    const content = await Content.find();
    console.log(content);
    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve content" });
  }
});

export default router;
