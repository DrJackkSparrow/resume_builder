import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Download, Code, Smartphone } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const LandingPage = () => {
  // Setup scroll transforms for the Hero Live Editor window
  const heroRef = useRef(null);
  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Scale up slightly as user scrolls down from top
  const heroWindowScale = useTransform(heroScrollY, [0, 1], [1, 1.1]);
  const heroWindowOpacity = useTransform(heroScrollY, [0, 1], [1, 0]);

  // Setup scroll transforms for the Before & After section
  const beforeAfterRef = useRef(null);
  const { scrollYProgress: baScrollY } = useScroll({
    target: beforeAfterRef,
    offset: ["start start", "end end"]
  });
  
  // Crossfade opacities based on scroll depth
  const beforeOpacity = useTransform(baScrollY, [0, 0.4, 0.6], [1, 1, 0]);
  const afterOpacity = useTransform(baScrollY, [0.4, 0.6, 1], [0, 1, 1]);
  
  // State for interactive slider in feature card
  const [squishValue, setSquishValue] = useState(50);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-purple-500/30 selection:text-white">
      <Helmet>
        <title>Unformat | Premium ATS Resume Builder</title>
      </Helmet>

      {/* Interactive Hero Section */}
      <section ref={heroRef} className="pt-32 pb-48 flex flex-col items-center text-center relative overflow-hidden px-8">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 max-w-4xl leading-[1.1] relative z-10"
        >
          Build the Perfect <br className="hidden md:block"/> ATS-Friendly Resume.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed relative z-10 font-medium"
        >
          Stop fighting with text boxes. Turn your raw data into flawless, high-performance PDFs instantly.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="relative z-10"
        >
          <Link 
            to="/editor" 
            className="group inline-flex items-center gap-2 bg-white text-zinc-950 px-8 py-4 rounded-full text-base font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            Go to Editor
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14m-7-7l7 7-7 7" /></svg>
          </Link>
        </motion.div>

        {/* Hero Visual Mockup */}
        <motion.div 
          style={{ scale: heroWindowScale, opacity: heroWindowOpacity }}
          className="mt-24 relative w-full max-w-5xl aspect-[16/9] rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm overflow-hidden shadow-2xl"
        >
          {/* Intense Purple Central Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/40 rounded-[100%] blur-[80px] pointer-events-none mix-blend-screen"></div>
          
          {/* Mockup Top Bar */}
          <div className="h-12 border-b border-zinc-800/80 bg-zinc-900/50 flex items-center px-4 gap-2 relative z-10">
             <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
             <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
             <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
          </div>
          
          {/* Mockup Content (Code left, Preview right) */}
          <div className="flex h-full relative z-10">
            {/* Left side: Code */}
            <div className="w-1/3 border-r border-zinc-800/80 p-6 font-mono text-[11px] leading-loose text-zinc-400">
               <span className="text-zinc-500">1</span> <span className="text-purple-400">"experience"</span>: [<br/>
               <span className="text-zinc-500">2</span> &nbsp;&nbsp;{'{'}<br/>
               <span className="text-zinc-500">3</span> &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">"company"</span>: <span className="text-emerald-400">"Tech Innovators"</span>,<br/>
               <span className="text-zinc-500">4</span> &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">"role"</span>: <span className="text-emerald-400">"Senior Engineer"</span>,<br/>
               <span className="text-zinc-500">5</span> &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">"bullets"</span>: [<br/>
               <span className="text-zinc-500">6</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400">"Architected microservices..."</span><br/>
               <span className="text-zinc-500">7</span> &nbsp;&nbsp;&nbsp;&nbsp;]<br/>
               <span className="text-zinc-500">8</span> &nbsp;&nbsp;{'}'}<br/>
               <span className="text-zinc-500">9</span> ]
            </div>
            {/* Right side: PDF Preview */}
            <div className="w-2/3 bg-zinc-800/30 p-8 flex justify-center items-start overflow-hidden">
               <div className="w-[70%] h-full bg-white rounded-t shadow-2xl p-6 flex flex-col gap-4 relative">
                  <div className="h-6 w-1/2 bg-zinc-900 rounded-sm"></div>
                  <div className="h-2 w-1/4 bg-zinc-400 rounded-sm"></div>
                  <div className="border-b-2 border-zinc-900 mt-2"></div>
                  <div className="flex justify-between mt-2">
                    <div className="h-3 w-1/3 bg-zinc-800 rounded-sm"></div>
                    <div className="h-3 w-1/6 bg-zinc-300 rounded-sm"></div>
                  </div>
                  <div className="h-2 w-full bg-zinc-200 rounded-sm"></div>
                  <div className="h-2 w-5/6 bg-zinc-200 rounded-sm"></div>
               </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Scroll-Triggered Features 2x2 Grid */}
      <section id="features" className="px-8 lg:px-24 py-32 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Powerful Engine, Premium Results</h2>
            <p className="text-zinc-400 text-lg">Designed for precision. Engineered for impact.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Squish Sliders */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-600 flex flex-col group"
            >
              <div className="h-40 flex items-center justify-center relative mb-6 rounded-xl bg-zinc-950 border border-zinc-800/50 overflow-hidden">
                 <div className="w-3/4">
                    <div className="flex justify-between text-xs text-zinc-500 font-bold mb-2 uppercase tracking-widest">
                      <span>Squish</span><span>Spacing</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={squishValue} 
                      onChange={(e) => setSquishValue(Number(e.target.value))}
                      className="w-full h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-purple-500"
                    />
                    <div className="mt-4 border-l-2 border-purple-500 pl-4 transition-transform duration-100 origin-top" style={{ transform: `scaleY(${0.5 + squishValue/200})` }}>
                       <div className="h-2 w-full bg-zinc-700 rounded mb-2"></div>
                       <div className="h-2 w-3/4 bg-zinc-700 rounded"></div>
                    </div>
                 </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">The 'Squish' Sliders</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                Micro-adjust vertical rhythm and margins to perfectly fit your content onto a single page without breaking ATS layouts.
              </p>
            </motion.div>

            {/* Card 2: AI Enhancer */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-600 flex flex-col group"
            >
              <div className="h-40 flex items-center justify-center relative mb-6 rounded-xl bg-zinc-950 border border-zinc-800/50 overflow-hidden">
                 <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                 <Sparkles className="w-16 h-16 text-amber-500 opacity-50 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" strokeWidth={1} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Bullet Enhancer</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                Transform weak responsibilities into high-impact, quantified achievements instantly using advanced language models.
              </p>
            </motion.div>

            {/* Card 3: Live Dual-Pane Preview */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-600 flex flex-col group"
            >
              <div className="h-40 flex items-center justify-center relative mb-6 rounded-xl bg-zinc-950 border border-zinc-800/50 overflow-hidden">
                 <Smartphone className="w-12 h-12 text-blue-400 opacity-50 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Live Dual-Pane Preview</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                See your perfect PDF update in real-time as you type in the editor, ensuring visual perfection at every step.
              </p>
            </motion.div>

            {/* Card 4: 1-Click PDF Export */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-600 flex flex-col group"
            >
              <div className="h-40 flex items-center justify-center relative mb-6 rounded-xl bg-zinc-950 border border-zinc-800/50 overflow-hidden">
                 <Download className="w-12 h-12 text-emerald-400 opacity-50 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-2" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">1-Click PDF Export</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                Download structurally perfect, universally readable PDFs that easily pass through corporate screening algorithms.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* The Before & After Scroll Interaction */}
      {/* We set a tall height so the user scrolls down, scrubbing the animation inside the sticky container */}
      <section ref={beforeAfterRef} className="h-[200vh] relative border-t border-zinc-900 bg-zinc-950">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-8">
          <div className="text-center z-20 mb-8 mt-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">The Word Doc Nightmare <br/><span className="text-zinc-600">vs.</span> JSON Precision.</h2>
            <p className="text-zinc-400 text-lg">Scroll to see the transformation.</p>
          </div>
          
          <div className="relative w-full max-w-4xl aspect-[4/3] md:aspect-[16/9] max-h-[60vh]">
            {/* The "Before" Chaotic Word Doc */}
            <motion.div 
              style={{ opacity: beforeOpacity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-2/3 h-full bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-8 flex flex-col gap-4 rotate-3">
                 <div className="text-red-400 text-xl font-bold mb-4">Jhon Doe Resume.doc</div>
                 <div className="flex gap-4">
                   <div className="h-4 w-1/3 bg-zinc-700/50 -translate-y-2 rounded"></div>
                   <div className="h-4 w-1/2 bg-zinc-700/50 translate-y-3 rounded"></div>
                 </div>
                 <div className="border-b-2 border-red-900/30 w-[110%] -ml-4 rotate-2 mt-4"></div>
                 <div className="h-4 w-3/4 bg-zinc-700/50 translate-x-4 rounded"></div>
                 <div className="h-4 w-full bg-zinc-700/50 -translate-x-2 rounded"></div>
                 <div className="absolute right-4 bottom-12 w-16 h-16 bg-red-500/20 rounded-full blur-md"></div>
              </div>
            </motion.div>

            {/* The "After" Pristine JSON Grid */}
            <motion.div 
              style={{ opacity: afterOpacity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Subtle green glow of perfection */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[80px]"></div>
              
              <div className="w-2/3 h-full bg-white border border-zinc-700 rounded-xl shadow-2xl p-8 flex flex-col gap-4 relative z-10">
                 <div className="flex justify-between items-center mb-6">
                    <div className="text-zinc-900 text-2xl font-black">Jane Doe</div>
                    <div className="h-2 w-16 bg-emerald-400 rounded-full"></div>
                 </div>
                 <div className="border-b-[1.5px] border-zinc-900 mb-2"></div>
                 <div className="grid grid-cols-4 gap-4 mb-2">
                    <div className="col-span-1 h-3 bg-zinc-800 rounded-sm"></div>
                    <div className="col-span-3 h-3 bg-zinc-300 rounded-sm"></div>
                 </div>
                 <div className="grid grid-cols-4 gap-4 mb-2">
                    <div className="col-span-1 h-3 bg-zinc-800 rounded-sm"></div>
                    <div className="col-span-3 h-3 bg-zinc-300 rounded-sm"></div>
                 </div>
                 <div className="border-b border-zinc-200 my-2"></div>
                 <div className="flex justify-between mt-2">
                   <div className="h-3 w-1/3 bg-zinc-800 rounded-sm"></div>
                   <div className="h-3 w-1/6 bg-zinc-400 rounded-sm"></div>
                 </div>
                 <div className="h-2 w-full bg-zinc-300 rounded-sm"></div>
                 <div className="h-2 w-5/6 bg-zinc-300 rounded-sm"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
