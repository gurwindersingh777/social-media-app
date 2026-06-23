import "dotenv/config"
import express from "express"
import { connectDB } from "./config/db.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.get('/health', (req, res) => {
  return res.status(200).json({ success: true, message: "OK" })
})

const PORT = process.env.PORT || 3000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server on running on port :", PORT)
  })
})