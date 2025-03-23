import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  fileName: String,
  name: String,
  email: String,
  phone: String,
  skills: [String],
  experience: [String],
  education: [String],
  parsedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Resume', resumeSchema);