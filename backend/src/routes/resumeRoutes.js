import express from 'express';
import multer from 'multer';
import { parseResume } from '../controllers/resumeController.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/parse', upload.single('resume'), parseResume);

export default router;