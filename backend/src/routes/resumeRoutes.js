// backend/routes/resumeRoutes.js
import express from 'express';
import { analyzeResume } from '../controllers/resumeController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/analyze-resume', upload.single('file'), analyzeResume);

export default router;