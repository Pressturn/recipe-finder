// Load .env file (keeps API keys secret)
require("dotenv").config();
// Import Express library (tool for building web servers)
const express = require("express");
// Import CORS library (allows React app to talk to this server)
const cors = require("cors");

// Create an Express server instance 
const app = express();
// define the port
const PORT = 3001;

// allow frontend (React) to call this server
app.use(cors());
// converts JSON strings objects
app.use(express.json());

// Airtable Base URL and API key
const AIRTABLE_BASE_URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}`;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_TABLE = process.env.AIRTABLE_TABLE;

// get all favourites
app.get("/api/favourites", async (request, res) => {
  try {
    const response = await fetch(`${AIRTABLE_BASE_URL}/${AIRTABLE_TABLE}`, {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    });

    // Parse Airtable's response
    const data = await response.json();

    // Send data back to React (auto sends 200 status)
    res.json(data);

  } catch (error) {
    console.error("Error fetching favourites:", error);
    res.status(500).json({ error: error.message });
  }
});

// add a favourite
app.post("/api/favourites", async (request, res) => {
  try {
    const { mealId, title, thumb } = request.body; // sends this to airtable

    const response = await fetch(`${AIRTABLE_BASE_URL}/${AIRTABLE_TABLE}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: { mealId, title, thumb },
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error creating favourite:", error);
    res.status(500).json({ error: 'Failed to add favourite' });
  }
});

// delete a favourite
app.delete("/api/favourites/:id", async (request, res) => {
  try {
    
    // Extract record ID from URL parameter
    const { airtableId } = request.params;

    const response = await fetch(`${AIRTABLE_BASE_URL}/${AIRTABLE_TABLE}/${airtableId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error deleting favourite:", error);
    res.status(500).json({ error: error.message });
  }
});

// start server
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});