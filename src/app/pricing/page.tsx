import MainLayout from "@/components/MainLayout";
import { Check, Zap, ShieldCheck } from "lucide-react";
import Link from 'next/link';

export default function PricingPage() {
  return (
    <MainLayout>
      <section className="px-8 pt-20 pb-24 bg-surface relative overflow-hidden min-h-screen flex flex-col items-center">
        {/* Premium Background Gradients */}
        <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-indigo-600/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-teal-500/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="text-center mb-8">
            <span className="inline-block py-1.5 px-5 rounded-full bg-indigo-50/80 text-indigo-700 text-[11px] font-black uppercase tracking-widest mb-6 border border-indigo-100 shadow-sm backdrop-blur-md">
              Level Up Your Career
            </span>
            <h1 className="text-primary text-5xl md:text-7xl font-black tracking-tight mb-6">Invest in Your Potential</h1>
            <p className="text-xl text-on-surface-variant max-w-2xl mx-auto font-medium leading-relaxed">Scalable tools for every professional stage. Master templates, AI content optimization, and flawless PDFs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Free */}
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/60 shadow-ambient flex flex-col group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="relative z-10 flex flex-col h-full text-primary">
                <div className="mb-8">
                  <h3 className="text-2xl font-black mb-1">Basic Blueprint</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black">₹0</span>
                    <span className="opacity-80 font-bold text-sm">/ mo</span>
                  </div>
                  <p className="mt-4 text-sm text-on-surface-variant font-medium">Perfect for students and early professionals.</p>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-sm font-semibold">
                    <div className="bg-indigo-50 p-1.5 rounded-full"><Check size={14} className="text-indigo-600" /></div>
                    1 Active Resume
                  </li>
                  <li className="flex items-center gap-3 text-sm font-semibold">
                    <div className="bg-indigo-50 p-1.5 rounded-full"><Check size={14} className="text-indigo-600" /></div>
                    2 Standard Templates
                  </li>
                  <li className="flex items-center gap-3 text-sm font-semibold">
                    <div className="bg-indigo-50 p-1.5 rounded-full"><Check size={14} className="text-indigo-600" /></div>
                    Standard PDF Export
                  </li>
                </ul>
                <Link href="/#templates">
                  <button className="w-full bg-surface-container-high text-primary py-4 rounded-2xl font-black transition-colors hover:bg-surface-container-highest">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>

            {/* Elite - Most Prominent */}
            <div className="bg-indigo-950 p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-900/40 flex flex-col relative md:scale-[1.05] z-20 group hover:shadow-indigo-600/50 hover:-translate-y-2 transition-all duration-500 overflow-hidden ring-4 ring-indigo-500/20">
               <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-400 text-teal-950 px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-teal-500/20 z-30 flex items-center gap-2">
                 <Zap size={10} className="fill-teal-950" />
                 Best Value
               </div>
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
               <div className="relative z-10 flex flex-col h-full text-white">
                 <div className="mb-8">
                   <h3 className="text-3xl font-black mb-1">Full Architect</h3>
                   <div className="flex items-baseline gap-1">
                     <span className="text-6xl font-black">₹300</span>
                     <span className="opacity-80 font-bold text-sm">/ mo</span>
                   </div>
                   <p className="mt-4 text-sm opacity-90 font-medium leading-relaxed">The ultimate career toolset for serious industry leaders.</p>
                 </div>
                 <ul className="space-y-4 mb-10 flex-1">
                   <li className="flex items-center gap-3 text-sm font-semibold">
                     <div className="bg-white/10 p-1.5 rounded-full backdrop-blur-sm"><Zap size={14} className="text-teal-300 fill-teal-300" /></div>
                     Unlimited Resumes
                   </li>
                   <li className="flex items-center gap-3 text-sm font-semibold">
                     <div className="bg-white/10 p-1.5 rounded-full backdrop-blur-sm"><Zap size={14} className="text-teal-300 fill-teal-300" /></div>
                     AI Writing Assistant
                   </li>
                   <li className="flex items-center gap-3 text-sm font-semibold">
                     <div className="bg-white/10 p-1.5 rounded-full backdrop-blur-sm"><Zap size={14} className="text-teal-300 fill-teal-300" /></div>
                     Priority Support
                   </li>
                   <li className="flex items-center gap-3 text-sm font-semibold">
                     <div className="bg-white/10 p-1.5 rounded-full backdrop-blur-sm"><Zap size={14} className="text-teal-300 fill-teal-300" /></div>
                     Lifetime Storage
                   </li>
                 </ul>
                 <Link href="/#templates">
                   <button className="w-full bg-white text-indigo-950 py-5 rounded-2xl font-black transition-transform hover:scale-[1.02] shadow-xl hover:bg-teal-50">
                     Go Elite
                   </button>
                 </Link>
               </div>
            </div>

            {/* Pro */}
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/60 shadow-ambient flex flex-col group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-teal-50/0 to-teal-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
               <div className="relative z-10 flex flex-col h-full text-primary">
                 <div className="mb-8">
                   <h3 className="text-2xl font-black mb-1">Career Builder</h3>
                   <div className="flex items-baseline gap-2">
                     <span className="text-5xl font-black">₹200</span>
                     <span className="opacity-80 font-bold text-sm">/ mo</span>
                   </div>
                   <p className="mt-4 text-sm text-on-surface-variant font-medium">Build a powerful presence with all premium features.</p>
                 </div>
                 <ul className="space-y-4 mb-10 flex-1">
                   <li className="flex items-center gap-3 text-sm font-semibold">
                     <div className="bg-teal-50 p-1.5 rounded-full border border-teal-100"><ShieldCheck size={14} className="text-teal-600" /></div>
                     5 Resumes
                   </li>
                   <li className="flex items-center gap-3 text-sm font-semibold">
                     <div className="bg-teal-50 p-1.5 rounded-full border border-teal-100"><ShieldCheck size={14} className="text-teal-600" /></div>
                     All 9 Premium Blueprints
                   </li>
                   <li className="flex items-center gap-3 text-sm font-semibold">
                     <div className="bg-teal-50 p-1.5 rounded-full border border-teal-100"><ShieldCheck size={14} className="text-teal-600" /></div>
                     Profile Photo Support
                   </li>
                   <li className="flex items-center gap-3 text-sm font-semibold">
                     <div className="bg-teal-50 p-1.5 rounded-full border border-teal-100"><ShieldCheck size={14} className="text-teal-600" /></div>
                     No Watermark
                   </li>
                 </ul>
                 <Link href="/#templates">
                   <button className="w-full bg-primary text-on-primary py-4 rounded-2xl font-black transition-all hover:bg-primary-container hover:text-primary shadow-lg shadow-primary/10">
                     Get Pro
                   </button>
                 </Link>
               </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-40 max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-primary mb-12 text-center tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl border border-white/60 shadow-sm">
                <h4 className="text-lg font-bold text-primary mb-2">How does the AI Resume Optimizer work?</h4>
                <p className="text-on-surface-variant leading-relaxed text-sm">Our AI analyzes your job descriptions and maps your experience organically, injecting industry-specific keywords and power verbs to ensure your resume passes ATS scanners cleanly.</p>
              </div>
              <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl border border-white/60 shadow-sm">
                <h4 className="text-lg font-bold text-primary mb-2">Can I switch templates after creating my resume?</h4>
                <p className="text-on-surface-variant leading-relaxed text-sm">Absolutely! In the Pro and Elite plans, you have unlimited access to our 9+ Master Templates. Your data is perfectly mapped, so changing designs is as simple as a single click.</p>
              </div>
              <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl border border-white/60 shadow-sm">
                <h4 className="text-lg font-bold text-primary mb-2">Is the Elite plan truly a monthly subscription?</h4>
                <p className="text-on-surface-variant leading-relaxed text-sm">Yes. You maintain full access to all Elite features as long as your subscription is active. You also get all future templates and AI upgrades at no additional cost.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
