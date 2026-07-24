import React from 'react';

const ModernSidebarTemplate = ({ data }) => {
  const { personalInfo, objective, experience, education, projects, skills, sectionOrder } = data;

  const renderContactInfo = () => {
    return (
      <div className="flex flex-col text-right text-[11px] text-gray-700 space-y-1">
        {personalInfo.location && <span>{personalInfo.location}</span>}
        {personalInfo.phone && <span>{personalInfo.phone}</span>}
        {personalInfo.email && <span>{personalInfo.email}</span>}
        {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
      </div>
    );
  };

  const SidebarHeader = ({ title }) => (
    <h3 className="text-white text-[12px] uppercase tracking-widest border-b border-white/30 pb-2 mb-4">
      <span className="flex items-center gap-2">
        <div className="w-0 h-0 border-t-4 border-t-transparent border-l-[6px] border-l-white border-b-4 border-b-transparent"></div>
        {title}
      </span>
    </h3>
  );

  const MainHeader = ({ title }) => (
    <h3 className="text-[#901C2B] text-[13px] uppercase tracking-widest border-b border-[#901C2B]/30 pb-2 mb-4 mt-6">
      <span className="flex items-center gap-2">
        <div className="w-0 h-0 border-t-4 border-t-transparent border-l-[6px] border-l-[#901C2B] border-b-4 border-b-transparent"></div>
        {title}
      </span>
    </h3>
  );

  return (
    <div className="bg-white w-full max-w-[850px] min-h-[1100px] shadow-sm flex overflow-hidden">
      {/* LEFT SIDEBAR */}
      <div className="w-1/3 bg-[#901C2B] p-8 text-white flex flex-col">
        {/* Profile Picture */}
        {personalInfo.includeProfilePic && (
          <div className="flex justify-center mb-10">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/20 bg-black/20 flex items-center justify-center">
              {personalInfo.profilePicUrl ? (
                <img 
                  src={personalInfo.profilePicUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white/50 text-xs">No Image</span>
              )}
            </div>
          </div>
        )}

        {/* Sidebar Skills mapped to "SKILLS" */}
        {skills?.length > 0 && (
          <div className="mb-10">
            <SidebarHeader title="Skills" />
            <ul className="list-disc list-inside text-[11px] space-y-3 pl-1 text-white/90">
              {skills.map(skill => (
                <li key={skill.id} className="leading-snug">
                  {skill.category && <span className="font-semibold">{skill.category}: </span>}
                  {skill.items}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Sidebar Projects mapped as "AWARDS" or just secondary skills area depending on user need. 
            For now, we map nothing else here natively unless there's an awards array. */}
      </div>

      {/* RIGHT MAIN AREA */}
      <div className="w-2/3 p-10 bg-[#F4F4F4] text-black">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-light text-[#901C2B] leading-none mb-1">
              {personalInfo.name?.split(' ')[0] || 'Laura'}
            </h1>
            <h1 className="text-4xl font-semibold text-[#901C2B] leading-none">
              {personalInfo.name?.split(' ').slice(1).join(' ') || 'Robertson'}
            </h1>
          </div>
          {renderContactInfo()}
        </div>

        {/* Dynamic Sections mapped to main area */}
        {sectionOrder.map((sectionId) => {
          if (sectionId === 'objective' && objective) {
            return (
              <div key="objective">
                <MainHeader title="Objective" />
                <p className="text-[11px] text-gray-800 font-medium italic leading-relaxed">
                  {objective}
                </p>
              </div>
            );
          }

          if (sectionId === 'education' && education?.length > 0) {
            return (
              <div key="education">
                <MainHeader title="Education" />
                <div className="space-y-4">
                  {education.map(edu => (
                    <div key={edu.id} className="text-[11px]">
                      <h4 className="font-bold text-[#901C2B] mb-0.5">{edu.institution}</h4>
                      <div className="text-gray-600 mb-2 italic">
                        {edu.location && <span>{edu.location}</span>}
                        {edu.location && edu.startDate && <br />}
                        {edu.startDate && <span>Graduated: {edu.endDate}</span>}
                      </div>
                      <p className="font-medium text-gray-800">{edu.degree}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          if (sectionId === 'projects' && projects?.length > 0) {
            return (
              <div key="projects">
                <MainHeader title="Extracurricular Activities" />
                <div className="space-y-5">
                  {projects.map(proj => (
                    <div key={proj.id} className="text-[11px]">
                      <h4 className="font-bold text-[#901C2B]">{proj.title}</h4>
                      <div className="italic text-gray-600 mb-2">
                        {proj.technologies && <span>{proj.technologies}</span>}
                        {proj.technologies && proj.date && <span>, </span>}
                        {proj.date && <span>{proj.date}</span>}
                      </div>
                      {proj.description && (
                        <ul className="text-gray-800 space-y-1 mt-2">
                          <li className="leading-snug">{proj.description}</li>
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          if (sectionId === 'experience' && experience?.length > 0) {
            return (
              <div key="experience">
                <MainHeader title="Experience" />
                <div className="space-y-5">
                  {experience.map(exp => (
                    <div key={exp.id} className="text-[11px]">
                      <h4 className="font-bold text-[#901C2B]">{exp.role}</h4>
                      <div className="italic text-gray-600 mb-2 flex justify-between">
                        <span>{exp.company}{exp.location ? `, ${exp.location}` : ''}</span>
                        <span>{exp.startDate}{exp.startDate && exp.endDate ? ' - ' : ''}{exp.endDate}</span>
                      </div>
                      {exp.bullets?.length > 0 && (
                        <ul className="text-gray-800 space-y-1.5 mt-2">
                          {exp.bullets.map(b => (
                            <li key={b.id} className="leading-snug">{b.text}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default ModernSidebarTemplate;
