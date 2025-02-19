// require("dotenv").config();

// const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_ID = "u-s4t2ud-6d8a80ab62fd4abe6a8fb98fde3c1302495e5d0ad5c924c4d24d5eff78494b00";
const REDIRECT_URI = "http://localhost:3000/callback";
const AUTH_URL = "https://api.intra.42.fr/oauth/authorize";

// console.log("CLIENT_ID:", process.env.CLIENT_ID);

document.addEventListener("DOMContentLoaded", function () {
    console.log("test");
    const loginButtons = document.querySelectorAll("#loginButton"); // Select all buttons with the same ID

    if (loginButtons.length === 0) {
        console.error("❌ No login buttons found!");
        return;
    }

    loginButtons.forEach(button => {
        button.addEventListener("click", function () {
            const url = `${AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code`;
            console.log("Redirecting to:", url);
            window.location.href = url; // Redirects user to 42 login
        });
    });
});
