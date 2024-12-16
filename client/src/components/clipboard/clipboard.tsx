import styles from "./clipboard.module.css";

interface ClipProps {
  text?: string;
}

export default function Clipboard({
  text = "Couldnot get the token",
}: ClipProps) {
  return (
    <div className={styles.cpyclipboard}>
      <pre>
        <code id="codeblock"> "{text}"</code>
      </pre>
    </div>
  );
}
