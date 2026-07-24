import React from 'react';
import { useResumeStore } from '../store/useResumeStore';

const FormattingTab = () => {
  const { data, updateFormatting } = useResumeStore();
  const { lineHeight, sectionMargin } = data.formatting;

  return (
    <div className="space-y-8 mt-6">
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-zinc-300">Content Compactness</label>
            <span className="text-xs text-zinc-500 font-mono">{lineHeight.toFixed(2)}</span>
          </div>
          <p className="text-xs text-zinc-500 mb-4">Adjust the line height of your resume text.</p>
          <input
            type="range"
            min="1.1"
            max="1.6"
            step="0.05"
            value={lineHeight}
            onChange={(e) => updateFormatting('lineHeight', parseFloat(e.target.value))}
            className="w-full accent-blue-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-600 mt-2 font-medium uppercase tracking-wider">
            <span>Compact</span>
            <span>Spacious</span>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-800/50">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-zinc-300">Section Spacing</label>
            <span className="text-xs text-zinc-500 font-mono">{sectionMargin}px</span>
          </div>
          <p className="text-xs text-zinc-500 mb-4">Adjust the margin below section headers.</p>
          <input
            type="range"
            min="4"
            max="32"
            step="1"
            value={sectionMargin}
            onChange={(e) => updateFormatting('sectionMargin', parseInt(e.target.value, 10))}
            className="w-full accent-blue-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-600 mt-2 font-medium uppercase tracking-wider">
            <span>Tight</span>
            <span>Loose</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormattingTab;
