import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./sidebar.styles.css"; // Import the CSS file

const Sidebar = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials
      });

      if (response.ok) {
        navigate("/login");
      } else {
        console.error("Logout failed:", await response.text());
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user/info", {
          method: "GET",
          credentials: "include", // Include credentials to send cookies/session data
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json(); // Parse JSON response

        setData(result); // Store the response in state
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Link to="/">{data.username || "Guest"}</Link>
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/">Home</Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/public">Public</Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/bookmarks">Bookmarks</Link>
        </li>
      </ul>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="sidebar-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
