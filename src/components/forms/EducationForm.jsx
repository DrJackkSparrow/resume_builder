import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Plus, Trash2 } from 'lucide-react';

const inputStyles = "w-full bg-zinc-950 text-zinc-100 border-b border-zinc-800 pb-1.5 mb-3 focus:border-zinc-400 focus:outline-none transition-colors placeholder-zinc-700 text-sm";
const labelStyles = "block text-[10px] font-medium text-zinc-500 mb-1 tracking-wider uppercase";
const buttonStyles = "flex items-center justify-center gap-2 w-full py-2.5 border border-dashed border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 hover:bg-zinc-900 transition-all rounded-lg text-sm font-medium";

const EducationForm = () => {
  const { data, updateArrayItem, addArrayItem, removeArrayItem } = useResumeStore();

  const handleAddEducation = () => {
    addArrayItem('education', {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      location: ''
    });
  };

  return (
    <div className="space-y-6">
      {data.education.map((edu) => (
        <div key={edu.id} className="relative p-5 bg-zinc-900/50 border border-zinc-800 rounded-lg group">
          <button 
            onClick={() => removeArrayItem('education', edu.id)}
            className="absolute top-3 right-3 text-zinc-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
            title="Remove Education"
          >
            <Trash2 size={16} />
          </button>

          <div className="grid grid-cols-2 gap-x-4">
            <div className="col-span-2">
              <label className={labelStyles}>Institution</label>
              <input 
                type="text" 
                value={edu.institution}
                onChange={(e) => updateArrayItem('education', edu.id, 'institution', e.target.value)}
                className={inputStyles}
                placeholder="University Name"
              />
            </div>
            <div className="col-span-1">
              <label className={labelStyles}>Degree</label>
              <input 
                type="text" 
                value={edu.degree}
                onChange={(e) => updateArrayItem('education', edu.id, 'degree', e.target.value)}
                className={inputStyles}
                placeholder="B.S. Computer Science"
              />
            </div>
            <div className="col-span-1">
              <label className={labelStyles}>Location</label>
              <input 
                type="text" 
                value={edu.location}
                onChange={(e) => updateArrayItem('education', edu.id, 'location', e.target.value)}
                className={inputStyles}
                placeholder="City, State"
              />
            </div>
            <div className="col-span-1 flex gap-2 mt-2">
              <div className="w-1/2">
                <label className={labelStyles}>Start</label>
                <input 
                  type="text" 
                  value={edu.startDate}
                  onChange={(e) => updateArrayItem('education', edu.id, 'startDate', e.target.value)}
                  className={inputStyles}
                  placeholder="YYYY"
                />
              </div>
              <div className="w-1/2">
                <label className={labelStyles}>End</label>
                <input 
                  type="text" 
                  value={edu.endDate}
                  onChange={(e) => updateArrayItem('education', edu.id, 'endDate', e.target.value)}
                  className={inputStyles}
                  placeholder="YYYY"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <button onClick={handleAddEducation} className={buttonStyles}>
        <Plus size={16} /> Add Education
      </button>
    </div>
  );
};

export default EducationForm;
