import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Activity, FileText, Target, User, Camera, CheckCircle2 } from 'lucide-react';
import Confetti from 'react-confetti';

const steps = [
  { id: 1, title: 'Personal Details', icon: User },
  { id: 2, title: 'Health Info', icon: Activity },
  { id: 3, title: 'Medical History', icon: FileText },
  { id: 4, title: 'Goals', icon: Target },
];

const healthConditions = [
  "Sugar", "BP", "Thyroid", "Knee Pain", 
  "Fatigue", "Laziness", "Sleep Disorder", "Others"
];

const goalOptions = [
  "Weight Loss", "Fat Loss", "Muscle Gain", 
  "Fitness", "Lifestyle", "Strength"
];

export default function ComprehensiveProfilingGate() {
  const COACH_WHATSAPP_NUMBER = "919515625262";
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    healthChallenges: [],
    otherHealthChallenge: '',
    hasMedicalHistory: null,
    medicalHistory: '',
    goal: '',
    lifestyle: '',
    frontPhoto: null,
    sidePhoto: null,
    backPhoto: null,
  });

  const updateForm = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handlePhotoUpload = (key, e) => {
    if (e.target.files && e.target.files[0]) {
      updateForm(key, e.target.files[0]);
    }
  };

  const toggleHealthChallenge = (challenge) => {
    const current = formData.healthChallenges;
    if (current.includes(challenge)) {
      updateForm('healthChallenges', current.filter(c => c !== challenge));
    } else {
      updateForm('healthChallenges', [...current, challenge]);
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === 4) {
      handleSubmitProfile();
    } else if (currentStep === 5) {
      handleSubmitPhotos();
    }
  };

  const handleSubmitProfile = async () => {
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('auth_token');
      await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          age: parseInt(formData.age, 10) || null,
          purpose: formData.goal,
          gender: formData.gender,
          height: formData.height,
          weight: formData.weight,
          healthChallenges: formData.healthChallenges,
          medicalHistory: formData.hasMedicalHistory === 'Yes' ? formData.medicalHistory : 'None',
          lifestyle: formData.lifestyle,
          additionalNotes: `Email: ${formData.email}`
        }),
      });
    } catch (error) {
      console.error('Save error:', error);
    }

    setIsSubmitting(false);
    
    // Open WhatsApp
    let challengesString = formData.healthChallenges.length > 0 
      ? formData.healthChallenges.filter(c => c !== 'Others').join(', ') 
      : 'None specified';
      
    if (formData.healthChallenges.includes('Others')) {
      challengesString += challengesString !== 'None specified' 
        ? `, Others: ${formData.otherHealthChallenge}` 
        : `Others: ${formData.otherHealthChallenge}`;
    }

    const message = `Hello Coach! I have completed my comprehensive profile. Here are my details:

*Name:* ${formData.name || 'N/A'}
*Email:* ${formData.email || 'N/A'}
*Phone:* ${formData.phone || 'N/A'}
*Age:* ${formData.age || 'N/A'}
*Gender:* ${formData.gender || 'N/A'}
*Height:* ${formData.height || 'N/A'}
*Weight:* ${formData.weight || 'N/A'}

*--- Fitness & Health Goals ---*
*Primary Goal:* ${formData.goal || 'N/A'}
*Any Health Challenges?* ${challengesString}

*--- Medical & Lifestyle ---*
*Medical History (Any?):* ${formData.hasMedicalHistory || 'N/A'}
${formData.hasMedicalHistory === 'Yes' ? `*Details:* ${formData.medicalHistory || 'N/A'}\n` : ''}
*Lifestyle:* ${formData.lifestyle || 'N/A'}

I am currently uploading my transformation photos to the portal.
Please let me know the next steps for my personalized transformation plan.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${COACH_WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    // Move to step 5 (Photos) immediately after opening WhatsApp
    setCurrentStep(5);
  };

  const handleSubmitPhotos = () => {
    setIsSubmitting(true);
    // Here you would typically upload photos to the backend
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center p-6 relative overflow-hidden">
        <Confetti colors={['#A3FF12', '#38BDF8', '#FFFFFF']} recycle={false} numberOfPieces={500} />
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-panel p-16 text-center max-w-lg w-full flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-neon-lime/20 rounded-full flex items-center justify-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <CheckCircle2 className="w-12 h-12 text-neon-lime" />
            </motion.div>
          </div>
          <h2 className="heading-section mb-4">Profile Completed</h2>
          <p className="text-slate-400 text-lg mb-8">Your data has been secured. Redirecting you to your coach on WhatsApp...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-black text-white pt-24 pb-12 px-6 flex flex-col items-center">
      {/* Progress Bar */}
      <div className="w-full max-w-4xl mb-12">
        <div className="flex justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 z-0"></div>
          <motion.div 
            className="absolute top-1/2 left-0 h-1 bg-neon-lime -translate-y-1/2 z-0"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          ></motion.div>
          
          {steps.map(step => (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
                currentStep >= step.id ? 'bg-luxury-black border-neon-lime text-neon-lime shadow-[0_0_15px_rgba(163,255,18,0.4)]' : 'bg-luxury-black border-white/20 text-slate-500'
              }`}>
                {currentStep > step.id ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
              </div>
              <span className={`absolute -bottom-8 w-32 text-center text-xs font-semibold uppercase tracking-widest ${currentStep >= step.id ? 'text-white' : 'text-slate-500'}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-3xl glass-panel p-8 md:p-12 mt-4 relative overflow-hidden min-h-[400px]">
        <AnimatePresence mode="wait">
          
          {/* STEP 1 */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <h3 className="heading-section text-2xl">Personal Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                  <input type="text" value={formData.name} onChange={(e) => updateForm('name', e.target.value)} className="input-glass" placeholder="e.g. John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                  <input type="email" value={formData.email} onChange={(e) => updateForm('email', e.target.value)} className="input-glass" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Phone Number</label>
                  <input type="tel" value={formData.phone} onChange={(e) => updateForm('phone', e.target.value)} className="input-glass" placeholder="+1 234 567 8900" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Age</label>
                  <input type="number" value={formData.age} onChange={(e) => updateForm('age', e.target.value)} className="input-glass" placeholder="e.g. 28" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Height (CM)</label>
                  <input type="number" value={formData.height} onChange={(e) => updateForm('height', e.target.value)} className="input-glass" placeholder="e.g. 175" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Weight (KG)</label>
                  <input type="number" value={formData.weight} onChange={(e) => updateForm('weight', e.target.value)} className="input-glass" placeholder="e.g. 80" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Gender</label>
                  <div className="flex gap-4">
                    {['Male', 'Female'].map(g => (
                      <button 
                        key={g} 
                        onClick={() => updateForm('gender', g)}
                        className={`flex-1 py-4 rounded-2xl border transition-all duration-300 font-semibold uppercase tracking-widest text-sm ${formData.gender === g ? 'bg-neon-lime text-luxury-black border-neon-lime shadow-[0_0_20px_rgba(163,255,18,0.2)]' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <h3 className="heading-section text-2xl">Health Information</h3>
              <p className="text-slate-400 text-sm">Select any current health challenges you are experiencing.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {healthConditions.map(condition => (
                  <div 
                    key={condition} 
                    onClick={() => toggleHealthChallenge(condition)}
                    className={`condition-tile flex flex-col items-center justify-center text-center p-6 ${formData.healthChallenges.includes(condition) ? 'active' : ''}`}
                  >
                    <span className="font-semibold text-sm uppercase tracking-wider">{condition}</span>
                  </div>
                ))}
              </div>

              {formData.healthChallenges.includes('Others') && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-4">
                  <label className="block text-xs font-semibold text-neon-lime uppercase tracking-widest mb-2">Specify Other Conditions</label>
                  <input type="text" value={formData.otherHealthChallenge} onChange={(e) => updateForm('otherHealthChallenge', e.target.value)} className="input-glass" placeholder="e.g. Asthma, Migraines..." />
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <h3 className="heading-section text-2xl">Medical History</h3>
              
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Do you have any past surgeries or medical history?</label>
                <div className="flex gap-4 mb-8">
                  {['Yes', 'No'].map(opt => (
                    <button 
                      key={opt} 
                      onClick={() => updateForm('hasMedicalHistory', opt)}
                      className={`flex-1 py-4 rounded-2xl border transition-all duration-300 font-semibold uppercase tracking-widest text-sm ${formData.hasMedicalHistory === opt ? 'bg-neon-lime text-luxury-black border-neon-lime shadow-[0_0_20px_rgba(163,255,18,0.2)]' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {formData.hasMedicalHistory === 'Yes' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <label className="block text-xs font-semibold text-neon-lime uppercase tracking-widest mb-2">Please Provide Details</label>
                  <textarea rows="4" value={formData.medicalHistory} onChange={(e) => updateForm('medicalHistory', e.target.value)} className="input-glass resize-none" placeholder="List past surgeries, injuries, or treatments..."></textarea>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <h3 className="heading-section text-2xl">Your Primary Goal</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {goalOptions.map(goal => (
                  <button 
                    key={goal} 
                    onClick={() => updateForm('goal', goal)}
                    className={`py-4 rounded-2xl border transition-all duration-300 font-semibold uppercase tracking-widest text-sm ${formData.goal === goal ? 'bg-neon-lime text-luxury-black border-neon-lime shadow-[0_0_20px_rgba(163,255,18,0.2)] scale-105' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                  >
                    {goal}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Describe Your Current Lifestyle</label>
                <textarea rows="3" value={formData.lifestyle} onChange={(e) => updateForm('lifestyle', e.target.value)} className="input-glass resize-none" placeholder="Sedentary, Active, Night Shift, High Stress..."></textarea>
              </div>
            </motion.div>
          )}

          {/* STEP 5 */}
          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <h3 className="heading-section text-2xl">Current Photos</h3>
              <p className="text-slate-400 text-sm">Upload your starting point photos. These will be kept strictly confidential.</p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { key: 'frontPhoto', label: 'Front Profile' },
                  { key: 'sidePhoto', label: 'Side Profile' },
                  { key: 'backPhoto', label: 'Back Profile' }
                ].map(photo => (
                  <div key={photo.key} className="flex flex-col items-center">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">{photo.label}</label>
                    <div className="w-full aspect-[3/4] bg-white/5 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group hover:border-neon-lime transition-colors">
                      {formData[photo.key] ? (
                        <div className="absolute inset-0">
                          <img src={URL.createObjectURL(formData[photo.key])} alt={photo.label} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-white text-xs uppercase tracking-widest font-semibold">Change Photo</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Camera className="w-8 h-8 text-slate-500 mb-2 group-hover:text-neon-lime transition-colors" />
                          <span className="text-xs text-slate-500 uppercase font-semibold text-center px-4">Upload <br/> {photo.label}</span>
                        </>
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(photo.key, e)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-12 flex justify-between items-center border-t border-white/5 pt-8">
          {currentStep > 1 && currentStep < 5 ? (
            <button 
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="text-slate-400 hover:text-white font-semibold uppercase tracking-widest text-sm transition-colors"
            >
              Back
            </button>
          ) : <div></div>}

          <button 
            onClick={handleNext}
            disabled={isSubmitting}
            className="btn-premium flex items-center shadow-[0_0_15px_rgba(163,255,18,0.2)] px-8 py-3 rounded-full"
          >
            {isSubmitting ? (currentStep === 5 ? 'Saving Photos...' : 'Securing Profile...') : currentStep === 4 ? 'Submit & Open WhatsApp' : currentStep === 5 ? 'Upload Photos' : 'Continue'}
            {!isSubmitting && currentStep < 4 && <ChevronRight className="w-5 h-5 ml-2" />}
            {!isSubmitting && currentStep >= 4 && <Check className="w-5 h-5 ml-2" />}
          </button>
        </div>
      </div>
    </div>
  );
}
