'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createUserResume } from '@/app/actions/resume';
import { Loader2 } from 'lucide-react';

interface TemplateCardProps {
  template: {
    id: number;
    name: string;
    thumbnail: string;
    category: string;
  };
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSelect = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const result = await createUserResume(template.id);
      if (result.success && result.id) {
        // Use router.replace to avoid back-button loops in some edge cases
        router.replace(`/builder/${result.id}`);
      } else {
        alert("Failed to create resume. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error creating resume:", error);
      alert("Something went wrong. Please check your connection.");
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    // Render a static placeholder during hydration to avoid mismatches
    return (
      <div className="bg-white rounded-3xl overflow-hidden shadow-ambient aspect-[3/4] border border-outline-variant/10 opacity-50">
        <img src={template.thumbnail} className="w-full h-full object-cover" alt={template.name} />
      </div>
    );
  }

  return (
    <div 
      onClick={handleSelect}
      className={`group relative bg-white rounded-3xl overflow-hidden shadow-ambient transition-all duration-500 cursor-pointer aspect-[3/4] max-h-[70vh] border border-outline-variant/10 ${
        isLoading ? 'opacity-70 scale-[0.98]' : 'hover:scale-[1.02]'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent"></div>
      <img 
        src={template.thumbnail} 
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
        alt={template.name} 
      />
      
      {isLoading && (
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex flex-col items-center justify-center z-30">
          <Loader2 className="w-12 h-12 text-white animate-spin mb-4" />
          <span className="text-white font-black text-xl tracking-tight drop-shadow-md">Starting...</span>
        </div>
      )}

      <div className="absolute bottom-6 left-6 right-6 p-6 glass-panel rounded-2xl border border-white/10 translate-y-2 group-hover:translate-y-0 transition-transform">
        <div className="flex justify-between items-center mb-1 pb-4">
          <h3 className="text-primary font-black text-xl">{template.name}</h3>
          <span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            {isLoading ? 'hourglass_top' : 'edit_square'}
          </span>
        </div>
        <p className="text-xs text-on-surface-variant font-medium uppercase tracking-widest">
          {isLoading ? 'Preparing Environment' : `${template.category} • Select to Edit`}
        </p>
      </div>
    </div>
  );
}
