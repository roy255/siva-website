import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-luxury-black">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/90 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
          alt="Athlete Training" 
          className="w-full h-full object-cover object-right opacity-60 mix-blend-luminosity"
        />
        {/* Animated Neon Spotlights */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-lime/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-electric-blue/10 rounded-full blur-[150px] pointer-events-none z-10"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 w-full z-30 px-6 py-6 border-b border-white/5 bg-luxury-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-neon-lime text-luxury-black rounded-xl flex items-center justify-center font-black text-xl">OS</div>
            <span className="text-xl font-bold tracking-widest uppercase text-white">TransformationOS</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/admin" className="text-sm font-semibold text-slate-400 hover:text-white uppercase tracking-widest transition-colors hidden md:block">Admin</Link>
            <Link to="/login" state={{ isLogin: true }} className="text-sm font-semibold text-slate-300 hover:text-neon-lime uppercase tracking-widest transition-colors">Login</Link>
            <Link to="/login" state={{ isLogin: false }} className="btn-premium-outline px-6 py-2 text-xs rounded-full">Register</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col justify-center">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-neon-lime animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Premium Online Coaching</span>
            </div>
            
            <h1 className="heading-hero mb-6">
              Transform Your Body. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-lime to-electric-blue">Transform Your Life.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed font-light">
              Scientifically designed online coaching that delivers measurable fat loss, muscle gain, and sustainable health improvements.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link 
              to="/login" 
              state={{ isLogin: localStorage.getItem('hasRegistered') === 'true' }} 
              className="w-full sm:w-auto btn-premium flex items-center justify-center group"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button className="w-full sm:w-auto btn-premium-outline flex items-center justify-center group">
              <Play className="w-5 h-5 mr-2 text-white group-hover:text-neon-lime transition-colors" />
              View Success Stories
            </button>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24"
        >
          {[
            { label: 'Active Clients', value: '10,000+', icon: Users, color: 'text-electric-blue' },
            { label: 'Success Rate', value: '96%', icon: TrendingUp, color: 'text-neon-lime' },
            { label: 'Transformations', value: '500+', icon: Star, color: 'text-brand-warning' },
            { label: 'Average Rating', value: '4.9★', icon: Star, color: 'text-white' },
          ].map((stat, idx) => (
            <div key={idx} className="glass-card p-6 flex flex-col items-start group">
              <stat.icon className={`w-8 h-8 mb-4 opacity-70 group-hover:opacity-100 transition-opacity ${stat.color}`} />
              <h3 className="text-3xl font-bold text-white mb-1 tracking-tight">{stat.value}</h3>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
