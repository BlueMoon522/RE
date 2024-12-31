import { useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-resize-image";

// Register the image resize module for Quill
Quill.register("modules/imageResize", ImageResize);

const EditorPage = () => {
  const [content, setContent] = useState<string>(""); // Editor content
  const [savedContents, setSavedContents] = useState<
    { _id: string; content: string }[]
  >([]); // Saved data

  // Quill editor configuration with the image resize module
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"], // Include link and image options
      ["clean"],
    ],
    imageResize: {}, // Enable image resizing
  };

  // Handle changes in the Quill editor
  const handleQuillChange = (htmlContent: string) => {
    const processedContent = htmlContent
      // Convert custom <image = <url>> format
      .replace(/<image\s*=\s*([^\s>]+)>/g, (_, url) => `<img src="${url}" />`)
      // Convert plain URLs to <img> tags, skipping already wrapped ones
      .replace(
        /(?<!<img\s[^>]*src=["'])(\bhttps?:\/\/[^\s<]+)/g,
        (url) => `<img src="${url}" />`,
      );

    setContent(processedContent); // Update state with processed content
  };

  // Save editor content to the backend
  const handleSave = async () => {
    if (!content.trim()) {
      alert("Editor content is empty. Please add some content before saving.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/editor/save", { content });
      alert("Content saved successfully!");
      fetchSavedContents(); // Refresh saved contents
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to save content. Please try again.");
    }
  };

  // Fetch saved contents from the backend
  const fetchSavedContents = async () => {
    try {
      const response = await axios.get("/api/editor/get");
      setSavedContents(response.data);
    } catch (error) {
      console.error("Error fetching saved contents:", error);
    }
  };

  // Fetch saved contents on component load
  useEffect(() => {
    fetchSavedContents();
  }, []);

  return (
    <div className="p-5">
      {/* Header */}
      <h1 className="text-xl font-bold mb-4">
        Rich Text Editor with Image Support
      </h1>

      {/* React Quill Editor */}
      <ReactQuill
        value={content}
        onChange={handleQuillChange}
        modules={modules}
        placeholder="Type here and paste image URLs directly!"
        style={{
          minHeight: "200px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />

      {/* Action Buttons */}
      <div className="mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Save
        </button>
        <button
          onClick={fetchSavedContents}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Refresh List
        </button>
      </div>

      {/* Saved Contents Section */}
      <h2 className="text-lg font-semibold mt-6">Saved Contents</h2>
      <ul>
        {savedContents.length > 0 ? (
          savedContents.map((item) => (
            <li key={item._id} className="mb-5 pb-4 border-b border-gray-300">
              {/* Render saved content with default 300x300 image size */}
              <div
                dangerouslySetInnerHTML={{
                  __html: item.content.replace(
                    /<img /g,
                    '<img style="width: 300px; height: 300px;" ',
                  ),
                }}
                className="prose" // Tailwind prose for better typography (optional)
              />
            </li>
          ))
        ) : (
          <p>
            No content available yet. Add something to the editor and save it!
          </p>
        )}
      </ul>
    </div>
  );
};

export default EditorPage;
