import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
  fileName: String,
  skills: [String],
  experience: [String],
  email: String,
  phone: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Analysis', analysisSchema);
