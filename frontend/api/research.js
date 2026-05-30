export default function handler(req, res) {
  res.status(200).json({
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
}
