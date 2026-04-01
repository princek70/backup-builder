'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Preview from '@/components/Preview';
import { PenSquare, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

/**
 * BuilderShell: Responsive wrapper for the resume builder.
 * - Desktop (md+): Side-by-side editor + preview (original layout)
 * - Mobile (<md): Bottom tab bar to switch between "Edit" and "Preview"
 */
export default function BuilderShell() {
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');

  return (
    <main className="flex flex-col md:flex-row h-[100dvh] w-full print:block print:h-auto overflow-hidden">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-outline-variant/20 z-30 shrink-0">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <ArrowLeft size={18} />
          <span className="text-sm font-bold">Back</span>
        </Link>
        <div className="flex items-center gap-1 bg-surface-container rounded-xl p-1">
          <button
            onClick={() => setMobileTab('edit')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              mobileTab === 'edit'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant'
            }`}
          >
            <PenSquare size={14} />
            Edit
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              mobileTab === 'preview'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant'
            }`}
          >
            <Eye size={14} />
            Preview
          </button>
        </div>
        <div className="w-[60px]" /> {/* Spacer for balance */}
      </div>

      {/* Sidebar Pane */}
      <div className={`
        ${mobileTab === 'edit' ? 'flex' : 'hidden'} md:flex
        w-full md:w-[40%] flex-1 md:flex-none h-full
        bg-surface-container-low overflow-y-auto border-r border-surface-dim print:hidden
        flex-col
      `}>
        <Sidebar />
      </div>

      {/* Preview Pane */}
      <div className={`
        ${mobileTab === 'preview' ? 'flex' : 'hidden'} md:flex
        flex-1 h-full bg-surface-container overflow-y-auto
        p-4 sm:p-6 md:p-12 justify-center print:p-0 print:bg-white
        flex-col items-center
      `}>
        <Preview />
      </div>
    </main>
  );
}
