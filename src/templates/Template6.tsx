'use client';

import React from 'react';
import { useUserContext } from '@/context/UserContext';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Template6() {
  const { resumeData } = useUserContext() as { resumeData: any };
  const { personalInfo, sections, skills, education } = resumeData;

  const experience = sections?.find((sec: any) => sec.type === 'experience');
  const otherSections = sections?.filter((sec: any) => sec.type !== 'experience');

  return (
    <div className="w-full min-h-[11in] flex bg-white font-sans text-gray-900 leading-normal">
      {/* LEFT SIDEBAR (Dark Blue matching Modern Executive) */}
      <div className="w-[35%] bg-[#1a2b3c] text-white p-8 flex flex-col h-full shrink-0">
        {/* Profile Photo removed as requested */}

        <h1 className="text-4xl font-serif tracking-wide mb-2 leading-tight">
          {personalInfo?.name || 'Maxwell Prime'}
        </h1>
        <h2 className="text-lg font-medium text-gray-200 mb-10 tracking-wider">
          {personalInfo?.role || 'Executive'}
        </h2>

        <div className="w-full h-[2px] bg-white/20 mb-10"></div>

        <div className="space-y-4 text-sm text-gray-300 tracking-wide font-light">
          <p>{personalInfo?.phone}</p>
          <p>{personalInfo?.email}</p>
          <p>{personalInfo?.location}</p>
        </div>

        {personalInfo?.summary && (
          <div className="mt-10 text-sm font-light leading-relaxed text-gray-300">
            {personalInfo.summary}
          </div>
        )}
      </div>

      {/* RIGHT CONTENT AREA */}
      <div className="w-[65%] p-8 flex flex-col h-full bg-white text-gray-800">
        
        {/* EXPERIENCE SECTION */}
        {experience && (
          <div className="mb-8">
            <h3 className="text-lg font-bold tracking-widest text-[#1a2b3c] uppercase mb-4 border-b-2 border-gray-100 pb-2">
              {experience.label || 'EXPERIENCE'}
            </h3>
            <div className="space-y-6">
              {experience.items?.map((item: any) => (
                <div key={item.id}>
                  <h4 className="font-bold text-gray-900 text-base">{item.title}</h4>
                  <div className="flex justify-between items-center text-sm font-semibold text-[#29425c] mb-2">
                    <span>{item.subtitle}</span>
                    <span>{item.date}</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 text-sm space-y-1 text-gray-700">
                    {item.description?.map((desc: any, i: any) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OTHER SECTIONS (Education, Projects) */}
        {otherSections?.map((section: any) => (
          <div key={section.id} className="mb-8">
            <h3 className="text-lg font-bold tracking-widest text-[#1a2b3c] uppercase mb-4 border-b-2 border-gray-100 pb-2">
              {section.label}
            </h3>
            <div className="space-y-4">
              {section.items?.map((item: any) => (
                <div key={item.id}>
                  <h4 className="font-bold text-gray-900">{item.title}</h4>
                  <div className="flex justify-between text-sm text-[#29425c] mb-1">
                    <span>{item.subtitle}</span>
                    <span>{item.date}</span>
                  </div>
                  {item.description && item.description.length > 0 && (
                     <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1 mt-1">
                       {item.description?.map((desc: any, i: any) => (
                         <li key={i}>{desc}</li>
                       ))}
                     </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* SKILLS SECTION */}
        {skills && skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold tracking-widest text-[#1a2b3c] uppercase mb-4 border-b-2 border-gray-100 pb-2">
              SKILLS
            </h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700 font-medium">
              {skills.map((skill: any, index: any) => (
                <div key={index}>{skill}</div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
