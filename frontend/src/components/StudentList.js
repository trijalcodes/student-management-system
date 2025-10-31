import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import axios from "axios";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students") // Public fetch
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Delete Student
  const handleDelete = (id) => {
    if (!token) {
      alert("Please login to delete a student.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this student?")) {
      axios
        .delete(`http://localhost:5000/api/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setStudents(students.filter((s) => s._id !== id));
          alert("Student deleted successfully!");
        })
        .catch((err) => console.error(err));
    }
  };

  // Open update dialog
  const handleUpdate = (student) => {
    setCurrentStudent({ ...student });
    setOpen(true);
  };

  // Handle form change
  const handleChange = (e) => {
    setCurrentStudent({ ...currentStudent, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleSubmitUpdate = () => {
    if (!token) {
      alert("Please login to update student details.");
      return;
    }

    axios
      .put(`http://localhost:5000/api/students/${currentStudent._id}`, currentStudent, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setStudents(
          students.map((s) => (s._id === currentStudent._id ? res.data : s))
        );
        setOpen(false);
        alert("Student updated successfully!");
      })
      .catch((err) => console.error(err));
  };

  if (loading) {
    return (
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography>Loading...</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Student List
      </Typography>

      {students.length === 0 ? (
        <Typography>No students found.</Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Roll Number</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Age</TableCell>
                {token && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>

            <TableBody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.age}</TableCell>
                  {token && (
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        sx={{ mr: 1 }}
                        onClick={() => handleUpdate(student)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleDelete(student._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Update Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update Student</DialogTitle>
        <DialogContent>
          {currentStudent && (
            <>
              <TextField
                margin="dense"
                label="Name"
                name="name"
                value={currentStudent.name}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Roll Number"
                name="rollNo"
                value={currentStudent.rollNo}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Class"
                name="class"
                value={currentStudent.class}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Age"
                name="age"
                type="number"
                value={currentStudent.age}
                onChange={handleChange}
                fullWidth
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmitUpdate} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default StudentList;
