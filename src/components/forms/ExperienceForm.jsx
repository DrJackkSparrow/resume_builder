import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { useUser } from '../../contexts/UserContext';
import { Plus, Trash2, PlusCircle, Sparkles } from 'lucide-react';

const inputStyles = "w-full bg-zinc-950 text-zinc-100 border-b border-zinc-800 pb-1.5 mb-3 focus:border-zinc-400 focus:outline-none transition-colors placeholder-zinc-700 text-sm";
const labelStyles = "block text-[10px] font-medium text-zinc-500 mb-1 tracking-wider uppercase";
const buttonStyles = "flex items-center justify-center gap-2 w-full py-2.5 border border-dashed border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 hover:bg-zinc-900 transition-all rounded-lg text-sm font-medium";

const ExperienceForm = () => {
  const { data, updateArrayItem, addArrayItem, removeArrayItem, addExperienceBullet, removeExperienceBullet, updateExperienceBullet } = useResumeStore();
  const { currentUser, openPaywall } = useUser();
  const [enhancingBullets, setEnhancingBullets] = useState(new Set());

  const handleEnhance = async (expId, bulletId, text) => {
    if (!text.trim()) return;
    
    if (currentUser?.tier === 'free') {
      openPaywall('ai_enhance');
      return;
    }
    
    // Set loading state
    setEnhancingBullets((prev) => new Set(prev).add(bulletId));
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Mock XYZ formula enhancement
    const enhancedText = `Spearheaded ${text.toLowerCase()} to achieve a 40% increase in efficiency by implementing advanced frameworks.`;
    
    updateExperienceBullet(expId, bulletId, enhancedText);
    
    // Remove loading state
    setEnhancingBullets((prev) => {
      const next = new Set(prev);
      next.delete(bulletId);
      return next;
    });
  };

  const handleAddExperience = () => {
    addArrayItem('experience', {
      id: `exp-${Date.now()}`,
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      location: '',
      bullets: [{ id: `b-${Date.now()}`, text: '' }]
    });
  };

  return (
    <div className="space-y-6">
      {data.experience.map((exp) => (
        <div key={exp.id} className="relative p-5 bg-zinc-900/50 border border-zinc-800 rounded-lg group">
          <button 
            onClick={() => removeArrayItem('experience', exp.id)}
            className="absolute top-3 right-3 text-zinc-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
            title="Remove Experience"
          >
            <Trash2 size={16} />
          </button>

          <div className="grid grid-cols-2 gap-x-4 mb-4">
            <div className="col-span-1">
              <label className={labelStyles}>Company</label>
              <input 
                type="text" 
                value={exp.company}
                onChange={(e) => updateArrayItem('experience', exp.id, 'company', e.target.value)}
                className={inputStyles}
                placeholder="Company Name"
              />
            </div>
            <div className="col-span-1">
              <label className={labelStyles}>Role</label>
              <input 
                type="text" 
                value={exp.role}
                onChange={(e) => updateArrayItem('experience', exp.id, 'role', e.target.value)}
                className={inputStyles}
                placeholder="Job Title"
              />
            </div>
            <div className="col-span-1">
              <label className={labelStyles}>Location</label>
              <input 
                type="text" 
                value={exp.location}
                onChange={(e) => updateArrayItem('experience', exp.id, 'location', e.target.value)}
                className={inputStyles}
                placeholder="City, State"
              />
            </div>
            <div className="col-span-1 flex gap-2">
              <div className="w-1/2">
                <label className={labelStyles}>Start</label>
                <input 
                  type="text" 
                  value={exp.startDate}
                  onChange={(e) => updateArrayItem('experience', exp.id, 'startDate', e.target.value)}
                  className={inputStyles}
                  placeholder="MM/YYYY"
                />
              </div>
              <div className="w-1/2">
                <label className={labelStyles}>End</label>
                <input 
                  type="text" 
                  value={exp.endDate}
                  onChange={(e) => updateArrayItem('experience', exp.id, 'endDate', e.target.value)}
                  className={inputStyles}
                  placeholder="Present"
                />
              </div>
            </div>
          </div>

          <div>
            <label className={labelStyles}>Accomplishments</label>
            <div className="space-y-2 mt-2">
              {exp.bullets.map((bullet) => (
                <div key={bullet.id} className="flex gap-2 items-start">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-700 shrink-0"></div>
                  <textarea 
                    value={bullet.text}
                    onChange={(e) => updateExperienceBullet(exp.id, bullet.id, e.target.value)}
                    className="flex-1 bg-transparent text-zinc-200 border-b border-transparent hover:border-zinc-800 focus:border-zinc-500 focus:outline-none transition-colors text-sm pb-1 min-h-[30px] resize-y"
                    placeholder="Describe your achievement..."
                  />
                  <div className="flex flex-col gap-1 items-center mt-0.5">
                    <button 
                      onClick={() => handleEnhance(exp.id, bullet.id, bullet.text)}
                      disabled={enhancingBullets.has(bullet.id) || !bullet.text.trim()}
                      className={`p-1.5 rounded-md transition-all flex items-center justify-center ${
                        enhancingBullets.has(bullet.id) 
                          ? 'text-amber-500 bg-amber-500/10 animate-pulse' 
                          : 'text-zinc-500 hover:text-amber-400 hover:bg-zinc-800'
                      }`}
                      title="AI Enhance"
                    >
                      <Sparkles size={14} className={enhancingBullets.has(bullet.id) ? 'animate-spin' : ''} />
                    </button>
                    <button 
                      onClick={() => removeExperienceBullet(exp.id, bullet.id)}
                      className="p-1.5 text-zinc-600 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                      title="Remove Bullet"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => addExperienceBullet(exp.id, { id: `b-${Date.now()}`, text: '' })}
              className="mt-3 flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              <PlusCircle size={14} /> Add Bullet
            </button>
          </div>
        </div>
      ))}
      
      <button onClick={handleAddExperience} className={buttonStyles}>
        <Plus size={16} /> Add Experience
      </button>
    </div>
  );
};

export default ExperienceForm;
