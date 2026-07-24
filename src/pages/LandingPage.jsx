import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Download, Code, Smartphone } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white">
      <Helmet>
        <title>Unformat | Free ATS-Friendly Resume Builder</title>
        <meta name="description" content="Build flawless, ATS-optimized resumes instantly. Unformat uses JSON-driven templates to guarantee perfect margins and ATS parser compatibility." />
        <meta name="keywords" content="ATS-friendly resume templates, resume builder SaaS, JSON resume generator, ATS resume checker, Harvard resume template, reverse-chronological resume" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Unformat | Free ATS-Friendly Resume Builder" />
        <meta property="og:description" content="Build flawless, ATS-optimized resumes instantly. Unformat uses JSON-driven templates to guarantee perfect margins and ATS parser compatibility." />
        <meta property="og:image" content="/unformat_logo.jpg" />
      </Helmet>

      {/* Hero Section */}
      <section className="px-8 lg:px-24 pt-24 pb-32 flex flex-col items-center text-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-900/20 rounded-full blur-[120px] pointer-events-none"></div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 max-w-4xl leading-[1.1] relative z-10">
          Build the Perfect <br className="hidden md:block"/> ATS-Friendly Resume.
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed relative z-10">
          Stop fighting with text boxes and broken margins. Turn your raw data into flawless, high-performance PDFs instantly.
        </p>
        
        <Link 
          to="/editor" 
          className="bg-white text-zinc-950 px-8 py-4 rounded-md text-base font-bold hover:bg-zinc-200 transition-colors relative z-10"
        >
          Start Building (Free)
        </Link>

        {/* Hero Visual Construction */}
        <div className="mt-20 relative w-full max-w-5xl aspect-video rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden group">
          {/* Main illustration */}
          <img 
            src="/hero_illustration.jpg" // Note: we need to ensure this path resolves correctly in Vite public folder
            alt="Minimalist line art of character slicing through tangled web" 
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Floating UI Card 1 */}
          <div className="absolute top-12 left-12 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 p-4 rounded-xl shadow-2xl flex items-center gap-4 animate-[float_6s_ease-in-out_infinite]">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">ATS Parse Rate</div>
              <div className="text-2xl font-bold text-emerald-400">100%</div>
            </div>
          </div>

          {/* Floating UI Card 2 */}
          <div className="absolute bottom-16 right-12 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 p-5 rounded-xl shadow-2xl animate-[float_8s_ease-in-out_infinite_reverse]">
            <div className="flex items-center gap-2 mb-3 border-b border-zinc-800 pb-2">
              <Code size={16} className="text-zinc-500" />
              <span className="text-xs font-mono text-zinc-500">resume.json</span>
            </div>
            <pre className="text-[11px] font-mono leading-relaxed text-zinc-400">
<span className="text-zinc-300">"experience"</span>: [
  {'{'}
    <span className="text-zinc-300">"company"</span>: <span className="text-amber-300">"Acme Corp"</span>,
    <span className="text-zinc-300">"role"</span>: <span className="text-amber-300">"Senior Dev"</span>
  {'}'}
]
            </pre>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="px-8 lg:px-24 py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 mb-6">
              <span className="font-bold text-lg">!</span>
            </div>
            <h3 className="text-2xl font-bold text-white">The Word Doc Nightmare.</h3>
            <p className="text-zinc-400 leading-relaxed text-sm">
              Traditional builders break when you adjust a margin. Elements float, pages spill over, and ATS parsers fail to read the data.
            </p>
          </div>

          <div className="aspect-square rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-900 relative">
             <img 
              src="/problem_solution_illustration.jpg"
              alt="Split screen showing chaos vs grid layout" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-white">JSON-Driven Precision.</h3>
            <p className="text-zinc-400 leading-relaxed text-sm">
              Unformat separates your data from the design. Fill out a simple form, and our engine dynamically renders your resume into industry-standard templates.
            </p>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="px-8 lg:px-24 py-24 bg-zinc-900/20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Powerful Features for Smart Formatting</h2>
            <p className="text-zinc-400">Everything you need to bypass the filters and look professional.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Sliders (Wide) */}
            <div className="col-span-1 lg:col-span-2 bg-zinc-950 border border-zinc-800 rounded-2xl p-8 flex flex-col justify-between group">
              <div className="w-full max-w-md mx-auto mb-12 mt-4 relative">
                <div className="h-1.5 w-full bg-zinc-800 rounded-full">
                  <div className="h-full bg-white w-2/3 rounded-full relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-zinc-950 rounded-full shadow-lg"></div>
                  </div>
                </div>
                <div className="flex justify-between mt-3 text-[10px] uppercase font-bold tracking-widest text-zinc-600">
                  <span>Compact</span>
                  <span>Spacious</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">The 'Squish' Sliders</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Micro-adjust line heights and section spacing to perfectly fit your content onto a single page without breaking the layout.
                </p>
              </div>
            </div>

            {/* Card 2: AI Enhancer */}
            <div className="col-span-1 bg-zinc-950 border border-zinc-800 rounded-2xl p-8 flex flex-col justify-between group">
              <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/10 flex items-center justify-center mb-12 mt-4 group-hover:scale-110 transition-transform">
                <Sparkles size={32} className="text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">AI Bullet Enhancer</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Instantly rewrite weak experience bullets into high-impact, quantified statements using the XYZ formula.
                </p>
              </div>
            </div>

            {/* Card 3: Live Preview */}
            <div className="col-span-1 lg:col-span-1 bg-zinc-950 border border-zinc-800 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6">
                <Smartphone size={24} className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Live Dual-Pane Preview</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                See your perfect PDF update in real-time as you type in the editor.
              </p>
            </div>

            {/* Card 4: Export */}
            <div className="col-span-1 lg:col-span-2 bg-zinc-950 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 relative z-10">
                <Download size={24} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 relative z-10">1-Click ATS-Proof Export</h3>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-md relative z-10">
                Download structurally perfect PDFs that easily pass through corporate screening algorithms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-zinc-950 border-t border-zinc-900 pt-32 pb-32 px-8 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Land the Interview.</h2>
        <p className="text-zinc-400 mb-10 max-w-xl">
          Join the job seekers using Unformat to bypass the filters and get noticed.
        </p>
        <Link 
          to="/editor" 
          className="bg-white text-zinc-950 px-8 py-3.5 rounded-md text-base font-bold hover:bg-zinc-200 transition-colors"
        >
          Open the Editor
        </Link>
      </section>
      {/* Required for the floating animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
      `}} />
    </div>
  );
};

export default LandingPage;
