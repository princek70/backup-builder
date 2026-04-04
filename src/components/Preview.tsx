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
  const [previewScale, setPreviewScale] = useState(1);
  const [isShort, setIsShort] = useState(false);

  const TemplateComponent = templates[resumeData.activeTemplateId] || Template1;

  const A4_HEIGHT = 1123; // Standard A4 height at 96 DPI

  // runtime Print-to-Fit Optimization
  useEffect(() => {
    // 1. Runtime Inline CSS Injection (Bypass Vercel Bundle Overwrites)
    const style = document.createElement('style');
    style.id = 'vercel-print-optimization';
    style.innerHTML = `
      @media print {
        @page { size: A4; margin: 0; }
        body { 
          margin: 0 !important; 
          padding: 0 !important; 
          -webkit-print-color-adjust: exact; 
          print-color-adjust: exact;
        }
        .no-print, #print-action-bar, nav, button, .sidebar { 
          display: none !important; 
        }
        #resume-preview { 
          width: 210mm !important; 
          height: 297mm !important; 
          margin: 0 !important; 
          padding: 0 !important;
          box-shadow: none !important;
          overflow: hidden !important;
        }
        .resume-section, section, div[class*="mb-"], .item { 
          break-inside: avoid !important; 
        }
      }
    `;
    document.head.appendChild(style);

    const handleBeforePrint = () => {
      const content = innerRef.current;
      const container = resumeRef.current;
      if (!content || !container) return;

      // 2. Precision Scaling using scrollHeight
      content.style.transform = 'none';
      content.style.width = '100%';
      const contentHeight = content.scrollHeight; 
      
      if (contentHeight > A4_HEIGHT) {
        const scaleFactor = A4_HEIGHT / contentHeight;
        // 3. The 'Vercel Fix': Explicit Scale-Origin and Height Reset
        content.style.transform = `scale(${scaleFactor})`;
        content.style.transformOrigin = 'top left';
        content.style.width = `${(1 / scaleFactor) * 100}%`;
        container.style.height = `${A4_HEIGHT}px`;
        content.style.justifyContent = 'start';
      } else {
        container.style.height = `${A4_HEIGHT}px`;
        content.style.justifyContent = 'space-between';
      }
    };

    const handleAfterPrint = () => {
       // Reset for DOM stability after print window close
       if (resumeRef.current) resumeRef.current.style.height = `${A4_HEIGHT}px`;
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
      document.getElementById('vercel-print-optimization')?.remove();
    };
  }, []);

  useEffect(() => {
    const calculateScale = () => {
      if (!innerRef.current || !resumeRef.current) return;
      
      // Temporarily remove transform and reset dimensions to get TRUE natural scrollHeight
      const prevTransform = innerRef.current.style.transform;
      const prevWidth = innerRef.current.style.width;
      const prevMinHeight = innerRef.current.style.minHeight;
      
      innerRef.current.style.transform = 'none';
      innerRef.current.style.width = '100%';
      innerRef.current.style.minHeight = '100%'; // Critical fix: wipe inflated minHeight
      
      const contentHeight = innerRef.current.scrollHeight;
      const short = contentHeight < A4_HEIGHT;
      setIsShort(short);
      
      if (contentHeight > A4_HEIGHT) {
        const newScale = A4_HEIGHT / contentHeight;
        setScale(newScale);
      } else {
        setScale(1);
      }
      
      // Calculate OUTER scale for mobile responsiveness horizontally
      if (resumeRef.current && resumeRef.current.parentElement) {
        const parentWidth = resumeRef.current.parentElement.clientWidth;
        const A4_PIXEL_WIDTH = 794; // approx 210mm in pixels
        if (parentWidth < A4_PIXEL_WIDTH) {
           setPreviewScale((parentWidth - 4) / A4_PIXEL_WIDTH);
        } else {
           setPreviewScale(1);
        }
      }
      
      // Restore inline styles quickly before React re-renders to avoid flicker
      innerRef.current.style.transform = prevTransform;
      innerRef.current.style.width = prevWidth;
      innerRef.current.style.minHeight = prevMinHeight;
    };

    calculateScale();
    const timeout = setTimeout(calculateScale, 150);
    const timeout2 = setTimeout(calculateScale, 500); // Catch delayed image loads
    const timeout3 = setTimeout(calculateScale, 1500); // Catch custom fonts loading
    
    window.addEventListener('resize', calculateScale);

    // Setup Observers to capture height changes caused by images/fonts loading asynchronously
    const resizeObserver = new ResizeObserver(() => calculateScale());
    if (innerRef.current) resizeObserver.observe(innerRef.current);

    const mutationObserver = new MutationObserver(() => calculateScale());
    if (innerRef.current) {
      mutationObserver.observe(innerRef.current, { childList: true, subtree: true, characterData: true });
    }

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      window.removeEventListener('resize', calculateScale);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [resumeData]);

  const handleDownloadPdf = () => {
    // Calling print triggers the beforeprint listener logic
    window.print();
  };

  return (
    <div className="w-full max-w-4xl h-full flex flex-col items-center">
      <style>{`
        @media print {
          @page { margin: 0; size: A4; }
          #resume-preview { break-inside: avoid; }
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
      
      <div id="print-action-bar" className="w-full flex justify-end mb-6 print:hidden no-print">
        <button 
          onClick={handleDownloadPdf}
          className="btn-primary flex items-center gap-2 shadow-sm"
        >
          <Download size={16} />
          Export to PDF
        </button>
      </div>

      {/* Dynamic Boundaries: Fixed A4 Height */}
      <div 
        className="w-[210mm] origin-top mx-auto bg-white shadow-ambient print:shadow-none overflow-hidden flex-shrink-0 flex flex-col transition-transform"
        ref={resumeRef}
        id="resume-preview"
        style={{ 
          height: `${A4_HEIGHT}px`,
          transform: previewScale < 1 ? `scale(${previewScale})` : 'none',
          marginBottom: previewScale < 1 ? `-${Math.round(A4_HEIGHT * (1 - previewScale))}px` : '0px'
        }}
      >
        {/* Dynamic Deep Shrink Wrapper */}
        <div 
          ref={innerRef}
          id="resume-content-wrapper"
          className={`resume-content origin-top-left flex flex-col bg-white flex-1 ${scale < 0.95 ? 'compact-mode' : ''}`}
          style={{ 
            transform: `scale(${scale})`, 
            width: `${(1 / scale) * 100}%`,
            minHeight: `${(1 / scale) * 100}%`,
            justifyContent: isShort ? 'space-between' : 'start'
          }}
        >
           <TemplateComponent />
        </div>
      </div>
    </div>
  );
}


