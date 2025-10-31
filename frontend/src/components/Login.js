import React, { useState } from "react";
import { Paper, TextField, Button, Typography, Snackbar } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setToken }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setMessage("Login successful");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error(err);
      setMessage("Invalid username or password");
    }
  };

  return (
    <Paper sx={{ p: 4, mt: 5, maxWidth: 400, mx: "auto", backgroundColor: "#f9f9f9" }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          name="username"
          margin="normal"
          value={form.username}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          margin="normal"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Login</Button>
      </form>
      <Snackbar open={!!message} autoHideDuration={2000} onClose={() => setMessage("")} message={message} />
    </Paper>
  );
}

export default Login;
