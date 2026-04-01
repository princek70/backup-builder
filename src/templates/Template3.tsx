'use client';

import React from 'react';
import { useUserContext } from '@/context/UserContext';

export default function Template3() {
  const { resumeData } = useUserContext();
  const { personalInfo, sections, skills, languages } = resumeData;

  return (
    <div className="w-full flex-1 min-h-[11in] flex flex-col bg-white font-sans text-sm p-12">
      
      {/* Top Header Block */}
      <div className="flex justify-between items-start mb-10 w-full">
        <div className="w-[60%]">
          <h1 className="text-6xl font-black text-gray-900 tracking-tighter leading-none mb-6">
            {personalInfo.name.split(' ').map((n: string, i: number) => <span key={i} className="block">{n}</span>)}
          </h1>
          <p className="text-gray-700 leading-snug text-[15px] pr-10">
            {personalInfo.summary}
          </p>
        </div>
        <div className="w-[35%] flex flex-col items-end gap-6 pt-2">
          {/* Profile Image */}
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-900 mb-2 flex items-center justify-center bg-gray-50">
            {(resumeData?.profileImage || personalInfo?.avatarUrl) ? (
              <img src={resumeData?.profileImage || personalInfo?.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            )}
          </div>
          <div className="text-right text-sm text-gray-800">
            <div>
               <p>{personalInfo.location.split(',')[0]}</p>
               <p>{personalInfo.location.split(',').slice(1).join(',')}</p>
            </div>
            <div>
               <p>{personalInfo.phone}</p>
               <p>{personalInfo.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Col Layout */}
      <div className="flex w-full mt-6 gap-16">
         {/* Left Col (Dynamic Sections) */}
         <div className="w-[55%] flex flex-col gap-12">
            {sections.map(section => (
              <div key={section.id}>
                <h2 className="text-2xl font-black mb-1 border-b-[3px] border-gray-900 pb-2 inline-block relative after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-full after:h-[3px] after:bg-gray-900">{section.label}</h2>
                <div className="w-full h-px bg-gray-300 mb-6 absolute -z-10 mt-[-1px]"/>
                <div className="space-y-6">
                  {section.items.map(item => (
                    <div key={item.id} className="relative">
                       <h3 className="font-bold text-gray-800">{item.title}</h3>
                       <p className="text-gray-600 text-sm mb-1">{item.subtitle}</p>
                       <p className="text-gray-500 text-xs mb-3">{item.date}</p>
                       {item.description && item.description.length > 0 && (
                         <ul className="list-none space-y-1 text-gray-700 text-sm">
                           {item.description.map((desc, idx) => <li key={idx} className="mb-1 leading-snug">{desc}</li>)}
                         </ul>
                       )}
                       {item.description && item.description.length > 0 && (
                         <div className="w-full h-px bg-gray-200 mt-6" />
                       )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
         </div>

         {/* Right Col (Skills, Languages) */}
         <div className="w-[45%] flex flex-col gap-12">
            {/* Skills */}
            <div>
                <h2 className="text-2xl font-black mb-1 border-b-[3px] border-gray-900 pb-2 inline-block relative after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-full after:h-[3px] after:bg-gray-900">Skills</h2>
                <div className="w-full h-px bg-gray-300 mb-6 absolute -z-10 mt-[-1px]"/>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index}>
                       <p className="text-gray-800 text-sm mb-1">{skill}</p>
                       <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-gray-500 h-full w-[85%]" />
                       </div>
                    </div>
                  ))}
                </div>
            </div>

            {/* Languages */}
            <div>
                <h2 className="text-2xl font-black mb-1 border-b-[3px] border-gray-900 pb-2 inline-block relative after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-full after:h-[3px] after:bg-gray-900">Languages</h2>
                <div className="w-full h-px bg-gray-300 mb-6 absolute -z-10 mt-[-1px]"/>
                <ul className="space-y-3">
                  {languages.map((lang, index) => (
                    <li key={index} className="text-gray-800 text-sm border-b border-gray-100 pb-2">{lang}</li>
                  ))}
                </ul>
            </div>
         </div>
      </div>
    </div>
  );
}
