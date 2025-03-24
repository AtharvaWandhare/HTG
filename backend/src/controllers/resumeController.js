// backend/controllers/resumeController.js
import { HfInference } from '@huggingface/inference';

const hfClient = new HfInference(process.env.HUGGINGFACE_API_KEY);

async function parseResume(buffer) {
  const pdfParse = (await import('pdf-parse')).default;
  const data = await pdfParse(buffer); // Pass buffer directly
  return data.text;
}

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file?.buffer) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ success: false, error: 'Only PDF files are supported' });
    }

    const extractedText = await parseResume(req.file.buffer);

    let resumeInfo = {
      skills: [],
      experience: []
    };

    if (hfClient) {
      const model = 'deepset/roberta-base-squad2';
      const questions = [
        { question: "What skills does the candidate have?", context: extractedText },
        { question: "What is the candidate's work experience?", context: extractedText }
      ];

      for (const { question, context } of questions) {
        const response = await hfClient.questionAnswering({
          model,
          inputs: { question, context }
        });
        if (question.includes('skills')) {
          resumeInfo.skills = response.answer.split(',').map(s => s.trim()).filter(Boolean);
        } else if (question.includes('experience')) {
          resumeInfo.experience = response.answer.split(/[;.]/).map(e => e.trim()).filter(Boolean);
        }
      }
    } else {
      resumeInfo.skills = extractedText.match(/skills:?\s*([\s\S]*?)(?=\n\n|$)/i)?.[1].split(/[,;\n]/).map(s => s.trim()).filter(Boolean) || [];
      resumeInfo.experience = extractedText.match(/experience:?\s*([\s\S]*?)(?=\n\n|$)/i)?.[1].split(/[\n;]/).map(e => e.trim()).filter(Boolean) || [];
    }

    console.log('Resume Info:', resumeInfo);
    res.json({ success: true, data: resumeInfo });
  } catch (error) {
    console.error('Error processing resume:', error);
    res.status(500).json({ success: false, error: 'Unexpected error processing resume' });
  }
};