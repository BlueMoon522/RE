import { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-resize-image";

// Register the image resize module for Quill
Quill.register("modules/imageResize", ImageResize);

const Editor = () => {
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
      ["link"], // Include link and image options(add "image",to Include options to add an image from the pc)
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

  // Fetch saved contents on component load

  return (
    <div className="p-5">
      {/* Header */}
      <h1 className="text-xl font-bold mb-4">Description</h1>

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

      {/* Saved Contents Section */}
    </div>
  );
};

export default Editor;