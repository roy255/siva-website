import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Projects = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  const projectsData = [
    {
      title: "Automated Detection & Severity Classification of Diabetic Retinopathy",
      status: "Present / In Progress",
      statusType: "progress",
      date: "Ongoing",
      description: "Developing a deep learning system using Convolutional Neural Networks (CNN) to analyze retinal fundus images. The model classifies diabetic retinopathy into distinct severity levels to facilitate early medical intervention.",
      tags: ["CNN", "Deep Learning", "Medical AI", "Python", "TensorFlow"],
      color: "border-amber-500 bg-amber-500/5 text-amber-500"
    },
    {
      title: "AI Classification of Temple Sculptures",
      status: "Completed",
      statusType: "completed",
      date: "Nov 2025",
      description: "Created a deep-learning-based classification model that analyzes images of temple sculptures to categorize them into deities, motifs, and architectural carvings with 80–85% accuracy. Built to automate cultural heritage documentation.",
      tags: ["Deep Learning", "Computer Vision", "Python", "Heritage Tech"],
      color: "border-green-500 bg-green-500/5 text-green-500"
    },
    {
      title: "Dual Suppression of Fire Fighter Robot",
      status: "Completed",
      statusType: "completed",
      date: "May 2024",
      description: "Designed and built an autonomous firefighting robot integrated with flame and temperature sensors. It tracks and targets fire sources, selecting the most effective extinguishing agent (water spray or CO/foam) for rapid suppression.",
      tags: ["Robotics", "Sensors Integration", "Arduino/Embedded", "Hardware Design"],
      color: "border-green-500 bg-green-500/5 text-green-500"
    },
    {
      title: "AI Voice Agent",
      status: "2nd Prize Winner",
      statusType: "award",
      date: "Competition Winner",
      description: "Developed a conversational Voice-Based AI Agent for natural-sounding user interactions. Earned 2nd Prize in the AI Agents Competition for flow execution, speed, and real-time response capabilities.",
      tags: ["AI Voice", "LLM Interaction", "API Integration", "Workflow Automation"],
      color: "border-red-500 bg-[#ff2a2a]/5 text-[#ff2a2a]"
    },
    {
      title: "Human Emotion Detection System",
      status: "Completed",
      statusType: "completed",
      date: "Completed",
      description: "Built a computer vision system that captures facial expressions and uses deep learning models to predict human emotional states in real-time, targeting application in UX testing and user response analysis.",
      tags: ["Computer Vision", "Emotion AI", "Python", "Real-Time Detection"],
      color: "border-green-500 bg-green-500/5 text-green-500"
    },
    {
      title: "She Secure",
      status: "Completed",
      statusType: "completed",
      date: "Completed",
      description: "Developed a comprehensive security application dedicated to women's safety. Features location-sharing, emergency contacts, alert triggers, and immediate background notifications to security services.",
      tags: ["Web/Mobile Dev", "User Safety", "GPS Services", "Alert Workflows"],
      color: "border-green-500 bg-green-500/5 text-green-500"
    },
    {
      title: "Ultra Low-Cost Wine Barrels & Drums",
      status: "Completed",
      statusType: "completed",
      date: "Completed",
      description: "Researched and conceptualized a sustainable, ultra-low-cost engineering prototype for manufacturing liquid storage barrels and drums. Focuses on minimizing materials cost while maintaining structural integrity.",
      tags: ["Engineering Design", "Materials Research", "Cost Optimization", "Sustainability"],
      color: "border-green-500 bg-green-500/5 text-green-500"
    }
  ];

  return (
    <section id="projects" className="bg-white text-gray-900 pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:60px_60px] border-t border-gray-100">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div data-aos="fade-up" className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-[#ff2a2a] uppercase">My Work</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-none mt-2 uppercase tracking-tighter">
              Featured Projects
            </h2>
          </div>
          <p className="text-gray-500 text-sm md:text-base font-semibold max-w-sm">
            A selection of deep-learning projects, automated AI solutions, and engineering designs built using modern frameworks.
          </p>
        </div>

        {/* Projects Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, idx) => (
            <div 
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="bg-[#fcfcfc] border border-gray-200 rounded-3xl p-8 flex flex-col justify-between hover:scale-[1.03] transition-all duration-500 hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] hover:border-gray-300 relative group min-h-[360px]"
            >
              <div>
                {/* Status and Date */}
                <div className="flex justify-between items-center mb-6">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${project.color}`}>
                    {project.status}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 font-mono">
                    {project.date}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-black text-gray-950 mb-3 tracking-tight leading-snug group-hover:text-[#ff2a2a] transition-colors">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-sm text-gray-600 leading-relaxed font-semibold mb-6">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="px-2.5 py-1 bg-gray-100 text-[10px] font-bold text-gray-600 rounded-md uppercase tracking-wider border border-gray-200/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Background graphic elements */}
      <div className="absolute left-0 top-1/4 w-72 h-72 bg-gradient-to-tr from-gray-100 to-transparent rounded-full pointer-events-none z-0"></div>
    </section>
  );
};

export default Projects;
