import React from 'react';
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
import PersonalInfoForm from './forms/PersonalInfoForm';
import ObjectiveForm from './forms/ObjectiveForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import ProjectsForm from './forms/ProjectsForm';
import SkillsForm from './forms/SkillsForm';
import FormattingTab from './FormattingTab';

const sectionComponents = {
  personalInfo: { title: 'Personal Info', component: PersonalInfoForm },
  objective: { title: 'Professional Summary', component: ObjectiveForm },
  experience: { title: 'Experience', component: ExperienceForm },
  education: { title: 'Education', component: EducationForm },
  projects: { title: 'Projects', component: ProjectsForm },
  skills: { title: 'Skills', component: SkillsForm },
};

const EditorPane = () => {
  const { currentUser } = useUser();
  const { data, reorderSections } = useResumeStore();
  const [activeTab, setActiveTab] = React.useState('content');

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

    if (active.id !== over.id) {
      reorderSections(active.id, over.id);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-zinc-950 border-r border-zinc-800 p-8 custom-scrollbar">
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
              const Section = sectionComponents[sectionId];
              if (!Section) return null;
              
              const FormComponent = Section.component;

              return (
                <SortableSection key={sectionId} id={sectionId} title={Section.title}>
                  <FormComponent />
                </SortableSection>
              );
            })}
          </SortableContext>
        </DndContext>
        )}

        {activeTab === 'formatting' && <FormattingTab />}
      </div>
    </div>
  );
};

export default EditorPane;
