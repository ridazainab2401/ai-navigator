export default function handler(req, res) {
  res.status(200).json({
    mission: "To drive innovation and excellence in AI research and development",
    vision: "Leading the future of artificial intelligence",
    contact: {
      email: "info@ai-coe.org",
      phone: "+1 (555) 123-4567",
      address: "123 AI Street, Tech City, TC 12345"
    },
    team: [
      {
        name: "Dr. Sarah Johnson",
        role: "Director of AI Research",
        bio: "PhD in Machine Learning with 15+ years of experience"
      },
      {
        name: "Prof. Michael Chen",
        role: "Head of Computer Vision",
        bio: "Leading expert in image recognition and neural networks"
      },
      {
        name: "Dr. Emily Rodriguez",
        role: "NLP Research Lead",
        bio: "Specialist in natural language understanding and generation"
      }
    ]
  });
}
