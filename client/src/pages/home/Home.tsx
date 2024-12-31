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
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  // Fetch posts on component mount
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
    setIsFormVisible(true);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) {
      setEditMode(false);
      setNewTitle("");
      setNewContent("");
      setNewVisibility("public");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Topics</h1>
      {error ? (
        <div className="text-red-500 text-lg">{error}</div>
      ) : (
        <>
          {isFormVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <form
                onSubmit={handleFormSubmit}
                className="bg-white shadow-md rounded-lg p-4 w-full max-w-lg relative"
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
                  placeholder="Content:Write a small context for title,max 20 words"
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
                    onClick={toggleFormVisibility}
                    className="bg-red-500 text-white py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
                >
                  <h2
                    className="text-xl font-semibold mb-2 text-gray-900 relative group"
                    onClick={() => handlePostClick(post._id)}
                  >
                    {post.title}
                    <span className="absolute hidden group-hover:block bg-gray-700 text-white text-sm rounded-lg p-2 top-full mt-2 shadow-lg">
                      {post.content}
                    </span>
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

          <button
            onClick={toggleFormVisibility}
            className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg text-3xl z-50"
          >
            +
          </button>
        </>
      )}
    </div>
  );
};

export default HomePage;
