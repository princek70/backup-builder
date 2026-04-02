'use client';

import React from 'react';
import { useUserContext } from '@/context/UserContext';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Template8() {
  const { resumeData } = useUserContext() as { resumeData: any };
  const { personalInfo, sections, skills, education } = resumeData;

  const experience = sections?.find((sec: any) => sec.type === 'experience');
  const otherSections = sections?.filter((sec: any) => sec.type !== 'experience');

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="bg-[#489d8d] text-white font-black uppercase text-sm tracking-widest pl-6 py-2 pr-12 inline-block rounded-r-full mb-4 shadow-sm relative -ml-8">
      {title}
    </div>
  );

  return (
    <div className="w-full h-full flex bg-white font-sans text-gray-800">
      
      {/* LEFT COLUMN - Teal accents */}
      <div className="w-[35%] bg-[#f4faf9] border-r-8 border-[#489d8d]/10 h-full p-8 flex flex-col pt-12">
        <div className="w-40 h-40 rounded-full overflow-hidden border-8 border-[#489d8d] mb-12 mx-auto shadow-md flex items-center justify-center bg-white">
          {(resumeData?.profileImage || personalInfo?.avatarUrl) ? (
            <img src={resumeData?.profileImage || personalInfo?.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <svg className="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          )}
        </div>

        <div className="mb-8 relative">
           <SectionHeader title="CONTACT" />
           <div className="space-y-3 text-sm text-gray-700 font-medium pl-2">
             <div className="flex items-center gap-3"><Phone size={16} className="text-[#489d8d]" /> {personalInfo?.phone}</div>
             <div className="flex items-center gap-3"><Mail size={16} className="text-[#489d8d]" /> {personalInfo?.email}</div>
             <div className="flex items-start gap-3"><MapPin size={16} className="text-[#489d8d] mt-1 shrink-0" /> <span className="leading-tight">{personalInfo?.location}</span></div>
           </div>
        </div>

        {/* Education on Left Side as per Image 2 */}
        {otherSections?.map((sec: any) => (
          <div key={sec.id} className="mb-8 relative">
            <SectionHeader title={sec.label || 'EDUCATION'} />
            <div className="space-y-4 pl-2">
              {sec.items?.map((item: any) => (
                <div key={item.id}>
                  <h4 className="font-bold text-[#489d8d] uppercase text-xs tracking-wider mb-1 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-sm bg-[#489d8d]/20 flex items-center justify-center text-[10px]">🎓</span>
                    {item.title}
                  </h4>
                  <p className="text-gray-800 text-sm font-semibold">{item.subtitle}</p>
                  <p className="text-gray-500 text-xs mt-1 font-mono">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {skills && skills.length > 0 && (
          <div className="mb-8 relative">
             <SectionHeader title="SKILLS" />
             <ul className="list-disc list-inside text-sm text-gray-700 space-y-2 pl-2 font-medium">
               {skills.map((skill: any, index: any) => (
                 <li key={index}>{skill}</li>
               ))}
             </ul>
          </div>
        )}

      </div>

      {/* RIGHT COLUMN - Main Content */}
      <div className="w-[65%] p-10 flex flex-col bg-white">
        
        {/* Header Block */}
        <div className="border-b-4 border-[#489d8d] pb-6 mb-8 pt-4">
          <h1 className="text-5xl font-black text-[#3c8476] mb-2 tracking-tight">
            {personalInfo?.name}
          </h1>
          <h2 className="text-xl font-medium text-gray-800 uppercase tracking-widest mb-6 border-b-2 border-gray-100 pb-4 inline-block">
            {personalInfo?.role}
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            {personalInfo?.summary}
          </p>
        </div>

        {/* EXPERIENCE */}
        {experience && (
          <div>
            <h3 className="text-xl font-bold tracking-widest text-[#489d8d] uppercase mb-4">
              {experience.label || 'EXPERIENCE'}
            </h3>
            <div className="border-t-2 border-gray-200 pt-6">
              <div className="space-y-8">
                {experience.items?.map((item: any) => (
                  <div key={item.id}>
                    <h4 className="font-bold text-[#3c8476] text-lg uppercase tracking-wide mb-1">{item.title}</h4>
                    <p className="text-gray-800 text-base">{item.subtitle}</p>
                    <p className="text-gray-500 text-sm mb-3 font-mono">{item.date}</p>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {item.description?.map((desc: any, i: any) => (
                        <li key={i} className="pl-2 -indent-6 ml-6">{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
