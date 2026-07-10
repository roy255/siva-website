import React from 'react';
import { motion } from 'framer-motion';

const transformations = [
  { id: 1, before: '/coach_before.png', after: '/coach_after.png', name: 'Coach Siva', duration: '16 Weeks', goal: 'Fat to Fit' },
  { id: 2, before: '/client_weight_loss.png', after: '/client_muscle_gain.png', name: 'Alex M.', duration: '12 Weeks', goal: 'Recomp' },
];

export default function TransformationShowcase() {
  return (
    <section className="py-32 bg-luxury-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="heading-section">Proof of Work</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-lg">Real results from real clients. Our scientifically backed methods guarantee transformation.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {transformations.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="glass-card overflow-hidden group"
            >
              <div className="flex aspect-video relative">
                {/* Before Image */}
                <div className="w-1/2 relative overflow-hidden border-r border-white/10">
                  <img src={item.before} alt="Before" className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-70 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-slate-400">Before</div>
                </div>
                {/* After Image */}
                <div className="w-1/2 relative overflow-hidden">
                  <img src={item.after} alt="After" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-neon-lime text-luxury-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(163,255,18,0.5)]">After</div>
                </div>
              </div>
              <div className="p-8 flex justify-between items-center bg-white/5">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-neon-lime text-sm font-semibold uppercase tracking-widest">{item.goal}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500 text-xs uppercase tracking-widest font-semibold mb-1">Duration</p>
                  <p className="text-white font-bold text-lg">{item.duration}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
