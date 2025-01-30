import React, { useState } from "react";

const TitleComponent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            border: "none",
            outline: "none",
            width: "100%",
          }}
        />
      </div>
      <div>
        <textarea
          placeholder="Type something about the title..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: "100%",
            height: "150px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "10px",
            outline: "none",
          }}
        />
      </div>
    </div>
  );
};

export default TitleComponent;
