import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "AI CoE Backend is running" });
});

// API endpoint for research data
app.get("/api/research", (req, res) => {
  res.json({
    projects: [
      {
        id: 1,
        title: "Computer Vision for Healthcare",
        description: "Advanced image recognition for medical diagnosis",
        status: "In Progress",
      },
      {
        id: 2,
        title: "Natural Language Processing",
        description: "AI-powered text analysis and generation",
        status: "Completed",
      },
      {
        id: 3,
        title: "Predictive Analytics",
        description: "Machine learning models for business forecasting",
        status: "Planning",
      },
    ],
  });
});

// API endpoint for projects data
app.get("/api/projects", (req, res) => {
  res.json({
    projects: [
      {
        id: 1,
        name: "AI Chatbot Platform",
        description: "Enterprise chatbot solution using GPT technology",
        technology: ["Python", "TensorFlow", "React"],
        year: 2025,
      },
      {
        id: 2,
        name: "Gesture Recognition System",
        description: "Camera-based hand gesture detection and control",
        technology: ["JavaScript", "MediaPipe", "React"],
        year: 2026,
      },
      {
        id: 3,
        name: "AI Analytics Dashboard",
        description: "Real-time data visualization and insights",
        technology: ["Python", "FastAPI", "Vue.js"],
        year: 2025,
      },
    ],
  });
});

// API endpoint for contact/about info
app.get("/api/about", (req, res) => {
  res.json({
    mission:
      "To drive innovation and excellence in AI research and development",
    vision: "Leading the future of artificial intelligence",
    contact: {
      email: "info@ai-coe.org",
      phone: "+1 (555) 123-4567",
      address: "123 AI Street, Tech City, TC 12345",
    },
    team: [
      {
        name: "Dr. Sarah Johnson",
        role: "Director of AI Research",
        bio: "PhD in Machine Learning with 15+ years of experience",
      },
      {
        name: "Prof. Michael Chen",
        role: "Head of Computer Vision",
        bio: "Leading expert in image recognition and neural networks",
      },
      {
        name: "Dr. Emily Rodriguez",
        role: "NLP Research Lead",
        bio: "Specialist in natural language understanding and generation",
      },
    ],
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});
