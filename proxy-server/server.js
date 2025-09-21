import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(cors())          // let your React app call this server
app.use(express.json())  // read JSON body from requests

// health check so you can see it's alive
app.get("/api/health", (req, res) => {
  res.json({ ok: true })
})

app.listen(3001, () => {
  console.log("Proxy server running at http://localhost:3001")
})