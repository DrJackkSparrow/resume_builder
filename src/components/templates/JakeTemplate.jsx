import React from 'react';

const JakeTemplate = ({ data }) => {
  const { personalInfo, objective, experience, education, projects, skills, sectionOrder } = data;

  // Helper to render contact info separated by pipes
  const renderContactInfo = () => {
    const items = [];
    if (personalInfo.phone) items.push(<span key="phone">{personalInfo.phone}</span>);
    if (personalInfo.email) items.push(<a href={`mailto:${personalInfo.email}`} key="email" className="underline underline-offset-2">{personalInfo.email}</a>);
    if (personalInfo.linkedin) items.push(<a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} key="linkedin" className="underline underline-offset-2">{personalInfo.linkedin}</a>);
    if (personalInfo.github) items.push(<a href={`https://${personalInfo.github.replace(/^https?:\/\//, '')}`} key="github" className="underline underline-offset-2">{personalInfo.github}</a>);

    if (items.length === 0) return null;

    return (
      <div className="text-center text-[11px] text-black mb-3">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item}
            {index < items.length - 1 && <span className="mx-1.5 text-black">|</span>}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const SectionHeader = ({ title }) => (
    <h2 
      className="text-[12.5px] font-normal text-black tracking-widest mb-1 border-b-[1px] border-black pb-0.5 mt-3"
      style={{ marginBottom: 'var(--section-margin)', fontVariant: 'small-caps' }}
    >
      {title.toLowerCase()}
    </h2>
  );

  const renderPersonalInfo = () => (
    <header className="text-center">
      <h1 className="text-4xl font-normal text-black mb-1">{personalInfo.name || 'Jake Ryan'}</h1>
      {renderContactInfo()}
    </header>
  );

  const renderObjective = () => {
    if (!objective) return null;
    return (
      <section>
        <SectionHeader title="Objective" />
        <p className="text-[11.5px] text-black">
          {objective}
        </p>
      </section>
    );
  };

  const renderEducation = () => {
    if (!education?.length) return null;
    return (
      <section>
        <SectionHeader title="Education" />
        <div className="space-y-3 font-serif">
          {education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline font-bold text-[12px]">
                <span>{edu.institution}</span>
                <span className="font-normal">{edu.location}</span>
              </div>
              <div className="flex justify-between items-baseline italic text-[11.5px] mb-1">
                <span>{edu.degree}</span>
                <span>{edu.startDate}{edu.startDate && edu.endDate ? ' - ' : ''}{edu.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderExperience = () => {
    if (!experience?.length) return null;
    return (
      <section>
        <SectionHeader title="Experience" />
        <div className="space-y-4 font-serif">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline font-bold text-[12px]">
                <span>{exp.role}</span>
                <span className="font-normal">{exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.endDate}</span>
              </div>
              <div className="flex justify-between items-baseline italic text-[11.5px] mb-0.5">
                <span>{exp.company}</span>
                <span>{exp.location}</span>
              </div>
              {exp.bullets?.length > 0 && (
                <ul className="list-disc list-outside ml-5 text-[11.5px] text-black space-y-0.5 mb-1">
                  {exp.bullets.map(b => b.text && <li key={b.id}>{b.text}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderProjects = () => {
    if (!projects?.length) return null;
    return (
      <section>
        <SectionHeader title="Projects" />
        <div className="space-y-3 font-serif">
          {projects.map((proj) => (
            <div key={proj.id}>
              <div className="flex justify-between items-baseline font-bold text-[12px]">
                <span>
                  {proj.title}
                  {proj.technologies && <span className="font-normal"> | {proj.technologies}</span>}
                  {proj.link && <span className="font-normal italic text-[11.5px]"> | {proj.link}</span>}
                </span>
                {proj.date && <span className="font-normal">{proj.date}</span>}
              </div>
              {proj.description && (
                <ul className="list-disc list-outside ml-5 text-[11.5px] text-black space-y-0.5 mt-0.5 mb-1">
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
      <section>
        <SectionHeader title="Technical Skills" />
        <div className="text-[11.5px] space-y-0.5 text-black">
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

  const renderers = {
    personalInfo: renderPersonalInfo,
    objective: renderObjective,
    education: renderEducation,
    experience: renderExperience,
    projects: renderProjects,
    skills: renderSkills
  };

  return (
    <div 
      className="bg-white w-full max-w-[850px] min-h-[1100px] shadow-sm p-[0.5in] text-black transition-all"
      style={{ lineHeight: 'var(--line-height)', fontFamily: '"Times New Roman", Times, serif' }}
    >
      {sectionOrder.map((sectionId) => {
        const renderSection = renderers[sectionId];
        return renderSection ? <React.Fragment key={sectionId}>{renderSection()}</React.Fragment> : null;
      })}
    </div>
  );
};

export default JakeTemplate;
