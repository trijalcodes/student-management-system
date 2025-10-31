import React, { useEffect, useState } from "react";
import { Paper, Typography, Box, Divider } from "@mui/material";
import axios from "axios";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students")
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography>Loading...</Typography>
      </Paper>
    );
  }

  // --- Total Students ---
  const totalStudents = students.length;

  // --- Group Students by Class ---
  const studentsByClass = students.reduce((acc, student) => {
    acc[student.class] = (acc[student.class] || 0) + 1;
    return acc;
  }, {});

  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "70%",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="h6" sx={{ mb: 1 }}>
          Total Students: <strong>{totalStudents}</strong>
        </Typography>

        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          Students per Class:
        </Typography>

        {Object.entries(studentsByClass).map(([className, count]) => (
          <Typography key={className} sx={{ ml: 2, mb: 0.5 }}>
            {className}: <strong>{count}</strong>
          </Typography>
        ))}
      </Paper>
    </Box>
  );
}

export default Dashboard;
