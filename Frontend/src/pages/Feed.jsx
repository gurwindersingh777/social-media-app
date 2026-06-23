import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Container, AppBar, Toolbar, Typography, Button, Box, CircularProgress } from "@mui/material";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout, user } = useContext(AuthContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
  try {
    // Corrected endpoint to match your updated backend path "/post"
    const res = await axios.get("http://localhost:3000/post"); 
    setPosts(res.data.posts); // Make sure it reads .posts
  } catch (error) {
    console.error("Failed to fetch posts");
  } finally {
    setLoading(false);
  }
};

  // Instantly updates the UI when a new post is created
  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh", pb: 5 }}>
      
      <AppBar position="sticky" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Scocial Media App
          </Typography>
          <Typography variant="body2" sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
             {user?.username}
          </Typography>
          <Button color="inherit" onClick={logout} variant="outlined" size="small">
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 4 }}>
        
        <CreatePost onPostCreated={handleNewPost} />

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : posts.length === 0 ? (
          <Typography align="center" color="text.secondary" sx={{ mt: 5 }}>
            No posts yet. Be the first to share something!
          </Typography>
        ) : (
          posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))
        )}
      </Container>
    </Box>
  );
}