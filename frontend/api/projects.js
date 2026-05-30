export default function handler(req, res) {
  res.status(200).json({
    projects: [
      {
        id: 1,
        name: "AI Chatbot Platform",
        description: "Enterprise chatbot solution using GPT technology",
        technology: ["Python", "TensorFlow", "React"],
        year: 2025
      },
      {
        id: 2,
        name: "Gesture Recognition System",
        description: "Camera-based hand gesture detection and control",
        technology: ["JavaScript", "MediaPipe", "React"],
        year: 2026
      },
      {
        id: 3,
        name: "AI Analytics Dashboard",
        description: "Real-time data visualization and insights",
        technology: ["Python", "FastAPI", "Vue.js"],
        year: 2025
      }
    ]
  });
}
