import React, { useEffect, useState } from "react";
import { Paper, Typography, Box, Button } from "@mui/material";
import axios from "axios";

function Reports() {
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
        console.error("Error fetching students:", err);
        setLoading(false);
      });
  }, []);

  const exportToCSV = () => {
    if (students.length === 0) return;

    const headers = Object.keys(students[0]);
    const csvRows = [];

    // Add header row
    csvRows.push(headers.join(","));

    // Add data rows
    students.forEach((student) => {
      const values = headers.map((h) => `"${student[h] || ""}"`);
      csvRows.push(values.join(","));
    });

    // Create blob and trigger download
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students_report.csv";
    a.click();
  };

  if (loading) {
    return (
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography>Loading...</Typography>
      </Paper>
    );
  }

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
          Reports
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Total Students: {students.length}
        </Typography>

        <Button
          variant="contained"
          sx={{ backgroundColor: "#1976d2" }}
          onClick={exportToCSV}
        >
          EXPORT AS CSV
        </Button>
      </Paper>
    </Box>
  );
}

export default Reports;
