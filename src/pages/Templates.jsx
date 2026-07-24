import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useResumeStore } from '../store/useResumeStore';

const Templates = () => {
  const navigate = useNavigate();
  const { setActiveTemplate } = useResumeStore();

  const handleUseTemplate = (templateId) => {
    setActiveTemplate(templateId);
    navigate('/editor');
  };

  return (
    <article className="min-h-screen bg-zinc-950 text-zinc-100 font-sans py-24 px-8 lg:px-24">
      <Helmet>
        <title>High-Performance Resume Templates | Unformat</title>
        <meta name="description" content="Browse our gallery of minimalist, code-driven resume templates proven to beat Applicant Tracking Systems, including the industry-standard Harvard and Jake's templates." />
        <meta name="keywords" content="best ATS templates 2026, Jake's resume template, single-column resume, tech resume layouts" />
      </Helmet>
      
      <div className="max-w-7xl mx-auto text-center">
        <header>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">ATS-Optimized Resume Templates</h1>
          <p className="text-lg text-zinc-400 mb-16 max-w-2xl mx-auto">
            Minimalist, code-driven layouts proven to beat the algorithms.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {/* Template Card 1 */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden group hover:border-zinc-600 transition-colors">
            <div className="h-64 bg-zinc-800/50 p-6 flex items-center justify-center">
               <div className="w-full h-full bg-white shadow-lg rounded-sm opacity-90 group-hover:opacity-100 transition-all duration-300 flex flex-col p-3 overflow-hidden border border-zinc-200">
                  {/* Harvard Style: Left aligned header, clear sections */}
                  <div className="h-3 w-1/3 bg-zinc-900 mb-1 rounded"></div>
                  <div className="h-1 w-1/2 bg-zinc-400 mb-3 rounded"></div>
                  <div className="w-full border-b border-zinc-800 mb-2"></div>
                  
                  <div className="flex justify-between mb-1">
                    <div className="h-1.5 w-1/4 bg-zinc-800 rounded"></div>
                    <div className="h-1 w-1/6 bg-zinc-400 rounded"></div>
                  </div>
                  <div className="h-1 w-1/3 bg-zinc-300 mb-2 rounded"></div>
                  
                  <div className="w-full border-b border-zinc-800 mb-2 mt-2"></div>
                  <div className="flex justify-between mb-1">
                    <div className="h-1.5 w-1/4 bg-zinc-800 rounded"></div>
                    <div className="h-1 w-1/6 bg-zinc-400 rounded"></div>
                  </div>
                  <div className="h-1 w-full bg-zinc-300 mb-1 rounded"></div>
                  <div className="h-1 w-5/6 bg-zinc-300 mb-1 rounded"></div>
                  <div className="h-1 w-4/6 bg-zinc-300 rounded"></div>
               </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">The Harvard</h3>
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                The gold standard for business, finance, and general professional roles. Strict reverse-chronological, text-based, and heavily ATS-optimized.
              </p>
              <button 
                onClick={() => handleUseTemplate('harvard')}
                className="text-sm font-semibold text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md transition-colors inline-block"
              >
                Use this Template
              </button>
            </div>
          </div>

          {/* Template Card 2 */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden group hover:border-zinc-600 transition-colors">
            <div className="h-64 bg-zinc-800/50 p-6 flex items-center justify-center">
               <div className="w-full h-full bg-white shadow-lg rounded-sm opacity-90 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center p-3 overflow-hidden border border-zinc-200">
                  {/* Jake's Style: Centered heavy header, dense text */}
                  <div className="h-3 w-1/2 bg-zinc-900 mb-1.5 rounded"></div>
                  <div className="flex gap-1 mb-2 w-full justify-center">
                    <div className="h-1 w-1/6 bg-zinc-400 rounded"></div>
                    <div className="h-1 w-1/6 bg-zinc-400 rounded"></div>
                    <div className="h-1 w-1/6 bg-zinc-400 rounded"></div>
                  </div>
                  <div className="w-full border-b-[1.5px] border-zinc-900 mb-1"></div>
                  
                  <div className="flex justify-between w-full mb-0.5">
                    <div className="h-1 w-1/3 bg-zinc-800 rounded"></div>
                    <div className="h-1 w-1/6 bg-zinc-400 rounded"></div>
                  </div>
                  <div className="flex justify-between w-full mb-1">
                    <div className="h-1 w-1/4 bg-zinc-400 rounded"></div>
                    <div className="h-1 w-1/6 bg-zinc-400 rounded"></div>
                  </div>
                  <div className="h-1 w-full bg-zinc-300 mb-0.5 rounded self-start ml-2"></div>
                  <div className="h-1 w-11/12 bg-zinc-300 mb-0.5 rounded self-start ml-2"></div>
                  <div className="h-1 w-full bg-zinc-300 mb-2 rounded self-start ml-2"></div>
               </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Jake's Resume</h3>
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                The undisputed champion for tech and engineering. Originally built in LaTeX, optimized for dense technical skills and projects.
              </p>
              <button 
                onClick={() => handleUseTemplate('jake')}
                className="text-sm font-semibold text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md transition-colors inline-block"
              >
                Use this Template
              </button>
            </div>
          </div>

          {/* Coming Soon Card */}
          <div className="bg-zinc-900/50 border border-zinc-800 border-dashed rounded-xl overflow-hidden flex flex-col">
            <div className="h-64 bg-zinc-900/30 p-6 flex items-center justify-center relative">
               <div className="w-full h-full bg-zinc-900 shadow-sm rounded-sm opacity-50 flex flex-col items-center justify-center border border-zinc-800">
                  <svg className="w-8 h-8 text-zinc-700 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <span className="text-xs text-zinc-600 font-medium tracking-widest uppercase">Drafting</span>
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-xl font-bold text-zinc-500 mb-2">Modern Creative</h3>
              <p className="text-sm text-zinc-600 mb-6 leading-relaxed flex-grow">
                A highly requested 2-column layout designed for creative professionals, marketing, and design roles. Currently in development.
              </p>
              <button 
                disabled
                className="text-sm font-semibold text-zinc-600 bg-zinc-900/50 border border-zinc-800 px-4 py-2 rounded-md cursor-not-allowed inline-block w-fit"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};

export default Templates;
