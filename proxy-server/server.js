// load my keys from env into the project
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// create an instance of express
const app = express();
// define the port
const PORT = 3001;

// allow frontend (React) to call this server
app.use(cors());
// parse JSON data coming from frontend
app.use(express.json());

// Airtable Base URL and API key
const AIRTABLE_BASE_URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}`;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_TABLE = process.env.AIRTABLE_TABLE;

// ---------------- ROUTES ----------------

// health check (optional)
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// get all favourites
app.get("/api/favourites", async (req, res) => {
  try {
    const response = await fetch(`${AIRTABLE_BASE_URL}/${AIRTABLE_TABLE}`, {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch favourites");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching favourites:", error);
    res.status(500).json({ error: error.message });
  }
});

// add a favourite
app.post("/api/favourites", async (req, res) => {
  try {
    console.log("POST body:", req.body);

    const { mealId, title, thumb } = req.body;

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
    res.status(500).json({ error: error.message });
  }
});

// delete a favourite
app.delete("/api/favourites/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(`${AIRTABLE_BASE_URL}/${AIRTABLE_TABLE}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    });

    if (!response.ok) {
      throw new Error("Failed to delete favourite");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error deleting favourite:", error);
    res.status(500).json({ error: error.message });
  }
});

// update a favourite (optional: only works if Airtable has matching field)
app.patch("/api/favourites/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(`${AIRTABLE_BASE_URL}/${AIRTABLE_TABLE}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: req.body }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error updating favourite:", error);
    res.status(500).json({ error: error.message });
  }
});

// start server
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});