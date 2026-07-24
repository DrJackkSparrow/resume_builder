import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Plus, Trash2 } from 'lucide-react';

const inputStyles = "w-full bg-zinc-950 text-zinc-100 border-b border-zinc-800 pb-1.5 mb-3 focus:border-zinc-400 focus:outline-none transition-colors placeholder-zinc-700 text-sm";
const labelStyles = "block text-[10px] font-medium text-zinc-500 mb-1 tracking-wider uppercase";
const buttonStyles = "flex items-center justify-center gap-2 w-full py-2.5 border border-dashed border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 hover:bg-zinc-900 transition-all rounded-lg text-sm font-medium";

const ProjectsForm = () => {
  const { data, updateArrayItem, addArrayItem, removeArrayItem } = useResumeStore();

  const handleAddProject = () => {
    addArrayItem('projects', {
      id: `proj-${Date.now()}`,
      title: '',
      technologies: '',
      date: '',
      description: '',
      link: ''
    });
  };

  return (
    <div className="space-y-6">
      {data.projects.map((proj) => (
        <div key={proj.id} className="relative p-5 bg-zinc-900/50 border border-zinc-800 rounded-lg group">
          <button 
            onClick={() => removeArrayItem('projects', proj.id)}
            className="absolute top-3 right-3 text-zinc-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
            title="Remove Project"
          >
            <Trash2 size={16} />
          </button>

          <div className="grid grid-cols-2 gap-x-4">
            <div className="col-span-1">
              <label className={labelStyles}>Project Title</label>
              <input 
                type="text" 
                value={proj.title}
                onChange={(e) => updateArrayItem('projects', proj.id, 'title', e.target.value)}
                className={inputStyles}
                placeholder="AI Resume Builder"
              />
            </div>
            <div className="col-span-1">
              <label className={labelStyles}>Project Link</label>
              <input 
                type="text" 
                value={proj.link}
                onChange={(e) => updateArrayItem('projects', proj.id, 'link', e.target.value)}
                className={inputStyles}
                placeholder="https://github.com/..."
              />
            </div>
            <div className="col-span-1">
              <label className={labelStyles}>Technologies</label>
              <input 
                type="text" 
                value={proj.technologies}
                onChange={(e) => updateArrayItem('projects', proj.id, 'technologies', e.target.value)}
                className={inputStyles}
                placeholder="React, Node.js, Python..."
              />
            </div>
            <div className="col-span-1">
              <label className={labelStyles}>Date</label>
              <input 
                type="text" 
                value={proj.date}
                onChange={(e) => updateArrayItem('projects', proj.id, 'date', e.target.value)}
                className={inputStyles}
                placeholder="Jan 2024 - Present"
              />
            </div>
            <div className="col-span-2 mt-2">
              <label className={labelStyles}>Description</label>
              <textarea 
                value={proj.description}
                onChange={(e) => updateArrayItem('projects', proj.id, 'description', e.target.value)}
                className={`${inputStyles} min-h-[60px] resize-y`}
                placeholder="Describe your project and contributions..."
              />
            </div>
          </div>
        </div>
      ))}
      
      <button onClick={handleAddProject} className={buttonStyles}>
        <Plus size={16} /> Add Project
      </button>
    </div>
  );
};

export default ProjectsForm;
