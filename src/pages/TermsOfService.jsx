import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const TermsOfService = () => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen bg-zinc-950 text-zinc-100 font-sans py-24 px-8 lg:px-24"
    >
      <Helmet>
        <title>Terms of Service | Unformat</title>
        <meta name="description" content="Read the terms of service for Unformat." />
        <link rel="canonical" href="https://unformat.com/terms" />
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <header>
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-zinc-400 mb-12">Last Updated: July 24, 2026</p>
        </header>
        
        <div className="space-y-8 text-zinc-400 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-zinc-300 mb-4">Acceptable Use</h2>
            <p>
              By accessing and using Unformat, you agree to utilize our document-generation platform exclusively for legitimate professional purposes. Users may not use the platform to generate illegal, fraudulent, or maliciously misleading documents. You are solely responsible for ensuring the accuracy and lawfulness of the data you input into the resume JSON schema.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-300 mb-4">Account Termination</h2>
            <p>
              We reserve the right to suspend or permanently terminate any account that violates these Terms of Service. This includes, but is not limited to, unauthorized attempts to access our APIs, scraping of our templates, or utilizing the platform to produce fraudulent materials. We may take such actions without prior notice at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-300 mb-4">Limitation of Liability</h2>
            <p>
              Unformat provides a tool to assist in the creation of ATS-optimized resumes; however, we do not guarantee employment, interviews, or specific career outcomes. Unformat is not responsible for job application outcomes, rejections, or any damages arising from the use of documents generated on our platform. The service is provided "as is" without any warranties, express or implied.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-300 mb-4">Changes to Terms</h2>
            <p>
              We may update these Terms of Service periodically to reflect changes in our platform or legal requirements. Continued use of Unformat after any such modifications constitutes your formal acceptance of the new Terms.
            </p>
          </section>
        </div>
      </div>
    </motion.article>
  );
};

export default TermsOfService;
