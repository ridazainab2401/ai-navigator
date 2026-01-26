import { motion } from 'framer-motion';
import { FolderOpen, ExternalLink, Github, Calendar, Users, Tag } from 'lucide-react';

const projects = [
  {
    title: 'AutoML Platform',
    description: 'End-to-end automated machine learning pipeline for enterprise deployment. Features auto feature engineering, model selection, and hyperparameter optimization.',
    status: 'Active',
    team: 8,
    tags: ['Machine Learning', 'Automation', 'Enterprise'],
    image: '🤖',
    progress: 75,
  },
  {
    title: 'VisionAI Suite',
    description: 'Comprehensive computer vision toolkit for real-time object detection, segmentation, and tracking across multiple domains including healthcare and security.',
    status: 'Active',
    team: 12,
    tags: ['Computer Vision', 'Healthcare', 'Security'],
    image: '👁️',
    progress: 90,
  },
  {
    title: 'NLP Transformer Engine',
    description: 'Custom transformer architecture optimized for low-latency inference on edge devices. Supports multiple languages and domain-specific fine-tuning.',
    status: 'Beta',
    team: 6,
    tags: ['NLP', 'Edge Computing', 'Transformers'],
    image: '🧠',
    progress: 60,
  },
  {
    title: 'Ethical AI Framework',
    description: 'Governance framework and tooling for responsible AI development. Includes bias detection, explainability modules, and audit trails.',
    status: 'Active',
    team: 5,
    tags: ['Ethics', 'Governance', 'Explainability'],
    image: '⚖️',
    progress: 85,
  },
  {
    title: 'Federated Learning Hub',
    description: 'Privacy-preserving distributed learning platform enabling collaborative model training without centralized data aggregation.',
    status: 'Research',
    team: 7,
    tags: ['Privacy', 'Distributed', 'Federation'],
    image: '🔐',
    progress: 40,
  },
  {
    title: 'Gesture Control SDK',
    description: 'Real-time hand gesture recognition SDK for intuitive human-computer interaction. Powers this very website you are navigating!',
    status: 'Active',
    team: 4,
    tags: ['HCI', 'Gesture', 'Real-time'],
    image: '🤚',
    progress: 95,
  },
];

const statusColors: Record<string, string> = {
  Active: 'bg-emerald-500/20 text-emerald-400',
  Beta: 'bg-amber-500/20 text-amber-400',
  Research: 'bg-violet-500/20 text-violet-400',
};

export function ProjectsPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-accent/5 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FolderOpen className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary tracking-widest">PROJECTS</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Innovation in <span className="gradient-text">Action</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Transforming research into real-world solutions through 
              collaborative engineering and deployment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="glass-card rounded-xl overflow-hidden hover:glow-border transition-all group cursor-pointer"
              >
                {/* Project Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{project.image}</div>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-secondary text-xs text-muted-foreground rounded-md flex items-center gap-1"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="px-6 pb-4">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-primary font-medium">{project.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ delay: 0.3 + 0.1 * index, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    />
                  </div>
                </div>
                
                {/* Footer */}
                <div className="px-6 py-4 border-t border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{project.team} members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                      <Github className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </button>
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                      <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-display font-bold mb-8 text-center">
            2024 <span className="gradient-text">Milestones</span>
          </h2>
          
          <div className="max-w-2xl mx-auto space-y-6">
            {[
              { date: 'Q1', event: 'Launched AutoML Platform v2.0', icon: '🚀' },
              { date: 'Q2', event: 'VisionAI Suite reached 1M+ API calls', icon: '📈' },
              { date: 'Q3', event: 'Opened Ethical AI Framework to public', icon: '🌍' },
              { date: 'Q4', event: 'Gesture Control SDK demo at AI Summit', icon: '🎯' },
            ].map((milestone, index) => (
              <motion.div
                key={milestone.date}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center gap-4 glass-card p-4 rounded-xl"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-2xl">
                  {milestone.icon}
                </div>
                <div className="flex-1">
                  <div className="text-xs text-primary font-medium mb-1">{milestone.date} 2024</div>
                  <div className="font-medium">{milestone.event}</div>
                </div>
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
