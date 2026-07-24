import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Plus, Trash2 } from 'lucide-react';

const inputStyles = "w-full bg-zinc-950 text-zinc-100 border-b border-zinc-800 pb-1.5 mb-3 focus:border-zinc-400 focus:outline-none transition-colors placeholder-zinc-700 text-sm";
const labelStyles = "block text-[10px] font-medium text-zinc-500 mb-1 tracking-wider uppercase";
const buttonStyles = "flex items-center justify-center gap-2 w-full py-2.5 border border-dashed border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 hover:bg-zinc-900 transition-all rounded-lg text-sm font-medium";

const SkillsForm = () => {
  const { data, updateArrayItem, addArrayItem, removeArrayItem } = useResumeStore();

  const handleAddSkillGroup = () => {
    addArrayItem('skills', {
      id: `skill-${Date.now()}`,
      category: '',
      items: ''
    });
  };

  return (
    <div className="space-y-6">
      {data.skills.map((skillGroup) => (
        <div key={skillGroup.id} className="relative p-5 bg-zinc-900/50 border border-zinc-800 rounded-lg group">
          <button 
            onClick={() => removeArrayItem('skills', skillGroup.id)}
            className="absolute top-3 right-3 text-zinc-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
            title="Remove Skill Group"
          >
            <Trash2 size={16} />
          </button>

          <div className="grid grid-cols-1 gap-y-2">
            <div>
              <label className={labelStyles}>Category</label>
              <input 
                type="text" 
                value={skillGroup.category}
                onChange={(e) => updateArrayItem('skills', skillGroup.id, 'category', e.target.value)}
                className={inputStyles}
                placeholder="e.g. Frontend, Backend, Tools"
              />
            </div>
            <div>
              <label className={labelStyles}>Skills (Comma Separated)</label>
              <input 
                type="text" 
                value={skillGroup.items}
                onChange={(e) => updateArrayItem('skills', skillGroup.id, 'items', e.target.value)}
                className={inputStyles}
                placeholder="React, Vue, Angular"
              />
            </div>
          </div>
        </div>
      ))}
      
      <button onClick={handleAddSkillGroup} className={buttonStyles}>
        <Plus size={16} /> Add Skill Group
      </button>
    </div>
  );
};

export default SkillsForm;
