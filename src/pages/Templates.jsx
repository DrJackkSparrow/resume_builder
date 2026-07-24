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
               <div className="w-full h-full bg-white shadow-lg rounded-sm opacity-90 group-hover:opacity-100 transition-opacity flex flex-col p-4">
                  <div className="h-2 w-1/3 bg-zinc-200 mb-4 rounded"></div>
                  <div className="h-1 w-full bg-zinc-100 mb-2 rounded"></div>
                  <div className="h-1 w-5/6 bg-zinc-100 mb-2 rounded"></div>
                  <div className="h-1 w-4/6 bg-zinc-100 mb-6 rounded"></div>
                  <div className="h-1 w-full bg-zinc-100 mb-2 rounded"></div>
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
               <div className="w-full h-full bg-white shadow-lg rounded-sm opacity-90 group-hover:opacity-100 transition-opacity flex flex-col items-center p-4">
                  <div className="h-2 w-1/2 bg-zinc-200 mb-2 rounded"></div>
                  <div className="h-1 w-1/3 bg-zinc-200 mb-6 rounded"></div>
                  <div className="h-1 w-full bg-zinc-100 mb-2 rounded self-start"></div>
                  <div className="h-1 w-5/6 bg-zinc-100 mb-2 rounded self-start"></div>
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
        </section>
      </div>
    </article>
  );
};

export default Templates;
