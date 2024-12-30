import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Editor from "@/components/editor";

const UserPostPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("public");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = { title, content, visibility };

    try {
      const response = await fetch("http://localhost:3000/api/user/post/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const result = await response.json();
      console.log("result:", result);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Title Creation Page
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
              placeholder="Enter title"
            />
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-lg font-medium text-gray-700"
            >
              Content
            </label>
            <Editor setDescription={setContent} />
          </div>

          {/* Visibility */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Visibility
            </h2>
            <div className="flex items-center space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={visibility === "public"}
                  onChange={() => setVisibility("public")}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2 text-gray-700">Public</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={visibility === "private"}
                  onChange={() => setVisibility("private")}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2 text-gray-700">Private</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserPostPage;
