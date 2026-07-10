import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Skills = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  const technicalSkills = [
    {
      category: "Programming Languages",
      skills: ["C", "Python", "Java"]
    },
    {
      category: "Web Development",
      skills: ["HTML", "CSS", "Bootstrap", "JavaScript"]
    },
    {
      category: "Databases",
      skills: ["SQL", "MySQL", "MongoDB"]
    },
    {
      category: "AI & Prompting",
      skills: ["Prompt Engineering", "Generative AI Tools", "LLM Interaction Design", "AI Workflow Automation"]
    }
  ];

  const certifications = [
    {
      title: "Foundations of User Experience (UX) Design",
      provider: "Coursera",
      link: "/cert/Coursera google ui-ux designs.pdf"
    },
    {
      title: "AI Prompt Engineering",
      provider: "Google Scaler",
      link: "/cert/google scaler.pdf"
    },
    {
      title: "Virtual Data Analytics",
      provider: "Deloitte",
      link: "/cert/deloitte  data analytis.pdf"
    },
    {
      title: "Java Certificate",
      provider: "HackerRank",
      link: "/cert/java_basic certificate.pdf"
    }
  ];

  const experiences = [
    {
      role: "AI Integrated Full Stack Development Intern",
      company: "Aete IT Services",
      duration: "Jun 2025 - Jul 2025",
      description: "1-month internship focusing on AI integrated full stack development.",
      link: "/cert/interncert.pdf"
    }
  ];

  const achievements = [
    {
      title: "AI Agents Competition",
      detail: "Won 2nd Prize for developing an innovative Voice-Based AI Agent."
    },
    {
      title: "Business Plan Competition",
      detail: "Secured 3rd Place among 100+ participants."
    },
    {
      title: "Student Coordinator – Vel Ideaforge",
      detail: "Led coordination of innovation and ideation events, ensuring seamless execution, active participation, managing team communication, logistics, and event operations."
    }
  ];

  const others = [
    {
      title: "Languages",
      items: ["Telugu", "English", "Hindi", "Tamil"]
    },
    {
      title: "Interests",
      items: ["Exploring New Technologies", "Cricket", "Reading News"]
    },
    {
      title: "Activities",
      items: ["College Anchor (Arts Drama Club)", "Student Coordinator", "Dancer"]
    }
  ];

  return (
    <section id="skills" className="bg-[#0f0f0f] text-white pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div data-aos="fade-up" className="mb-16">
          <span className="text-xs font-bold tracking-[0.2em] text-[#ff2a2a] uppercase">Abilities</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none mt-2 uppercase tracking-tighter">
            Skills & Achievements
          </h2>
        </div>

        {/* Technical Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {technicalSkills.map((item, idx) => (
            <div 
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-red-500 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,42,42,0.15)] group"
            >
              <h3 className="text-xl font-bold mb-4 text-[#ff2a2a] group-hover:text-white transition-colors">
                {item.category}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {item.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="text-sm font-semibold text-zinc-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a2a]"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Experience, Certifications and Achievements Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Experience Column */}
          <div data-aos="fade-right">
            <h3 className="text-2xl font-black mb-8 border-b border-zinc-800 pb-3 uppercase tracking-wider flex items-center gap-3">
              <span className="text-[#ff2a2a]">&bull;</span> Experience
            </h3>
            <div className="flex flex-col gap-6">
              {experiences.map((exp, idx) => (
                <div 
                  key={idx} 
                  className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl hover:bg-zinc-900 transition-colors"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-lg text-white">{exp.role}</h4>
                    {exp.link && (
                      <a 
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-mono text-[#ff2a2a] border border-[#ff2a2a]/30 px-2 py-1 rounded-full bg-[#ff2a2a]/5 uppercase tracking-wider font-bold cursor-pointer hover:bg-[#ff2a2a] hover:text-white transition-colors ml-2 shrink-0"
                      >
                        View Cert
                      </a>
                    )}
                  </div>
                  <p className="text-[#ff2a2a] text-sm font-bold mb-2">{exp.company} <span className="text-zinc-500 font-medium ml-2">| {exp.duration}</span></p>
                  <p className="text-sm text-zinc-400 leading-relaxed font-medium">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Column */}
          <div data-aos="fade-right">
            <h3 className="text-2xl font-black mb-8 border-b border-zinc-800 pb-3 uppercase tracking-wider flex items-center gap-3">
              <span className="text-[#ff2a2a]">&bull;</span> Achievements
            </h3>
            <div className="flex flex-col gap-6">
              {achievements.map((ach, idx) => (
                <div 
                  key={idx} 
                  className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl hover:bg-zinc-900 transition-colors"
                >
                  <h4 className="font-bold text-lg text-white mb-2">{ach.title}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed font-medium">{ach.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div data-aos="fade-left">
            <h3 className="text-2xl font-black mb-8 border-b border-zinc-800 pb-3 uppercase tracking-wider flex items-center gap-3">
              <span className="text-[#ff2a2a]">&bull;</span> Certifications
            </h3>
            <div className="flex flex-col gap-6">
              {certifications.map((cert, idx) => (
                <div 
                  key={idx} 
                  className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl flex items-center justify-between hover:bg-zinc-900 transition-colors"
                >
                  <div>
                    <h4 className="font-bold text-lg text-white">{cert.title}</h4>
                    <p className="text-sm text-zinc-500 font-semibold mt-1">{cert.provider}</p>
                  </div>
                  {cert.link ? (
                    <a 
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-[#ff2a2a] border border-[#ff2a2a]/30 px-3 py-1 rounded-full bg-[#ff2a2a]/5 uppercase tracking-wider font-bold cursor-pointer hover:bg-[#ff2a2a] hover:text-white transition-colors"
                    >
                      View Cert
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-[#ff2a2a] border border-[#ff2a2a]/30 px-3 py-1 rounded-full bg-[#ff2a2a]/5 uppercase tracking-wider font-bold">
                      Verified
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Others Section (Languages, Interests, Extracurriculars) */}
        <div data-aos="fade-up" className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {others.map((oth, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <h4 className="text-lg font-bold text-[#ff2a2a] uppercase tracking-wider">
                  {oth.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {oth.items.map((it, iIdx) => (
                    <span 
                      key={iIdx} 
                      className="px-4 py-2 bg-zinc-900 text-sm font-semibold rounded-full border border-zinc-800 text-zinc-300"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Decorative background grid line */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-gradient-to-t from-red-950/10 to-transparent rounded-full blur-[120px] pointer-events-none z-0"></div>
    </section>
  );
};

export default Skills;
