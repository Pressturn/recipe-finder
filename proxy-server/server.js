// bring in the libraries we need
import express from "express"   // Express lets us make a server quickly
import cors from "cors"         // CORS lets React (on a different port) talk to this server
import dotenv from "dotenv"     // dotenv loads variables from .env file into process.env

// load .env variables (like AIRTABLE_API_KEY) so we can use them in this file
dotenv.config()

// create the server instance
const app = express()

app.use(cors())          // allow requests from other origins (like http://localhost:5173 for Vite)
app.use(express.json())  // automatically parse JSON request bodies into JavaScript objects

// when we visit http://localhost:3001/api/health
// request = what the client sends
// response = what we send back
// response.json({ ok: true }) means: reply with JSON { "ok": true }
app.get("/api/health", function (request, response) {
  response.json({ ok: true })
})

// get Airtable values from environment variables (hidden in .env file)
const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE } = process.env

// build the Airtable API base URL
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE}`

// POST route to create a new favourite
// client will send { id, title, thumbnail }
// we forward that data to Airtable using fetch
app.post("/api/favourites", async function (request, response) {
  // request.body contains the JSON the frontend sent
  const fields = request.body

  // make a POST request to Airtable
  const airtableResponse = await fetch(AIRTABLE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`, // send the secret key
      "Content-Type": "application/json",          // tell Airtable we are sending JSON
    },
    body: JSON.stringify({ fields: fields }),     // wrap fields in {fields: ...}
  })

  // get Airtable’s reply and pass it back to the frontend
  const data = await airtableResponse.json()
  response.json(data)
})

// GET /api/favourites
// Purpose: fetch all saved favourites from Airtable
app.get("/api/favourites", async (request, response) => {
  // call Airtable API with just a GET
  const airtableResponse = await fetch(AIRTABLE_URL, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,  // secret key
    },
  })

  // pass Airtable’s reply straight back to the frontend
  const data = await airtableResponse.json()
  response.json(data)
})

// finally, start the server on port 3001
// app.listen(port, callbackFunction)
app.listen(3001, () => {
  console.log("✅ server running on http://localhost:3001")
})