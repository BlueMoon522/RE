import { useEffect, useState } from "react";
import Card from "../../components/common/card/card.jsx";
import "./home.styles.css";
import getUID from "../../hooks/getuserId.jsx";
import logo from "../../assets/logo/UNGA_BUNGA.svg";
import book from "../../assets/images/book.jpg";

const HomePage = () => {
  // (State management code remains the same)
  const [UID, setUID] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newVisibility, setNewVisibility] = useState("public");
  const [isLoading, setIsLoading] = useState(true);

  //getting the UID
  useEffect(() => {
    (async () => {
      const userId = await getUID();
      setUID(userId);
      setIsLoading(false);
    })();
  }, []);
  console.log("uid is here", UID);

  useEffect(() => {
    if (UID) {
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
        } catch (err) {
          console.error(err.message || "An unknown error occurred.");
          setError("Failed to load post.");
        }
      };

      fetchPosts();
    }
  }, [UID]);
  console.log("posts are here:", posts);

  const handleFormSubmit = async (e) => {
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
    } catch (err) {
      console.error(err.message || "An unknown error occurred.");
      setError("Failed to save post.");
    }
  };

  const handleEditClick = (post) => {
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
    <div className="wrapper">
      <div className="imageAndText">
        <p className="text">Write your Notes in documentation style</p>
        <div className="image">
          <img src={book} alt="image of book" />
        </div>
      </div>
      {/*Using cards*/}
      <button onClick={handleNewPostClick} className="new-button">
        New
      </button>
      <div className="card-container">
        {error ? (
          <div className="error">{error}</div>
        ) : posts.length > 0 ? (
          posts.map((post) =>
            post ? (
              <Card
                key={post._id || post.title}
                title={post.title || "Untitled"}
                description={post.content || "No content available"}
                id={post._id}
                handleEdit={() => handleEditClick(post)}
                userId={post.user}
              />
            ) : null,
          )
        ) : (
          <p className="no-posts">No posts available.</p>
        )}
      </div>

      {/* Modal */}
      {isFormVisible && (
        <div className="modal">
          <form onSubmit={handleFormSubmit} className="modal-form">
            <h2>{editMode ? "Edit Post" : "Add New Post"}</h2>
            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Content: Write a small context for title, max 20 words"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={4}
              required
            />
            <select
              value={newVisibility}
              onChange={(e) => setNewVisibility(e.target.value)}
              required
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            <div className="buttons">
              <button type="submit" className="save">
                {editMode ? "Update Post" : "Add Post"}
              </button>
              <button
                type="button"
                onClick={() => setIsFormVisible(false)}
                className="cancel"
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
