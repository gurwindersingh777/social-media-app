import { PostModel } from "../models/post.model.js";

// create a new post
export async function createPost(req, res) {
  try {
    const { textContent, imageUrl } = req.body

    if (!textContent && !imageUrl) {
      return res.status(400).json({ success: false, message: "Post must contain text or an image" })
    }

    const newPost = await PostModel.create({
      author: req.user.username,
      textContent,
      imageUrl
    })

    return res.status(201).json({ success: true, post: newPost, message: "Post created successfully" })

  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}

// get all posts
export async function getPosts(req, res) {
  try {

    const posts = await PostModel.find().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, posts })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}

// toggle like
export async function toggleLike(req, res) {
  try {
    const { id } = req.params
    const username = req.user.username

    const post = await PostModel.findById(id)

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const hasLiked = post.likes.includes(username)

    if (hasLiked) {
      post.likes = post.likes.filter((user) => user !== username)
    } else {
      post.likes.push(username)
    }

    await post.save();

    return res.status(200).json({ success: true, post, message: hasLiked ? "Post unliked" : "Post liked" })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" })
  }
}

// add comment
export async function addComment(req, res) {
  try {
    const { id } = req.params
    const { text } = req.body
    const username = req.user.username

    if (!text) {
      return res.status(400).json({ success: false, message: "Comment text required" })
    }

    const post = await PostModel.findById(id)
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" })
    }

    const newComment = { username, text }
    post.comments.push(newComment)

    await post.save()

    return res.status(200).json({ success: true, post, message: "Comment added" })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" })
  }
}