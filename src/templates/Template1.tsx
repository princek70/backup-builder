'use client';

import React from 'react';
import { useUserContext } from '@/context/UserContext';

export default function Template1() {
  const { resumeData } = useUserContext();
  const { personalInfo, sections, skills, languages } = resumeData;

  return (
    <div className="w-full flex-1 min-h-[11in] flex bg-white font-sans text-sm p-8 pb-0">
      {/* Sidebar Col */}
      <div className="w-[35%] bg-[#ebeceb] flex-1 rounded-t-3xl p-6 mr-8 mt-4 flex flex-col">
        
        {/* Spacer to prevent Avatar overlap */}
        <div className="h-48 w-full flex-shrink-0" />
        
        {/* Contact Info */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-lg">📞</span>
            <span className="text-xs">{personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg">📧</span>
            <span className="text-xs">{personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg">📍</span>
            <span className="text-xs">{personalInfo.location}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 border-b border-black/20 pb-2">Skills</h2>
          <ul className="space-y-2">
            {skills.map((skill, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <span className="w-1.5 h-1.5 bg-black rounded-full" />
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Language */}
        <div>
          <h2 className="text-xl font-bold mb-4 border-b border-black/20 pb-2">Language</h2>
          <ul className="space-y-2">
            {languages.map((lang, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <span className="w-1.5 h-1.5 bg-black rounded-full" />
                {lang}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content Col */}
      <div className="w-[65%] flex flex-col pt-4">
        {/* Header Block with absolute positioned Avatar overlay */}
        <div className="flex items-center gap-8 mb-10 h-32 relative">
           {(resumeData?.profileImage || personalInfo?.avatarUrl) && (
             <div className="absolute -left-[160px] top-4 w-48 h-48 shrink-0 aspect-square rounded-full overflow-hidden border-4 border-white shadow-sm z-10 bg-white">
               <img src={resumeData?.profileImage || personalInfo?.avatarUrl} alt="Profile" className="w-full h-full object-cover object-top rounded-full" />
             </div>
           )}
           
           <div className={`bg-[#ebeceb] py-6 px-10 rounded-r-full flex-1 relative w-full ${(resumeData?.profileImage || personalInfo?.avatarUrl) ? 'ml-16 left-10 pl-24' : 'ml-0'}`}>
             <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{personalInfo.name}</h1>
             <p className="text-xl text-gray-700 mt-1">{personalInfo.role}</p>
           </div>
        </div>

        {/* About Me */}
        <div className="mb-8 pl-12">
          <h2 className="text-2xl font-bold mb-4">About Me</h2>
          <p className="text-gray-700 leading-relaxed text-sm">
            {personalInfo.summary}
          </p>
          <div className="w-full h-px bg-black/10 mt-6" />
        </div>

        {/* Dynamic Sections */}
        {sections.map(section => (
          <div key={section.id} className="mb-8 pl-12">
            <h2 className="text-2xl font-bold mb-6">{section.label}</h2>
            <div className="space-y-6">
              {section.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-[15px]">{item.title}</h3>
                    <span className="text-xs text-gray-600">{item.date}</span>
                  </div>
                  <p className="text-gray-600 mb-2">{item.subtitle}</p>
                  {item.description && item.description.length > 0 && (
                     <ul className="space-y-1 list-disc list-inside text-gray-700 text-sm">
                       {item.description.map((desc, i) => (
                         <li key={i}>{desc}</li>
                       ))}
                     </ul>
                  )}
                </div>
              ))}
            </div>
            <div className="w-full h-px bg-black/10 mt-6" />
          </div>
        ))}
      </div>
    </div>
  );
}
