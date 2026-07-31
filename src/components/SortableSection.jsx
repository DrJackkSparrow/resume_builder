import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Edit2, Check } from 'lucide-react';
import { useResumeStore } from '../store/useResumeStore';

const SortableSection = ({ id, title, children, isCustom }) => {
  const { updateSectionTitle, hideSection, deleteCustomSection } = useResumeStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

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

  const handleTitleSubmit = () => {
    if (editTitle.trim()) {
      updateSectionTitle(id, editTitle);
    } else {
      setEditTitle(title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleTitleSubmit();
    if (e.key === 'Escape') {
      setEditTitle(title);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (isCustom) {
      deleteCustomSection(id);
    } else {
      hideSection(id);
    }
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`bg-zinc-950 border border-zinc-800 rounded-xl mb-6 overflow-hidden ${
        isDragging ? 'ring-1 ring-zinc-700 shadow-2xl shadow-black' : ''
      }`}
    >
      <div className="flex items-center justify-between bg-zinc-900 border-b border-zinc-800 px-4 py-3 group">
        <div className="flex items-center flex-1">
          <div 
            {...attributes} 
            {...listeners}
            className="mr-3 text-zinc-500 hover:text-zinc-300 cursor-grab active:cursor-grabbing p-1 rounded transition-colors"
          >
            <GripVertical size={18} />
          </div>
          
          {isEditing ? (
            <div className="flex items-center flex-1 mr-4">
              <input
                type="text"
                autoFocus
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleTitleSubmit}
                className="bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-sm font-semibold text-white focus:outline-none focus:border-zinc-500 w-full uppercase tracking-wider"
              />
            </div>
          ) : (
            <h3 
              onDoubleClick={() => setIsEditing(true)}
              className="text-sm font-semibold text-zinc-200 uppercase tracking-wider flex-1 cursor-text"
            >
              {title}
            </h3>
          )}
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1.5 text-zinc-500 hover:text-white rounded transition-colors"
            title="Edit Title"
          >
            {isEditing ? <Check size={16} /> : <Edit2 size={14} />}
          </button>
          
          <button
            onClick={handleDelete}
            className="p-1.5 text-zinc-500 hover:text-red-400 rounded transition-colors"
            title={isCustom ? "Delete Custom Section" : "Hide Section"}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default SortableSection;
