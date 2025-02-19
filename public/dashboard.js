// Get token from URL if present
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

document.addEventListener("DOMContentLoaded", function () {
    fetchUserData();
});

function fetchUserData() {
    console.log("📢 Running fetchUserData()...");
    fetch("http://localhost:3000/user", {
        method: "GET",
        credentials: "include" // Ensures cookies are sent
    })
    .then(response => {
        if (!response.ok) throw new Error("Session expired or unauthorized");
        return response.json();
    })
    .then(data => {
        console.log("✅ User data received:", data); // Debugging
        document.getElementById("username").textContent = data.login;
        document.getElementById("profile-pic").src = data.image.link;
    })
    .catch(error => {
        console.error("❌ Error fetching user data:", error);
        alert("Session expired. Redirecting to login...");
        window.location.href = "/";
    });
}

// Run function after the page loads
document.addEventListener("DOMContentLoaded", fetchUserData);

// Logout button
document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/";
});

async function loadAttendees(eventName) {
    try {
        const response = await fetch(`/api/event-attendees/${eventName}`);
        if (!response.ok) throw new Error("Error fetching attendees");

        const data = await response.json();
        console.log("👥 Attendees:", data);

        const attendeesList = document.getElementById("attendeesList");
        attendeesList.innerHTML = ""; // Clear previous list

        data.attendees.forEach(attendee => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <img src="${attendee.image_url}" alt="${attendee.username}" width="40" height="40">
                <span>${attendee.username}</span>
            `;
            attendeesList.appendChild(listItem);
        });
    } catch (err) {
        console.error("❌ Error loading attendees:", err);
    }
}

// Load attendees when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const eventName = document.getElementById("join-event-btn").dataset.event;
    loadAttendees(eventName);
});
