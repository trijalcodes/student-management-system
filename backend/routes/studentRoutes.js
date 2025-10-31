import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// ✅ Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get single student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Add a new student
router.post("/", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ error: "Error adding student" });
  }
});

// ✅ Update student by ID
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Delete student by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent)
      return res.status(404).json({ error: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/search/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const students = await Student.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { rollNo: { $regex: query, $options: "i" } },
      ],
    });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Export properly
export default router;
