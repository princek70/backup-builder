'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Preview from '@/components/Preview';
import { PenSquare, Eye, ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

/**
 * BuilderShell: Responsive wrapper for the resume builder.
 * - Desktop (md+): Side-by-side editor + preview
 * - Mobile (<md):  Single pane with tab switcher
 */
export default function BuilderShell() {
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');

  return (
    <main className="flex flex-col md:flex-row h-[100dvh] w-full print:block print:h-auto overflow-hidden">

      {/* ── Mobile Top Bar ── */}
      <div className="md:hidden flex items-center justify-between px-3 py-2.5 bg-white border-b border-outline-variant/20 z-30 shrink-0 gap-2">

        {/* Back link */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-primary shrink-0 min-w-[60px]"
        >
          <ArrowLeft size={17} />
          <span className="text-sm font-bold">Back</span>
        </Link>

        {/* Brand — centered */}
        <div className="flex items-center gap-1.5 flex-1 justify-center min-w-0">
          <Sparkles size={15} className="text-primary shrink-0" />
          <span className="text-sm font-black text-primary tracking-tight truncate">ArchitectAI</span>
        </div>

        {/* Edit / Preview toggle */}
        <div className="flex items-center bg-surface-container rounded-xl p-0.5 shrink-0">
          <button
            onClick={() => setMobileTab('edit')}
            className={`flex items-center gap-1 px-3 py-2 rounded-[10px] text-xs font-bold transition-all ${
              mobileTab === 'edit'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant'
            }`}
          >
            <PenSquare size={13} />
            Edit
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex items-center gap-1 px-3 py-2 rounded-[10px] text-xs font-bold transition-all ${
              mobileTab === 'preview'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant'
            }`}
          >
            <Eye size={13} />
            Preview
          </button>
        </div>
      </div>

      {/* ── Sidebar / Edit Pane ── */}
      <div
        className={`
          ${mobileTab === 'edit' ? 'flex' : 'hidden'} md:flex
          w-full md:w-[40%] flex-1 md:flex-none h-full
          bg-surface-container-low overflow-y-auto border-r border-surface-dim print:hidden
          flex-col
        `}
      >
        <Sidebar />
      </div>

      {/* ── Preview Pane ── */}
      <div
        className={`
          ${mobileTab === 'preview' ? 'flex' : 'hidden'} md:flex
          flex-1 h-full bg-surface-container overflow-y-auto
          p-4 sm:p-6 md:p-12 justify-center print:p-0 print:bg-white
          flex-col items-center
        `}
      >
        <Preview />
      </div>
    </main>
  );
}
