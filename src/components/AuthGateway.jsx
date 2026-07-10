import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, ArrowRight, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AuthGateway() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.state?.isLogin ?? true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }
      
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('hasRegistered', 'true');
      
      if (isLogin) {
        navigate('/onboarding');
      } else {
        navigate('/onboarding');
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-luxury-black overflow-hidden relative">
      {/* Animated Background Mesh (Visible on mobile/behind panel) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-lime/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-electric-blue/10 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      {/* Left Side: Cinematic Media */}
      <div className="hidden lg:block lg:w-1/2 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-luxury-black/90 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" 
          alt="Athlete Training" 
          className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-80"
        />
        <div className="absolute bottom-16 left-16 z-20">
          <h2 className="heading-section text-white mb-2">Redefine <br/><span className="text-neon">Your Limits</span></h2>
          <p className="text-slate-400 max-w-md text-lg">Join the elite coaching platform designed for unparalleled physical transformation.</p>
        </div>
      </div>

      {/* Right Side: Glass Login Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md glass-panel p-10 md:p-14"
        >
          {/* Animated Logo */}
          <div className="flex justify-center mb-10">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-lime/20 to-electric-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="text-2xl font-bold text-white tracking-widest relative z-10">SV</span>
            </div>
          </div>

          <h3 className="text-3xl font-bold text-white text-center mb-2 tracking-wide uppercase">
            {isLogin ? 'Welcome Back' : 'Join the Elite'}
          </h3>
          <p className="text-slate-400 text-center mb-8">
            {isLogin ? 'Enter your credentials to access your dashboard.' : 'Create your account to start your transformation.'}
          </p>

          <form onSubmit={handleAuth} className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-500" />
              </div>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-glass pl-12"
                placeholder="Email Address"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-500" />
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-glass pl-12"
                placeholder="Password"
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm mt-2 mb-6">
                <label className="flex items-center text-slate-400 cursor-pointer hover:text-white transition-colors">
                  <input type="checkbox" className="mr-2 accent-neon-lime w-4 h-4 rounded border-slate-700 bg-slate-800" />
                  Remember me
                </label>
                <button type="button" className="text-neon-lime hover:text-neon-lime/80 transition-colors font-medium">
                  Forgot Password?
                </button>
              </div>
            )}

            {errorMsg && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-brand-error text-sm text-center">
                {errorMsg}
              </motion.p>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full btn-premium flex items-center justify-center group mt-6"
            >
              {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Create Account')}
              {!loading && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <p className="text-slate-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-white font-semibold hover:text-neon-lime transition-colors uppercase tracking-wide text-sm"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
