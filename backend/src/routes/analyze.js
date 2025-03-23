import express from 'express';
import multer from 'multer';
import fs from 'fs';
import ResumeParser from 'resume-parser';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.js'; // Use the legacy build for compatibility
import Analysis from '../models/Analysis.js'; // Adjust path based on your project structure

pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/legacy/build/pdf.worker.js'; // Correct worker path

const router = express.Router();
const upload = multer();

const extractPDFText = async (buffer) => {
  const doc = await pdfjs.getDocument({ data: buffer }).promise;
  let text = '';
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map(item => item.str).join(' ');
  }
  return text;
};

router.post('/api/analyze', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const tempPath = `./uploads/${Date.now()}_${req.file.originalname}`;
    await fs.promises.writeFile(tempPath, req.file.buffer);

    let parsedData;
    if (req.file.mimetype === 'application/pdf') {
      const pdfText = await extractPDFText(req.file.buffer);
      parsedData = { skills: [], experience: [], email: '', phone: '', text: pdfText }; // Mock parsed data
    } else {
      parsedData = await ResumeParser.parseResume(tempPath);
    }

    await fs.promises.unlink(tempPath);

    // Extract skills with context
    const skills = parsedData.skills.map(skill => skill.name);
    const experience = parsedData.experience
      .sort((a, b) => b.end_year - a.end_year)
      .map(exp => `${exp.title} at ${exp.company}`);

    // Save to database
    const analysis = new Analysis({
      fileName: req.file.originalname,
      skills,
      experience,
      email: parsedData.email,
      phone: parsedData.phone
    });
    await analysis.save();

    res.json({
      fileName: req.file.originalname,
      skills,
      experience,
      matchPercentage: calculateMatchPercentage(skills),
      contact: {
        email: parsedData.email,
        phone: parsedData.phone
      }
    });

  } catch (error) {
    console.error('Parsing error:', error);
    res.status(500).json({ 
      error: 'Error processing resume',
      details: error.message
    });
  }
});

// Helper function
const calculateMatchPercentage = (skills) => {
  const requiredSkills = ['Electrical', 'Plumbing', 'Carpentry', 'HVAC'];
  const matched = skills.filter(skill => 
    requiredSkills.includes(skill)
  ).length;
  return Math.round((matched / requiredSkills.length) * 100);
};

export default router;
