import styles from "./token.module.css";
import Clipboard from "../../components/clipboard/clipboard";
import { useState } from "react";
const rand = function () {
  return Math.random().toString(36).substring(2);
};

const token = function () {
  const timestamp = Date.now().toString(36);
  return timestamp + rand() + rand() + timestamp; // to make it longer
};

const random = token(); // Generate the token once when the component loads
export default function Token() {
  const [response, setResponse] = useState<string | null>(null); // To store the response from the API
  const [loading, setLoading] = useState<boolean>(false); // To show loading state
  const [error, setError] = useState<string | null>(null); // To store any error message

  const postAuthToken = async () => {
    setLoading(true);
    setError(null); // Reset previous errors

    try {
      // Make a POST request to the API with the authToken
      const res = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ authToken: random }), // Send the generated token
        credentials: "include", //insure cookies are sent and received
      });

      if (!res.ok) {
        throw new Error("Failed to send auth token");
      }
    } catch (err) {
      setError((err as Error).message); // Catch and display errors
    } finally {
      setLoading(false); // Stop loading when the request finishes
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Token</h1>
        <h3>Please keep this token safe, it is used for authentication.</h3>

        <Clipboard text={random} />

        {/* Button to trigger the API POST request */}
        <button onClick={postAuthToken} disabled={loading}>
          {loading ? "Sending Token..." : "Send Auth Token"}
        </button>

        {/* Show any error message if the request fails */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Show the response data from the API */}
      </div>
      );
    </>
  );
}
