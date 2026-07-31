import { create } from 'zustand';

const initialResumeData = {
  personalInfo: {
    name: 'Jane Doe',
    title: 'Senior Software Engineer',
    email: 'jane.doe@example.com',
    phone: '(555) 123-4567',
    linkedin: 'linkedin.com/in/janedoe',
    github: 'github.com/janedoe',
    includeProfilePic: false,
    profilePicUrl: null
  },
  objective: 'Passionate software engineer with 5+ years of experience building scalable web applications. Adept at creating robust architectures and optimizing performance.',
  education: [
    {
      id: 'edu-1',
      institution: 'University of Technology',
      degree: 'B.S. in Computer Science',
      startDate: '2015',
      endDate: '2019',
      location: 'San Francisco, CA'
    }
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'Tech Innovators Inc.',
      role: 'Software Engineer',
      startDate: 'Jan 2020',
      endDate: 'Present',
      location: 'New York, NY',
      bullets: [
        { id: 'b-1', text: 'Developed and maintained the core microservices architecture.' },
        { id: 'b-2', text: 'Improved application performance by 30% through code optimization.' }
      ]
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'AI Resume Builder',
      technologies: 'React, Zustand, Node.js',
      date: 'Jan 2024 - Present',
      description: 'A modern SaaS application for creating professional resumes with AI assistance.',
      link: 'resume-builder.io'
    }
  ],
  skills: [
    {
      id: 'skill-1',
      category: 'Frontend',
      items: 'React, Tailwind CSS, Zustand, TypeScript'
    },
    {
      id: 'skill-2',
      category: 'Backend',
      items: 'Node.js, Express, PostgreSQL, MongoDB'
    }
  ],
  sectionOrder: ['personalInfo', 'objective', 'experience', 'education', 'projects', 'skills'],
  hiddenSections: [],
  customSections: {}, // e.g. { 'custom-1': [{ id: 'item-1', title: 'Award', subtitle: 'Org', date: '2023', description: 'Won first place' }] }
  sectionTitles: {
    personalInfo: 'Personal Info',
    objective: 'Professional Summary',
    experience: 'Experience',
    education: 'Education',
    projects: 'Projects',
    skills: 'Technical Skills'
  },
  activeTemplate: 'jake',
  formatting: {
    lineHeight: 1.15,
    sectionMargin: 12,
  }
};

