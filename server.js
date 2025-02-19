require("dotenv").config();

const express = require("express");
const db = require('./database');
const axios = require("axios");
const cors = require("cors");
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = 3000;

// Permet de servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Redirige /dashboard vers le fichier dashboard.html
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/callback";
const TOKEN_URL = "https://api.intra.42.fr/oauth/token";
const USER_INFO_URL = "https://api.intra.42.fr/v2/me";

// Step 1: Exchange Authorization Code for Token
app.get("/callback", async (req, res) => {
    const code = req.query.code;
    if (!code) return res.status(400).send("No code provided");

    try {
        const response = await axios.post(TOKEN_URL, {
            grant_type: "authorization_code",
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
            redirect_uri: REDIRECT_URI
        });

        const accessToken = response.data.access_token;

        console.log("✅ Token received:", accessToken); // Debugging

        // **Set the token in a cookie**
        res.cookie("authToken", accessToken, {
            httpOnly: true,    // Prevent access from JavaScript
            secure: false,      // Change to `true` in production with HTTPS
            sameSite: "Lax"     // Helps prevent CSRF attacks
        });

        // Redirect user to the dashboard (no token in URL)
        res.redirect("/dashboard");
    } catch (error) {
        console.error("❌ Error exchanging code for token:", error);
        res.status(500).send("Error exchanging code for token");
    }
});


// Step 2: Get User Info
app.get("/user", async (req, res) => {
    const token = req.cookies.authToken; // Get token from cookies

    if (!token) {
        return res.status(401).send("No token provided in cookies");
    }

    try {
        const response = await axios.get("https://api.intra.42.fr/v2/me", {
            headers: { Authorization: `Bearer ${token}` }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching user data");
    }
});


// Route pour enregistrer le choix d'un utilisateur
app.post('/api/choose-event', async (req, res) => {
    const { user_id, username, event_name, image_url } = req.body;

    const sql = `INSERT INTO user_events (user_id, username, event_name, image_url) VALUES (?, ?, ?, ?)`;
    db.run(sql, [user_id, username, event_name, image_url], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Event choice saved!", id: this.lastID });
    });
});


// Route pour récupérer la liste des participants d'un événement
app.get('/api/event-attendees/:event_name', (req, res) => {
    const eventName = req.params.event_name;

    db.all(`SELECT username, image_url FROM user_events WHERE event_name = ?`, [eventName], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ attendees: rows });
    });
});


app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

