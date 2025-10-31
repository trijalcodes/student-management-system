import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = 5000;

// ------------------------
// Middleware
// ------------------------
app.use(cors());
app.use(express.json());

// ------------------------
// MongoDB Connection
// ------------------------
mongoose
  .connect("mongodb://127.0.0.1:27017/studentdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ------------------------
// Create default admin
// ------------------------
const createAdmin = async () => {
  const existing = await User.findOne({ username: "admin" });
  if (!existing) {
    const hashed = await bcrypt.hash("admin123", 10);
    const user = new User({ username: "admin", password: hashed });
    await user.save();
    console.log("👤 Default admin created! Username: admin | Password: admin123");
  } else {
    console.log("ℹ️ Admin user already exists");
  }
};

createAdmin();

// ------------------------
// Routes
// ------------------------
app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);

// ------------------------
// Start Server
// ------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
