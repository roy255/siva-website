import React from 'react';
import { ClipboardList, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfilingQuestionnaire({ updateFormData, formData, onComplete, isCompleted }) {
  const challengesOptions = [
    "Weight Gain", 
    "Weight Loss", 
    "Low Energy", 
    "Digestive Issues", 
    "Poor Eating Habits",
    "Hormonal Imbalance",
    "Post-Pregnancy Weight"
  ];

  const handleChallengeToggle = (challenge) => {
    if (isCompleted) return;
    const current = formData.healthChallenges || [];
    if (current.includes(challenge)) {
      updateFormData({ healthChallenges: current.filter(c => c !== challenge) });
    } else {
      updateFormData({ healthChallenges: [...current, challenge] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onComplete) onComplete();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative glass-card rounded-[2.5rem] p-8 md:p-14 transition-all duration-500 ${isCompleted ? 'opacity-50' : ''}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-white/[0.05] pb-8">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-amber-500/[0.05] rounded-2xl flex items-center justify-center mr-6 border border-amber-500/[0.1] shadow-[0_0_20px_rgba(245,158,11,0.1)]">
            <ClipboardList className="w-8 h-8 text-amber-400" />
          </div>
          <div>
            <h2 className="text-3xl font-light text-white tracking-tight">Comprehensive <span className="text-gradient-gold font-medium">Profiling</span></h2>
            <p className="text-slate-400 text-sm mt-1 font-light tracking-wide">Phase 01 / Data Collection</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        
        {/* Basic Info Row */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Gender */}
          <div className="space-y-4">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Gender</label>
            <div className="flex flex-col space-y-3">
              {['Male', 'Female', 'Other'].map(g => (
                <label key={g} className={`cursor-pointer flex items-center p-4 rounded-2xl border transition-all duration-300 ${formData.gender === g ? 'bg-amber-500/[0.08] border-amber-500/[0.3] shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04]'}`}>
                  <input 
                    type="radio" 
                    name="gender" 
                    value={g} 
                    checked={formData.gender === g}
                    onChange={(e) => updateFormData({ gender: e.target.value })}
                    className="hidden"
                    disabled={isCompleted}
                    required
                  />
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3 ${formData.gender === g ? 'border-amber-400' : 'border-slate-600'}`}>
                     {formData.gender === g && <div className="w-2 h-2 bg-amber-400 rounded-full"></div>}
                  </div>
                  <span className={`font-medium text-sm ${formData.gender === g ? 'text-amber-400' : 'text-slate-300'}`}>{g}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Marital Status */}
          <div className="space-y-4">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Marital Status</label>
            <div className="flex flex-col space-y-3">
              {['Married', 'Unmarried'].map(m => (
                <label key={m} className={`cursor-pointer flex items-center p-4 rounded-2xl border transition-all duration-300 ${formData.maritalStatus === m ? 'bg-amber-500/[0.08] border-amber-500/[0.3] shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04]'}`}>
                  <input 
                    type="radio" 
                    name="maritalStatus" 
                    value={m} 
                    checked={formData.maritalStatus === m}
                    onChange={(e) => updateFormData({ maritalStatus: e.target.value })}
                    className="hidden"
                    disabled={isCompleted}
                    required
                  />
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3 ${formData.maritalStatus === m ? 'border-amber-400' : 'border-slate-600'}`}>
                     {formData.maritalStatus === m && <div className="w-2 h-2 bg-amber-400 rounded-full"></div>}
                  </div>
                  <span className={`font-medium text-sm ${formData.maritalStatus === m ? 'text-amber-400' : 'text-slate-300'}`}>{m}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Target Weight */}
          <div className="space-y-4">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Target Weight (kg)</label>
            <div>
              <input 
                type="number"
                min="30"
                max="200"
                placeholder="e.g. 65"
                value={formData.targetWeight}
                onChange={(e) => updateFormData({ targetWeight: e.target.value })}
                disabled={isCompleted}
                required
                className="w-full py-4 px-5 rounded-2xl border transition-all bg-white/[0.02] border-white/[0.08] text-white focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none placeholder-slate-600 font-light text-lg"
              />
            </div>
          </div>
        </div>

        {/* Health Challenges */}
        <div className="space-y-5 pt-8 border-t border-white/[0.05]">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Primary Health Roadblocks</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {challengesOptions.map(challenge => {
              const isSelected = formData.healthChallenges?.includes(challenge);
              return (
                <div 
                  key={challenge}
                  onClick={() => handleChallengeToggle(challenge)}
                  className={`cursor-pointer flex items-center p-4 rounded-2xl border transition-all duration-300 ${isSelected ? 'bg-amber-500/[0.08] border-amber-500/[0.3] shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04]'}`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center mr-4 border transition-colors ${isSelected ? 'bg-amber-400 border-amber-400 text-slate-950' : 'bg-transparent border-slate-600'}`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <span className={`font-light text-sm ${isSelected ? 'text-amber-400' : 'text-slate-300'}`}>{challenge}</span>
                </div>
              )
            })}
          </div>
        </div>

        {!isCompleted && (
          <div className="pt-8 flex justify-end">
            <button 
              type="submit"
              className="btn-gold px-10 py-4 rounded-full font-semibold flex items-center group text-lg"
            >
              Finalize Profile
              <ArrowRight className="w-5 h-5 ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        )}
      </form>
    </motion.div>
  );
}
