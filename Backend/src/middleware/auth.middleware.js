import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

export async function authenticate(req, res, next) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "") || req.cookies?.token

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await UserModel.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid token" })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized" })
  }
}