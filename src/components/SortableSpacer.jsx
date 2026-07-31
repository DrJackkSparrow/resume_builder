import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, ArrowDownUp } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';

const SortableSpacer = ({ id }) => {
  const { deleteCustomSection } = useResumeStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  const handleDelete = () => {
    // deleteCustomSection works perfectly for spacers too since it just filters it out from sectionOrder
    deleteCustomSection(id);
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`bg-zinc-900 border border-zinc-800 border-dashed rounded-xl mb-6 overflow-hidden flex items-center justify-between px-4 py-3 group ${
        isDragging ? 'ring-1 ring-zinc-700 shadow-2xl shadow-black' : ''
      }`}
    >
      <div className="flex items-center flex-1">
        <div 
          {...attributes} 
          {...listeners}
          className="mr-3 text-zinc-600 hover:text-zinc-400 cursor-grab active:cursor-grabbing p-1 rounded transition-colors"
        >
          <GripVertical size={18} />
        </div>
        
        <div className="flex items-center gap-2 text-zinc-500">
          <ArrowDownUp size={14} />
          <span className="text-sm font-semibold uppercase tracking-wider">Space Block</span>
        </div>
      </div>
      
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleDelete}
          className="p-1.5 text-zinc-600 hover:text-red-400 rounded transition-colors"
          title="Delete Spacer"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default SortableSpacer;
