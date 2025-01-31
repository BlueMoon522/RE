export default async function getUID() {
  while (true) {
    try {
      const response = await fetch("/api/user/info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data._id) {
          return data._id; // Ensure UID is always valid
        }
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Retry after 500ms
  }
}
