'use client';

import React from 'react';
import { useUserContext } from '@/context/UserContext';
import { Github, Linkedin, Globe, Mail, Phone } from 'lucide-react';

export default function Template9() {
  const { resumeData } = useUserContext() as { resumeData: any };
  const { personalInfo, sections, skills } = resumeData;

  const SectionHeader = ({ title }: { title: string }) => (
    <h3 className="text-[13px] font-bold uppercase tracking-widest border-b border-gray-400 pb-1 mb-3 mt-4 text-gray-900">
      {title}
    </h3>
  );

  return (
    <div className="w-full h-full p-10 bg-white font-serif text-gray-900 leading-snug">
      
      {/* HEADER */}
      <div className="text-center mb-6">
        {/* Profile Image */}
        <div className="flex justify-center mb-3">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-50">
            {(resumeData?.profileImage || personalInfo?.avatarUrl) ? (
              <img src={resumeData?.profileImage || personalInfo?.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-10 h-10 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            )}
          </div>
        </div>
        <h1 className="text-4xl font-normal tracking-wide mb-1">{personalInfo?.name}</h1>
        <h2 className="text-[15px] font-medium text-gray-700">{personalInfo?.role}</h2>
        
        {/* Contact Links horizontally grouped */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-3 text-[11px] font-sans text-gray-700">
          {personalInfo?.phone && (
             <div className="flex items-center gap-1"><Phone size={12} className="text-black"/> {personalInfo.phone}</div>
          )}
          {personalInfo?.email && (
             <>
               <span className="text-gray-300">|</span>
               <div className="flex items-center gap-1"><Mail size={12} className="text-black"/> {personalInfo.email}</div>
             </>
          )}
          {personalInfo?.location && (
             <>
               <span className="text-gray-300">|</span>
               <div className="flex items-center gap-1"><MapPinIcon size={12} className="text-black"/> {personalInfo.location}</div>
             </>
          )}
          {/* Mock Social placeholders since data JSON might not have them explicitly */}
          <>
             <span className="text-gray-300">|</span>
             <div className="flex items-center gap-1"><Linkedin size={12} className="text-black"/> LinkedIn</div>
          </>
          <>
             <span className="text-gray-300">|</span>
             <div className="flex items-center gap-1"><Github size={12} className="text-black"/> GitHub</div>
          </>
        </div>
      </div>

      {/* SUMMARY */}
      {personalInfo?.summary && (
        <div className="mb-4">
          <SectionHeader title="SUMMARY" />
          <p className="text-[12px] text-gray-800 leading-relaxed text-justify">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* EDUCATION - Left aligned dates */}
      {sections?.find((sec: any) => sec.type === 'education') && (
        <div className="mb-4">
          <SectionHeader title="EDUCATION" />
          <div className="space-y-3">
             {sections.find((sec: any) => sec.type === 'education').items?.map((item: any) => (
                <div key={item.id} className="flex gap-4 text-[12px]">
                   <div className="w-24 shrink-0 font-medium whitespace-nowrap">{item.date}</div>
                   <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <p className="text-gray-800">{item.subtitle}</p>
                      {item.description && item.description.length > 0 && (
                        <p className="text-gray-600 italic mt-0.5">{item.description.join(', ')}</p>
                      )}
                   </div>
                </div>
             ))}
          </div>
        </div>
      )}

      {/* OTHER SECTIONS (Experience, Projects) */}
      {sections?.filter((sec: any) => sec.type !== 'education').map((sec: any) => (
        <div key={sec.id} className="mb-4">
          <SectionHeader title={sec.label || 'SECTION'} />
          <div className="space-y-4">
            {sec.items?.map((item: any) => (
              <div key={item.id} className="text-[12px]">
                 <div className="flex justify-between items-baseline mb-1">
                   <h4 className="font-bold text-gray-900">
                     {item.title} {item.subtitle && <span className="font-normal text-gray-600">— {item.subtitle}</span>}
                   </h4>
                   <span className="text-gray-700 whitespace-nowrap ml-4">{item.date}</span>
                 </div>
                 {item.description && item.description.length > 0 && (
                   <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-gray-800">
                     {item.description.map((desc: any, i: any) => (
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
           <SectionHeader title="SKILLS" />
           <p className="text-[12px] text-gray-800 leading-relaxed font-sans">
             <span className="font-serif font-bold mr-2 text-gray-900">Core Competencies:</span>
             {skills.join(', ')}
           </p>
        </div>
      )}

    </div>
  );
}

const MapPinIcon = ({ size, className }: { size: number, className: string }) => (
  // Custom simple map pin since MapPin wasn't imported from lucide above
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
