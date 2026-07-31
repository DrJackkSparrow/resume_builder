import React from 'react';

const HarvardTemplate = ({ data }) => {
  const { personalInfo, objective, experience, education, projects, skills, sectionOrder, sectionTitles, customSections } = data;

  // Helper to render contact info separated by bullets
  const renderContactInfo = () => {
    const items = [];
    if (personalInfo.phone) items.push(<span key="phone">{personalInfo.phone}</span>);
    if (personalInfo.email) items.push(<span key="email">{personalInfo.email}</span>);
    if (personalInfo.linkedin) items.push(<span key="linkedin">{personalInfo.linkedin}</span>);
    if (personalInfo.github) items.push(<span key="github">{personalInfo.github}</span>);

    if (items.length === 0) return null;

    return (
      <div className="flex flex-wrap justify-center items-center gap-2 text-[12.5px] text-black mb-6">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item}
            {index < items.length - 1 && <span>&bull;</span>}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const SectionHeader = ({ title }) => (
    <h2 
      className="text-[14px] font-bold text-black text-center mb-2 mt-4 font-serif uppercase tracking-wide"
      style={{ marginBottom: 'var(--section-margin)' }}
    >
      {title}
    </h2>
  );

  const renderPersonalInfo = () => (
    <header className="text-center font-serif" key="personalInfo">
      <h1 className="text-2xl font-bold text-black mb-1">{personalInfo.name || 'Firstname Lastname'}</h1>
      {renderContactInfo()}
    </header>
  );

  const renderObjective = () => {
    if (!objective) return null;
    return (
      <section key="objective">
        <SectionHeader title={sectionTitles.objective || 'Summary'} />
        <p className="text-[12.5px] text-black font-serif">
          {objective}
        </p>
      </section>
    );
  };

  const renderExperience = () => {
    if (!experience?.length) return null;
    return (
      <section key="experience">
        <SectionHeader title={sectionTitles.experience || 'Experience'} />
        <div className="space-y-4 font-serif">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline font-bold text-[13px]">
                <span>{exp.company}</span>
                <span className="font-normal">{exp.location}</span>
              </div>
              <div className="flex justify-between items-baseline text-[13px] mb-1">
                <span className="font-bold">{exp.role}</span>
                <span className="font-normal">{exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.endDate}</span>
              </div>
              {exp.bullets?.length > 0 && (
                <ul className="list-disc list-outside ml-5 text-[12.5px] text-black space-y-0.5">
                  {exp.bullets.map(b => b.text && <li key={b.id}>{b.text}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderEducation = () => {
    if (!education?.length) return null;
    return (
      <section key="education">
        <SectionHeader title={sectionTitles.education || 'Education'} />
        <div className="space-y-4 font-serif">
          {education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline font-bold text-[13px]">
                <span>{edu.institution}</span>
                <span className="font-normal">{edu.location}</span>
              </div>
              <div className="flex justify-between items-baseline text-[12.5px]">
                <span>{edu.degree}</span>
                <span>{edu.startDate}{edu.startDate && edu.endDate ? ' - ' : ''}{edu.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderProjects = () => {
    if (!projects?.length) return null;
    return (
      <section key="projects">
        <SectionHeader title={sectionTitles.projects || 'Projects'} />
        <div className="space-y-4 font-serif">
          {projects.map((proj) => (
            <div key={proj.id}>
              <div className="flex justify-between items-baseline font-bold text-[13px] mb-1">
                <span>
                  {proj.title}
                  {proj.technologies && <span className="font-normal"> - {proj.technologies}</span>}
                  {proj.link && <span className="font-normal"> - {proj.link}</span>}
                </span>
                {proj.date && <span className="font-normal">{proj.date}</span>}
              </div>
              {proj.description && (
                <ul className="list-disc list-outside ml-5 text-[12.5px] text-black space-y-0.5">
                  <li>{proj.description}</li>
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderSkills = () => {
    if (!skills?.length) return null;
    return (
      <section key="skills">
        <SectionHeader title={sectionTitles.skills || 'Skills & Interests'} />
        <div className="text-[12.5px] font-serif space-y-0.5">
          {skills.map((group) => (
            <div key={group.id}>
              {group.category && <span className="font-bold">{group.category}: </span>}
              <span>{group.items}</span>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderCustomSection = (sectionId) => {
    const items = customSections[sectionId];
    if (!items || items.length === 0) return null;
    
    return (
      <section key={sectionId}>
        <SectionHeader title={sectionTitles[sectionId] || 'Custom Section'} />
        <div className="space-y-4 font-serif">
          {items.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between items-baseline font-bold text-[13px] mb-1">
                <span>
                  {item.title}
                  {item.subtitle && <span className="font-normal"> - {item.subtitle}</span>}
                </span>
                {item.date && <span className="font-normal">{item.date}</span>}
              </div>
              {item.description && (
                <ul className="list-disc list-outside ml-5 text-[12.5px] text-black space-y-0.5">
                  <li>{item.description}</li>
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderers = {
    personalInfo: renderPersonalInfo,
    objective: renderObjective,
    experience: renderExperience,
    education: renderEducation,
    projects: renderProjects,
    skills: renderSkills
  };

  return (
    <div 
      className="bg-white w-full max-w-[850px] min-h-[1100px] shadow-sm p-[1in] text-black transition-all"
      style={{ lineHeight: 'var(--line-height)' }}
    >
      {sectionOrder.map((sectionId) => {
        if (sectionId.startsWith('spacer-')) {
          return <div key={sectionId} style={{ height: 'calc(var(--section-margin) + 8px)' }} />;
        }
        if (customSections && customSections[sectionId]) {
          return renderCustomSection(sectionId);
        }
        const renderSection = renderers[sectionId];
        return renderSection ? renderSection() : null;
      })}
    </div>
  );
};

export default HarvardTemplate;
