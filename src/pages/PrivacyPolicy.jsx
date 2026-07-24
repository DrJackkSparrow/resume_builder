import React from 'react';

const PrivacyPolicy = () => {
  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100 font-sans py-24 px-8 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <header>
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-zinc-400 mb-12">Last Updated: July 24, 2026</p>
        </header>
        
        <div className="space-y-8 text-zinc-400 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-zinc-300 mb-4">Data Collection</h2>
            <p>
              When you use Unformat, we collect the personal and professional information you explicitly provide to us via our editor interface. This includes your name, email address, contact information, and the professional data entered into the resume JSON schema (such as your work experience, education history, and skills). 
              If you authenticate using Google OAuth, we also collect your primary email address and basic profile information to create your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-300 mb-4">Data Usage</h2>
            <p>
              The information we collect is used strictly for the purpose of rendering your resume PDFs. We value your privacy and professional integrity. Your user resume data is never sold to third-party recruiters, job boards, or data brokers. Your session data is temporarily stored solely to allow you to seamlessly generate and download your perfectly formatted documents.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-300 mb-4">Cookies & Tracking</h2>
            <p>
              Unformat utilizes standard session cookies to maintain your authentication state and ensure a continuous experience across the platform. We may also use essential analytics cookies to monitor site performance and aggregate usage statistics. You can control or disable cookies through your browser settings, though this may impact your ability to remain logged into your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-300 mb-4">Data Deletion</h2>
            <p>
              You have the right to request the complete removal of your information from our systems. If you wish to permanently delete your account and all associated JSON data, please contact our support team at privacy@unformat.com with your account email. Upon verification, your data will be permanently expunged within 30 days.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
};

export default PrivacyPolicy;
