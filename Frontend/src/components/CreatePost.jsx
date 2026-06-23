import { Paper, TextField, Button, Box, Typography, CircularProgress, IconButton } from "@mui/material";
import { PhotoCamera, Close, Description } from "@mui/icons-material";
import { useRef, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function CreatePost({ onPostCreated }) {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const { token } = useContext(AuthContext);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const removeFile = () => {
    setFileName("");
    if (formRef.current) {
      formRef.current.image.value = ""; 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(formRef.current);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/post`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}` 
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create post");
      }

      onPostCreated(data.post);
      formRef.current.reset();
      setFileName("");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 4, maxWidth: 500, mx: "auto", borderRadius: 3, boxShadow: 2 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Create a Post
      </Typography>

      <form ref={formRef} onSubmit={handleSubmit}>
        <TextField
          name="textContent"
          fullWidth
          multiline
          rows={3}
          placeholder="What's on your mind?"
          disabled={loading}
          sx={{ mb: 2 }}
        />

        {fileName && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 2, p: 1.5, bgcolor: "#f5f5f5", borderRadius: 2 }}>
            <Description sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="body2" sx={{ flexGrow: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
              {fileName}
            </Typography>
            <IconButton size="small" onClick={removeFile} disabled={loading} color="error">
              <Close fontSize="small" />
            </IconButton>
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button
            component="label"
            variant="outlined"
            startIcon={<PhotoCamera />}
            disabled={loading}
          >
            Photo
            <input
              type="file"
              name="image"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Post"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}