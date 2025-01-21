import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 font-bold text-lg border-b border-gray-700">
        <Link to="/">{data.username || "Guest"}</Link>
      </div>
      <ul className="flex-grow">
        <li className="p-4 hover:bg-gray-700 cursor-pointer">
          <Link to="/">Home</Link>
        </li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">
          <Link to="/public">Public</Link>
        </li>
      </ul>
      <div className="p-4 hover:bg-gray-700 cursor-pointer border-t border-gray-700">
        <button onClick={handleLogout} className="w-full text-left">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
