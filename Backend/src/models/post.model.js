import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    textContent: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    likes: [
      { type: String }
    ],
    comments: [
      {
        username: { type: String, required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
)

export const PostModel = mongoose.model("Post", postSchema)