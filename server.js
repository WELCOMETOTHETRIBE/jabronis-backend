const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3000;
const webhookUrl = "http://localhost:3000/send-to-zapier"; // Backend URL for handling form submissions
const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/17370933/2f0r4s9/"; // Replace with your actual Zapier Webhook URL

// Middleware
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON body

// Route to handle form submission
app.post("/send-to-zapier", async (req, res) => {
    try {
        console.log("🔥 Received data from frontend:", req.body);

        // Forward the request to Zapier
        const response = await axios.post(ZAPIER_WEBHOOK_URL, req.body, {
            headers: { "Content-Type": "application/json" }
        });

        console.log("✅ Successfully sent to Zapier:", response.data);
        res.json({ success: true, data: response.data });
    } catch (error) {
        console.error("❌ Error forwarding to Zapier:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start server
app.listen(PORT, () => console.log(`🔥 Server running at ${webhookUrl}`));

