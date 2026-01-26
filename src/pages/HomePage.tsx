import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Cpu, Network, Sparkles, Zap, Shield, Globe } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Machine Learning',
    description: 'Advanced ML models for predictive analytics and automation',
  },
  {
    icon: Network,
    title: 'Neural Networks',
    description: 'Deep learning architectures for complex pattern recognition',
  },
  {
    icon: Cpu,
    title: 'Edge Computing',
    description: 'AI deployment on edge devices for real-time processing',
  },
  {
    icon: Shield,
    title: 'AI Ethics',
    description: 'Responsible AI development with transparency and fairness',
  },
];

const stats = [
  { value: '50+', label: 'Research Papers' },
  { value: '120+', label: 'AI Projects' },
  { value: '35', label: 'Expert Researchers' },
  { value: '15', label: 'Industry Partners' },
];

export function HomePage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute inset-0 neural-dots" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary tracking-widest">INNOVATION HUB</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                <span className="text-foreground">AI Center of</span>
                <br />
                <span className="gradient-text glow-text">Excellence</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                Pioneering the future of artificial intelligence through cutting-edge research, 
                innovative projects, and collaborative excellence. Navigate this site using 
                <span className="text-primary font-medium"> hand gestures</span> detected via your camera.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/research"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-display font-medium hover:bg-primary/90 transition-all hover:gap-4"
                >
                  Explore Research
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-primary/50 text-primary rounded-lg font-display font-medium hover:bg-primary/10 transition-all"
                >
                  View Projects
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Floating 3D Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block"
          >
            <div className="relative float">
              <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center glow-border">
                <Brain className="w-32 h-32 text-primary/80" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-gradient-to-br from-accent/30 to-primary/30 backdrop-blur-sm border border-accent/30 flex items-center justify-center">
                <Zap className="w-16 h-16 text-accent/80" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Our <span className="gradient-text">Focus Areas</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Driving innovation across key domains of artificial intelligence
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="glass-card p-6 rounded-xl hover:glow-border transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold mb-2 text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 rounded-3xl text-center max-w-3xl mx-auto glow-border"
          >
            <Globe className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-display font-bold mb-4">
              Join the AI Revolution
            </h2>
            <p className="text-muted-foreground mb-8">
              Collaborate with us to shape the future of artificial intelligence.
              Partner with our research teams and industry experts.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-display font-medium hover:bg-primary/90 transition-all"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
