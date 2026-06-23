import "dotenv/config"
import express from "express"
import { connectDB } from "./config/db.js"
import cors from "cors"
import authRouter from "./routes/auth.route.js"
import postRouter from "./routes/post.route.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true
}))

app.get('/health', (req, res) => {
  return res.status(200).json({ success: true, message: "OK" })
})

app.use("/auth", authRouter)
app.use("/post", postRouter)

const PORT = process.env.PORT || 3000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server on running on port :", PORT)
  })
})