import { UserModel } from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";

// register
export async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" })
    }

    const exists = await UserModel.findOne({ email })

    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists" })
    }

    const user = await UserModel.create({
      username,
      email,
      password,
    })

    const createdUser = await UserModel.findById(user._id)

    return res.status(201).json({ success: true, user: createdUser, message: "User registered successfully" })

  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}

// login
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" })
    }

    let user = await UserModel.findOne({ email }).select("+password")

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" })
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: "Invalid credentials" })
    }

    const token = generateToken(user._id)

    user = user.toObject()
    delete user.password

    return res.status(200).json({
      success: true,
      user,
      token,
      message: "Login successful",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }
}

// current user
export async function currentUser(req, res) {
  return res.status(200).json({
    success: true,
    user: req.user,
  })
}