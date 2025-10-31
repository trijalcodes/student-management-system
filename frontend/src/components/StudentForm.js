import React, { useState } from "react";
import { TextField, Button, Paper, Snackbar, Typography, Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentForm() {
  const [form, setForm] = useState({ name: "", rollNo: "", class: "", age: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // Check login

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage("You must be logged in to add a student");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/students", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Student added successfully");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error(err);
      setMessage("Error adding student");
    }
  };

  return (
    <Paper sx={{ p: 4, mt: 3, maxWidth: 500, mx: "auto", backgroundColor: "#f9f9f9" }}>
      <Typography variant="h5" gutterBottom>Add New Student</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {["name", "rollNo", "class", "age"].map((field) => (
            <Grid item xs={12} key={field}>
              <TextField
                fullWidth
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                type={field === "age" ? "number" : "text"}
                value={form[field]}
                onChange={handleChange}
                required
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Student
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={!!message} autoHideDuration={2000} onClose={() => setMessage("")} message={message} />
    </Paper>
  );
}

export default StudentForm;
