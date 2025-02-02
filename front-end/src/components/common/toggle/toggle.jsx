import "./toggle.styles.css";

export default function Toggle() {
  return (
    <>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </>
  );
}
