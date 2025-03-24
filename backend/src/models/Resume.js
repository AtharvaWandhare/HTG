// backend/models/Resume.js
import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  fileName: String,
  skills: [String],
  experience: [String]
});

export default mongoose.model('Resume', resumeSchema);