import {
  Box,
  Avatar,
  Typography,
  IconButton,
  TextField,
  CardMedia,
  Divider,
} from "@mui/material";

import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ChatBubbleOutlineOutlined,
  SendOutlined,
} from "@mui/icons-material";

import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function PostCard({ post }) {
  const { user, token } = useContext(AuthContext);

  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");

  const hasLiked = likes.includes(user?.username);

  const handleLike = async () => {
    setLikes(
      hasLiked
        ? likes.filter((u) => u !== user.username)
        : [...likes, user.username]
    );

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/post/${post._id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Like error");
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    const newComment = {
      username: user.username,
      text: commentText,
    };

    setComments([...comments, newComment]);
    setCommentText("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/post/${post._id}/comment`,
        { text: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Comment error");
    }
  };

  return (
    <Box
      sx={{
        mb: 3,
        bgcolor: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 2,
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
          }}
        >
          {post.author?.charAt(0).toUpperCase()}
        </Avatar>

        <Box>
          <Typography
            variant="body2"
            fontWeight={600}
          >
            @{post.author}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            {new Date(post.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>

      {/* Text */}
      {post.textContent && (
        <Typography
          sx={{
            px: 2,
            pb: 2,
            fontSize: "0.95rem",
            lineHeight: 1.7,
          }}
        >
          {post.textContent}
        </Typography>
      )}

      {/* Image */}
      {post.imageUrl && (
        <CardMedia
          component="img"
          image={post.imageUrl}
          alt="Post"
          sx={{
            width: "100%",
            maxHeight: 550,
            objectFit: "cover",
          }}
        />
      )}

      {/* Actions */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          px: 2,
          py: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            size="small"
            onClick={handleLike}
          >
            {hasLiked ? (
              <FavoriteOutlined />
            ) : (
              <FavoriteBorderOutlined />
            )}
          </IconButton>

          <Typography variant="body2">
            {likes.length}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <ChatBubbleOutlineOutlined fontSize="small" />

          <Typography variant="body2">
            {comments.length}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Comments */}
      {comments.length > 0 && (
        <Box
          sx={{
            px: 2,
            py: 1.5,
          }}
        >
          {comments.slice(-3).map((comment, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                mb: 1,
              }}
            >
              <strong>{comment.username}</strong>{" "}
              {comment.text}
            </Typography>
          ))}
        </Box>
      )}

      <Divider />

      {/* Comment Form */}
      <Box
        component="form"
        onSubmit={handleComment}
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 1,
        }}
      >
        <TextField
          fullWidth
          variant="standard"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          InputProps={{
            disableUnderline: true,
          }}
        />

        <IconButton type="submit">
          <SendOutlined />
        </IconButton>
      </Box>
    </Box>
  );
}