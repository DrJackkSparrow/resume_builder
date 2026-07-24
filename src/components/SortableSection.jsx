import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

const SortableSection = ({ id, title, children }) => {
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

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`bg-zinc-950 border border-zinc-800 rounded-xl mb-6 overflow-hidden ${
        isDragging ? 'ring-1 ring-zinc-700 shadow-2xl shadow-black' : ''
      }`}
    >
      <div className="flex items-center bg-zinc-900 border-b border-zinc-800 px-4 py-3">
        <div 
          {...attributes} 
          {...listeners}
          className="mr-3 text-zinc-500 hover:text-zinc-300 cursor-grab active:cursor-grabbing p-1 rounded transition-colors"
        >
          <GripVertical size={18} />
        </div>
        <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider">{title}</h3>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default SortableSection;
