import PropTypes from "prop-types";
import "./card.styles.css";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Card({
  title = "No title",
  description = "No description provided",
  id = "",
  handleEdit = () => { },
  topicUserId = "", // The user ID from the topic JSON
  userId = "",
}) {
  const navigate = useNavigate();

  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false);
  const [confirmationTitle, setConfirmationTitle] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null); // Current logged-in user's ID
  const [isLoadingUserId, setIsLoadingUserId] = useState(true); // To handle loading state for user ID

  // Fetch the current user's ID from the API
  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const response = await fetch("/api/user/info", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setCurrentUserId(data._id); // Assuming the response contains the user's ID as `id`
        } else {
          console.error("Failed to fetch user info:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setIsLoadingUserId(false);
      }
    };

    fetchCurrentUserId();
  }, []);

  const handleBookmark = async () => {
    try {
      const response = await fetch(`/api/user/post/bookmark/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteConfirmationVisible(true);
  };

  const handleDeleteConfirmation = async () => {
    if (confirmationTitle === title) {
      try {
        const response = await fetch(`/api/user/post/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Success:", result);
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsDeleteConfirmationVisible(false);
      }
    } else {
      alert("Confirmation title does not match post title. Deletion canceled.");
      setIsDeleteConfirmationVisible(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteConfirmationVisible(false);
  };

  // Determine if the current user is the creator of the topic
  console.log("currentUserId", currentUserId);
  console.log("topic user Id", userId);
  const isCreator = currentUserId === userId;

  if (isLoadingUserId) {
    return <div>Loading...</div>; // Render a loading state while fetching user ID
  }

  return (
    <div className="card">
      <div className="card-content">
        <div className="head">{title}</div>
        <div className="content">{description}</div>
        <div className="line"></div>
        <div className="buttons">
          <button className="button" onClick={() => navigate(`/content/${id}`)}>
            View
          </button>
          {!isCreator && (
            <>
              <button className="bookmark" onClick={handleBookmark}>
                <Bookmark size={30} color="#fff" />
              </button>
            </>
          )}
          {isCreator && (
            <>
              <button className="button" onClick={handleEdit}>
                Edit
              </button>
              <button className="button" onClick={handleDeleteClick}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {isDeleteConfirmationVisible && (
        <div className="delete-confirmation-modal">
          <div className="modal-content">
            <h3 className="modal-title">
              Are you sure you want to delete this post?
            </h3>
            <p className="modal-text">This action cannot be undone.</p>
            <input
              type="text"
              placeholder="Type the post title to confirm"
              value={confirmationTitle}
              onChange={(e) => setConfirmationTitle(e.target.value)}
              className="confirmation-input"
            />
            <div className="confirmation-buttons">
              <button
                className="delete-button"
                onClick={handleDeleteConfirmation}
              >
                Delete
              </button>
              <button className="cancel-button" onClick={handleDeleteCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  handleEdit: PropTypes.func,
  topicUserId: PropTypes.string.isRequired, // Ensure `topicUserId` is provided
  userId: PropTypes.string,
};
