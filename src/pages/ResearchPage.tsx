import { motion } from 'framer-motion';
import { BookOpen, Users, Award, ExternalLink, ChevronRight } from 'lucide-react';

const researchAreas = [
  {
    title: 'Natural Language Processing',
    description: 'Advancing human-computer interaction through sophisticated language models and semantic understanding.',
    papers: 12,
    team: 8,
    color: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    title: 'Computer Vision',
    description: 'Developing visual perception systems for autonomous vehicles, medical imaging, and security applications.',
    papers: 18,
    team: 10,
    color: 'from-teal-500/20 to-emerald-500/20',
  },
  {
    title: 'Reinforcement Learning',
    description: 'Creating intelligent agents that learn optimal behaviors through interaction with complex environments.',
    papers: 9,
    team: 6,
    color: 'from-violet-500/20 to-purple-500/20',
  },
  {
    title: 'Generative AI',
    description: 'Pushing boundaries in content generation, from images and text to audio and video synthesis.',
    papers: 15,
    team: 12,
    color: 'from-pink-500/20 to-rose-500/20',
  },
];

const publications = [
  {
    title: 'Transformer Architectures for Multi-Modal Learning',
    authors: 'Chen, J., Smith, A., Kumar, R.',
    venue: 'NeurIPS 2024',
    citations: 145,
  },
  {
    title: 'Efficient Fine-Tuning Strategies for Large Language Models',
    authors: 'Williams, M., Lee, S.',
    venue: 'ICML 2024',
    citations: 89,
  },
  {
    title: 'Self-Supervised Learning in Medical Image Analysis',
    authors: 'Garcia, P., Thompson, K., Chen, L.',
    venue: 'CVPR 2024',
    citations: 203,
  },
  {
    title: 'Ethical Considerations in Autonomous Decision Systems',
    authors: 'Rodriguez, E., Patel, N.',
    venue: 'AAAI 2024',
    citations: 67,
  },
];

export function ResearchPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary tracking-widest">RESEARCH</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Advancing <span className="gradient-text">AI Knowledge</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Our research spans the full spectrum of artificial intelligence, 
              from foundational theory to applied innovations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-display font-bold mb-8">Research Areas</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {researchAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="glass-card rounded-xl overflow-hidden hover:glow-border transition-all group cursor-pointer"
              >
                <div className={`h-2 bg-gradient-to-r ${area.color}`} />
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-primary transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{area.description}</p>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span>{area.papers} Papers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{area.team} Researchers</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-display font-bold">Recent Publications</h2>
            <button className="flex items-center gap-2 text-primary hover:gap-3 transition-all text-sm font-medium">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {publications.map((pub, index) => (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="glass-card p-6 rounded-xl hover:glow-border transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                      {pub.title}
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{pub.authors}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded-md font-medium">
                        {pub.venue}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Award className="w-3 h-3" />
                        {pub.citations} citations
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-8 md:p-12 rounded-2xl text-center"
          >
            <h2 className="text-2xl font-display font-bold mb-4">
              Interested in Collaboration?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              We welcome research partnerships with academic institutions and industry leaders.
            </p>
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-display font-medium hover:bg-primary/90 transition-all">
              Contact Research Team
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
