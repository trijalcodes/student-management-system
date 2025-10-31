import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },
  class: { type: String, required: true },
  age: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
