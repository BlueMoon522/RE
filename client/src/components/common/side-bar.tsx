import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };
  //
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        navigate("/login");
      } else {
        console.error("Signup failed:", await response.text());
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 font-bold text-lg border-b border-gray-700">
        <Link to="/">Notes</Link>
      </div>
      <ul className="flex-grow">
        <li className="p-4 hover:bg-gray-700 cursor-pointer">
          <Link to="/">Home</Link>
        </li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">
          <Link to="/public">Public</Link>
        </li>
        {/*Add to the list*/}
      </ul>
      <div className="p-4 hover:bg-gray-700 cursor-pointer border-t border-gray-700">
        <button
          onClick={() => {
            // Your custom function here
            handleLogout(); // Call your function here
          }}
          className="w-full text-left"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
