import book from "../../assets/images/book.jpg";

export default function Landing() {
  return (
    <div className="wrapper-landing">
      <p>This is a landing page</p>
      <div className="topbar-landing">
        <p>Topbar</p>
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
