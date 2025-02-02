import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./login.styles.css";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(""); // Clear previous error messages

    const formData = {
      username,
      password,
    };

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Login successful:", result);
        navigate("/"); // Redirect to home page upon successful login
      } else {
        const errorText = await response.text();
        setError("Login failed: " + errorText); // Show error message from backend
      }
    } catch (err) {
      console.error("An error occurred:", err);
      setError("Failed to login. Please try again later."); // Generic error message
    }
  };

  return (
    <div>
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
        <span className="span">
          <a href="#">Forgot password?</a>
        </span>
        <input className="submit" type="submit" value="Log in" />
        <span className="span">
          Don't have an account? <a href="#">Sign up</a>
        </span>
      </form>
    </div>
  );
}
