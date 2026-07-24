import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';

const inputStyles = "w-full bg-zinc-950 text-zinc-100 border border-zinc-800 rounded p-3 mb-4 focus:border-zinc-400 focus:outline-none transition-colors placeholder-zinc-600 text-sm min-h-[120px] resize-y";
const labelStyles = "block text-xs font-medium text-zinc-500 mb-2 tracking-wide uppercase";

const ObjectiveForm = () => {
  const { data, updateField } = useResumeStore();

  return (
    <div>
      <label className={labelStyles}>Professional Summary</label>
      <textarea 
        value={data.objective} 
        onChange={(e) => updateField('objective', e.target.value)}
        className={inputStyles}
        placeholder="Brief summary of your background and goals..."
      />
    </div>
  );
};

export default ObjectiveForm;
