import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Paper, Typography, TextField, Button } from "@mui/material";
import axios from "axios";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    class: "",
    age: "",
  });

  useEffect(() => {
    if (!token) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:5000/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => console.error(err));
  }, [id, token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/students/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Student updated successfully!");
        navigate("/students");
      })
      .catch((err) => console.error(err));
  };

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Edit Student
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Roll Number"
          name="rollNo"
          value={formData.rollNo}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Class"
          name="class"
          value={formData.class}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Update Student
        </Button>
      </form>
    </Paper>
  );
}

export default EditStudent;
