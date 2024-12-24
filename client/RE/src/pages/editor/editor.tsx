import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";

const EditorPage = () => {
  const [content, setContent] = useState<string>(""); // Editor content
  const [savedContents, setSavedContents] = useState<
    { _id: string; content: string }[]
  >([]); // Saved data

  // Quill editor configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"], // Include link and image options
      ["clean"],
    ],
  };

  const handleQuillChange = (htmlContent: string) => {
    const processedContent = htmlContent
      // Convert custom <image = <url>> format
      .replace(/<image\s*=\s*([^\s>]+)>/g, (_, url) => `<img src="${url}" />`)
      // Convert plain URLs to <img> tags (skip URLs already inside <img> tags)
      .replace(
        /(?<!<img\s[^>]*src=["'])(\bhttps?:\/\/[^\s<]+)/g,
        (url) => `<img src="${url}" />`,
      );

    console.log(processedContent);
    setContent(processedContent);
  };

  // Save content to the backend
  const handleSave = async () => {
    if (!content.trim()) {
      alert("Editor content is empty. Please add some content before saving.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/editor/save", { content });
      alert("Content saved successfully!");
      fetchSavedContents(); // Refresh the list of saved contents
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to save content. Please try again.");
    }
  };

  // Fetch all saved contents from the backend
  const fetchSavedContents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/editor/get");
      setSavedContents(response.data);
    } catch (error) {
      console.error("Error fetching saved contents:", error);
    }
  };

  // Fetch contents when the component loads
  useEffect(() => {
    fetchSavedContents();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Rich Text Editor with Image Support</h1>
      {/* React Quill Editor */}
      <ReactQuill
        value={content}
        onChange={handleQuillChange}
        modules={modules}
        placeholder="Type here and paste image URLs directly!"
      />
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleSave} style={{ marginRight: "10px" }}>
          Save
        </button>
        <button onClick={fetchSavedContents}>Refresh List</button>
      </div>

      {/* Render Saved Contents */}
      <h2>Saved Contents</h2>
      <ul>
        {savedContents.length > 0 ? (
          savedContents.map((item) => (
            <li
              key={item._id}
              style={{
                marginBottom: "20px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
              }}
            >
              {/* Display content using dangerouslySetInnerHTML */}
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </li>
          ))
        ) : (
          <p>
            No content available yet!!!!!!!!!!!!. Add something to the editor
            and save it!
          </p>
        )}
      </ul>
    </div>
  );
};

export default EditorPage;
