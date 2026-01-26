import { motion } from 'framer-motion';
import { Users, Mail, MapPin, Linkedin, Twitter, ArrowRight, Building2, GraduationCap } from 'lucide-react';
import { useState } from 'react';

const team = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Director, AI CoE',
    bio: 'Former Google AI researcher with 15+ years in machine learning.',
    image: '👩‍💼',
    linkedin: '#',
  },
  {
    name: 'Prof. James Miller',
    role: 'Chief Scientist',
    bio: 'Stanford PhD, specializing in reinforcement learning and robotics.',
    image: '👨‍🔬',
    linkedin: '#',
  },
  {
    name: 'Dr. Aisha Patel',
    role: 'Head of Research',
    bio: 'Leading our NLP and language model research initiatives.',
    image: '👩‍🔬',
    linkedin: '#',
  },
  {
    name: 'Michael Torres',
    role: 'Engineering Lead',
    bio: 'Building scalable AI infrastructure and deployment pipelines.',
    image: '👨‍💻',
    linkedin: '#',
  },
];

const partners = [
  { name: 'Tech University', type: 'Academic' },
  { name: 'AI Research Institute', type: 'Research' },
  { name: 'Global Tech Corp', type: 'Industry' },
  { name: 'Innovation Labs', type: 'Startup' },
];

export function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', organization: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary tracking-widest">ABOUT US</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Meet the <span className="gradient-text">Innovators</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A world-class team dedicated to pushing the boundaries 
              of artificial intelligence research and application.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-display font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                The AI Center of Excellence was founded with a singular vision: 
                to democratize artificial intelligence and make its benefits 
                accessible to organizations of all sizes.
              </p>
              <p className="text-muted-foreground mb-6">
                We bridge the gap between cutting-edge research and practical 
                implementation, ensuring that AI solutions are not just 
                technically sophisticated but also ethical, transparent, and impactful.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="glass-card px-4 py-2 rounded-lg flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Est. 2019</span>
                </div>
                <div className="glass-card px-4 py-2 rounded-lg flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <span className="text-sm">35+ Researchers</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-8 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              <h3 className="font-display font-bold text-xl mb-4">Core Values</h3>
              <ul className="space-y-3">
                {['Innovation First', 'Ethical AI', 'Open Collaboration', 'Continuous Learning'].map((value, i) => (
                  <li key={value} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-display font-bold mb-8 text-center">Leadership Team</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="glass-card p-6 rounded-xl text-center hover:glow-border transition-all group"
              >
                <div className="text-5xl mb-4">{member.image}</div>
                <h3 className="font-display font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-primary mb-3">{member.role}</p>
                <p className="text-xs text-muted-foreground mb-4">{member.bio}</p>
                <div className="flex justify-center gap-2">
                  <a href={member.linkedin} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                    <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary" />
                  </a>
                  <a href="#" className="p-2 hover:bg-secondary rounded-lg transition-colors">
                    <Twitter className="w-4 h-4 text-muted-foreground hover:text-primary" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-display font-bold mb-8 text-center">Our Partners</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="glass-card px-6 py-4 rounded-xl flex items-center gap-3"
              >
                <Building2 className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">{partner.name}</div>
                  <div className="text-xs text-muted-foreground">{partner.type}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-display font-bold mb-4">Get in Touch</h2>
              <p className="text-muted-foreground">
                Interested in collaboration? Have a question? We'd love to hear from you.
              </p>
            </motion.div>
            
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="glass-card p-8 rounded-2xl space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Organization</label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Company or institution"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  placeholder="Tell us about your interest..."
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-display font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                Send Message
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.form>
            
            {/* Contact Info */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <a href="mailto:contact@aicoe.org" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                contact@aicoe.org
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                San Francisco, CA
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
