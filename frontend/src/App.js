import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import Login from "./components/Login";
import EditStudent from "./components/EditStudent";
import Dashboard from "./components/Dashboard";
import Reports from "./components/Reports";
import SearchPage from "./components/SearchPage";
import { Container } from "@mui/material";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <Router>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/add" element={<StudentForm />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/edit/:id" element={<EditStudent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
