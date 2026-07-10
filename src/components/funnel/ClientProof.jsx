import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck } from 'lucide-react';

export default function ClientProof() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <motion.div variants={containerVars} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="space-y-12 relative z-10">
      <div className="text-center space-y-4">
        <motion.div variants={itemVars} className="inline-flex items-center space-x-2 bg-lime-400 text-zinc-950 px-6 py-2 uppercase font-black tracking-widest mb-4 shadow-[4px_4px_0px_rgba(255,255,255,0.1)] transform -skew-x-6">
          <Star className="w-5 h-5 fill-zinc-950" />
          <span>Case Studies</span>
        </motion.div>
        <motion.h2 variants={itemVars} className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
          Don't Take <span className="text-accent-lime">My Word</span> For It
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            name: "David M.",
            role: "Tech Executive",
            content: "I was skeptical about remote coaching. But the data-driven approach changed everything. I'm down 30lbs and my focus at work has never been sharper. The ROI on this investment is astronomical.",
            rating: 5
          },
          {
            name: "Sarah T.",
            role: "Entrepreneur",
            content: "After trying every fad diet, I finally found a system that works with my insane schedule. The precision and accountability are unmatched. This isn't just fitness; it's high-performance lifestyle engineering.",
            rating: 5
          }
        ].map((testimonial, idx) => (
          <motion.div key={idx} variants={itemVars} className="athletic-card p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/5 rotate-45 transform translate-x-16 -translate-y-16 pointer-events-none group-hover:bg-lime-400/10 transition-colors duration-200"></div>
            
            <div className="flex text-lime-400 mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-lime-400 transform -skew-x-6" />
              ))}
            </div>
            
            <p className="text-zinc-300 font-bold leading-relaxed mb-8 text-xl uppercase tracking-wider">
              "{testimonial.content}"
            </p>
            
            <div className="flex items-center">
              <div className="w-14 h-14 bg-lime-400 flex items-center justify-center mr-4 border-2 border-zinc-950 transform -skew-x-6 shadow-[4px_4px_0px_rgba(255,255,255,0.1)]">
                <span className="text-zinc-950 font-black text-xl">{testimonial.name.charAt(0)}</span>
              </div>
              <div>
                <h4 className="font-black text-white text-lg uppercase tracking-widest">{testimonial.name}</h4>
                <p className="text-sm text-lime-400 uppercase font-bold tracking-widest">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Guarantee Box */}
      <motion.div variants={itemVars} className="mt-12 bg-zinc-900 border-4 border-lime-400 p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-[8px_8px_0px_rgba(163,230,53,0.3)] transform -skew-x-2">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_45%,rgba(163,230,53,0.05)_45%,rgba(163,230,53,0.05)_55%,transparent_55%)] bg-[length:20px_20px] pointer-events-none"></div>
        <div className="flex-shrink-0 relative z-10 transform skew-x-2">
           <div className="w-20 h-20 bg-lime-400 flex items-center justify-center border-4 border-zinc-950 shadow-[4px_4px_0px_rgba(255,255,255,0.2)] transform -skew-x-6">
              <ShieldCheck className="w-10 h-10 text-zinc-950" />
           </div>
        </div>
        <div className="relative z-10 transform skew-x-2">
          <h4 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">The Ironclad Guarantee</h4>
          <p className="text-zinc-400 font-bold uppercase tracking-widest leading-relaxed">
            If you follow the precise protocol laid out for you and do not achieve the exact agreed-upon results, you will receive a full refund. No questions asked. We only win when you win.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
