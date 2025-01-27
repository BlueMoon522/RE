import PropTypes from "prop-types";
import "./card.styles.css";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Card({
  title = "No title",
  description = "No description provided",
  id = "",
  handleEdit = "",
}) {
  const navigate = useNavigate();
  //to bookmark
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

  const handleDelete = async () => {
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
    }
  };
  return (
    <div>
      <div className="card">
        <div className="head">{title}</div>
        <div className="content">{description}</div>
        <div className="line"></div>
        <div className="buttons">
          {/*Bookmark button*/}
          {/*
          <div className="bookmark">
            <Bookmark size={20} color="#fff" />
          </div>          <div className="bookmark">
            <Bookmark size={20} color="#fff" />
          </div>
          */}
          <button className="bookmark" onClick={handleBookmark}>
            <Bookmark size={30} color="#fff" />
          </button>

          <button className="button" onClick={() => navigate(`/content/${id}`)}>
            View
          </button>
          <button className="button" onClick={handleEdit}>
            Edit
          </button>
          <button className="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
// Adding prop validation
Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  handleEdit: PropTypes.func,
};
