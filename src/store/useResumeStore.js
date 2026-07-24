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
