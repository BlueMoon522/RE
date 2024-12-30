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
  const [posts, setPosts] = useState<Post[]>([]); // Ensure posts is an array
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const [newVisibility, setNewVisibility] = useState<string>("public");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editPostId, setEditPostId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user/post/", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(Array.isArray(data) ? data : []); // Ensure data is an array
      } catch (err: any) {
        console.error(err.message);
        setError("Failed to load posts.");
      }
    };
    fetchPosts();
  }, []);

  const handlePostClick = (id: string) => {
    navigate(`/content/${id}`);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editMode
      ? `http://localhost:3000/api/user/post/${editPostId}`
      : "http://localhost:3000/api/user/post/";

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

      const postsResponse = await fetch(
        "http://localhost:3000/api/user/post/",
        {
          method: "GET",
          credentials: "include",
        },
      );
      if (!postsResponse.ok) {
        throw new Error("Failed to fetch updated posts");
      }

      const updatedPosts = await postsResponse.json();
      setPosts(Array.isArray(updatedPosts) ? updatedPosts : []); // Ensure updatedPosts is an array
    } catch (err: any) {
      console.error(err.message);
      setError("Failed to save post.");
    }
  };

  const handleEditClick = (post: Post) => {
    setNewTitle(post.title);
    setNewContent(post.content);
    setNewVisibility(post.visibility);
    setEditMode(true);
    setEditPostId(post._id);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Posts</h1>
      {error ? (
        <div className="text-red-500 text-lg">{error}</div>
      ) : (
        <>
          <form
            onSubmit={handleFormSubmit}
            className="bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-lg"
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
              placeholder="Content"
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
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              {editMode ? "Update Post" : "Add Post"}
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
                >
                  <h2
                    className="text-xl font-semibold mb-2 text-gray-900"
                    onClick={() => handlePostClick(post._id)}
                  >
                    {post.title}
                  </h2>
                  <div className="text-gray-600 text-sm">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                  <p className="text-gray-500 mt-2">
                    {post.visibility.charAt(0).toUpperCase() +
                      post.visibility.slice(1)}
                  </p>
                  <button
                    onClick={() => handleEditClick(post)}
                    className="mt-4 text-blue-500"
                  >
                    Edit
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">
                No posts available.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