export const useResumeStore = create((set) => ({
  data: initialResumeData,
  
  setResumeData: (newData) => set({ data: newData }),
  
  resetResumeData: () => set({ data: initialResumeData }),
  
  updateFormatting: (key, value) =>
    set((state) => ({
      data: {
        ...state.data,
        formatting: { ...state.data.formatting, [key]: value }
      }
    })),

  setActiveTemplate: (templateId) =>
    set((state) => ({
      data: { ...state.data, activeTemplate: templateId }
    })),

  reorderSections: (activeId, overId) =>
    set((state) => {
      const oldIndex = state.data.sectionOrder.indexOf(activeId);
      const newIndex = state.data.sectionOrder.indexOf(overId);
      
      const newOrder = [...state.data.sectionOrder];
      const [removed] = newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, removed);
      
      return {
        data: { ...state.data, sectionOrder: newOrder }
      };
    }),
  
  // Dynamic Section Management
  updateSectionTitle: (sectionId, newTitle) => 
    set((state) => ({
      data: {
        ...state.data,
        sectionTitles: { ...state.data.sectionTitles, [sectionId]: newTitle }
      }
    })),

  hideSection: (sectionId) =>
    set((state) => {
      const newOrder = state.data.sectionOrder.filter(id => id !== sectionId);
      return {
        data: {
          ...state.data,
          sectionOrder: newOrder,
          hiddenSections: [...state.data.hiddenSections, sectionId]
        }
      };
    }),

  restoreSection: (sectionId) =>
    set((state) => {
      const newHidden = state.data.hiddenSections.filter(id => id !== sectionId);
      return {
        data: {
          ...state.data,
          sectionOrder: [...state.data.sectionOrder, sectionId],
          hiddenSections: newHidden
        }
      };
    }),

  addSpacer: (sectionId) =>
    set((state) => ({
      data: {
        ...state.data,
        sectionOrder: [...state.data.sectionOrder, sectionId]
      }
    })),

  addCustomSection: (sectionId, title) =>
    set((state) => ({
      data: {
        ...state.data,
        sectionOrder: [...state.data.sectionOrder, sectionId],
        sectionTitles: { ...state.data.sectionTitles, [sectionId]: title },
        customSections: { ...state.data.customSections, [sectionId]: [] }
      }
    })),

  deleteCustomSection: (sectionId) =>
    set((state) => {
      const newOrder = state.data.sectionOrder.filter(id => id !== sectionId);
      const newCustom = { ...state.data.customSections };
      delete newCustom[sectionId];
      const newTitles = { ...state.data.sectionTitles };
      delete newTitles[sectionId];
      return {
        data: {
          ...state.data,
          sectionOrder: newOrder,
          customSections: newCustom,
          sectionTitles: newTitles
        }
      };
    }),

  addCustomSectionItem: (sectionId, newItem) =>
    set((state) => ({
      data: {
        ...state.data,
        customSections: {
          ...state.data.customSections,
          [sectionId]: [...(state.data.customSections[sectionId] || []), newItem]
        }
      }
    })),
  
  updateCustomSectionItem: (sectionId, itemId, field, value) =>
    set((state) => ({
      data: {
        ...state.data,
        customSections: {
          ...state.data.customSections,
          [sectionId]: state.data.customSections[sectionId].map(item =>
            item.id === itemId ? { ...item, [field]: value } : item
          )
        }
      }
    })),

  removeCustomSectionItem: (sectionId, itemId) =>
    set((state) => ({
      data: {
        ...state.data,
        customSections: {
          ...state.data.customSections,
          [sectionId]: state.data.customSections[sectionId].filter(item => item.id !== itemId)
        }
      }
    })),

  // Generic update for top-level string fields like objective
  updateField: (field, value) => 
    set((state) => ({ 
      data: { ...state.data, [field]: value } 
    })),
    
  // Update personalInfo fields
  updatePersonalInfo: (field, value) => 
    set((state) => ({ 
      data: { 
        ...state.data, 
        personalInfo: { ...state.data.personalInfo, [field]: value } 
      } 
    })),

  // Array operations (Education, Experience, Projects, Skills)
  updateArrayItem: (arrayName, id, field, value) => 
    set((state) => ({
      data: {
        ...state.data,
        [arrayName]: state.data[arrayName].map((item) => 
          item.id === id ? { ...item, [field]: value } : item
        )
      }
    })),

  addArrayItem: (arrayName, newItem) => 
    set((state) => ({
      data: {
        ...state.data,
        [arrayName]: [...state.data[arrayName], newItem]
      }
    })),

  removeArrayItem: (arrayName, id) => 
    set((state) => ({
      data: {
        ...state.data,
        [arrayName]: state.data[arrayName].filter((item) => item.id !== id)
      }
    })),

  // Nested bullet operations for Experience
  addExperienceBullet: (expId, newBullet) => 
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map((exp) => 
          exp.id === expId 
            ? { ...exp, bullets: [...exp.bullets, newBullet] } 
            : exp
        )
      }
    })),

  updateExperienceBullet: (expId, bulletId, text) => 
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map((exp) => 
          exp.id === expId 
            ? { 
                ...exp, 
                bullets: exp.bullets.map((b) => 
                  b.id === bulletId ? { ...b, text } : b
                ) 
              } 
            : exp
        )
      }
    })),

  removeExperienceBullet: (expId, bulletId) => 
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map((exp) => 
          exp.id === expId 
            ? { 
                ...exp, 
                bullets: exp.bullets.filter((b) => b.id !== bulletId) 
              } 
            : exp
        )
      }
    }))
}));
