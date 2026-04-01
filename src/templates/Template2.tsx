'use client';

import React from 'react';
import { useUserContext } from '@/context/UserContext';

export default function Template2() {
  const { resumeData } = useUserContext();
  const { personalInfo, sections, skills } = resumeData;

  const PrimaryGreen = '#2C7A70';

  return (
    <div className="w-full flex-1 min-h-[11in] flex bg-white font-sans text-sm">
      {/* Light Mint Left Column */}
      <div className="w-[35%] bg-[#F0FCFA] flex-1 flex flex-col relative z-0">
        
        {/* Avatar removed as requested */}

        {/* Left Col Contact Ribbon */}
        <div className="mb-10 w-full relative">
          <div className="w-[105%] py-2 pl-6 pr-4 shadow-sm" style={{ backgroundColor: PrimaryGreen, marginLeft: '-5%' }}>
            <h2 className="text-white font-bold tracking-widest text-lg ml-[5%]">CONTACT</h2>
            <div className="absolute right-[-10px] top-full border-t-[10px] border-b-[10px] border-l-[10px] border-r-0 border-l-[#1E564F] border-transparent w-0 h-0" />
          </div>
          <div className="pl-6 pr-4 mt-6 space-y-3">
             <div className="flex items-center gap-3 text-xs">
                <span style={{ color: PrimaryGreen }}>📞</span>
                <span>{personalInfo.phone}</span>
             </div>
             <div className="flex items-center gap-3 text-xs">
                <span style={{ color: PrimaryGreen }}>📧</span>
                <span>{personalInfo.email}</span>
             </div>
             <div className="flex items-start gap-3 text-xs">
                <span style={{ color: PrimaryGreen }}>📍</span>
                <span>{personalInfo.location}</span>
             </div>
          </div>
        </div>

        {/* Left Col Skills Ribbon */}
        <div className="mb-10 w-full relative">
          <div className="w-[105%] py-2 pl-6 pr-4 shadow-sm" style={{ backgroundColor: PrimaryGreen, marginLeft: '-5%' }}>
            <h2 className="text-white font-bold tracking-widest text-lg ml-[5%]">SKILLS</h2>
            <div className="absolute right-[-10px] top-full border-t-[10px] border-b-[10px] border-l-[10px] border-r-0 border-l-[#1E564F] border-transparent w-0 h-0" />
          </div>
          <div className="pl-10 pr-4 mt-6">
             <ul className="space-y-2 text-xs list-disc text-gray-800">
               {skills.map((skill, index) => (
                 <li key={index}>{skill}</li>
               ))}
             </ul>
          </div>
        </div>
      </div>

      {/* Main Right Column */}
      <div className="w-[65%] p-10 pt-16">
         <div className="w-full border-b-[3px] border-gray-900 pb-2 mb-4">
           <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: PrimaryGreen }}>{personalInfo.name}</h1>
         </div>
         <h2 className="text-xl text-gray-800 mb-6">{personalInfo.role}</h2>
         <p className="text-sm text-gray-700 leading-relaxed mb-10">
           {personalInfo.summary}
         </p>

         {/* Dynamic Sections */}
         {sections.map(section => (
           <div key={section.id} className="w-full mb-8">
             <h2 className="text-xl font-bold tracking-widest uppercase mb-4" style={{ color: PrimaryGreen }}>{section.label}</h2>
             <div className="w-full h-px bg-gray-400 mb-6" />

             <div className="space-y-8">
               {section.items.map(item => (
                 <div key={item.id}>
                   <h3 className="font-bold text-[15px] uppercase mb-1" style={{ color: PrimaryGreen }}>{item.title}</h3>
                   <p className="text-gray-800 text-[15px]">{item.subtitle}</p>
                   <p className="text-gray-600 text-xs mb-3">{item.date}</p>
                   {item.description && item.description.length > 0 && (
                     <ul className="list-disc list-inside space-y-1 text-[13px] text-gray-700">
                       {item.description.map((desc, idx) => (
                         <li key={idx} className="pl-2 indent-[-16px] ml-4">{desc}</li>
                       ))}
                     </ul>
                   )}
                 </div>
               ))}
             </div>
           </div>
         ))}
      </div>
    </div>
  );
}
