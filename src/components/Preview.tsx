'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useUserContext } from '@/context/UserContext';
import { Download } from 'lucide-react';

import Template1 from '@/templates/Template1';
import Template2 from '@/templates/Template2';
import Template3 from '@/templates/Template3';
import Template5 from '@/templates/Template5';
import Template6 from '@/templates/Template6';
import Template7 from '@/templates/Template7';
import Template8 from '@/templates/Template8';
import Template9 from '@/templates/Template9';

const templates: Record<string, React.FC> = {
  template1: Template1,
  template2: Template2,
  template3: Template3,
  template5: Template5,
  template6: Template6,
  template7: Template7,
  template8: Template8,
  template9: Template9,
};

export default function Preview() {
  const { resumeData } = useUserContext();
  const resumeRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const TemplateComponent = templates[resumeData.activeTemplateId] || Template1;

  useEffect(() => {
    // Mathematical auto-shrink to fit EXACTLY 1 page without reflow breaks
    const calculateScale = () => {
      if (!innerRef.current || !resumeRef.current) return;
      
      // Reset temporarily to measure raw height seamlessly
      innerRef.current.style.transform = 'none';
      innerRef.current.style.width = '100%';
      
      const pageHeight = resumeRef.current.clientHeight; // Exactly 11in Box
      const contentHeight = innerRef.current.scrollHeight;
      
      if (contentHeight > pageHeight) {
        // Auto-Shrink applied
        const newScale = pageHeight / contentHeight;
        setScale(newScale);
      } else {
        setScale(1);
      }
    };

    calculateScale();
    const timeout = setTimeout(calculateScale, 150); // Delay for font painting completion
    return () => clearTimeout(timeout);
  }, [resumeData]);

  const handleDownloadPdf = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;
    
    // Temporarily remove shadow for PDF generation
    const originalShadow = element.style.boxShadow;
    element.style.boxShadow = 'none';

    try {
      // Dynamic import prevents SSR errors ('window is not defined')
      const html2pdf = (await import('html2pdf.js')).default;
      
      const safeName = resumeData.personalInfo.name ? resumeData.personalInfo.name.replace(/\s+/g, '_') : 'My';
      const fileName = `${safeName}_Resume.pdf`;
      
      const opt = {
        margin:       0,
        filename:     fileName,
        image:        { type: 'jpeg' as const, quality: 1 },
        html2canvas:  { scale: 2, useCORS: true, logging: false },
        jsPDF:        { unit: 'in' as const, format: 'letter' as const, orientation: 'portrait' as const }
      };
      
      // html2pdf automatically handles capturing and downloading the file
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('PDF Generation Failed:', err);
    } finally {
      element.style.boxShadow = originalShadow;
    }
  };

  return (
    <div className="w-full max-w-4xl h-full flex flex-col items-center">
      <style>{`
        @media print {
          @page { margin: 0; size: letter; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          #resume-preview { 
             break-inside: avoid; 
             page-break-inside: avoid;
          }
        }
        /* Scale-to-Fit Utility: Compact Mode */
        .compact-mode .mb-8 { margin-bottom: 1rem !important; }
        .compact-mode .mb-6 { margin-bottom: 0.75rem !important; }
        .compact-mode .mb-10 { margin-bottom: 1.25rem !important; }
        .compact-mode .space-y-6 > * + * { margin-top: 0.75rem !important; }
        .compact-mode .pt-24 { padding-top: 3rem !important; }
        .compact-mode .pt-20 { padding-top: 2rem !important; }
        .compact-mode .py-6 { padding-top: 1rem !important; padding-bottom: 1rem !important; }
        .compact-mode .pb-8 { padding-bottom: 1rem !important; }
      `}</style>
      
      <div className="w-full flex justify-end mb-6 print:hidden">
        <button 
          onClick={handleDownloadPdf}
          className="btn-primary flex items-center gap-2 shadow-sm"
        >
          <Download size={16} />
          Export to PDF
        </button>
      </div>

      {/* Dynamic Boundaries */}
      <div 
        className="w-[8.5in] min-h-[11in] mx-auto bg-white shadow-ambient print:shadow-none overflow-visible flex-shrink-0 flex flex-col"
        ref={resumeRef}
        id="resume-preview"
      >
        {/* Dynamic Deep Shrink Wrapper */}
        <div 
          ref={innerRef}
          className={`origin-top-left flex flex-col bg-white flex-1 ${scale < 0.95 ? 'compact-mode' : ''}`}
          style={{ 
            transform: `scale(${scale})`, 
            width: `${(1 / scale) * 100}%`,
            minHeight: `${(1 / scale) * 100}%`
          }}
        >
           <TemplateComponent />
        </div>
      </div>
    </div>
  );
}
