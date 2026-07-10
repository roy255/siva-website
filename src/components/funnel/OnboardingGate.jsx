import React from 'react';
import { motion } from 'framer-motion';
import { Target, UserCircle, ArrowRight, Mail, Phone } from 'lucide-react';

export default function OnboardingGate({ nextStep, updateFormData, formData }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone && formData.age && formData.purpose) {
      nextStep();
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 relative z-10 mt-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-xl w-full"
      >
        <div className="text-center space-y-6 mb-12">
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-lime-400 flex items-center justify-center mx-auto shadow-[4px_4px_0px_rgba(255,255,255,0.1)] transform -skew-x-6"
          >
            <Target className="w-10 h-10 text-zinc-950" />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none">
            Welcome to the <br /> <span className="text-accent-lime">Inner Circle</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-lg mx-auto font-medium uppercase tracking-widest leading-relaxed">
            You've taken the first step. Before we create your custom protocol, we need your baseline.
          </p>
        </div>

        <div className="athletic-card p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-sm font-black text-white uppercase tracking-widest ml-1">Your Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-lime-400">
                  <UserCircle className="h-5 w-5 text-zinc-500" />
                </div>
                <input 
                  type="text" 
                  required
                  pattern="[A-Za-z\s]+"
                  title="Only letters and spaces are allowed"
                  value={formData.name || ''}
                  onChange={(e) => updateFormData({ name: e.target.value })}
                  className="input-athletic pl-12"
                  placeholder="JOHN DOE"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-black text-white uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-lime-400">
                  <Mail className="h-5 w-5 text-zinc-500" />
                </div>
                <input 
                  type="email" 
                  required
                  value={formData.email || ''}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  className="input-athletic pl-12"
                  placeholder="JOHN@EXAMPLE.COM"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-black text-white uppercase tracking-widest ml-1">Mobile Number</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-lime-400">
                  <Phone className="h-5 w-5 text-zinc-500" />
                </div>
                <input 
                  type="tel" 
                  required
                  pattern="[0-9+\-\s()]+"
                  title="Please enter a valid mobile number"
                  value={formData.phone || ''}
                  onChange={(e) => updateFormData({ phone: e.target.value })}
                  className="input-athletic pl-12"
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-black text-white uppercase tracking-widest ml-1">Your Age</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-lime-400">
                  <UserCircle className="h-5 w-5 text-zinc-500" />
                </div>
                <input 
                  type="number" 
                  required
                  min="16"
                  max="120"
                  value={formData.age || ''}
                  onChange={(e) => updateFormData({ age: e.target.value })}
                  className="input-athletic pl-12"
                  placeholder="28"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-black text-white uppercase tracking-widest ml-1">Primary Objective</label>
              <div className="relative group">
                <div className="absolute top-4 left-4 flex items-start pointer-events-none transition-colors group-focus-within:text-lime-400">
                  <Target className="h-5 w-5 text-zinc-500" />
                </div>
                <textarea 
                  required
                  rows="3"
                  value={formData.purpose || ''}
                  onChange={(e) => updateFormData({ purpose: e.target.value })}
                  className="input-athletic pl-12 resize-none"
                  placeholder="I WANT TO BUILD A HIGHLY PROFITABLE CONSULTING BUSINESS..."
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 mt-4 btn-athletic flex items-center justify-center group"
            >
              Continue to Assessment
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-all" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
