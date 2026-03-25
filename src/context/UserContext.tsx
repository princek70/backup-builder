'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { updateUserResume } from '@/app/actions/resume';

export type SectionItem = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string[];
};

export type ResumeSection = {
  id: string;
  type: 'experience' | 'education' | 'projects' | 'custom';
  label: string;
  items: SectionItem[];
};

export type ResumeData = {
  personalInfo: {
    name: string;
    role: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    avatarUrl?: string;
  };
  skills: string[];
  languages: string[];
  certifications: string[];
  sections: ResumeSection[];
  activeTemplateId: string;
  profileImage?: string;
};

const defaultData: ResumeData = {
  activeTemplateId: 'template1',
  personalInfo: {
    name: 'Simmi Bhawani',
    role: 'Graphic Designer',
    email: 'info@best.site.com',
    phone: '+91 99999 99999',
    location: '123 Road, Mumbai, Maharashtra 010101, India',
    summary: 'Creative and detail-oriented Graphic Designer with 3 years of experience in visual storytelling, branding, and digital design.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250&h=250',
  },
  skills: ['Branding', 'Social Media', 'Motion Graphics', 'UI/UX Design', 'Illustration'],
  languages: ['English', 'Hindi', 'Marathi'],
  certifications: ['Adobe Certified Professional', 'Google Digital Marketing'],
  profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250&h=250',
  sections: [
    {
      id: 'sec-exp',
      type: 'experience',
      label: 'Experience',
      items: [
        {
          id: 'item-exp-1',
          title: 'Senior Graphic Designer',
          subtitle: 'ABC Creative Studio',
          date: 'Jan 2025 – Present',
          description: ['Lead the visual design team for high-profile client campaigns.', 'Developed brand identities and design systems for 10+ startups.'],
        },
      ],
    },
    {
      id: 'sec-edu',
      type: 'education',
      label: 'Education',
      items: [
        {
          id: 'item-edu-1',
          title: 'Bachelor of Design',
          subtitle: 'National Institute of Design (NID)',
          date: '2018 – 2022',
          description: ['GPA: 3.8/4.0'],
        },
      ],
    },
    {
      id: 'sec-proj',
      type: 'projects',
      label: 'Projects',
      items: [
        {
          id: 'item-proj-1',
          title: 'Brand Refresh: Local Bistro',
          subtitle: 'Identity Design',
          date: '2024',
          description: ['Redesigned full brand suite including logo, menus, and signage.'],
        },
      ],
    },
  ],
};

interface UserContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  updatePersonalInfo: (data: Partial<ResumeData['personalInfo']>) => void;
  updateSections: (sections: ResumeSection[]) => void;
  setActiveTemplate: (templateId: string) => void;
  resumeId?: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ 
  children, 
  initialData,
  resumeId
}: { 
  children: ReactNode;
  initialData?: ResumeData;
  resumeId?: string;
}) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData || defaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync with initialData if it changes (e.g. server-side updates)
  useEffect(() => {
    if (initialData) {
      setResumeData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (!resumeId) {
      const saved = localStorage.getItem('aiResumeData');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setResumeData(parsed);
        } catch (error) {
          console.error('Failed to restore resume data from localStorage', error);
        }
      }
    }
    setIsLoaded(true);
  }, [resumeId]);

  // DB Auto-save logic
  useEffect(() => {
    if (isLoaded && resumeId) {
      const timer = setTimeout(() => {
        updateUserResume(resumeId, resumeData);
      }, 1000); // 1s debounce
      return () => clearTimeout(timer);
    }
  }, [resumeData, isLoaded, resumeId]);

  // LocalStorage Fallback
  useEffect(() => {
    if (isLoaded && !resumeId) {
      localStorage.setItem('aiResumeData', JSON.stringify(resumeData));
    }
  }, [resumeData, isLoaded, resumeId]);

  const updatePersonalInfo = (data: Partial<ResumeData['personalInfo']>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data },
    }));
  };

  const updateSections = (sections: ResumeSection[]) => {
    setResumeData((prev) => ({ ...prev, sections }));
  };

  const setActiveTemplate = (templateId: string) => {
    setResumeData((prev) => ({ ...prev, activeTemplateId: templateId }));
  };

  if (!isLoaded) return null;

  return (
    <UserContext.Provider
      value={{ resumeData, setResumeData, updatePersonalInfo, updateSections, setActiveTemplate, resumeId }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
