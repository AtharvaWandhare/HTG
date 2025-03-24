console.log('App.js is loaded');
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { app } from './Socket/socket.js';
import fs from 'fs';

// const app = express();

const allowedOrigins = [process.env.CORS_ORIGIN, 'http://localhost:5173'];

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// Enable preflight for all routes
app.options('*', cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from './routes/user.routes.js';
import serviceProviderRouter from './routes/serviceProvider.routes.js';
import jobRoutes from './routes/jobRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/service-providers", serviceProviderRouter);
app.use('/api/v1/users', jobRoutes);
app.use('/api', resumeRoutes); // Mount at /api
// Add a global error handler that's more detailed
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  
  // Clean up any temp files if present
  if (req.file && req.file.path) {
    fs.unlink(req.file.path, () => {});
  }
  
  // Send a more informative error response
  res.status(500).json({
    error: 'Server error',
    message: err.message
  });
});

export default app;