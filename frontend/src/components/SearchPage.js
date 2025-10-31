import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const q = e.target.value;
    setQuery(q);

    if (q.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/students/search/${q}`);
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Search Students
      </Typography>
      <TextField
        label="Search by name or roll number"
        fullWidth
        value={query}
        onChange={handleSearch}
        sx={{ mb: 3 }}
      />
      {results.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Roll No</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((s) => (
                <TableRow key={s._id}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.rollNo}</TableCell>
                  <TableCell>{s.class}</TableCell>
                  <TableCell>{s.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No matching students found.</Typography>
      )}
    </Paper>
  );
}

export default SearchPage;
