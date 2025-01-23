import PropTypes from "prop-types";
import "./card.styles.css";
import { Bookmark } from "lucide-react";

export default function Card({
  title = "No title",
  description = "No description provided",
}) {
  return (
    <div>
      <div className="card">
        <div className="head">{title}</div>
        <div className="content">{description}</div>
        <div className="line"></div>
        <div className="buttons">
          {/*Bookmark button*/}
          <div className="bookmark">
            <Bookmark size={20} color="#fff" />
          </div>
          <button className="button">View</button>
          <button className="button">Edit</button>
          <button className="button">Delete</button>
        </div>
      </div>
    </div>
  );
}
// Adding prop validation
Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
