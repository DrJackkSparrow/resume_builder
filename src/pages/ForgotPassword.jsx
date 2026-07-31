import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Mocking a successful password reset request
      setIsSubmitted(true);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-[calc(100vh-80px)] bg-zinc-950 flex flex-col items-center justify-center px-4"
    >
      <Helmet>
        <title>Forgot Password | Unformat</title>
        <meta name="description" content="Reset your password for your Unformat account." />
      </Helmet>

      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-zinc-400 hover:text-white transition-colors mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Back to home
        </Link>
        
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-8 sm:p-10">
          <div className="flex items-center justify-center mb-6">
            <img src="/unformat_logo.jpg" alt="Unformat Logo" className="w-10 h-10 rounded-md border border-zinc-800" />
          </div>
          
          <h1 className="text-2xl font-bold text-white text-center mb-2 tracking-tight">
            Reset Password
          </h1>
          
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 text-center"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4 border border-green-500/20">
                <CheckCircle2 size={24} className="text-green-500" />
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                If an account exists for <span className="text-white font-medium">{email}</span>, we have sent a password reset link to it.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Try another email
              </button>
            </motion.div>
          ) : (
            <>
              <p className="text-zinc-400 text-sm text-center mb-8">
                Enter the email address associated with your account, and we'll send you a link to reset your password.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-500 mb-1.5 tracking-wider uppercase">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900 text-zinc-100 border border-zinc-800 rounded-lg px-4 py-3 focus:border-zinc-500 focus:outline-none transition-colors text-sm"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-white text-zinc-950 font-bold py-3 rounded-lg hover:bg-zinc-200 transition-colors mt-2"
                >
                  Send Reset Link
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
