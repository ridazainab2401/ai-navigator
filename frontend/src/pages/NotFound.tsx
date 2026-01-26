import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative z-10"
      >
        <div className="glass-card p-12 rounded-3xl max-w-lg mx-auto">
          <AlertTriangle className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-6xl font-display font-bold mb-4 gradient-text">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Page not found in the AI matrix
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-display font-medium hover:bg-primary/90 transition-all"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
