import styles from "./token.module.css";
import ButtonUsage from "../../components/button";
import Clipboard from "../../components/clipboard/clipboard";
export default function Token() {
  return (
    <>
      <div className={styles.container}>
        <p>This is for token gen page</p>
        <ButtonUsage name="Accept" />
        <Clipboard text="Can u copy this?" />
      </div>
    </>
  );
}
