'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useUserContext } from '@/context/UserContext';
import { Download } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [mobileScale, setMobileScale] = useState(1);
  const [printHeight, setPrintHeight] = useState('11in');
  const [scale, setScale] = useState(1);

  const TemplateComponent = templates[resumeData.activeTemplateId] || Template1;

  useEffect(() => {
    const calculateScale = () => {
      if (!innerRef.current || !resumeRef.current) return;

      // Reset temporarily to measure raw height
      innerRef.current.style.transform = 'none';
      innerRef.current.style.width = '100%';

      const pageHeight = resumeRef.current.clientHeight;
      const contentHeight = innerRef.current.scrollHeight;

      // Track dynamic print height to force single-page export
      const pxToIn = (px: number) => px / 96;
      const totalInches = pxToIn(contentHeight);
      setPrintHeight(`${Math.max(11, totalInches)}in`);

      if (contentHeight > pageHeight) {
        const newScale = pageHeight / contentHeight;
        setScale(newScale);
      } else {
        setScale(1);
      }
    };

    calculateScale();
    const timeout = setTimeout(calculateScale, 150);
    return () => clearTimeout(timeout);
  }, [resumeData]);

  // Responsive scaling
  useEffect(() => {
    const calculateMobileScale = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const paperWidthPx = 8.5 * 96; // 816px
      if (containerWidth < paperWidthPx) {
        setMobileScale(containerWidth / paperWidthPx);
      } else {
        setMobileScale(1);
      }
    };

    calculateMobileScale();
    window.addEventListener('resize', calculateMobileScale);
    return () => window.removeEventListener('resize', calculateMobileScale);
  }, []);

  const handleDownloadPdf = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `${resumeData.personalInfo.name || 'Resume'}`,
    pageStyle: `@page { size: 8.5in ${printHeight} !important; margin: 0; } body { margin: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }`,
  });

  return (
    <div ref={containerRef} className="w-full max-w-4xl h-full flex flex-col items-center">
      <style>{`
        @media print {
          @page { margin: 0; size: letter; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          
          /* Ensures the printed content fits inside 8.5x11 inches without scale distortion */
          #resume-preview { 
             transform: none !important;
             width: 8.5in !important;
             height: auto !important;
             min-height: 11in !important;
             break-inside: avoid; 
             page-break-inside: avoid;
             box-shadow: none !important;
             margin: 0 !important;
             padding: 0 !important;
          }

          /* Restore inner scaling so content shrinks to fit correctly on print */
          .compact-mode {
             transform: scale(${scale}) !important;
             transform-origin: top left !important;
             width: ${(1 / scale) * 100}% !important;
          }
        }
        .compact-mode .mb-8 { margin-bottom: 1rem !important; }
        .compact-mode .mb-6 { margin-bottom: 0.75rem !important; }
        .compact-mode .mb-10 { margin-bottom: 1.25rem !important; }
        .compact-mode .space-y-6 > * + * { margin-top: 0.75rem !important; }
        .compact-mode .pt-24 { padding-top: 3rem !important; }
        .compact-mode .pt-20 { padding-top: 2rem !important; }
        .compact-mode .py-6 { padding-top: 1rem !important; padding-bottom: 1rem !important; }
        .compact-mode .pb-8 { padding-bottom: 1rem !important; }
      `}</style>
      
      <div className="w-full flex justify-end mb-4 sm:mb-6 print:hidden">
        <button 
          onClick={(e) => { e.preventDefault(); handleDownloadPdf(); }}
          className="btn-primary flex items-center gap-2 shadow-sm"
        >
          <Download size={16} />
          Export to PDF
        </button>
      </div>

      <div
        id="resume-paper-wrapper"
        style={{
          transform: `scale(${mobileScale})`,
          transformOrigin: 'top center',
          width: mobileScale < 1 ? `${(1 / mobileScale) * 100}%` : '100%',
          height: mobileScale < 1 ? `${11 * 96 * mobileScale}px` : 'auto',
        }}
        className="print:!transform-none"
      >
        <div 
          className="w-[8.5in] min-h-[11in] mx-auto bg-white shadow-ambient print:shadow-none overflow-visible flex-shrink-0 flex flex-col"
          ref={resumeRef}
          id="resume-preview"
        >
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
    </div>
  );
}
