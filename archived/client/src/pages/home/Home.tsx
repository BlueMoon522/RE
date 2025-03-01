import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Post {
  _id: string;
  user: string;
  title: string;
  content: string;
  visibility: string;
  createdAt: string;
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editPostId, setEditPostId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const [newVisibility, setNewVisibility] = useState<string>("public");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/user/post/", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error("An unknown error occurred.");
        }
        setError("Failed to load post.");
      }
    };

    fetchPosts();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editMode ? `/api/user/post/${editPostId}` : "/api/user/post/";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          visibility: newVisibility,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save post");
      }

      setNewTitle("");
      setNewContent("");
      setNewVisibility("public");
      setEditMode(false);
      setEditPostId(null);
      setIsFormVisible(false);

      const postsResponse = await fetch("/api/user/post/", {
        method: "GET",
        credentials: "include",
      });

      if (!postsResponse.ok) {
        throw new Error("Failed to fetch updated posts");
      }

      const updatedPosts = await postsResponse.json();
      setPosts(Array.isArray(updatedPosts) ? updatedPosts : []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred.");
      }
      setError("Failed to save post.");
    }
  };

  const handleEditClick = (post: Post) => {
    setNewTitle(post.title);
    setNewContent(post.content);
    setNewVisibility(post.visibility);
    setEditMode(true);
    setEditPostId(post._id);
    setIsFormVisible(true);
  };

  const handleNewPostClick = () => {
    setNewTitle("");
    setNewContent("");
    setNewVisibility("public");
    setEditMode(false);
    setEditPostId(null);
    setIsFormVisible(true);
  };

  return (
    <div className="h-screen bg-gray-50 font-sans relative">
      {/* Header */}
      <div className="w-full p-6 flex justify-between items-center border-b border-gray-300">
        <div>
          <h1 className="text-4xl font-serif text-gray-800">UngaBunga-Notes</h1>
        </div>

        <button
          onClick={handleNewPostClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow-md"
        >
          New
        </button>
      </div>

      {/* Content */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {error ? (
          <div className="text-red-500 text-lg col-span-full">{error}</div>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow rounded-lg p-6 relative"
            >
              {/* Post Content */}
              <div>
                <h3 className="text-gray-800 font-medium text-lg mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {post.content}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => navigate(`/content/${post._id}`)}
                  className="text-blue-500 text-sm hover:underline"
                >
                  View
                </button>
                <button
                  onClick={() => handleEditClick(post)}
                  className="text-blue-500 text-sm hover:underline"
                >
                  Edit
                </button>
                <button className="text-blue-500 text-sm hover:underline">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No posts available.
          </p>
        )}
      </div>

      {/*This is what is show or not shown while editing and creating a new post*/}
      {/* Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleFormSubmit}
            className="bg-white shadow-md rounded-lg p-6 w-full max-w-md relative"
          >
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Post" : "Add New Post"}
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <textarea
              placeholder="Content: Write a small context for title, max 20 words"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              rows={4}
              required
            />
            <select
              value={newVisibility}
              onChange={(e) => setNewVisibility(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                {editMode ? "Update Post" : "Add Post"}
              </button>
              <button
                type="button"
                onClick={() => setIsFormVisible(false)}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default HomePage;
