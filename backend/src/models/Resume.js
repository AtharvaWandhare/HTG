import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  fileName: String,
  name: String,
  email: String,
  phone: String,
  skills: {
    type: [String],
    default: []
  },
  experience: {
    type: [String],
    default: []
  },
  aiAnalysis: String,
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Resume', ResumeSchema);
