import React from 'react';
import { useResumeStore } from '../store/useResumeStore';
import JakeTemplate from './templates/JakeTemplate';
import HarvardTemplate from './templates/HarvardTemplate';
import ModernSidebarTemplate from './templates/ModernSidebarTemplate';

const PreviewPane = () => {
  const { data } = useResumeStore();

  return (
    <div className="h-full overflow-y-auto bg-slate-200 p-8 flex justify-center custom-scrollbar">
      <div 
        style={{ 
          '--line-height': data.formatting.lineHeight, 
          '--section-margin': `${data.formatting.sectionMargin}px` 
        }}
        className="w-full max-w-[850px] transition-all duration-300"
      >
        <div id="resume-preview-container" className="flex justify-center min-h-[1100px] bg-white">
          {data.activeTemplate === 'jake' && <JakeTemplate data={data} />}
          {data.activeTemplate === 'harvard' && <HarvardTemplate data={data} />}
          {data.activeTemplate === 'modern' && <ModernSidebarTemplate data={data} />}
        </div>
      </div>
    </div>
  );
};

export default PreviewPane;
