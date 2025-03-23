import ResumeParser from 'resume-parser';
import { promises as fs } from 'fs';
import Resume from '../models/Resume.js';

export const parseResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const tempPath = `./uploads/${Date.now()}_${req.file.originalname}`;
    await fs.writeFile(tempPath, req.file.buffer);

    const parsedData = await ResumeParser.parseResume(tempPath);
    await fs.unlink(tempPath);

    const resume = await Resume.create({
      fileName: req.file.originalname,
      ...parsedData
    });

    res.json({
      success: true,
      data: resume
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Error processing resume'
    });
  }
};