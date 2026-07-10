import React from 'react';
import { MessageCircle, Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FooterCTA({ formData }) {
  const COACH_WHATSAPP_NUMBER = "919515625262"; 

  const handleWhatsAppSubmit = () => {
    const challengesString = formData.healthChallenges && formData.healthChallenges.length > 0 
      ? formData.healthChallenges.join(', ') 
      : 'None specified';

    const message = `Hello Coach! I would like to start my wellness journey. Here are my details:

*Name:* ${formData.name || 'N/A'}
*Email:* ${formData.email || 'N/A'}
*Phone:* ${formData.phone || 'N/A'}
*Age:* ${formData.age || 'N/A'}
*Gender:* ${formData.gender || 'N/A'}
*Marital Status:* ${formData.maritalStatus || 'N/A'}
*Target Weight:* ${formData.targetWeight ? formData.targetWeight + ' kg' : 'N/A'}

*Purpose:* ${formData.purpose || 'N/A'}
*Primary Health Challenges:* ${challengesString}

Please let me know the next steps!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${COACH_WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <footer className="mt-20 border-t border-white/[0.05] pt-20 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-amber-500/[0.03] to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 text-center max-w-3xl mx-auto space-y-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 bg-amber-500/[0.05] border border-amber-500/[0.1] px-4 py-1.5 rounded-full text-amber-400 text-xs font-semibold tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
            <Send className="w-4 h-4" />
            <span>Final Step</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">Ready to <span className="text-gradient-gold font-medium">Transform?</span></h2>
          <p className="text-slate-400 text-lg font-light leading-relaxed max-w-2xl mx-auto">
            You've taken the first step by acknowledging your challenges. Let's work together to conquer them. Submit your details to connect directly with me.
          </p>
        </motion.div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleWhatsAppSubmit}
          className="w-full sm:w-auto px-10 py-5 btn-gold rounded-full text-lg flex items-center justify-center mx-auto group"
        >
          <MessageCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
          Connect via WhatsApp
        </motion.button>

        {/* Contact Details */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="pt-16 flex flex-col md:flex-row items-center justify-center gap-10 text-slate-500 text-sm font-light uppercase tracking-widest"
        >
          <motion.div whileHover={{ color: '#f59e0b' }} className="flex items-center cursor-pointer transition-colors">
            <Mail className="w-4 h-4 mr-3" />
            t.sivaphanindra14@gmail.com
          </motion.div>
          <motion.div whileHover={{ color: '#f59e0b' }} className="flex items-center cursor-pointer transition-colors">
            <Phone className="w-4 h-4 mr-3" />
            +91 95156 25262
          </motion.div>
          <motion.div whileHover={{ color: '#f59e0b' }} className="flex items-center cursor-pointer transition-colors">
            <MapPin className="w-4 h-4 mr-3" />
            Wellness Center, IN
          </motion.div>
        </motion.div>
        
        <p className="text-xs text-slate-700 mt-12 uppercase tracking-widest">
          © {new Date().getFullYear()} Elite Consulting. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
