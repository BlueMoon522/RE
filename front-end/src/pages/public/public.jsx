import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/common/card/card";

const PublicPage = () => {
  const [posts, setPosts] = useState([]); // Ensure posts is an array
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/user/post/public", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();

        setPosts(Array.isArray(data) ? data : []); // Ensure data is an array
      } catch (err) {
        console.error(err.message);
        setError("Failed to load posts.");
      }
    };
    fetchPosts();
  }, []);

  const handlePostClick = (id) => {
    navigate(`/content/${id}`);
  };

  console.log(posts);
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Public Topics</h1>
      {error ? (
        <div className="text-red-500 text-lg">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-6">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <Card
                  key={index}
                  title={post.title}
                  description={post.content}
                  id={post._id}
                  handleEdit={() => handleEditClick(post)}
                  userId={post.user}
                />
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

export default PublicPage;
