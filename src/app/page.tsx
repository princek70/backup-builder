import { prisma } from "@/lib/db";
import Link from "next/link";
import { Check, Zap, ShieldCheck } from "lucide-react";
import TemplateCard from "@/components/TemplateCard";
import NavLinks from "@/components/NavLinks";
import MainLayout from "@/components/MainLayout";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const content = await prisma.landingContent.findFirst({
    where: { id: 1 },
  });

  const templates = await prisma.template.findMany({
    where: { active: true }
  });

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative px-8 py-12 md:py-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block py-1 px-4 rounded-full bg-tertiary-container text-on-tertiary-container text-[11px] font-bold uppercase tracking-widest mb-6">
                {content.heroTagline}
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-primary tracking-tight leading-[1.1] mb-8">
                {content.heroTitle}
              </h1>
              <p className="text-xl text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
                {content.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="#templates">
                  <button className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold text-lg shadow-ambient hover:translate-y-[-2px] transition-all w-full sm:w-auto">
                    {content.heroCta} — Free or ₹200 PRO
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-ambient bg-surface-container-lowest p-4 border border-outline-variant/10">
                <img 
                  alt="Resume Preview" 
                  className="w-full h-auto rounded-xl" 
                  src={content.heroImageUrl} 
                />
                <div className="absolute top-10 -left-10 glass-panel p-4 rounded-xl shadow-xl border border-white/20 hidden lg:block">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary">auto_fix_high</span>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-tertiary">Tone Adjusted: Executive</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-tertiary-container/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>

        {/* Templates Section RESTORED */}
        <section id="templates" className="px-8 pt-24 pb-32 bg-surface-container-low scroll-mt-24 mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-primary text-3xl md:text-5xl font-black tracking-tight mb-4 text-primary">Choose Your Blueprint</h2>
              <p className="text-on-surface-variant max-w-xl mx-auto">Select a template to begin archetecting your professional identity. Your progress is saved in our secure database.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-8">
              {templates.map((template: any) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="px-8 py-12 bg-surface relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-primary text-3xl md:text-5xl font-black tracking-tight mb-4 text-primary">Pricing Plans</h2>
              <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mb-6"></div>
              <p className="text-on-surface-variant font-medium">Invest in your career. Scalable solutions for every professional stage.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Free */}
              <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-ambient flex flex-col group hover:shadow-2xl transition-all duration-500">
                <div className="mb-8">
                  <h3 className="text-primary text-2xl font-black mb-1">Basic Blueprint</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-primary">₹0</span>
                    <span className="text-on-surface-variant font-bold text-sm">/ forever</span>
                  </div>
                  <p className="mt-4 text-sm text-on-surface-variant font-medium">Perfect for students and entry-level architects.</p>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-sm font-semibold text-primary">
                    <div className="bg-primary/5 p-1 rounded-full"><Check size={14} /></div>
                    1 Active Resume
                  </li>
                  <li className="flex items-center gap-3 text-sm font-semibold text-primary">
                    <div className="bg-primary/5 p-1 rounded-full"><Check size={14} /></div>
                    2 Standard Templates
                  </li>
                  <li className="flex items-center gap-3 text-sm font-semibold text-primary">
                    <div className="bg-primary/5 p-1 rounded-full"><Check size={14} /></div>
                    Standard PDF Export
                  </li>
                </ul>
                <Link href="#templates">
                  <button className="w-full bg-surface-container-high text-primary py-4 rounded-2xl font-black transition-all hover:bg-surface-container-highest">
                    Get Started Free
                  </button>
                </Link>
              </div>

              {/* Elite - Prominent in Middle */}
              <div className="bg-primary p-8 rounded-[2.5rem] shadow-2xl shadow-primary/30 flex flex-col relative scale-[1.05] z-20 group hover:shadow-primary/50 transition-all duration-500">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-tertiary text-on-tertiary px-6 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md flex items-center gap-2">
                   <Zap size={10} className="fill-on-tertiary" />
                   Best Value
                </div>
                <div className="mb-8 text-on-primary">
                  <h3 className="text-3xl font-black mb-1">Full Architect</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-6xl font-black">₹300</span>
                    <span className="opacity-80 font-bold text-sm">/ mo</span>
                  </div>
                  <p className="mt-4 text-sm opacity-90 font-medium leading-relaxed">The ultimate toolset for top-tier professional architects.</p>
                </div>
                <ul className="space-y-4 mb-10 flex-1 text-on-primary font-semibold">
                  <li className="flex items-center gap-3 text-sm">
                    <div className="bg-white/10 p-1.5 rounded-full"><Zap size={14} className="fill-white" /></div>
                    Unlimited Resumes
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <div className="bg-white/10 p-1.5 rounded-full"><Zap size={14} className="fill-white" /></div>
                    AI Writing Assistant
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <div className="bg-white/10 p-1.5 rounded-full"><Zap size={14} className="fill-white" /></div>
                    Priority Support
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <div className="bg-white/10 p-1.5 rounded-full"><Zap size={14} className="fill-white" /></div>
                    Lifetime Storage
                  </li>
                </ul>
                <Link href="/#templates">
                  <button className="w-full bg-white text-primary py-5 rounded-2xl font-black transition-transform hover:scale-[1.02] shadow-xl">
                    Get Elite Access
                  </button>
                </Link>
              </div>

              {/* Pro */}
              <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-ambient flex flex-col group hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                <div className="mb-8 text-primary">
                  <h3 className="text-2xl font-black mb-1">Career Builder</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black">₹200</span>
                    <span className="text-on-surface-variant font-bold text-sm">/ mo</span>
                  </div>
                  <p className="mt-4 text-sm text-on-surface-variant font-medium">Build a robust presence with premium blueprints.</p>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-sm font-semibold text-primary">
                    <div className="bg-tertiary-container/30 p-1 rounded-full"><ShieldCheck size={14} className="text-tertiary font-bold" /></div>
                    5 Active Resumes
                  </li>
                  <li className="flex items-center gap-3 text-sm font-semibold text-primary">
                    <div className="bg-tertiary-container/30 p-1 rounded-full"><ShieldCheck size={14} className="text-tertiary font-bold" /></div>
                    9 Premium Blueprints
                  </li>
                  <li className="flex items-center gap-3 text-sm font-semibold text-primary">
                    <div className="bg-tertiary-container/30 p-1 rounded-full"><ShieldCheck size={14} className="text-tertiary font-bold" /></div>
                    Profile Photo Support
                  </li>
                  <li className="flex items-center gap-3 text-sm font-semibold text-primary">
                    <div className="bg-tertiary-container/30 p-1 rounded-full"><ShieldCheck size={14} className="text-tertiary font-bold" /></div>
                    No Watermark Export
                  </li>
                </ul>
                <Link href="/pricing">
                  <button className="w-full bg-primary text-on-primary py-4 rounded-2xl font-black transition-all hover:bg-primary-container shadow-lg shadow-primary/10">
                    Get Career Pro
                  </button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="absolute top-1/2 left-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-tertiary/5 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2"></div>
        </section>
      </div>
    </MainLayout>
  );
}
