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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-purple-500/30 selection:text-white"
    >
      <Helmet>
        <title>Premium AI Resume Builder | Create ATS Friendly Resume Free</title>
        <meta name="description" content="Build your resume with Unformat, the ultimate free online resume builder. Our AI CV maker guarantees ATS-friendly resume templates to help you land your dream job." />
        <meta name="keywords" content="resume builder, cv maker, free resume builder, build your resume, resume maker, create resume online free, online cv maker, ai resume builder, ats friendly resume template, ai cv maker" />
        <link rel="canonical" href="https://unformat.com/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Unformat",
            "operatingSystem": "All",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "Premium AI resume builder providing strict ATS friendly resume templates like Jake's Resume and Harvard Resume."
          })}
        </script>
      </Helmet>

      {/* Interactive Hero Section */}
      <section ref={heroRef} className="pt-32 pb-48 flex flex-col items-center text-center relative overflow-hidden px-8">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8 max-w-4xl leading-[1.1] relative z-10"
        >
          Beat the filters. The <br className="hidden md:block"/> 
          <span className="bg-zinc-800/80 border border-zinc-700 text-white px-4 py-1 rounded-lg mx-2 italic font-medium inline-block -rotate-1 shadow-xl">Harvard</span>
          resume template, built for you.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl leading-relaxed relative z-10 font-medium"
        >
          The ultimate <strong>free resume builder</strong>. Stop fighting with Word doc margins. We took the exact <em>Jake's</em> and <em>Harvard</em> ATS friendly resume templates and wrapped them in an intelligent JSON engine.
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
          {/* Mac UI Window */}
          <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl relative z-10 w-full h-full flex flex-col">
            <div className="h-10 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-2 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
            </div>
            
            <div className="flex-1 flex overflow-hidden">
              {/* Code Editor Side */}
              <div className="w-1/2 h-full bg-zinc-950 border-r border-zinc-800/50 p-6 font-mono text-[13px] overflow-hidden relative">
                {/* Purple glow behind code */}
                <div className="absolute top-0 left-0 w-full h-full bg-purple-900/10 pointer-events-none mix-blend-screen"></div>
                
                <div className="flex gap-4 relative z-10">
                  <div className="text-right select-none text-zinc-600 flex flex-col font-medium">
                    <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span>
                  </div>
                  <div className="text-zinc-300 flex flex-col whitespace-pre">
                    <span><span className="text-[#c678dd]">"experience"</span>: [</span>
                    <span>  &#123;</span>
                    <span>    <span className="text-[#c678dd]">"company"</span>: <span className="text-[#98c379]">"Tech Innovators"</span>,</span>
                    <span>    <span className="text-[#c678dd]">"role"</span>: <span className="text-[#98c379]">"Senior Engineer"</span>,</span>
                    <span>    <span className="text-[#c678dd]">"bullets"</span>: [</span>
                    <span>      <span className="text-[#98c379]">"Built scalable microservices in Node"</span>,</span>
                    <span>      <span className="text-[#98c379]">"Improved API response times by 40%"</span></span>
                    <span>    ]</span>
                    <span>  &#125;</span>
                  </div>
                </div>
              </div>
              
              {/* Preview Side */}
              <div className="w-1/2 h-full bg-zinc-100 p-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply"></div>
                
                <div className="w-full h-full max-w-md bg-white shadow-xl shadow-zinc-200/50 flex flex-col p-8 gap-4 border border-zinc-200/50 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="w-48 h-8 bg-zinc-800 rounded-sm"></div>
                  <div className="w-32 h-2.5 bg-zinc-400 rounded-sm"></div>
                  <div className="w-full h-px bg-zinc-300 my-2"></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <div className="w-40 h-4 bg-zinc-800 rounded-sm"></div>
                    <div className="w-24 h-3 bg-zinc-400 rounded-sm"></div>
                  </div>
                  <div className="w-full h-2 bg-zinc-300 rounded-sm mb-1"></div>
                  <div className="w-5/6 h-2 bg-zinc-300 rounded-sm mb-1"></div>
                  <div className="w-4/6 h-2 bg-zinc-300 rounded-sm"></div>
                </div>
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
              <h3 className="text-xl font-bold text-white mb-2">AI CV Maker</h3>
              <p className="text-sm text-zinc-400">Leverage our AI cv maker to refine bullet points and craft the perfect professional summary. See your PDF update in real-time as you type in the editor, ensuring visual perfection at every step.
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
              <h3 className="text-xl font-bold text-white mb-2">Build Your Resume Free</h3>
              <p className="text-sm text-zinc-400">Export unlimited flawless PDFs using our free resume builder. No hidden paywalls. Create structurally perfect, universally readable PDFs that easily pass through corporate screening algorithms.
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
    </motion.div>
  );
};

export default LandingPage;
