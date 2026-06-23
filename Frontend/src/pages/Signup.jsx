import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Container, TextField, Button, Typography, Box} from "@mui/material";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()

    try {
      await axios.post("http://localhost:3000/auth/register", {
        username,
        email,
        password,
      })

      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      })

      login(res.data.token, res.data.user)
      navigate("/")
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed")
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
          onSubmit={handleSignup}
          sx={{
            width: "100%",
            maxWidth: 320,
            mx: "auto",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{
              fontWeight: 500,
              mb: 0.5,
            }}
          >
            Create Account
          </Typography>

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Join Social Media App
          </Typography>

          <TextField
            fullWidth
            size="small"
            label="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 1.5 }}
          />

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
            Sign Up
          </Button>

          <Typography
            align="center"
            sx={{
              mt: 2,
              fontSize: "0.85rem",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "#1976d2",
              }}
            >
              Log In
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
