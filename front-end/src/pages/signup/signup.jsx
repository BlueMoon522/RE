import "./signup.styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== reenterPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Reset error
    setError("");

    // Prepare data
    const formData = {
      username,
      password,
    };

    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        navigate("/");
        console.log("Signup successful:", result);
      } else {
        console.error("Signup failed:", await response.text());
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <span className="input-span">
          <label htmlFor="username" className="label">
            UserName
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </span>
        <span className="input-span">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </span>
        <span className="input-span">
          <label htmlFor="password" className="label">
            Re-Enter Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={reenterPassword}
            onChange={(e) => setReenterPassword(e.target.value)}
          />
        </span>
        <span className="span">
          <a href="#">Forgot password?</a>
        </span>
        <input className="submit" type="submit" value="Signup" />
        {/*There should be some error handling here*/}
        <span className="span">
          Have an account? <a href="/login"> Login</a>
        </span>
      </form>
    </div>
  );
}
