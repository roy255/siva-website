import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Contact = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax translation for the big text
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);

  return (
    <section ref={ref} id="contact" className="bg-[#0a0a0a] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 md:pb-0 border-t border-gray-900">
      {/* Huge Background Text */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12"
      >
        <div 
          className="text-[25vw] leading-[0.75] font-black text-white uppercase tracking-tighter select-none scale-y-[1.6] origin-top"
          style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
        >
          Contact
        </div>
      </motion.div>

      {/* Form Card Overlay */}
      <div className="relative z-10 w-full flex justify-end items-end">
        <div 
          data-aos="fade-up"
          className="bg-[#ff2a2a] w-full md:w-[85%] lg:w-[75%] p-8 md:p-16 text-white flex flex-col justify-between"
        >
          <div className="text-xs font-bold tracking-[0.2em] mb-4 uppercase opacity-90">
            Let's Connect
          </div>

          {/* Quick Connect Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            {/* WhatsApp Link Button */}
            <a 
              href="https://wa.me/919515194284?text=Hi%20Bhanu%20Shankar,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20career%20opportunity%20at%20[Company%20Name]."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-emerald-600 text-white font-bold hover:bg-emerald-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.967C16.688 2.008 14.217.986 11.59.986c-5.444 0-9.87 4.373-9.874 9.802-.001 1.733.457 3.424 1.326 4.928l-.997 3.642 3.731-.968zM17.41 14.86c-.318-.16-.1.08-.853-.418-.114-.076-.227-.114-.34-.114-.114 0-.227.038-.34.114l-.454.341c-.114.076-.227.114-.34.114-.114 0-.227-.038-.34-.114l-1.362-.909c-1.136-.757-1.704-1.363-2.158-1.931-.114-.152-.076-.265.038-.379l.341-.341c.114-.114.152-.227.076-.341l-.681-1.591c-.076-.189-.227-.265-.454-.265-.114 0-.227.038-.34.114l-.454.455c-.265.265-.417.606-.417.985 0 .795.379 1.628.985 2.386 1.136 1.363 2.651 2.386 4.317 2.878.379.114.795.152 1.174.038.53-.152.985-.53 1.212-1.023l.189-.455c.076-.114.038-.265-.076-.341z"/>
              </svg>
              Chat on WhatsApp
            </a>

            {/* Gmail Link Button */}
            <a 
              href="mailto:balabanu676@gmail.com?subject=Recruiting%20Inquiry%20/%20Job%20Opportunity%20-%20Bhanu%20Shankar&body=Hi%20Bhanu%20Shankar,%0d%0a%0d%0aI%20visited%20your%20portfolio%20and%20am%20interested%20in%20discussing%20a%20career%20opportunity%20at%20our%20company.%0d%0a%0d%0aBest%20regards,%0d%0a[Recruiter%20Name]%0d%0a[Company%20Name]"
              className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-black/30 border border-white/20 text-white font-bold hover:bg-black/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Email (balabanu676@gmail.com)
            </a>
          </div>

          <div className="text-[9px] font-bold tracking-[0.15em] mb-8 uppercase opacity-60 text-center select-none">
            &mdash; Or Send a Message via Email App &mdash;
          </div>

          <form 
            action="https://formspree.io/f/{{your_formspree_id}}" 
            method="POST" 
            onSubmit={(e) => {
              const formAction = e.currentTarget.action;
              // If Formspree ID is not configured, fallback to client-side mailto
              if (formAction.includes("{{your_formspree_id}}")) {
                e.preventDefault();
                const firstName = document.getElementById("firstName")?.value || "";
                const lastName = document.getElementById("lastName")?.value || "";
                const email = document.getElementById("email")?.value || "";
                const message = document.getElementById("message")?.value || "";
                
                const subject = encodeURIComponent(`Hiring Inquiry - ${firstName} ${lastName}`);
                const body = encodeURIComponent(`Hello Bhanu,\n\nI visited your portfolio and would like to discuss a job/career opportunity.\n\nSender: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage/Opportunity Details:\n${message}`);
                window.location.href = `mailto:balabanu676@gmail.com?subject=${subject}&body=${body}`;
              }
            }}
            className="flex flex-col gap-12 md:gap-16 w-full"
          >
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 w-full">
              {/* Left Column */}
              <div className="flex-1 flex flex-col gap-10">
                <div className="relative">
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName"
                    placeholder="First Name" 
                    required
                    className="w-full bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white font-medium rounded-none"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName"
                    placeholder="Last Name" 
                    required
                    className="w-full bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white font-medium rounded-none"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    placeholder="Email" 
                    required
                    className="w-full bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white font-medium rounded-none"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-col">
                <div className="relative h-full flex flex-col">
                  <textarea 
                    id="message" 
                    name="message"
                    placeholder="Type your message here" 
                    required
                    className="w-full h-full min-h-[120px] bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white font-medium resize-none rounded-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row gap-12 mt-4">
              {/* Left text */}
              <div className="flex-1 flex items-start gap-4 text-sm font-medium text-white/90">
                <input 
                  type="checkbox" 
                  id="permission" 
                  name="permission"
                  required
                  className="mt-1 w-4 h-4 rounded-sm border-white/40 bg-transparent text-white focus:ring-white focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer" 
                  style={{ accentColor: "white" }}
                />
                <label htmlFor="permission" className="cursor-pointer max-w-[280px] leading-snug">
                  I give permission to contact me at this email address.
                </label>
              </div>

              {/* Right text & button */}
              <div className="flex-1 flex flex-col gap-8 text-xs text-white/70 font-medium">
                <p className="leading-relaxed max-w-[400px]">
                  This site is protected by reCAPTCHA and the Google <a href="#" className="underline hover:text-white transition-colors">Privacy Policy</a> and <a href="#" className="underline hover:text-white transition-colors">Terms of Service</a> apply.
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
                  <p className="max-w-[250px] leading-relaxed">
                    For information on how to unsubscribe, please review our <a href="#" className="underline hover:text-white transition-colors">privacy policy</a>.
                  </p>
                  
                  <button 
                    type="submit" 
                    className="px-8 py-3 rounded-full border border-white/40 text-white font-bold flex items-center justify-center gap-3 hover:bg-white hover:text-[#ff2a2a] transition-all duration-300 group whitespace-nowrap self-start sm:self-auto cursor-pointer"
                  >
                    Send Message
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;
