import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import analyzeResume from "../controllers/resumeController.js";

const router = express.Router();

// Test endpoint
router.get("/test", (req, res) => {
  res.json({ success: true, message: "Resume API is working" });
});

// Debug middleware to properly log file details
const debugFile = (req, res, next) => {
  console.log("Request path:", req.path);
  console.log("Request method:", req.method);
  console.log("File upload status:", req.file ? "Success" : "No file");
  if (req.file) {
    console.log("File details:", {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      path: req.file.path,
      size: req.file.size
    });
  }
  next();
};

// Main endpoint - use upload.single before debugFile
router.post("/analyze", upload.single("resume"), debugFile, analyzeResume);

export default router;
