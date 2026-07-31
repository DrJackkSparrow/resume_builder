import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Plus, Trash2 } from 'lucide-react';

const CustomSectionForm = ({ sectionId }) => {
  const { data, addCustomSectionItem, updateCustomSectionItem, removeCustomSectionItem } = useResumeStore();
  
  const items = data.customSections[sectionId] || [];

  const handleAdd = () => {
    const newItem = {
      id: `item-${Date.now()}`,
      title: 'New Item',
      subtitle: '',
      date: '',
      description: ''
    };
    addCustomSectionItem(sectionId, newItem);
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg space-y-3 relative group">
          <button
            onClick={() => removeCustomSectionItem(sectionId, item.id)}
            className="absolute top-3 right-3 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Delete Item"
          >
            <Trash2 size={16} />
          </button>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Title</label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateCustomSectionItem(sectionId, item.id, 'title', e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-zinc-600"
                placeholder="e.g. Employee of the Month"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Subtitle / Role</label>
              <input
                type="text"
                value={item.subtitle}
                onChange={(e) => updateCustomSectionItem(sectionId, item.id, 'subtitle', e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-zinc-600"
                placeholder="e.g. Tech Innovators Inc."
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-zinc-400 mb-1">Date</label>
              <input
                type="text"
                value={item.date}
                onChange={(e) => updateCustomSectionItem(sectionId, item.id, 'date', e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-zinc-600"
                placeholder="e.g. Dec 2023"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-zinc-400 mb-1">Description</label>
              <textarea
                value={item.description}
                onChange={(e) => updateCustomSectionItem(sectionId, item.id, 'description', e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-zinc-600 h-20 resize-none"
                placeholder="Description of the item..."
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="w-full py-2 border-2 border-dashed border-zinc-800 text-zinc-400 rounded-lg hover:border-zinc-600 hover:text-zinc-200 transition-colors flex items-center justify-center gap-2 text-sm"
      >
        <Plus size={16} /> Add Item
      </button>
    </div>
  );
};

export default CustomSectionForm;
