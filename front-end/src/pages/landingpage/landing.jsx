import { Link } from "react-router-dom";
import book from "../../assets/images/book.jpg";
import "./landing.modules.css";

export default function Landing() {
  return (
    <div className="wrapper-landing">
      <div className="topbar-landing">
        <p>Unnga-Bunga Notes</p>
        <div>
          <div className="buttons-landing">
            <Link to="/signup">
              <button>Signup</button>
            </Link>
          </div>
          <div className="buttons-landing">
            <Link to="/login">
              <button>login</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="imageAndText">
        <p className="text">Write your Notes in documentation style</p>
        <div className="image">
          <img src={book} alt="image of book" />
        </div>
      </div>
      <div className="info-landing">
        <p>Give some info here.It will be mix of images and text</p>
      </div>
      <footer className="footer-landing">
        <p>Footer will be here</p>
      </footer>
    </div>
  );
}
