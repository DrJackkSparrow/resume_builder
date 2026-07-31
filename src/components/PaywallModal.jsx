import React from 'react';
import { useUser } from '../contexts/UserContext';
import { X, Sparkles, Download, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PaywallModal = () => {
  const { isPaywallOpen, closePaywall, paywallTrigger, upgradeToPass } = useUser();

  if (!isPaywallOpen) return null;

  const triggerConfig = {
    download_limit: {
      title: "Download Limit Reached",
      description: "You've hit your limit of 2 free PDF exports. Upgrade for unlimited, watermark-free downloads.",
      icon: <Download className="w-8 h-8 text-purple-400" />
    },
    premium_template: {
      title: "Premium Template Selected",
      description: "The Modern Sidebar template is a premium feature. Upgrade to export your resume with this design.",
      icon: <Code className="w-8 h-8 text-purple-400" />
    },
    ai_enhance: {
      title: "AI Bullet Enhancer",
      description: "Instantly transform your bullet points into quantifiable, high-impact achievements with Unformat Pro.",
      icon: <Sparkles className="w-8 h-8 text-amber-500" />
    },
    upgrade: {
      title: "Upgrade to Unformat Pro",
      description: "Unlock all premium templates, unlimited downloads, and the full power of our AI Resume Engine.",
      icon: <Sparkles className="w-8 h-8 text-purple-400" />
    }
  };

  const config = triggerConfig[paywallTrigger] || triggerConfig.upgrade;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closePaywall}
          className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg bg-zinc-900 border-2 border-purple-500/50 rounded-2xl shadow-[0_0_40px_rgba(168,85,247,0.15)] overflow-hidden"
        >
          {/* Close button */}
          <button 
            onClick={closePaywall}
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="p-8 pb-6 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-purple-600/30 rounded-full blur-[60px] pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                {config.icon}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{config.title}</h2>
              <p className="text-zinc-400 font-medium">{config.description}</p>
            </div>
          </div>

          {/* Pricing Option */}
          <div className="px-8 pb-8">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                The Killer Offer
              </div>
              
              <div className="flex justify-between items-end mb-6 mt-2">
                <div>
                  <h3 className="text-xl font-bold text-white">7-Day Pass</h3>
                  <p className="text-sm text-zinc-500 font-medium">No auto-renewal trap.</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-white">₹99</div>
                  <div className="text-xs text-zinc-500">~$2 USD</div>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-sm text-zinc-300 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Unlimited PDF downloads
                </li>
                <li className="flex items-center gap-3 text-sm text-zinc-300 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Access to Modern Sidebar template
                </li>
                <li className="flex items-center gap-3 text-sm text-zinc-300 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Unlimited AI Bullet Enhancer usage
                </li>
              </ul>

              <button 
                onClick={upgradeToPass}
                className="w-full py-4 px-4 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-4 h-4 text-purple-200 group-hover:scale-110 transition-transform" />
                Unlock Everything Now
              </button>
            </div>
            
            <p className="text-center text-xs text-zinc-500 mt-6 font-medium">
              Want the Lifetime deal instead? <a href="/#pricing" onClick={closePaywall} className="text-purple-400 hover:text-purple-300 underline underline-offset-2">View all plans</a>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaywallModal;
