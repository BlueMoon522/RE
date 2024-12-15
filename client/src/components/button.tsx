import Button from "@mui/material/Button";

//defining type for the props
interface ButtonProps {
  name?: string; //optional,will default to button,if not passed
}

export default function ButtonUsage({ name = "Button" }: ButtonProps) {
  console.log("In function");
  const handlePostRequest = async () => {
    try {
      console.log("inside try");
      const response = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Sending data as JSON
        },
        body: JSON.stringify({ authToken: name }), // Send the 'name'prop as "authtoken"  in the request body
      });
      const data = await response.json();
      console.log("reached here");
      console.log(data);
      if (response.ok) {
        console.log("ok response");
        console.log("Response from server:", data);
        alert("Data posted successfully!");
      } else {
        console.log("not ok response");
        throw new Error("Failed to post data");
      }
    } catch (error) {
      console.error("Error posting data:", error);
      alert("Error: " + error.message);
    }
  };
  return (
    <Button variant="contained" onClick={handlePostRequest}>
      {name}
    </Button>
  );
}
