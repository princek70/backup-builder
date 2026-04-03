'use client';

import React from 'react';
import { useUserContext } from '@/context/UserContext';

export default function Template5() {
  const { resumeData } = useUserContext();
  const { personalInfo, sections, skills } = resumeData;

  const GrayBg = '#EAECEF';
  const DeepBlue = '#061683';

  return (
    <div className="w-full flex-1 min-h-[11in] flex font-sans text-sm">
      
      {/* Left Column */}
      <div className="w-[55%] flex-1 flex flex-col pt-16 px-12" style={{ backgroundColor: GrayBg }}>
         <h1 className="text-5xl font-bold text-black tracking-tight leading-tight">
            {personalInfo.name}
         </h1>
         <p className="text-2xl text-gray-700 mt-2 font-light">{personalInfo.role}</p>

         <div className="w-24 h-4 mt-8 mb-12" style={{ backgroundColor: DeepBlue }} />

         {/* About Me */}
         <div className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4">About Me.</h2>
            <p className="text-[14px] leading-relaxed text-gray-800 font-light">
               {personalInfo.summary}
            </p>
         </div>

         {/* Dynamic Sections */}
         {sections.map(section => (
           <div key={section.id} className="mb-8 w-full pr-4">
             <h2 className="text-2xl font-bold text-black mb-6">{section.label}.</h2>
             <div className="space-y-8">
               {section.items.map((item) => (
                  <div key={item.id}>
                     <h3 className="font-bold text-[15px] text-black leading-snug">{item.subtitle}</h3>
                     <p className="text-[14px] font-medium text-gray-700 mb-2">{item.title} {item.date}</p>
                     {item.description && item.description.length > 0 && (
                       <ul className="list-disc pl-4 space-y-1 text-gray-800 text-[13px] font-light pr-4">
                          {item.description.map((desc, dIdx) => (
                             <li key={dIdx}>{desc}</li>
                          ))}
                       </ul>
                     )}
                  </div>
               ))}
             </div>
           </div>
         ))}
      </div>

      {/* Right Column */}
      <div className="w-[45%] text-white pt-16 px-12" style={{ backgroundColor: DeepBlue }}>
         {/* Profile Photo Removed */}

         {/* Contact */}
         <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Contact.</h2>
            <div className="space-y-4 font-light text-[14px] text-blue-100">
               <p><span className="font-bold mr-2 text-white">T:</span> {personalInfo.phone}</p>
               <p><span className="font-bold mr-2 text-white">E:</span> {personalInfo.email}</p>
               <p><span className="font-bold mr-2 text-white">A:</span> {personalInfo.location}</p>
            </div>
         </div>

         {/* Skill */}
         <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Skill.</h2>
            <ul className="list-disc pl-4 space-y-4 font-light text-[14px] text-blue-100">
               {skills.map((skill, index) => (
                 <li key={index}>{skill}</li>
               ))}
            </ul>
         </div>

      </div>
    </div>
  );
}
