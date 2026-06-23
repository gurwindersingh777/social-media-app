import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post("http://localhost:3000/auth/login", {email,password})
      login(res.data.token, res.data.user)
      navigate("/")
    } catch (error) {
      alert(error.response?.data?.message || "Login failed")
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#fff",
      }}
    >
      <Container maxWidth="xs">
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            width: "100%",
            maxWidth: 320,
            mx: "auto",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{fontWeight: 500,mb: 0.5,}}
          >
            Social Media App
          </Typography>

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Login to your account
          </Typography>

          <TextField
            fullWidth
            size="small"
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 1.5 }}
          />

          <TextField
            fullWidth
            size="small"
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="small"
            sx={{
              py: 1,
              textTransform: "none",
              borderRadius: 1,
            }}
          >
            Log In
          </Button>

          <Typography
            align="center"
            sx={{
              mt: 2,
              fontSize: "0.85rem",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              color="blue"
              style={{
                color: "#1976d2",
                textDecoration: "none",
              }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
