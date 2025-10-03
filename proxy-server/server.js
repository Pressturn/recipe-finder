// Load .env file (keeps API keys secret)
require("dotenv").config();
// Import Express framework for building server
const express = require("express");
// Import CORS library (allows React app to talk to this server)
const cors = require("cors");

// Create an Express server 
const app = express();
// define the port
const PORT = 3001;

// allows front end to communicate with backend
app.use(cors());
// converts JSON strings to JavaScript objects
app.use(express.json());

// Airtable Base URL and API key
const AIRTABLE_BASE_URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}`;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_TABLE = process.env.AIRTABLE_TABLE;

// get all favourites
app.get("/api/favourites", async (request, res) => {
  try {
    const airtableResponse = await fetch(`${AIRTABLE_BASE_URL}/${AIRTABLE_TABLE}`, {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    });

    // Parse Airtable's response
    const airtableData = await airtableResponse.json();

    // Send data back to frontend
    res.json(airtableData);

  } catch (error) {
    console.error("Error fetching favourites:", error);
    res.status(500).json({ error: error.message });
  }
});

// add a favourite
app.post("/api/favourites", async (request, res) => {
  try {
    // extract destructured data from frontend
    const { mealId, title, thumb } = request.body;

    const airtableResponse = await fetch(`${AIRTABLE_BASE_URL}/${AIRTABLE_TABLE}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json", // tells Airtable the data format
      },

      // wrap data in fields object so airtable can read it
      body: JSON.stringify({
        fields: { mealId, title, thumb },
      }),
    }); ``

    // parse Airtable response
    const airtableData = await airtableResponse.json();

    // Send data back to frontend
    res.json(airtableData);

  } catch (error) {
    console.error("Error creating favourite:", error);
    res.status(500).json({ error: 'Failed to add favourite' });
  }
});

// delete a favourite
app.delete("/api/favourites/:airtableId", async (request, res) => {
  try {

    // Extract record ID from URL path parameter
    const { airtableId } = request.params;

    const airtableResponse = await fetch(`${AIRTABLE_BASE_URL}/${AIRTABLE_TABLE}/${airtableId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    });

    // parse Airtable response
    const airtableData = await airtableResponse.json();

    // Send data back to frontend
    res.json(airtableData);

  } catch (error) {
    console.error("Error deleting favourite:", error);
    res.status(500).json({ error: error.message });
  }
});

// start server
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});