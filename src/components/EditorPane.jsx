import React, { useState } from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { useUser } from '../contexts/UserContext';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import SortableSection from './SortableSection';
import SortableSpacer from './SortableSpacer';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ObjectiveForm from './forms/ObjectiveForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import ProjectsForm from './forms/ProjectsForm';
import SkillsForm from './forms/SkillsForm';
import CustomSectionForm from './forms/CustomSectionForm';
import FormattingTab from './FormattingTab';
import { Plus } from 'lucide-react';

const sectionComponents = {
  personalInfo: PersonalInfoForm,
  objective: ObjectiveForm,
  experience: ExperienceForm,
  education: EducationForm,
  projects: ProjectsForm,
  skills: SkillsForm,
};

const EditorPane = () => {
  const { currentUser } = useUser();
  const { data, reorderSections, restoreSection, addCustomSection, addSpacer } = useResumeStore();
  const [activeTab, setActiveTab] = useState('content');
  const [showAddMenu, setShowAddMenu] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      reorderSections(active.id, over.id);
    }
  };

  const handleAddCustom = () => {
    const newId = `custom-${Date.now()}`;
    addCustomSection(newId, 'Custom Section');
    setShowAddMenu(false);
  };

  const handleAddSpacer = () => {
    const newId = `spacer-${Date.now()}`;
    addSpacer(newId);
    setShowAddMenu(false);
  };

  return (
    <div className="h-full overflow-y-auto bg-zinc-950 border-r border-zinc-800 p-8 custom-scrollbar relative pb-32">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-light text-white tracking-tight">Editor</h2>
          <p className="text-zinc-500 text-sm mt-1 mb-4">
            {currentUser ? `Let's build your resume, ${currentUser.firstName}.` : 'Build and format your perfect resume.'}
          </p>
          
          <div className="flex p-1 bg-zinc-900 rounded-lg w-full max-w-sm mb-6 border border-zinc-800/50">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === 'content' 
                  ? 'bg-zinc-800 text-white shadow-sm' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Content
            </button>
            <button
              onClick={() => setActiveTab('formatting')}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === 'formatting' 
                  ? 'bg-zinc-800 text-white shadow-sm' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Formatting
            </button>
          </div>
        </div>

        {activeTab === 'content' && (
          <>
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext 
                items={data.sectionOrder}
                strategy={verticalListSortingStrategy}
              >
                {data.sectionOrder.map((sectionId) => {
                  const isSpacer = sectionId.startsWith('spacer-');
                  if (isSpacer) {
                    return <SortableSpacer key={sectionId} id={sectionId} />;
                  }

                  const title = data.sectionTitles[sectionId] || 'Section';
                  const isCustom = !!data.customSections[sectionId];
                  
                  let FormComponent = sectionComponents[sectionId];
                  if (isCustom) FormComponent = CustomSectionForm;
                  
                  if (!FormComponent) return null;

                  return (
                    <SortableSection 
                      key={sectionId} 
                      id={sectionId} 
                      title={title}
                      isCustom={isCustom}
                    >
                      <FormComponent sectionId={sectionId} />
                    </SortableSection>
                  );
                })}
              </SortableContext>
            </DndContext>

            {/* Add Section Button */}
            <div className="relative mt-8">
              {showAddMenu && (
                <div className="absolute bottom-12 left-0 w-64 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl p-2 z-50">
                  <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-2 pt-1">Restore Hidden</div>
                  {data.hiddenSections.length === 0 && (
                    <div className="text-sm text-zinc-600 px-2 py-1 mb-2 italic">No hidden sections</div>
                  )}
                  {data.hiddenSections.map(id => (
                    <button
                      key={id}
                      onClick={() => { restoreSection(id); setShowAddMenu(false); }}
                      className="w-full text-left px-2 py-1.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white rounded transition-colors"
                    >
                      {data.sectionTitles[id] || id}
                    </button>
                  ))}
                  
                  <div className="h-px bg-zinc-800 my-1"></div>
                  <button 
                    onClick={handleAddSpacer}
                    className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                  >
                    Add Space Block
                  </button>
                  <button 
                    onClick={handleAddCustom}
                    className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                  >
                    Add Custom Section
                  </button>
                </div>
              )}
              
              <button 
                onClick={() => setShowAddMenu(!showAddMenu)}
                className="w-full py-4 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500 hover:text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/50 transition-all flex items-center justify-center gap-2 font-semibold"
              >
                <Plus size={18} />
                Add Section / Block
              </button>
            </div>
          </>
        )}

        {activeTab === 'formatting' && <FormattingTab />}
      </div>
    </div>
  );
};

export default EditorPane;
