'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { useUserContext, ResumeSection } from '@/context/UserContext';
import { getTemplates } from '@/app/actions/resume';
import { Reorder } from 'framer-motion';
import { GripVertical, Plus, Wand2, ChevronDown, ChevronRight, Trash2 } from 'lucide-react';

export default function Sidebar() {
  const { resumeData, setResumeData, updatePersonalInfo, updateSections, setActiveTemplate, resumeId } = useUserContext();
  const [activeTab, setActiveTab] = useState<'content' | 'templates' | 'ai'>('content');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const [dbTemplates, setDbTemplates] = useState<any[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);

  const [chatMessages, setChatMessages] = useState<{role: 'agent'|'user', text: string}[]>([
    { role: 'agent', text: 'Hi! I am officially connected. I can evaluate your wording, generate bullet points, and critique your format right now. What would you like assistance with?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  useEffect(() => {
    if (activeTab === 'templates' && dbTemplates.length === 0) {
      setIsLoadingTemplates(true);
      getTemplates().then(data => {
        setDbTemplates(data);
        setIsLoadingTemplates(false);
      }).catch(err => {
        console.error("Failed to load templates", err);
        setIsLoadingTemplates(false);
      });
    }
  }, [activeTab, dbTemplates.length]);

  const handleTemplateSwitch = (template: any) => {
    const tId = `template${template.id}`;
    try {
      const parsedData = JSON.parse(template.data);
      // Intelligent Switching: Check if current name is empty or default seed dummy ("Simmi Bhawani")
      if (!resumeData.personalInfo.name || resumeData.personalInfo.name === 'Simmi Bhawani' || resumeData.personalInfo.name.trim() === '') {
        // Safe to inject template's specific default data, overwriting current
        setResumeData({ ...parsedData, activeTemplateId: tId });
      } else {
        // User has already typed something. Preserve their edits!
        setActiveTemplate(tId);
      }
    } catch (e) {
      console.error("Error parsing template JSON", e);
      setActiveTemplate(tId);
    }
  };

  const handleChatSubmit = async () => {
    if(!chatInput.trim() || isTyping) return;
    const userMsg = chatInput.trim();
    
    const newHistory = [...chatMessages, { role: 'user' as const, text: userMsg }];
    setChatMessages(newHistory);
    setChatInput('');
    setIsTyping(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory,
          resumeData: resumeData
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.reply) {
         setChatMessages(prev => [...prev, { role: 'agent', text: data.reply }]);
      } else {
         console.error('Chat API Error:', data.error, response.status, response.statusText);
         setChatMessages(prev => [...prev, { role: 'agent', text: data.error || 'AI Assistant is offline' }]);
      }
    } catch (err) {
      console.error('Frontend Chat Fetch Error:', err);
      setChatMessages(prev => [...prev, { role: 'agent', text: '**Error:** Communication failed. The server might be down or compiling.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSectionsReorder = (newOrder: ResumeSection[]) => {
    updateSections(newOrder);
  };

  const updateItem = (sectionId: string, itemId: string, data: Partial<any>) => {
    const newSections = resumeData.sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: s.items.map(i => i.id === itemId ? { ...i, ...data } : i)
        };
      }
      return s;
    });
    updateSections(newSections);
  };

  const addItem = (sectionId: string) => {
    const newSections = resumeData.sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: [...s.items, { id: `item-${Date.now()}`, title: 'New Item', subtitle: 'Subtitle', date: 'Date', description: [] }]
        };
      }
      return s;
    });
    updateSections(newSections);
  };

  const removeItem = (sectionId: string, itemId: string) => {
    const newSections = resumeData.sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: s.items.filter(i => i.id !== itemId)
        };
      }
      return s;
    });
    updateSections(newSections);
  };

  const addSection = (type: ResumeSection['type']) => {
    const labels: Record<string, string> = {
      experience: 'Experience',
      education: 'Education',
      projects: 'Projects',
      custom: 'New Section'
    };
    
    const newSection: ResumeSection = {
      id: `sec-${Date.now()}`,
      type,
      label: labels[type] || 'New Section',
      items: []
    };
    
    updateSections([...resumeData.sections, newSection]);
    setExpandedSection(newSection.id);
  };

  const removeSection = (sectionId: string) => {
    if (confirm('Are you sure you want to delete this entire section?')) {
      updateSections(resumeData.sections.filter(s => s.id !== sectionId));
    }
  };

  const resetToRecommended = () => {
    if (confirm('This will replace your current content with our professional recommended structure. Continue?')) {
      localStorage.removeItem('aiResumeData');
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface-container-low p-6 no-print">
      <div className="mb-8 border-b border-primary/10 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-primary tracking-tighter">ArchitectAI</h1>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">
            {resumeId ? `Editing: ${resumeId.slice(0, 8)}...` : "Local Mode"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {resumeId && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100 animate-pulse">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="text-[10px] font-bold uppercase tracking-wider">Saved</span>
            </div>
          )}
          <button 
            onClick={resetToRecommended}
            className="p-2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
            title="Reset to Recommended Defaults"
          >
            <span className="material-symbols-outlined text-sm">restart_alt</span>
          </button>
        </div>
      </div>

      <div className="flex space-x-2 mb-6 border-b border-outline-variant/30 pb-2">
        {(['content', 'templates', 'ai'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors capitalize ${
              activeTab === tab 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 pr-2 space-y-8">
        {activeTab === 'content' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
            {/* Personal Details Form */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-ambient">
              <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Personal Details</h2>
              <div className="space-y-4">
                
                <div className="flex flex-col gap-2 relative mb-4">
                  <label className="text-xs font-semibold text-primary uppercase tracking-wider">Profile Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const result = event.target?.result;
                          if (result && typeof result === 'string') {
                            setResumeData(prev => ({ ...prev, profileImage: result }));
                            // Keeping avatarUrl updated for backwards compatibility with other templates
                            updatePersonalInfo({ avatarUrl: result });
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Full Name"
                  className="ghost-input"
                  value={resumeData.personalInfo.name}
                  onChange={(e) => updatePersonalInfo({ name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Job Role / Title"
                  className="ghost-input"
                  value={resumeData.personalInfo.role}
                  onChange={(e) => updatePersonalInfo({ role: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="ghost-input"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    className="ghost-input"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Location"
                  className="ghost-input"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                />
                <textarea
                  placeholder="Professional Summary"
                  className="ghost-input min-h-[100px] resize-y"
                  value={resumeData.personalInfo.summary}
                  onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
                />
              </div>

              <div className="mt-6 border-t border-outline-variant/30 pt-6">
                <h3 className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">Skills (Comma Separated)</h3>
                <textarea
                  className="ghost-input resize-y min-h-[60px] text-sm"
                  value={resumeData.skills.join(',')}
                  onChange={(e) => setResumeData(prev => ({...prev, skills: e.target.value.split(',')}))}
                />
              </div>

              <div className="mt-6 border-t border-outline-variant/30 pt-6">
                <h3 className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">Languages (Comma Separated)</h3>
                <textarea
                  className="ghost-input resize-y min-h-[60px] text-sm"
                  value={resumeData.languages.join(',')}
                  onChange={(e) => setResumeData(prev => ({...prev, languages: e.target.value.split(',')}))}
                />
              </div>
            </div>

            {/* Draggable Sections */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">Dynamic Sections</h2>
                <div className="flex gap-1">
                  {(['experience', 'education', 'projects'] as const).map(type => (
                    <button 
                      key={type}
                      onClick={() => addSection(type)}
                      className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded hover:bg-primary/20 transition-colors"
                    >
                      + {type.slice(0,3)}
                    </button>
                  ))}
                </div>
              </div>
              
              <Reorder.Group 
                axis="y" 
                values={resumeData.sections} 
                onReorder={handleSectionsReorder}
                className="space-y-3"
              >
                {resumeData.sections.map((section) => (
                  <Reorder.Item 
                    key={section.id} 
                    value={section}
                    className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border-l-4 border-surface-tint cursor-grab active:cursor-grabbing hover:shadow-ambient transition-shadow group flex flex-col items-start gap-4"
                  >
                    <div className="flex w-full items-start gap-4">
                      <div className="mt-1 text-outline-variant group-hover:text-primary transition-colors cursor-grab">
                        <GripVertical size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={section.label}
                            onChange={(e) => {
                              const newSections = resumeData.sections.map(s => s.id === section.id ? { ...s, label: e.target.value } : s);
                              updateSections(newSections);
                            }}
                            className="font-medium text-sm text-primary focus:outline-none focus:border-b border-primary bg-transparent"
                          />
                          <div className="flex items-center gap-3">
                            <button 
                              className="text-on-surface-variant/30 hover:text-error transition-colors p-1"
                              onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}
                            >
                              <Trash2 size={14} />
                            </button>
                            <button 
                              className="text-on-surface-variant hover:text-primary flex items-center gap-1 cursor-pointer"
                              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                            >
                              <span className="text-xs">{itemCountToggleText(section.items.length)}</span>
                              {expandedSection === section.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {expandedSection === section.id && (
                      <div className="w-full mt-2 pl-8 border-l-2 border-surface-tint/20 pb-2 cursor-default" onPointerDownCapture={e => e.stopPropagation()}>
                        <div className="space-y-4">
                          {section.items.map((item) => (
                            <div key={item.id} className="bg-surface-container/30 p-3 rounded-lg space-y-2 border border-outline-variant/20">
                              <div className="flex items-center gap-2">
                                <input 
                                  type="text" className="ghost-input text-xs font-semibold !py-1 flex-1 w-full" value={item.title} placeholder="Title"
                                  onChange={(e) => updateItem(section.id, item.id, {title: e.target.value})} 
                                />
                                <button 
                                  onClick={() => removeItem(section.id, item.id)}
                                  className="text-on-surface-variant/50 hover:text-error transition-colors p-1 rounded hover:bg-error-container/20"
                                  title="Remove Entry"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <input 
                                type="text" className="ghost-input text-xs !py-1" value={item.subtitle} placeholder="Subtitle/Company"
                                onChange={(e) => updateItem(section.id, item.id, {subtitle: e.target.value})} 
                              />
                              <input 
                                type="text" className="ghost-input text-xs !py-1" value={item.date} placeholder="Date (e.g. Jan 2025 - Present)"
                                onChange={(e) => updateItem(section.id, item.id, {date: e.target.value})} 
                              />
                              <textarea 
                                className="ghost-input text-xs min-h-[60px] !py-1" placeholder="Bullet Points (One per line)"
                                value={(item.description || []).join('\n')}
                                onChange={(e) => updateItem(section.id, item.id, {description: e.target.value.split('\n')})} 
                              />
                            </div>
                          ))}
                        </div>
                        <button 
                          className="mt-3 text-xs text-primary font-medium hover:underline flex items-center gap-1"
                          onClick={() => addItem(section.id)}
                        >
                          <Plus size={12} /> Add new entry
                        </button>
                      </div>
                    )}
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Select a Template</h2>
            {isLoadingTemplates ? (
              <div className="flex justify-center p-8">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {dbTemplates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTemplateSwitch(t)}
                    className={`relative p-0 rounded-2xl border-2 transition-all aspect-[3/4] overflow-hidden group hover:shadow-lg ${
                      resumeData.activeTemplateId === `template${t.id}`
                        ? 'border-primary ring-2 ring-primary ring-offset-2' 
                        : 'border-transparent hover:border-primary/50 shadow-ambient'
                    }`}
                  >
                    <img src={t.thumbnail} alt={t.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4 text-left">
                       <p className="text-sm font-black text-white leading-tight drop-shadow-md mb-0.5 group-hover:text-primary-fixed transition-colors">{t.name}</p>
                       <p className="text-[9px] font-bold tracking-widest uppercase text-white/80">{t.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 relative group h-full pb-10">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-surface-tint rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="glass-panel p-6 rounded-xl relative border border-white/20 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-6 text-primary">
                <Wand2 size={24} />
                <h2 className="font-semibold text-lg">Agentic Chat</h2>
              </div>
              <div className="flex-1 flex flex-col gap-4 overflow-y-auto mb-4 pr-2">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`p-3 rounded-xl text-sm w-[90%] shadow border border-black/5 ${msg.role === 'agent' ? 'bg-indigo-50 text-slate-900 self-start' : 'bg-indigo-600 text-white self-end'}`}>
                    {msg.role === 'agent' ? (
                       <ReactMarkdown
                         components={{
                           p: ({node, ...props}) => <p className="mb-2 last:mb-0 text-slate-800" {...props} />,
                           ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 text-slate-800" {...props} />,
                           ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 text-slate-800" {...props} />,
                           strong: ({node, ...props}) => <strong className="font-bold text-slate-900" {...props} />,
                           a: ({node, ...props}) => <a className="text-indigo-600 underline font-medium hover:text-indigo-800 transition-colors" {...props} />,
                           h1: ({node, ...props}) => <h1 className="text-slate-900 font-bold text-base mb-2" {...props} />,
                           h2: ({node, ...props}) => <h2 className="text-slate-900 font-bold text-sm mb-2" {...props} />,
                           h3: ({node, ...props}) => <h3 className="text-slate-900 font-bold text-sm mb-2" {...props} />
                         }}
                       >
                         {msg.text}
                       </ReactMarkdown>
                    ) : (
                       msg.text
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="p-3 rounded-xl text-sm w-[90%] shadow border border-black/5 bg-indigo-50 text-slate-900 self-start animate-pulse flex items-center gap-2">
                     <span className="w-1.5 h-1.5 bg-current rounded-full" />
                     <span className="w-1.5 h-1.5 bg-current rounded-full" />
                     <span className="w-1.5 h-1.5 bg-current rounded-full" />
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              
              <div className="mt-auto relative">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChatSubmit()}
                  placeholder="Ask Gemini to evaluate..." 
                  disabled={isTyping}
                  className="w-full bg-white/50 border border-white/40 focus:border-primary/50 focus:bg-white focus:outline-none rounded-xl py-3 pl-4 pr-10 text-sm shadow-sm transition-all disabled:opacity-50"
                />
                <button onClick={handleChatSubmit} disabled={isTyping} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-surface-tint disabled:opacity-50">
                  <Wand2 size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function itemCountToggleText(count: number) {
  return `${count} item${count !== 1 ? 's' : ''}`;
}
