'use client';

import React from 'react';
import { useUserContext } from '@/context/UserContext';


export default function Template7() {
  const { resumeData } = useUserContext() as { resumeData: any };
  const { personalInfo, sections, skills } = resumeData;

  // Render a purple badge-like header (Image 3 inspired)
  const renderBadgeHeader = (title: string) => (
    <div className="relative mb-4 mt-6 flex justify-start pl-4">
      <div className="absolute inset-0 bg-[#6b4c8a] clip-path-badge z-0" style={{ clipPath: 'polygon(5% 0, 100% 0%, 95% 100%, 0% 100%)' }}></div>
      <h3 className="relative z-10 text-white font-bold uppercase tracking-wider py-1 px-8 text-sm">
        {title}
      </h3>
    </div>
  );

  return (
    <div className="w-full min-h-[11in] p-8 flex flex-col bg-white text-gray-800 font-sans">
      
      {/* Header - Centered with background and border */}
      <div className="w-full flex flex-col items-center mb-6">
         {/* Profile Image */}
         <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#6b4c8a] mb-4 flex items-center justify-center bg-gray-50">
           {(resumeData?.profileImage || personalInfo?.avatarUrl) ? (
             <img src={resumeData?.profileImage || personalInfo?.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
           ) : (
             <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
           )}
         </div>
         <div className="bg-[#6b4c8a] text-white px-20 py-3 clip-path-hexagon mb-4" style={{ clipPath: 'polygon(5% 0, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)' }}>
            <h1 className="text-4xl font-black uppercase tracking-widest">{personalInfo?.name}</h1>
         </div>
         <div className="w-full bg-[#f3edf7] py-4 px-8 flex justify-between text-sm font-semibold text-gray-800 border-t-2 border-b-2 border-dashed border-[#6b4c8a]">
            <div>{personalInfo?.location || 'Shasta, TX'}</div>
            <div>EMAIL: {personalInfo?.email}</div>
            <div>PHONE: {personalInfo?.phone}</div>
         </div>
      </div>

      {/* SUMMARY */}
      {personalInfo?.summary && (
        <div>
          {renderBadgeHeader('ABOUT ME')}
          <p className="text-sm text-gray-700 leading-relaxed text-justify px-2">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* DYNAMIC SECTIONS */}
      {sections?.map((section: any) => (
        <div key={section.id}>
          {renderBadgeHeader(section.label || 'SECTION')}
          <div className="space-y-4 px-2">
            {section.items?.map((item: any) => (
              <div key={item.id} className="text-sm">
                <div className="font-bold text-gray-900">• {item.date}: {item.title} - {item.subtitle}</div>
                {item.description && item.description.length > 0 && (
                   <ul className="list-disc list-outside ml-8 text-gray-700 space-y-1 mt-1">
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

      {/* SKILLS */}
      {skills && skills.length > 0 && (
        <div className="mb-4">
           {renderBadgeHeader('SKILLS')}
           <p className="text-sm text-gray-700 px-2 leading-relaxed">
             {skills.join(' • ')}
           </p>
        </div>
      )}

    </div>
  );
}
