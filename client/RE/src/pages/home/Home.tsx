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
  const navigate = useNavigate();

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
        setPosts(data);
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

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Posts</h1>
      {error ? (
        <div className="text-red-500 text-lg">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
              onClick={() => handlePostClick(post._id)}
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-900">
                {post.title}
              </h2>
              <div className="text-gray-600 text-sm">
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <p className="text-gray-500 mt-2">
                {post.visibility.charAt(0).toUpperCase() +
                  post.visibility.slice(1)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
