// models/Student.js
import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String },
  grade: { type: String },
});

// Prevent model overwrite in dev
export default mongoose.models.Student || mongoose.model('Student', StudentSchema);
