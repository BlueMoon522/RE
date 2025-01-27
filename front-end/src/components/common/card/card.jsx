import PropTypes from "prop-types";
import "./card.styles.css";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Card({
  title = "No title",
  description = "No description provided",
  id = "",
  handleEdit = "",
  imageUrl = "", // Optional image URL for the card
}) {
  const navigate = useNavigate();
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false);
  const [confirmationTitle, setConfirmationTitle] = useState("");

  const handleBookmark = async () => {
    // ... your existing bookmark logic here ...
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
          // Call parent component function to update posts (if applicable)
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

  return (
    <div className="card">
      {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
      <div className="card-content">
        <div className="head">{title}</div>
        <div className="content">{description}</div>
        <div className="line"></div>
        <div className="buttons">
          <button className="bookmark" onClick={handleBookmark}>
            <Bookmark size={30} color="#fff" />
          </button>
          <button className="button" onClick={() => navigate(`/content/${id}`)}>
            View
          </button>
          <button className="button" onClick={handleEdit}>
            Edit
          </button>
          <button className="button" onClick={handleDeleteClick}>
            Delete
          </button>
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
  imageUrl: PropTypes.string,
};
