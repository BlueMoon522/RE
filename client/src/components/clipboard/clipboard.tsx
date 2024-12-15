import styles from "./clipboard.module.css";

interface ClipProps {
  text?: string;
}
function copyToClipboard() {
  const code = document.getElementById("code-block")?.innerText;
  if (code) {
    navigator.clipboard.writeText(code).then(
      function () {
        alert("Code copied to clipboard!");
      },
      function (err) {
        alert("Failed to copy code: " + err);
      },
    );
  }
}

export default function Clipboard({
  text = "Couldnot get the token",
}: ClipProps) {
  return (
    <div className={styles.cpyclipboard}>
      <pre>
        <code id="codeblock"> "{text}"</code>
      </pre>
      <button className="copybtn" onClick={copyToClipboard}>
        copy
      </button>
    </div>
  );
}
