"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Preview from "@/components/Preview";
import { UserProvider } from "@/context/UserContext";
import { Edit3, Eye } from "lucide-react";

export default function BuilderPage() {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  return (
    <UserProvider>
      <main className="flex flex-col md:flex-row h-screen w-full print:block print:h-auto overflow-hidden">
        
        {/* Sidebar Pane (Hidden on mobile if 'preview' is active) */}
        <div 
          className={`w-full md:w-[40%] h-[calc(100vh-60px)] md:h-full bg-surface-container-low overflow-y-auto border-r border-surface-dim print:hidden shrink-0
            ${activeTab === 'edit' ? 'block' : 'hidden md:block'}
          `}
        >
          <Sidebar />
        </div>

        {/* Preview Pane (Hidden on mobile if 'edit' is active) */}
        <div 
          className={`w-full md:flex-1 h-[calc(100vh-60px)] md:h-full bg-surface-container overflow-y-auto p-4 md:p-12 flex justify-center print:p-0 print:bg-white shrink-0
            ${activeTab === 'preview' ? 'flex' : 'hidden md:flex'}
          `}
        >
          <Preview />
        </div>

        {/* Mobile Fixed Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 w-full h-[60px] bg-white border-t border-gray-200 flex shadow-2xl z-50 print:hidden">
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex-1 flex flex-col items-center justify-center gap-1 text-[11px] font-bold transition-colors ${
              activeTab === 'edit' 
                ? 'text-blue-600 bg-blue-50/50' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Edit3 size={20} />
            EDIT
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 flex flex-col items-center justify-center gap-1 text-[11px] font-bold transition-colors border-l border-gray-100 ${
              activeTab === 'preview' 
                ? 'text-blue-600 bg-blue-50/50' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Eye size={20} />
            PREVIEW
          </button>
        </div>

      </main>
    </UserProvider>
  );
}
